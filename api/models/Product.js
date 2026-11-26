const mongoose = require("mongoose");
const toJSONPlugin = require("./plugins/toJSON.plugin");

const specSchema = new mongoose.Schema(
    { label: { type: String, required: true }, value: { type: String, required: true } },
    { _id: false }
);

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        description: { type: String, required: true, trim: true },
        brand: { type: String, trim: true, default: "Generic" },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        // One product can suit several ages, e.g. a teddy bear → infant, toddler, preschool
        ageGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: "AgeGroup" }],

        price: { type: Number, required: true, min: 0 }, // selling price (what the customer pays)
        mrp: { type: Number, required: true, min: 0 },   // original price (shown with a strike-through)
        currency: { type: String, default: "INR" },

        rating: { type: Number, min: 0, max: 5, default: 0 },
        reviewsCount: { type: Number, min: 0, default: 0 },
        stock: { type: Number, min: 0, default: 0 },

        thumbnail: { type: String, required: true }, // small image for cards
        images: [{ type: String }],                  // gallery for the detail page
        tags: [{ type: String, lowercase: true, trim: true }],
        specifications: [specSchema],
        isFeatured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Computed fields (not stored in DB, but included in JSON)
productSchema.virtual("discountPercentage").get(function () {
    if (!this.mrp || this.mrp <= this.price) return 0;
    return Math.round(((this.mrp - this.price) / this.mrp) * 100);
});
productSchema.virtual("inStock").get(function () {
    return this.stock > 0;
});

// Indexes make filtering & sorting fast
productSchema.index({ category: 1, price: 1 });
productSchema.index({ ageGroups: 1 });
productSchema.index({ title: "text", description: "text", brand: "text", tags: "text" });

productSchema.plugin(toJSONPlugin);

module.exports = mongoose.model("Product", productSchema);
