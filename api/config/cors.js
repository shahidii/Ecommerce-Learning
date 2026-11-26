const env = require("./env");

// Only the frontends listed in ALLOWED_ORIGINS can call this API from a browser.
// Requests without an Origin header (Postman, curl, server-to-server) are always allowed.
const corsOptions = {
    origin(origin, callback) {
        if (!origin) return callback(null, true);
        if (env.NODE_ENV === "development" && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
            return callback(null, true); // any localhost port while developing
        }
        if (env.ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
        return callback(new Error(`CORS: origin ${origin} is not allowed`));
    },
    credentials: true,
};

module.exports = corsOptions;
