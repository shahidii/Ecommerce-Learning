const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../config/swagger");

const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes");
const categoryRoutes = require("./category.routes");

const router = express.Router();

// ─── API docs ────────────────────────────────────────────
router.get("/docs.json", (req, res) => res.json(swaggerSpec)); // raw OpenAPI (import into Postman!)
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "ShopNest API Docs",
    swaggerOptions: { persistAuthorization: true },
}));

// ─── General ─────────────────────────────────────────────
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ShopNest API v1",
        data: {
            docs: "/api/docs",
            resources: {
                auth: "/api/auth",
                products: "/api/products",
                categories: "/api/categories",
            },
        },
    });
});

router.get("/health", (req, res) => {
    const dbStates = ["disconnected", "connected", "connecting", "disconnecting"];
    res.status(200).json({
        success: true,
        message: "API is healthy",
        data: {
            uptime: Math.round(process.uptime()),
            database: dbStates[mongoose.connection.readyState] || "unknown",
            timestamp: new Date().toISOString(),
        },
    });
});

// ─── Resources ───────────────────────────────────────────
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;
