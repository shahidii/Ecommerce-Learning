const express = require("express");
const ageGroupController = require("../controllers/ageGroup.controller");
const validate = require("../middleware/validate.middleware");
const { listQueryValidator } = require("../validators/product.validator");

const router = express.Router();

router.get("/", ageGroupController.getAgeGroups);
router.get("/:slug", ageGroupController.getAgeGroupBySlug);
router.get("/:slug/products", validate(listQueryValidator, "query"), ageGroupController.getAgeGroupProducts);

module.exports = router;
