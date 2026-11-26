// Entry point: load env → connect DB → start HTTP server
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env"), quiet: true });

const mongoose = require("mongoose");
const logger = require("../config/logger");
const env = require("../config/env");
const connectDB = require("../config/db");
const app = require("./app");

const start = async () => {
    await connectDB();

    // Express 5 passes listen errors (e.g. port already in use) to this callback
    const server = app.listen(env.PORT, (error) => {
        if (error) {
            const hint = error.code === "EADDRINUSE" ? ` → port ${env.PORT} is already used (is another server running?)` : "";
            logger.fatal({ err: error }, `Could not start server: ${error.message}${hint}`);
            process.exit(1);
        }
        logger.info(`Server listening on port ${env.PORT} (${env.NODE_ENV})`);
        logger.info(`API:     ${env.API_BASE_URL}/api`);
        logger.info(`Swagger: ${env.API_BASE_URL}/api/docs`);
    });

    // Graceful shutdown: finish open requests, close DB, then exit
    const shutdown = (signal) => {
        logger.info(`${signal} received, shutting down...`);
        server.close(async () => {
            await mongoose.connection.close();
            logger.info("Server and database closed. Bye 👋");
            process.exit(0);
        });
        setTimeout(() => process.exit(1), 10000).unref(); // force exit if stuck
    };
    process.on("SIGINT", () => shutdown("SIGINT"));   // Ctrl + C
    process.on("SIGTERM", () => shutdown("SIGTERM")); // hosting platforms (Render, Railway, Docker...)
};

// Last-resort safety nets: log the crash instead of dying silently
process.on("unhandledRejection", (reason) => {
    logger.fatal({ err: reason }, "Unhandled promise rejection");
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    logger.fatal({ err }, "Uncaught exception");
    process.exit(1);
});

start();
