const express = require("express");
const categoryController = require("../controllers/category.controller");
const validate = require("../middleware/validate.middleware");
const { listQueryValidator } = require("../validators/product.validator");

const router = express.Router();

router.get("/", categoryController.getCategories);
router.get("/:slug", categoryController.getCategoryBySlug);
router.get("/:slug/products", validate(listQueryValidator, "query"), categoryController.getCategoryProducts);

module.exports = router;
