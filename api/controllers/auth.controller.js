// Controller = reads the request, calls a service, sends the response. Keep it thin.
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const { createLogger } = require("../utils/requestContext");
const authService = require("../services/auth.service");

const log = createLogger("controller");

// @route   POST /api/auth/signup
// @access  Public
const signup = asyncHandler(async (req, res) => {
    log.debug("authController.signup → authService.signup()");
    const { user, token } = await authService.signup(req.body);
    log.debug("Sending 201 with { user, token }");
    sendSuccess(res, { statusCode: 201, message: "Account created successfully", data: { user, token } });
});

// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
    log.debug("authController.login → authService.login()");
    const { user, token } = await authService.login(req.body);
    log.debug("Sending 200 with { user, token }");
    sendSuccess(res, { message: "Logged in successfully", data: { user, token } });
});

// @route   GET /api/auth/me
// @access  Private (Bearer token)
const getMe = asyncHandler(async (req, res) => {
    log.debug("authController.getMe → returning req.user (set by authenticate middleware)");
    sendSuccess(res, { message: "Current user fetched successfully", data: { user: req.user } });
});

module.exports = { signup, login, getMe };
