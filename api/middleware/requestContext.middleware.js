// Runs right after the http logger. It:
//   1. stores req.log (which carries the request id) in AsyncLocalStorage
//   2. logs the incoming request (debug) so you can see where a request STARTS
const { runWithContext, createLogger } = require("../utils/requestContext");

const log = createLogger("http");

const isSwaggerAsset = (req) => req.originalUrl.startsWith("/api/docs/") && req.originalUrl !== "/api/docs/";

const requestContext = (req, res, next) => {
    runWithContext({ log: req.log }, () => {
        if (!isSwaggerAsset(req)) {
            const hasBody = req.body && Object.keys(req.body).length > 0;
            // body is logged AFTER express.json() parsed it; passwords/tokens are redacted
            log.debug(hasBody ? { body: req.body } : {}, `→ ${req.method} ${req.originalUrl}`);
        }
        next();
    });
};

module.exports = requestContext;
