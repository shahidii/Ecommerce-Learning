const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const slugify = require("../utils/slugify");
const escapeRegex = require("../utils/escapeRegex");
const { getPagination, buildMeta } = require("../utils/pagination");
const { createLogger } = require("../utils/requestContext");
const productRepository = require("../repositories/product.repository");
const categoryRepository = require("../repositories/category.repository");

const log = createLogger("service");

// ?sort=price_asc  →  { price: 1 }
const SORT_MAP = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    rating: { rating: -1 },
    popular: { reviewsCount: -1 },
    title_asc: { title: 1 },
    title_desc: { title: -1 },
};

const assertValidId = (id) => {
    if (!mongoose.isValidObjectId(id)) {
        log.debug(`"${id}" is not a valid MongoDB ObjectId → 400 INVALID_ID`);
        throw ApiError.badRequest("INVALID_ID", `"${id}" is not a valid product id`, { field: "id" });
    }
};

// Turns the (validated) query string into a MongoDB filter object
const buildFilter = async (query) => {
    const filter = {};

    if (query.search) {
        log.debug(`Search "${query.search}": matching title, brand, tags and category names (case-insensitive)`);
        const regex = new RegExp(escapeRegex(query.search), "i");
        const categoryIds = await categoryRepository.findIdsByNameLike(regex);
        filter.$or = [{ title: regex }, { brand: regex }, { tags: regex }, { category: { $in: categoryIds } }];
    }

    if (query.category) {
        const category = await categoryRepository.findBySlug(query.category);
        if (!category) {
            log.debug(`Category slug "${query.category}" not found → 404`);
            throw ApiError.notFound("CATEGORY_NOT_FOUND", `Category "${query.category}" not found`, { field: "category" });
        }
        filter.category = category._id;
    }

    if (query.brand) {
        const brands = query.brand.split(",").map((b) => new RegExp(`^${escapeRegex(b.trim())}$`, "i"));
        filter.brand = { $in: brands };
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
        filter.price = {};
        if (query.minPrice !== undefined) filter.price.$gte = query.minPrice;
        if (query.maxPrice !== undefined) filter.price.$lte = query.maxPrice;
    }

    if (query.minRating !== undefined) filter.rating = { $gte: query.minRating };
    if (query.inStock === "true") filter.stock = { $gt: 0 };
    if (query.inStock === "false") filter.stock = 0;
    if (query.featured !== undefined) filter.isFeatured = query.featured === "true";

    return filter;
};

const listProducts = async (query = {}) => {
    const { page, limit, skip } = getPagination(query);
    log.debug(`productService.listProducts: page ${page}, limit ${limit} → skip ${skip}`);

    const filter = await buildFilter(query);
    log.debug({ filter, sort: query.sort || "newest" }, "Built MongoDB filter from the query string");

    if (query.sort === "discount") {
        // discount is a computed field → sort in memory (fine for a small learning catalogue)
        log.debug("sort=discount is a computed field → loading matches and sorting in memory");
        const all = await productRepository.findMany({ filter, limit: 0 });
        all.sort((a, b) => b.discountPercentage - a.discountPercentage);
        return { products: all.slice(skip, skip + limit), meta: buildMeta({ page, limit, total: all.length }) };
    }

    const sort = SORT_MAP[query.sort] || SORT_MAP.newest;
    log.debug("Running find() and countDocuments() in parallel with Promise.all");
    const [products, total] = await Promise.all([
        productRepository.findMany({ filter, sort, skip, limit }),
        productRepository.count(filter),
    ]);

    return { products, meta: buildMeta({ page, limit, total }) };
};

const getProductById = async (id) => {
    assertValidId(id);
    log.debug(`productService.getProductById: loading product ${id} with its category`);
    const product = await productRepository.findById(id);
    if (!product) {
        log.debug("No product with this id → 404");
        throw ApiError.notFound("PRODUCT_NOT_FOUND", "Product not found");
    }
    return product;
};

const getProductBySlug = async (slug) => {
    log.debug(`productService.getProductBySlug: loading "${slug}"`);
    const product = await productRepository.findBySlug(slug.toLowerCase());
    if (!product) {
        log.debug("No product with this slug → 404");
        throw ApiError.notFound("PRODUCT_NOT_FOUND", "Product not found");
    }
    return product;
};

const getRelatedProducts = async (id, limitParam) => {
    const product = await getProductById(id);
    const limit = Math.min(Math.max(parseInt(limitParam, 10) || 4, 1), 12);
    log.debug(`Finding ${limit} other products in "${product.category.name}", best rated first`);
    return productRepository.findRelated({ categoryId: product.category._id, excludeId: product._id, limit });
};

// ─── Admin ───────────────────────────────────────────────
const ensureCategoryExists = async (categoryId) => {
    const category = await categoryRepository.findById(categoryId);
    if (!category) throw ApiError.notFound("CATEGORY_NOT_FOUND", "Category not found", { field: "categoryId" });
};

const uniqueSlug = async (title, excludeId) => {
    const base = slugify(title);
    let slug = base;
    let n = 1;
    while (await productRepository.existsBySlug(slug, excludeId)) slug = `${base}-${++n}`;
    return slug;
};

const createProduct = async (data) => {
    await ensureCategoryExists(data.category);
    const slug = await uniqueSlug(data.title);
    log.debug(`Generated unique slug "${slug}"`);
    const product = await productRepository.create({ ...data, slug, images: data.images?.length ? data.images : [data.thumbnail] });
    log.info({ productId: product.id }, `Admin created product "${product.title}"`);
    return product;
};

const updateProduct = async (id, data) => {
    const existing = await getProductById(id);

    const merged = { price: existing.price, mrp: existing.mrp, ...data };
    if (merged.price > merged.mrp) {
        throw ApiError.badRequest("VALIDATION_ERROR", "price cannot be greater than mrp", { field: "price" });
    }
    if (data.category) await ensureCategoryExists(data.category);
    if (data.title) data.slug = await uniqueSlug(data.title, id);

    const product = await productRepository.updateById(id, data);
    log.info({ productId: id, fields: Object.keys(data) }, "Admin updated product");
    return product;
};

const deleteProduct = async (id) => {
    const product = await getProductById(id);
    await productRepository.deleteById(id);
    log.info({ productId: id }, `Admin deleted product "${product.title}"`);
    return product;
};

module.exports = {
    listProducts,
    getProductById,
    getProductBySlug,
    getRelatedProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
