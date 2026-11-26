const env = require("../config/env");
const logger = require("../config/logger");
const { createLogger } = require("../utils/requestContext");

const log = createLogger("error-handler");

// Converts known library errors (Mongoose, JSON parser, CORS) into our error format
const normalizeError = (err) => {
    if (err.statusCode && err.code) return err; // already an ApiError

    // Invalid JSON body sent by the client
    if (err.type === "entity.parse.failed") {
        return { statusCode: 400, code: "INVALID_JSON", message: "Request body is not valid JSON" };
    }
    // Invalid MongoDB ObjectId, e.g. /products/123
    if (err.name === "CastError") {
        return { statusCode: 400, code: "INVALID_ID", message: `Invalid ${err.path}: ${err.value}`, field: err.path };
    }
    // Unique index violation, e.g. duplicate email
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0];
        return { statusCode: 409, code: "DUPLICATE_VALUE", message: `${field} already exists`, field };
    }
    // Mongoose schema validation
    if (err.name === "ValidationError") {
        const details = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
        return { statusCode: 400, code: "VALIDATION_ERROR", message: details[0].message, field: details[0].field, details };
    }
    if (err.message?.startsWith("CORS")) {
        return { statusCode: 403, code: "CORS_BLOCKED", message: err.message };
    }
    return { statusCode: 500, code: "INTERNAL_SERVER_ERROR", message: "Something went wrong. Please try again." };
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    const error = normalizeError(err);
    // 4xx = client mistakes → a short debug line (the http logger also prints a "warn" line)
    // 5xx = our bugs → log the full error with stack trace (visible in production too)
    if (error.statusCode >= 500) (req.log || logger).error({ err }, `Unhandled error: ${err.message}`);
    else log.debug(`Caught ${err.constructor.name} → responding ${error.statusCode} ${error.code}`);
    res.locals.errorSummary = `${error.code}: ${error.message}`; // shown on the http log line

    const body = {
        success: false,
        error: {
            code: error.code,
            message: error.message,
            field: error.field || null,
        },
    };
    if (error.details) body.error.details = error.details;
    if (error.statusCode >= 500) body.error.requestId = req.id; // user can report this id
    if (env.NODE_ENV === "development" && error.statusCode >= 500) body.error.stack = err.stack;

    res.status(error.statusCode).json(body);
};

module.exports = errorHandler;
