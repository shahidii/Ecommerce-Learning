// Express app setup: middleware → routes → 404 → error handler
const express = require("express");
const cors = require("cors");

const env = require("../config/env");
const corsOptions = require("../config/cors");
const httpLogger = require("../middleware/httpLogger.middleware");
const requestContext = require("../middleware/requestContext.middleware");
const routes = require("../routes");
const notFound = require("../middleware/notFound.middleware");
const errorHandler = require("../middleware/error.middleware");

const app = express();

// ─── Global middleware ───────────────────────────────────
app.use(httpLogger);                        // Log every request (method, url, status, time, request id)
app.use(cors(corsOptions));                 // Allow the React app to call this API
app.use(express.json({ limit: "1mb" }));    // Parse JSON request bodies
app.use(requestContext);                    // Make the request logger available to every layer (see utils/requestContext.js)

// ─── Routes ──────────────────────────────────────────────
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ShopNest API is running 🚀",
        data: {
            docs: "/api/docs",
            api: "/api",
            environment: env.NODE_ENV,
            timestamp: new Date().toISOString(),
        },
    });
});

app.use("/api", routes); // Every API route lives under /api

// ─── Errors (must be last) ───────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
