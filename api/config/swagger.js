const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const env = require("./env");
const schemas = require("../docs/swagger.schemas");

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "ShopNest E-commerce API",
            version: "1.0.0",
            description: [
                "Learning REST API for a React e-commerce frontend.",
                "",
                "**Features:** signup, login, JWT protected profile, products (pagination, filters, sorting), product detail, related products, categories and search.",
                "",
                "**How to authorize:** call `POST /auth/login`, copy `data.token`, click the **Authorize** 🔒 button and paste the token.",
                "",
                "**Response shape:** every success response is `{ success: true, message, data, meta? }` and every error is `{ success: false, error: { code, message, field?, details? } }`.",
            ].join("\n"),
        },
        servers: [{ url: `${env.API_BASE_URL}/api`, description: env.NODE_ENV }],
        tags: [
            { name: "General", description: "Health and API info" },
            { name: "Auth", description: "Signup, login and current user" },
            { name: "Products", description: "Product listing, detail, search and admin CRUD" },
            { name: "Categories", description: "Product categories" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
            },
            schemas,
        },
    },
    // Every file inside docs/paths holds the @swagger comments for one module
    apis: [path.join(__dirname, "../docs/paths/*.js")],
};

module.exports = swaggerJsdoc(options);
