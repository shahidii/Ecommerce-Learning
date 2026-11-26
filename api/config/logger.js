// App-wide logger (pino).
//   development → pretty, coloured, human-readable lines (pino-pretty)
//   production  → one JSON object per line (fast; easy for log tools like Datadog, Loki, CloudWatch)
//
// Usage:
//   const logger = require("../config/logger");
//   logger.info("Server started");
//   logger.info({ userId }, "User logged in");      // extra fields first, message second
//   logger.error({ err }, "Payment failed");         // pass errors as { err } to get the stack
//
// Levels (lowest → highest): trace, debug, info, warn, error, fatal
// NOTE: reads process.env directly (not config/env.js) so env.js can use the logger too.
const pino = require("pino");

const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = NODE_ENV === "production";
const isTest = NODE_ENV === "test";

const canPrettyPrint = (() => {
    try {
        require.resolve("pino-pretty"); // dev dependency, missing on `pnpm install --prod`
        return true;
    } catch {
        return false;
    }
})();

const logger = pino({
    level: process.env.LOG_LEVEL || (isProduction ? "info" : isTest ? "silent" : "debug"),
    base: { service: "shopnest-api", env: NODE_ENV },
    timestamp: pino.stdTimeFunctions.isoTime,

    // Never write secrets to logs
    redact: {
        paths: [
            "req.headers.authorization",
            "req.headers.cookie",
            "password",
            "*.password",
            "token",
            "*.token",
        ],
        censor: "[REDACTED]",
    },

    // Human-readable output while developing
    transport:
        !isProduction && canPrettyPrint
            ? {
                  target: "pino-pretty",
                  options: {
                      colorize: true,
                      translateTime: "SYS:HH:MM:ss",
                      // req/res details are already in the message line → hide them in dev
                      ignore: "pid,hostname,service,env,req,res,responseTime,reqId,layer",
                      // Flow logs get an arrow + layer name:  "   ↳ service: Hashing password"
                      messageFormat: "{if layer}   ↳ {layer}: {end}{msg}",
                      singleLine: false,
                  },
              }
            : undefined,
});

module.exports = logger;
