const express = require("express");
const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const { authenticate } = require("../middleware/auth.middleware");
const { signupValidator, loginValidator } = require("../validators/auth.validator");

const router = express.Router();

router.post("/signup", validate(signupValidator), authController.signup);
router.post("/login", validate(loginValidator), authController.login);
router.get("/me", authenticate, authController.getMe);

module.exports = router;
