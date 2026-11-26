// Centralised environment config.
// Read process.env ONCE here, then import this file everywhere else.
const logger = require("./logger");

const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: Number(process.env.PORT) || 5000,

    // Database: Atlas is tried first, local MongoDB is the fallback
    MONGODB_URI: process.env.MONGODB_URI,         // mongodb+srv://user:pass@cluster.mongodb.net
    MONGO_URI_LOCAL: process.env.MONGO_URI_LOCAL, // mongodb://127.0.0.1:27017/shopnest
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || "shopnest",

    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
    ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS || "")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
    // Public URL of this API (used by Swagger and CORS).
    // On Render, RENDER_EXTERNAL_URL is set automatically, e.g. https://ecommerce-learning-api.onrender.com
    API_BASE_URL: (
        process.env.API_BASE_URL ||
        process.env.RENDER_EXTERNAL_URL ||
        `http://localhost:${process.env.PORT || 5000}`
    ).replace(/\/+$/, ""),
};

// Fail fast with a helpful message if something important is missing
const problems = [];
if (!env.JWT_SECRET) problems.push("JWT_SECRET");
if (!env.MONGODB_URI && !env.MONGO_URI_LOCAL) problems.push("MONGODB_URI or MONGO_URI_LOCAL");

if (problems.length) {
    logger.fatal(`Missing required env variables: ${problems.join(", ")} → copy .env.example to .env and fill the values`);
    process.exit(1);
}

module.exports = env;
