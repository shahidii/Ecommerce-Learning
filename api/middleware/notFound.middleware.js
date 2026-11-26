const ApiError = require("../utils/ApiError");

// Any request that did not match a route ends up here
const notFound = (req, res, next) => {
    next(ApiError.notFound("ROUTE_NOT_FOUND", `Route ${req.method} ${req.originalUrl} not found`));
};

module.exports = notFound;
