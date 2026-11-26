const Product = require("../models/Product");

// Fill in the referenced documents (like a JOIN), but only the fields the frontend needs
const POPULATE = [
    { path: "category", select: "name slug image" },
    { path: "ageGroups", select: "name slug ageRange", options: { sort: { sortOrder: 1 } } },
];

const findMany = ({ filter = {}, sort = { createdAt: -1 }, skip = 0, limit = 12 }) =>
    Product.find(filter)
        .populate(POPULATE)
        .sort({ ...sort, _id: 1 }) // _id as tie-breaker → stable pagination
        .skip(skip)
        .limit(limit);

const count = (filter = {}) => Product.countDocuments(filter);

const findById = (id) => Product.findById(id).populate(POPULATE);
const findBySlug = (slug) => Product.findOne({ slug }).populate(POPULATE);

const findRelated = ({ categoryId, excludeId, limit = 4 }) =>
    Product.find({ category: categoryId, _id: { $ne: excludeId } })
        .populate(POPULATE)
        .sort({ rating: -1, _id: 1 })
        .limit(limit);

const existsBySlug = (slug, excludeId) =>
    Product.exists(excludeId ? { slug, _id: { $ne: excludeId } } : { slug });

const create = async (data) => (await Product.create(data)).populate(POPULATE);

const updateById = (id, data) =>
    Product.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate(POPULATE);

const deleteById = (id) => Product.findByIdAndDelete(id);

module.exports = { findMany, count, findById, findBySlug, findRelated, existsBySlug, create, updateById, deleteById };
