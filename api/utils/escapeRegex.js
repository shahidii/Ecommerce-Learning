// Makes user input safe to use inside a RegExp (so "c++" or "(" do not crash the search)
const escapeRegex = (text = "") => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = escapeRegex;
