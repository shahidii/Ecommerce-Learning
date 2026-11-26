const mongoose = require("mongoose");
const toJSONPlugin = require("./plugins/toJSON.plugin");

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        description: { type: String, trim: true, default: "" },
        image: { type: String, trim: true, default: "" },
    },
    { timestamps: true }
);

categorySchema.plugin(toJSONPlugin);

module.exports = mongoose.model("Category", categorySchema);
