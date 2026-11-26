const mongoose = require("mongoose");
const toJSONPlugin = require("./plugins/toJSON.plugin");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true, select: false }, // never returned unless asked with .select("+password")
        avatar: { type: String, trim: true },
        role: { type: String, enum: ["customer", "admin"], default: "customer" },
    },
    { timestamps: true } // adds createdAt & updatedAt
);

userSchema.plugin(toJSONPlugin);

module.exports = mongoose.model("User", userSchema);
