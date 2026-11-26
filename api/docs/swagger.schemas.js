// Reusable schemas for Swagger. Referenced in docs/paths/*.js as  $ref: '#/components/schemas/<Name>'
const IMG = require("../seed/data/pexels"); // builds a Pexels image URL from a photo id

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
            name: { type: "string", example: "Feeding Essentials" },
            slug: { type: "string", example: "feeding-essentials" },
            image: { type: "string", example: IMG(3716516, 800) },
        },
    },
    Category: {
        type: "object",
        properties: {
            id: { type: "string", example: "6745a1f0c2b3d4e5f6a7b8c1" },
            name: { type: "string", example: "Feeding Essentials" },
            slug: { type: "string", example: "feeding-essentials" },
            description: { type: "string", example: "Bottles, high chairs, spoons and bowls for every feeding stage." },
            image: { type: "string", example: IMG(3716516, 800) },
            productCount: { type: "integer", example: 8, description: "Only in GET /categories" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
        },
    },
    AgeGroupSummary: {
        type: "object",
        properties: {
            id: { type: "string", example: "6745a1f0c2b3d4e5f6a7b8a1" },
            name: { type: "string", example: "Newborn" },
            slug: { type: "string", example: "newborn" },
            ageRange: { type: "string", example: "0–3 Months" },
        },
    },
    AgeGroup: {
        type: "object",
        properties: {
            id: { type: "string", example: "6745a1f0c2b3d4e5f6a7b8a1" },
            name: { type: "string", example: "Newborn" },
            slug: { type: "string", example: "newborn" },
            ageRange: { type: "string", example: "0–3 Months", description: "Label for the UI" },
            minMonths: { type: "integer", example: 0 },
            maxMonths: { type: "integer", example: 3 },
            description: { type: "string", example: "Soft, gentle essentials for the very first weeks." },
            image: { type: "string", example: IMG(36845894, 800) },
            sortOrder: { type: "integer", example: 1, description: "Youngest first" },
            productCount: { type: "integer", example: 20, description: "Only in GET /age-groups" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
        },
    },
    Product: {
        type: "object",
        properties: {
            id: { type: "string", example: "6745a1f0c2b3d4e5f6a7b8d2" },
            title: { type: "string", example: "Anti-Colic Feeding Bottle 260 ml" },
            slug: { type: "string", example: "anti-colic-feeding-bottle-260-ml" },
            description: { type: "string", example: "A vented anti-colic bottle that reduces air intake and tummy troubles..." },
            brand: { type: "string", example: "Little Nest" },
            category: { $ref: "#/components/schemas/CategorySummary" },
            ageGroups: { type: "array", items: { $ref: "#/components/schemas/AgeGroupSummary" }, description: "Ages this product suits (youngest first)" },
            price: { type: "number", example: 499, description: "Selling price" },
            mrp: { type: "number", example: 699, description: "Original price (show with strike-through)" },
            discountPercentage: { type: "integer", example: 29, description: "Computed: (mrp - price) / mrp × 100" },
            currency: { type: "string", example: "INR" },
            rating: { type: "number", example: 4.6 },
            reviewsCount: { type: "integer", example: 2310 },
            stock: { type: "integer", example: 150 },
            inStock: { type: "boolean", example: true, description: "Computed: stock > 0" },
            thumbnail: { type: "string", example: IMG(374756, 600) },
            images: {
                type: "array",
                items: { type: "string" },
                example: [IMG(374756), IMG(8430572), IMG(7282619)],
            },
            tags: { type: "array", items: { type: "string" }, example: ["bottle", "anti-colic", "bpa free", "milk"] },
            specifications: {
                type: "array",
                items: { type: "object", properties: { label: { type: "string" }, value: { type: "string" } } },
                example: [{ label: "Capacity", value: "260 ml" }, { label: "Material", value: "BPA-free PP" }],
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
            title: { type: "string", example: "Organic Cotton Bandana Bibs (Pack of 5)" },
            description: { type: "string", example: "Absorbent organic cotton bibs with a soft fleece backing and adjustable snaps." },
            brand: { type: "string", example: "Little Nest" },
            price: { type: "number", example: 599 },
            mrp: { type: "number", example: 799 },
            categoryId: { type: "string", example: "<paste a category id from GET /categories>" },
            ageGroupIds: { type: "array", items: { type: "string" }, example: ["<id from GET /age-groups>"], description: "Optional. Ages this product suits" },
            stock: { type: "integer", example: 50 },
            rating: { type: "number", example: 4.5 },
            reviewsCount: { type: "integer", example: 0 },
            thumbnail: { type: "string", example: IMG(3875082, 600) },
            images: { type: "array", items: { type: "string" }, example: [IMG(3875082)] },
            tags: { type: "array", items: { type: "string" }, example: ["bib", "organic cotton"] },
            specifications: { type: "array", items: { type: "object", properties: { label: { type: "string" }, value: { type: "string" } } }, example: [{ label: "Pack", value: "5 bibs" }] },
            isFeatured: { type: "boolean", example: false },
        },
    },
};
