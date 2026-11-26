const Category = require("../models/Category");

// Every category with how many products it has (uses an aggregation "lookup" = SQL JOIN)
const findAllWithProductCount = () =>
    Category.aggregate([
        { $lookup: { from: "products", localField: "_id", foreignField: "category", as: "products" } },
        { $addFields: { id: { $toString: "$_id" }, productCount: { $size: "$products" } } },
        { $project: { _id: 0, __v: 0, products: 0 } },
        { $sort: { name: 1 } },
    ]);

const findById = (id) => Category.findById(id);
const findBySlug = (slug) => Category.findOne({ slug: slug.toLowerCase() });
const findIdsByNameLike = async (regex) => (await Category.find({ name: regex }).select("_id")).map((c) => c._id);

module.exports = { findAllWithProductCount, findById, findBySlug, findIdsByNameLike };
