const mongoose = require("mongoose");
const { URL_REGEX, isEmpty, isString, isNumber } = require("./helpers");

const SORT_OPTIONS = ["newest", "oldest", "price_asc", "price_desc", "rating", "popular", "title_asc", "title_desc", "discount"];

const toNumber = (v) => (v === undefined || v === "" ? undefined : Number(v));

// GET /products and GET /categories/:slug/products  (query string)
const listQueryValidator = (query) => {
    const errors = [];
    const value = {
        page: toNumber(query.page),
        limit: toNumber(query.limit),
        search: isString(query.search) ? query.search.trim() : undefined,
        category: isString(query.category) ? query.category.trim().toLowerCase() : undefined,
        brand: isString(query.brand) ? query.brand.trim() : undefined,
        minPrice: toNumber(query.minPrice),
        maxPrice: toNumber(query.maxPrice),
        minRating: toNumber(query.minRating),
        inStock: query.inStock,
        featured: query.featured,
        sort: isString(query.sort) ? query.sort.trim() : "newest",
    };

    if (value.page !== undefined && (!Number.isInteger(value.page) || value.page < 1))
        errors.push({ field: "page", message: "page must be a positive whole number" });
    if (value.limit !== undefined && (!Number.isInteger(value.limit) || value.limit < 1 || value.limit > 50))
        errors.push({ field: "limit", message: "limit must be a whole number between 1 and 50" });
    if (value.minPrice !== undefined && (Number.isNaN(value.minPrice) || value.minPrice < 0))
        errors.push({ field: "minPrice", message: "minPrice must be a number ≥ 0" });
    if (value.maxPrice !== undefined && (Number.isNaN(value.maxPrice) || value.maxPrice < 0))
        errors.push({ field: "maxPrice", message: "maxPrice must be a number ≥ 0" });
    if (isNumber(value.minPrice) && isNumber(value.maxPrice) && value.minPrice > value.maxPrice)
        errors.push({ field: "minPrice", message: "minPrice cannot be greater than maxPrice" });
    if (value.minRating !== undefined && (Number.isNaN(value.minRating) || value.minRating < 0 || value.minRating > 5))
        errors.push({ field: "minRating", message: "minRating must be between 0 and 5" });
    for (const key of ["inStock", "featured"]) {
        if (value[key] !== undefined && !["true", "false"].includes(value[key]))
            errors.push({ field: key, message: `${key} must be true or false` });
    }
    if (!SORT_OPTIONS.includes(value.sort))
        errors.push({ field: "sort", message: `sort must be one of: ${SORT_OPTIONS.join(", ")}` });

    return { errors, value };
};

// GET /products/search  → same as list, but "q" is required
const searchQueryValidator = (query) => {
    const q = isString(query.q) ? query.q.trim() : "";
    const result = listQueryValidator({ ...query, search: q });
    if (!q) result.errors.unshift({ field: "q", message: "Search text (q) is required" });
    else if (q.length > 100) result.errors.unshift({ field: "q", message: "Search text is too long (max 100 characters)" });
    return result;
};

// POST /products (all required) and PUT /products/:id (partial = true)
const productBodyValidator = (partial) => (body) => {
    const errors = [];
    const value = {};
    const has = (key) => body[key] !== undefined;

    const requireField = (key, message) => {
        if (!partial && isEmpty(body[key])) errors.push({ field: key, message });
    };

    requireField("title", "title is required");
    requireField("description", "description is required");
    requireField("price", "price is required");
    requireField("mrp", "mrp is required");
    requireField("categoryId", "categoryId is required");
    requireField("thumbnail", "thumbnail is required");

    for (const key of ["title", "description", "brand"]) {
        if (!has(key)) continue;
        if (!isString(body[key]) || !body[key].trim()) errors.push({ field: key, message: `${key} must be a non-empty string` });
        else value[key] = body[key].trim();
    }
    for (const key of ["price", "mrp", "stock", "rating", "reviewsCount"]) {
        if (!has(key)) continue;
        if (!isNumber(body[key]) || body[key] < 0) errors.push({ field: key, message: `${key} must be a number ≥ 0` });
        else value[key] = body[key];
    }
    if (isNumber(value.rating) && value.rating > 5) errors.push({ field: "rating", message: "rating must be between 0 and 5" });
    if (isNumber(value.price) && isNumber(value.mrp) && value.price > value.mrp)
        errors.push({ field: "price", message: "price cannot be greater than mrp" });

    if (has("categoryId")) {
        if (!mongoose.isValidObjectId(body.categoryId)) errors.push({ field: "categoryId", message: "categoryId must be a valid id" });
        else value.category = body.categoryId;
    }
    if (has("thumbnail")) {
        if (!isString(body.thumbnail) || !URL_REGEX.test(body.thumbnail)) errors.push({ field: "thumbnail", message: "thumbnail must be a valid URL" });
        else value.thumbnail = body.thumbnail.trim();
    }
    if (has("images")) {
        if (!Array.isArray(body.images) || body.images.some((u) => !isString(u) || !URL_REGEX.test(u)))
            errors.push({ field: "images", message: "images must be an array of URLs" });
        else value.images = body.images;
    }
    if (has("tags")) {
        if (!Array.isArray(body.tags) || body.tags.some((t) => !isString(t)))
            errors.push({ field: "tags", message: "tags must be an array of strings" });
        else value.tags = body.tags.map((t) => t.trim().toLowerCase()).filter(Boolean);
    }
    if (has("specifications")) {
        const ok = Array.isArray(body.specifications) && body.specifications.every((s) => s && isString(s.label) && isString(s.value));
        if (!ok) errors.push({ field: "specifications", message: "specifications must be an array of { label, value }" });
        else value.specifications = body.specifications;
    }
    if (has("isFeatured")) {
        if (typeof body.isFeatured !== "boolean") errors.push({ field: "isFeatured", message: "isFeatured must be true or false" });
        else value.isFeatured = body.isFeatured;
    }

    if (partial && Object.keys(value).length === 0 && errors.length === 0)
        errors.push({ field: null, message: "Send at least one field to update" });

    return { errors, value };
};

// Named functions → their names show up in the logs ("createProductValidator(body) passed")
const createProductValidator = (body) => productBodyValidator(false)(body);
const updateProductValidator = (body) => productBodyValidator(true)(body);

module.exports = {
    SORT_OPTIONS,
    listQueryValidator,
    searchQueryValidator,
    createProductValidator,
    updateProductValidator,
};
