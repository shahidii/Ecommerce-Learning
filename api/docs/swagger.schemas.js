// Reusable schemas for Swagger. Referenced in docs/paths/*.js as  $ref: '#/components/schemas/<Name>'
const CDN = "https://cdn.dummyjson.com/product-images";

module.exports = {
    // ─── Common ──────────────────────────────────────────
    Error: {
        type: "object",
        properties: {
            success: { type: "boolean", example: false },
            error: {
                type: "object",
                properties: {
                    code: { type: "string", example: "VALIDATION_ERROR" },
                    message: { type: "string", example: "Email is required" },
                    field: { type: "string", nullable: true, example: "email" },
                    details: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: { field: { type: "string" }, message: { type: "string" } },
                        },
                    },
                },
            },
        },
    },
    PaginationMeta: {
        type: "object",
        properties: {
            page: { type: "integer", example: 1 },
            limit: { type: "integer", example: 12 },
            total: { type: "integer", example: 63 },
            totalPages: { type: "integer", example: 6 },
            hasNextPage: { type: "boolean", example: true },
            hasPrevPage: { type: "boolean", example: false },
        },
    },

    // ─── Auth ────────────────────────────────────────────
    User: {
        type: "object",
        properties: {
            id: { type: "string", example: "6745a1f0c2b3d4e5f6a7b8c9" },
            name: { type: "string", example: "Demo User" },
            email: { type: "string", format: "email", example: "demo@shopnest.dev" },
            avatar: { type: "string", example: "https://ui-avatars.com/api/?name=Demo%20User&background=random&size=128" },
            role: { type: "string", enum: ["customer", "admin"], example: "customer" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
        },
    },
    SignupRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
            name: { type: "string", minLength: 2, maxLength: 50, example: "Arjun Kumar" },
            email: { type: "string", format: "email", example: "arjun@example.com" },
            password: { type: "string", minLength: 6, example: "Arjun@123", description: "Min 6 characters, at least 1 letter and 1 number" },
            avatar: { type: "string", format: "uri", example: "https://i.pravatar.cc/150?img=12", description: "Optional. A default avatar is generated if empty." },
        },
    },
    LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email: { type: "string", format: "email", example: "demo@shopnest.dev" },
            password: { type: "string", example: "Demo@1234" },
        },
    },
    AuthResponse: {
        type: "object",
        properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Logged in successfully" },
            data: {
                type: "object",
                properties: {
                    user: { $ref: "#/components/schemas/User" },
                    token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
                },
            },
        },
    },

    // ─── Catalogue ───────────────────────────────────────
    CategorySummary: {
        type: "object",
        properties: {
            id: { type: "string", example: "6745a1f0c2b3d4e5f6a7b8c1" },
            name: { type: "string", example: "Smartphones" },
            slug: { type: "string", example: "smartphones" },
            image: { type: "string", example: `${CDN}/smartphones/iphone-13-pro/thumbnail.webp` },
        },
    },
    Category: {
        type: "object",
        properties: {
            id: { type: "string", example: "6745a1f0c2b3d4e5f6a7b8c1" },
            name: { type: "string", example: "Smartphones" },
            slug: { type: "string", example: "smartphones" },
            description: { type: "string", example: "Latest 5G phones with great cameras and long battery life." },
            image: { type: "string", example: `${CDN}/smartphones/iphone-13-pro/thumbnail.webp` },
            productCount: { type: "integer", example: 6, description: "Only in GET /categories" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
        },
    },
    Product: {
        type: "object",
        properties: {
            id: { type: "string", example: "6745a1f0c2b3d4e5f6a7b8d2" },
            title: { type: "string", example: "Nexa 13 Pro (128 GB, Graphite)" },
            slug: { type: "string", example: "nexa-13-pro-128-gb-graphite" },
            description: { type: "string", example: "A flagship phone with a 6.1-inch 120Hz OLED display..." },
            brand: { type: "string", example: "Nexa" },
            category: { $ref: "#/components/schemas/CategorySummary" },
            price: { type: "number", example: 79999, description: "Selling price" },
            mrp: { type: "number", example: 89999, description: "Original price (show with strike-through)" },
            discountPercentage: { type: "integer", example: 11, description: "Computed: (mrp - price) / mrp × 100" },
            currency: { type: "string", example: "INR" },
            rating: { type: "number", example: 4.7 },
            reviewsCount: { type: "integer", example: 2341 },
            stock: { type: "integer", example: 25 },
            inStock: { type: "boolean", example: true, description: "Computed: stock > 0" },
            thumbnail: { type: "string", example: `${CDN}/smartphones/iphone-13-pro/thumbnail.webp` },
            images: {
                type: "array",
                items: { type: "string" },
                example: [`${CDN}/smartphones/iphone-13-pro/1.webp`, `${CDN}/smartphones/iphone-13-pro/2.webp`],
            },
            tags: { type: "array", items: { type: "string" }, example: ["5g", "flagship", "camera"] },
            specifications: {
                type: "array",
                items: { type: "object", properties: { label: { type: "string" }, value: { type: "string" } } },
                example: [{ label: "Display", value: "6.1\" OLED, 120Hz" }, { label: "Storage", value: "128 GB" }],
            },
            isFeatured: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
        },
    },
    ProductInput: {
        type: "object",
        required: ["title", "description", "price", "mrp", "categoryId", "thumbnail"],
        properties: {
            title: { type: "string", example: "Wireless Gaming Mouse" },
            description: { type: "string", example: "Ergonomic wireless mouse with 16000 DPI sensor and RGB lighting." },
            brand: { type: "string", example: "ProPlay" },
            price: { type: "number", example: 1499 },
            mrp: { type: "number", example: 2499 },
            categoryId: { type: "string", example: "<paste a category id from GET /categories>" },
            stock: { type: "integer", example: 50 },
            rating: { type: "number", example: 4.2 },
            reviewsCount: { type: "integer", example: 0 },
            thumbnail: { type: "string", example: `${CDN}/mobile-accessories/apple-airpods/thumbnail.webp` },
            images: { type: "array", items: { type: "string" }, example: [`${CDN}/mobile-accessories/apple-airpods/1.webp`] },
            tags: { type: "array", items: { type: "string" }, example: ["mouse", "gaming"] },
            specifications: { type: "array", items: { type: "object", properties: { label: { type: "string" }, value: { type: "string" } } }, example: [{ label: "DPI", value: "16000" }] },
            isFeatured: { type: "boolean", example: false },
        },
    },
};
