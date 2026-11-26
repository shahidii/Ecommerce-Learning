// Logs every HTTP request with method, url, status, response time and a request id.
//   development: "GET /api/products 200 - 12ms"
//                "GET /api/products?limit=500 400 - 1ms → VALIDATION_ERROR: limit must be ..."
//   production : {"level":30,"req":{"id":"...","method":"GET",...},"res":{"statusCode":200},"responseTime":12,"msg":"..."}
//
// It also adds `req.log` (a logger that already includes the request id) and an
// `X-Request-Id` response header, so a user's bug report can be matched to the server log.
const { randomUUID } = require("crypto");
const pinoHttp = require("pino-http");
const logger = require("../config/logger");

const httpLogger = pinoHttp({
    logger,

    // req.log only carries { reqId } (not the whole request) → small flow logs
    quietReqLogger: true,

    // Reuse an incoming X-Request-Id (from a proxy / load balancer) or create one
    genReqId(req, res) {
        const id = req.headers["x-request-id"] || randomUUID();
        res.setHeader("X-Request-Id", id);
        return id;
    },

    // 5xx → error, 4xx → warn, everything else → info
    customLogLevel(req, res, err) {
        if (err || res.statusCode >= 500) return "error";
        if (res.statusCode >= 400) return "warn";
        return "info";
    },
    // errorSummary is set by error.middleware → "... 400 - 1ms → VALIDATION_ERROR: limit must be ..."
    customSuccessMessage: (req, res, responseTime) => {
        const line = `${req.method} ${req.originalUrl} ${res.statusCode} - ${Math.round(responseTime)}ms`;
        return res.locals?.errorSummary ? `${line} → ${res.locals.errorSummary}` : line;
    },
    customErrorMessage: (req, res, err) =>
        `${req.method} ${req.originalUrl} ${res.statusCode} - ${err.message}`,

    // Keep log lines small: only what is useful
    serializers: {
        req: (req) => ({ id: req.id, method: req.method, url: req.url, ip: req.remoteAddress }),
        res: (res) => ({ statusCode: res.statusCode }),
    },

    // Don't log Swagger UI static files (css/js) — too noisy
    autoLogging: {
        ignore: (req) => req.url.startsWith("/api/docs/") && req.url !== "/api/docs/",
    },
});

module.exports = httpLogger;
