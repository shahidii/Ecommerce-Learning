const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const { createLogger } = require("../utils/requestContext");
const categoryService = require("../services/category.service");

const log = createLogger("controller");

// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    log.debug("categoryController.getCategories → categoryService.listCategories()");
    const categories = await categoryService.listCategories();
    log.debug(`Sending 200 with ${categories.length} categories`);
    sendSuccess(res, { message: "Categories fetched successfully", data: { categories } });
});

// @route   GET /api/categories/:slug
// @access  Public
const getCategoryBySlug = asyncHandler(async (req, res) => {
    log.debug(`categoryController.getCategoryBySlug(${req.params.slug}) → categoryService.getCategoryBySlug()`);
    const category = await categoryService.getCategoryBySlug(req.params.slug);
    log.debug(`Sending 200 with category "${category.name}"`);
    sendSuccess(res, { message: "Category fetched successfully", data: { category } });
});

// @route   GET /api/categories/:slug/products
// @access  Public
const getCategoryProducts = asyncHandler(async (req, res) => {
    log.debug(`categoryController.getCategoryProducts(${req.params.slug}) → categoryService.getProductsByCategory()`);
    const { category, products, meta } = await categoryService.getProductsByCategory(req.params.slug, req.validated.query);
    log.debug(`Sending 200 with ${products.length} of ${meta.total} products in "${category.name}"`);
    sendSuccess(res, { message: `Products in ${category.name} fetched successfully`, data: { category, products }, meta });
});

module.exports = { getCategories, getCategoryBySlug, getCategoryProducts };
