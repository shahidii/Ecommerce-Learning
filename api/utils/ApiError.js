// A custom error that carries an HTTP status, a machine readable code and (optionally) the field that caused it.
// Throw it anywhere (service, middleware, controller) and the error middleware formats the response.
class ApiError extends Error {
    constructor(statusCode, code, message, { field = null, details = null } = {}) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.field = field;
        this.details = details;
    }

    static badRequest(code, message, extra) { return new ApiError(400, code, message, extra); }
    static unauthorized(code, message, extra) { return new ApiError(401, code, message, extra); }
    static forbidden(code, message, extra) { return new ApiError(403, code, message, extra); }
    static notFound(code, message, extra) { return new ApiError(404, code, message, extra); }
    static conflict(code, message, extra) { return new ApiError(409, code, message, extra); }
}

module.exports = ApiError;
