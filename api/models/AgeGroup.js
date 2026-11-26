const mongoose = require("mongoose");
const toJSONPlugin = require("./plugins/toJSON.plugin");

// "Shop by Age": Newborn (0–3 months), Infant (3–12 months), Toddler (1–3 years), Preschool (3–5 years)
const ageGroupSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },          // "Newborn"
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true }, // "newborn"
        ageRange: { type: String, required: true, trim: true },                    // "0–3 Months" (label for the UI)
        minMonths: { type: Number, required: true, min: 0 },                       // 0
        maxMonths: { type: Number, required: true, min: 0 },                       // 3
        description: { type: String, trim: true, default: "" },
        image: { type: String, trim: true, default: "" },
        sortOrder: { type: Number, default: 0 },                                   // youngest first
    },
    { timestamps: true }
);

ageGroupSchema.plugin(toJSONPlugin);

module.exports = mongoose.model("AgeGroup", ageGroupSchema);
