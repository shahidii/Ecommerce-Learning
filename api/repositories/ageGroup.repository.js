const AgeGroup = require("../models/AgeGroup");

// Every age group with how many products it has, youngest first
const findAllWithProductCount = () =>
    AgeGroup.aggregate([
        { $lookup: { from: "products", localField: "_id", foreignField: "ageGroups", as: "products" } },
        { $addFields: { id: { $toString: "$_id" }, productCount: { $size: "$products" } } },
        { $project: { _id: 0, __v: 0, products: 0 } },
        { $sort: { sortOrder: 1, minMonths: 1 } },
    ]);

const findById = (id) => AgeGroup.findById(id);
const findBySlug = (slug) => AgeGroup.findOne({ slug: slug.toLowerCase() });
const countByIds = (ids) => AgeGroup.countDocuments({ _id: { $in: ids } });
const findIdsByNameLike = async (regex) =>
    (await AgeGroup.find({ $or: [{ name: regex }, { slug: regex }] }).select("_id")).map((a) => a._id);

module.exports = { findAllWithProductCount, findById, findBySlug, countByIds, findIdsByNameLike };
