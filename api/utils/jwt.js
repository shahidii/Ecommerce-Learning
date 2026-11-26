const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateToken = (user) =>
    jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });

// Throws TokenExpiredError / JsonWebTokenError when the token is bad
const verifyToken = (token) => jwt.verify(token, env.JWT_SECRET);

module.exports = { generateToken, verifyToken };
