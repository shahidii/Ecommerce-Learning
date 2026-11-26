const util = require("util");
const mongoose = require("mongoose");
const env = require("./env");
const logger = require("./logger");
const { createLogger } = require("../utils/requestContext");

const dbLog = createLogger("db");

// Hide the password when printing a connection string
const mask = (uri) => uri.replace(/\/\/([^:/]+):([^@]+)@/, "//$1:****@");

const tryConnect = async (uri, label) => {
    const conn = await mongoose.connect(uri, {
        dbName: env.MONGODB_DB_NAME,     // database name (Atlas URIs usually don't include one)
        serverSelectionTimeoutMS: 10000, // give up after 10s instead of hanging
    });
    logger.info(`MongoDB connected (${label}) → ${conn.connection.host} / db "${conn.connection.name}"`);
    return conn;
};

// Log every MongoDB query Mongoose sends (only when the "debug" level is on).
// Shows students the REAL database query behind each request, e.g.
//   ↳ db: products.find({ category: ObjectId('...'), price: { '$gte': 1000 } }, { sort: { price: 1 }, limit: 12 })
const logQueries = () => {
    if (!logger.isLevelEnabled("debug")) return;
    mongoose.set("debug", (collection, method, ...args) => {
        const printed = args
            .map((arg) => util.inspect(arg, { depth: 4, breakLength: Infinity, compact: true }))
            .join(", ")
            .replace(/\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}/g, "[HASHED_PASSWORD]") // never log bcrypt hashes
            .replace(/, Symbol\(mongoose#\w+\): \w+/g, ""); // hide Mongoose internals
        const short = printed.length > 400 ? `${printed.slice(0, 400)}… (${printed.length} chars)` : printed;
        dbLog.debug(`${collection}.${method}(${short})`);
    });
};

// 1. Try MongoDB Atlas (cloud)  2. Fall back to local MongoDB
const connectDB = async () => {
    logQueries();
    if (env.MONGODB_URI) {
        try {
            return await tryConnect(env.MONGODB_URI, "Atlas");
        } catch (error) {
            logger.error(`MongoDB Atlas connection failed: ${error.message}`);
            if (!env.MONGO_URI_LOCAL) process.exit(1);
            logger.warn(`Falling back to local MongoDB: ${mask(env.MONGO_URI_LOCAL)}`);
        }
    }

    try {
        return await tryConnect(env.MONGO_URI_LOCAL, "local");
    } catch (error) {
        logger.fatal(`Local MongoDB connection failed: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
