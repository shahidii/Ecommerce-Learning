const express = require("express");
const productController = require("../controllers/product.controller");
const validate = require("../middleware/validate.middleware");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const {
    listQueryValidator,
    searchQueryValidator,
    createProductValidator,
    updateProductValidator,
} = require("../validators/product.validator");

const router = express.Router();

// ⚠️ Order matters: "/search" and "/slug/:slug" must come BEFORE "/:id",
// otherwise Express would treat "search" as an id.
router.get("/", validate(listQueryValidator, "query"), productController.getProducts);
router.get("/search", validate(searchQueryValidator, "query"), productController.searchProducts);
router.get("/slug/:slug", productController.getProductBySlug);
router.get("/:id", productController.getProductById);
router.get("/:id/related", productController.getRelatedProducts);

// Admin only
router.post("/", authenticate, authorize("admin"), validate(createProductValidator), productController.createProduct);
router.put("/:id", authenticate, authorize("admin"), validate(updateProductValidator), productController.updateProduct);
router.delete("/:id", authenticate, authorize("admin"), productController.deleteProduct);

module.exports = router;
