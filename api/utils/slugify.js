// "Men's Classic Shirt (Blue)" → "mens-classic-shirt-blue"
const slugify = (text = "") =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

module.exports = slugify;
