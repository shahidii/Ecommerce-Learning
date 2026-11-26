const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { verifyToken } = require("../utils/jwt");
const { createLogger } = require("../utils/requestContext");
const userRepository = require("../repositories/user.repository");

const log = createLogger("auth");

// Protect a route: requires header  Authorization: Bearer <token>
const authenticate = asyncHandler(async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        log.debug("No Bearer token in Authorization header → 401");
        throw ApiError.unauthorized("NO_TOKEN", "Authentication required. Please log in.");
    }

    let decoded;
    try {
        decoded = verifyToken(header.split(" ")[1]);
    } catch (err) {
        log.debug(`Token rejected (${err.name}) → 401`);
        if (err.name === "TokenExpiredError") {
            throw ApiError.unauthorized("TOKEN_EXPIRED", "Session expired. Please log in again.");
        }
        throw ApiError.unauthorized("INVALID_TOKEN", "Invalid token. Please log in again.");
    }
    log.debug(`Token valid → user id ${decoded.id}, loading user from DB`);

    // Make sure the user still exists (e.g. account deleted after token was issued)
    const user = await userRepository.findById(decoded.id);
    if (!user) {
        log.debug("User in token no longer exists → 401");
        throw ApiError.unauthorized("USER_NOT_FOUND", "User for this token no longer exists.");
    }

    log.debug(`Authenticated as ${user.role} (${user.id})`);
    req.user = user; // available in every controller after this middleware
    next();
});

// Role based access: authorize("admin")
const authorize = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        log.warn({ userId: req.user?.id, role: req.user?.role, required: roles }, `Access denied: needs ${roles.join("/")} → 403`);
        return next(ApiError.forbidden("FORBIDDEN", "You do not have permission to perform this action."));
    }
    log.debug(`Role "${req.user.role}" allowed (${roles.join("/")})`);
    next();
};

module.exports = { authenticate, authorize };
