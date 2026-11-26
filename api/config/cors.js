const env = require("./env");

// Which websites (origins) may call this API from a browser.
//
//   ALLOWED_ORIGINS=http://localhost:5173,https://my-shop.vercel.app   → only these
//   ALLOWED_ORIGINS=*                                                   → any website (fine for this learning API:
//                                                                         auth uses Bearer tokens, not cookies)
//
// Always allowed:
//   - requests without an Origin header (Postman, curl, server-to-server)
//   - the API's own URL (so Swagger "Try it out" works after deploying)
//   - any localhost port while NODE_ENV=development
const allowAll = env.ALLOWED_ORIGINS.includes("*");
const selfOrigin = new URL(env.API_BASE_URL).origin;
const isLocalhost = (origin) => /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowAll || origin === selfOrigin) return callback(null, true);
        if (env.NODE_ENV === "development" && isLocalhost(origin)) return callback(null, true);
        if (env.ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
        return callback(new Error(`CORS: origin ${origin} is not allowed. Add it to ALLOWED_ORIGINS.`));
    },
    credentials: !allowAll, // credentials (cookies) only make sense with an explicit list
    exposedHeaders: ["X-Request-Id"], // let the frontend read the request id
};

module.exports = corsOptions;
