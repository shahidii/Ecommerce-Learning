const Product = require("../models/Product");

const CATEGORY_FIELDS = "name slug image";

const findMany = ({ filter = {}, sort = { createdAt: -1 }, skip = 0, limit = 12 }) =>
    Product.find(filter)
        .populate("category", CATEGORY_FIELDS)
        .sort({ ...sort, _id: 1 }) // _id as tie-breaker → stable pagination
        .skip(skip)
        .limit(limit);

const count = (filter = {}) => Product.countDocuments(filter);

const findById = (id) => Product.findById(id).populate("category", CATEGORY_FIELDS);
const findBySlug = (slug) => Product.findOne({ slug }).populate("category", CATEGORY_FIELDS);

const findRelated = ({ categoryId, excludeId, limit = 4 }) =>
    Product.find({ category: categoryId, _id: { $ne: excludeId } })
        .populate("category", CATEGORY_FIELDS)
        .sort({ rating: -1, _id: 1 })
        .limit(limit);

const existsBySlug = (slug, excludeId) =>
    Product.exists(excludeId ? { slug, _id: { $ne: excludeId } } : { slug });

const create = async (data) => (await Product.create(data)).populate("category", CATEGORY_FIELDS);

const updateById = (id, data) =>
    Product.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate("category", CATEGORY_FIELDS);

const deleteById = (id) => Product.findByIdAndDelete(id);

module.exports = { findMany, count, findById, findBySlug, findRelated, existsBySlug, create, updateById, deleteById };
