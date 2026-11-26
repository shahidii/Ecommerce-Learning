// Request context with AsyncLocalStorage (built into Node.js).
//
// Problem: services and repositories don't receive `req`, but we want their logs to
// include the request id so we can follow ONE request through every layer.
// Solution: store the request's logger in AsyncLocalStorage when the request starts.
// Any code that runs "inside" that request (even after awaits) can read it back.
const { AsyncLocalStorage } = require("async_hooks");
const baseLogger = require("../config/logger");

const storage = new AsyncLocalStorage();

// Run `fn` with a context object ({ log }) available to everything it calls
const runWithContext = (context, fn) => storage.run(context, fn);

// The current request's logger (has reqId), or the app logger outside a request
const getRequestLogger = () => storage.getStore()?.log || baseLogger;

// A logger tagged with the layer name: controller, service, db, middleware...
//
//   const log = createLogger("service");
//   log.debug("Hashing password");
//   log.info({ userId }, "User signed up");
const createLogger = (layer) => {
    const write = (level) => (objOrMsg, msg) => {
        const logger = getRequestLogger();
        if (!logger.isLevelEnabled(level)) return; // skip work when the level is off
        if (typeof objOrMsg === "string") logger[level]({ layer }, objOrMsg);
        else logger[level]({ layer, ...objOrMsg }, msg);
    };
    return {
        trace: write("trace"),
        debug: write("debug"),
        info: write("info"),
        warn: write("warn"),
        error: write("error"),
        isLevelEnabled: (level) => getRequestLogger().isLevelEnabled(level),
    };
};

module.exports = { runWithContext, getRequestLogger, createLogger };
