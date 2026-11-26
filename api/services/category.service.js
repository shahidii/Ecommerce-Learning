const ApiError = require("../utils/ApiError");
const categoryRepository = require("../repositories/category.repository");
const { createLogger } = require("../utils/requestContext");
const productService = require("./product.service");

const log = createLogger("service");

const listCategories = () => {
    log.debug("categoryService.listCategories: aggregate categories + $lookup products to count them");
    return categoryRepository.findAllWithProductCount();
};

const getCategoryBySlug = async (slug) => {
    log.debug(`categoryService.getCategoryBySlug: loading "${slug}"`);
    const category = await categoryRepository.findBySlug(slug);
    if (!category) {
        log.debug("No category with this slug → 404");
        throw ApiError.notFound("CATEGORY_NOT_FOUND", `Category "${slug}" not found`);
    }
    return category;
};

const getProductsByCategory = async (slug, query) => {
    const category = await getCategoryBySlug(slug);
    log.debug("Category found. Reusing productService.listProducts() with category filter");
    const { products, meta } = await productService.listProducts({ ...query, category: category.slug });
    return { category, products, meta };
};

module.exports = { listCategories, getCategoryBySlug, getProductsByCategory };
