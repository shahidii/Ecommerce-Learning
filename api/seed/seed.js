// Seeds the database with categories, age groups, products and demo users.
//   pnpm seed            → wipe + insert fresh data
//   pnpm seed:destroy    → wipe everything
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env"), quiet: true });

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const logger = require("../config/logger");
const slugify = require("../utils/slugify");

const User = require("../models/User");
const Category = require("../models/Category");
const AgeGroup = require("../models/AgeGroup");
const Product = require("../models/Product");

const categories = require("./data/categories");
const ageGroups = require("./data/ageGroups");
const products = require("./data/products");
const users = require("./data/users");

const destroy = async () => {
    await Promise.all([User.deleteMany(), Category.deleteMany(), AgeGroup.deleteMany(), Product.deleteMany()]);
    logger.info("All users, categories, age groups and products removed");
};

const seed = async () => {
    await destroy();

    const createdCategories = await Category.insertMany(categories);
    const categoryIdBySlug = Object.fromEntries(createdCategories.map((c) => [c.slug, c._id]));

    const createdAgeGroups = await AgeGroup.insertMany(ageGroups);
    const ageGroupIdBySlug = Object.fromEntries(createdAgeGroups.map((a) => [a.slug, a._id]));

    // slug → ObjectId. A typo in the seed data should stop the seed, not save a broken product.
    const idFor = (map, slug, what, title) => {
        if (!map[slug]) throw new Error(`Unknown ${what} "${slug}" in product "${title}"`);
        return map[slug];
    };

    // Spread createdAt over past days so "sort=newest" gives a meaningful order
    const now = Date.now();
    const productDocs = products.map((product, index) => ({
        ...product,
        slug: slugify(product.title),
        category: idFor(categoryIdBySlug, product.category, "category", product.title),
        ageGroups: product.ageGroups.map((slug) => idFor(ageGroupIdBySlug, slug, "age group", product.title)),
        createdAt: new Date(now - index * 6 * 60 * 60 * 1000),
    }));
    await Product.insertMany(productDocs);

    const userDocs = await Promise.all(
        users.map(async (u) => ({
            ...u,
            password: await bcrypt.hash(u.password, 10),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=random&size=128`,
        }))
    );
    await User.insertMany(userDocs);

    logger.info(
        `Seeded ${createdCategories.length} categories, ${createdAgeGroups.length} age groups, ${productDocs.length} products, ${userDocs.length} users`
    );
    // Demo credentials are printed with console.log on purpose: the logger redacts "password" fields
    console.log("\nDemo accounts:");
    users.forEach((u) => console.log(`   ${u.role.padEnd(8)} ${u.email}  /  ${u.password}`));
};

(async () => {
    try {
        await connectDB();
        if (process.argv.includes("--destroy")) await destroy();
        else await seed();
    } catch (error) {
        logger.error({ err: error }, "Seeding failed");
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
})();
