const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const { createLogger } = require("../utils/requestContext");
const productService = require("../services/product.service");

const log = createLogger("controller");

// @route   GET /api/products?page=1&limit=12&search=&category=&minPrice=&maxPrice=&sort=
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    log.debug("productController.getProducts → productService.listProducts()");
    const { products, meta } = await productService.listProducts(req.validated.query);
    log.debug(`Sending 200 with ${products.length} of ${meta.total} products (page ${meta.page}/${meta.totalPages})`);
    sendSuccess(res, { message: "Products fetched successfully", data: { products }, meta });
});

// @route   GET /api/products/search?q=phone
// @access  Public
const searchProducts = asyncHandler(async (req, res) => {
    const query = req.validated.query;
    log.debug(`productController.searchProducts("${query.search}") → productService.listProducts()`);
    const { products, meta } = await productService.listProducts(query);
    log.debug(`Sending 200 with ${products.length} of ${meta.total} matches`);
    sendSuccess(res, {
        message: products.length ? `Found ${meta.total} product(s) for "${query.search}"` : `No products found for "${query.search}"`,
        data: { query: query.search, products },
        meta,
    });
});

// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    log.debug(`productController.getProductById(${req.params.id}) → productService.getProductById()`);
    const product = await productService.getProductById(req.params.id);
    log.debug(`Sending 200 with "${product.title}"`);
    sendSuccess(res, { message: "Product fetched successfully", data: { product } });
});

// @route   GET /api/products/slug/:slug
// @access  Public
const getProductBySlug = asyncHandler(async (req, res) => {
    log.debug(`productController.getProductBySlug(${req.params.slug}) → productService.getProductBySlug()`);
    const product = await productService.getProductBySlug(req.params.slug);
    log.debug(`Sending 200 with "${product.title}"`);
    sendSuccess(res, { message: "Product fetched successfully", data: { product } });
});

// @route   GET /api/products/:id/related?limit=4
// @access  Public
const getRelatedProducts = asyncHandler(async (req, res) => {
    log.debug(`productController.getRelatedProducts(${req.params.id}) → productService.getRelatedProducts()`);
    const products = await productService.getRelatedProducts(req.params.id, req.query.limit);
    log.debug(`Sending 200 with ${products.length} related products`);
    sendSuccess(res, { message: "Related products fetched successfully", data: { products } });
});

// @route   POST /api/products
// @access  Private (admin)
const createProduct = asyncHandler(async (req, res) => {
    log.debug("productController.createProduct → productService.createProduct()");
    const product = await productService.createProduct(req.body);
    log.debug(`Sending 201 with new product ${product.id}`);
    sendSuccess(res, { statusCode: 201, message: "Product created successfully", data: { product } });
});

// @route   PUT /api/products/:id
// @access  Private (admin)
const updateProduct = asyncHandler(async (req, res) => {
    log.debug(`productController.updateProduct(${req.params.id}) → productService.updateProduct()`);
    const product = await productService.updateProduct(req.params.id, req.body);
    log.debug("Sending 200 with updated product");
    sendSuccess(res, { message: "Product updated successfully", data: { product } });
});

// @route   DELETE /api/products/:id
// @access  Private (admin)
const deleteProduct = asyncHandler(async (req, res) => {
    log.debug(`productController.deleteProduct(${req.params.id}) → productService.deleteProduct()`);
    const product = await productService.deleteProduct(req.params.id);
    log.debug("Sending 200 with deleted id");
    sendSuccess(res, { message: "Product deleted successfully", data: { id: product.id } });
});

module.exports = {
    getProducts,
    searchProducts,
    getProductById,
    getProductBySlug,
    getRelatedProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
