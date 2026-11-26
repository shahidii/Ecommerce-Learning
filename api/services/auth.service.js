// Service = business logic. No req/res here — just plain inputs and outputs.
//
// Log levels used in services:
//   debug → step-by-step flow (visible in development, for learning)
//   info  → important business events (visible in production too)
//   warn  → suspicious things worth noticing (e.g. failed logins)
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const { generateToken } = require("../utils/jwt");
const { createLogger } = require("../utils/requestContext");
const userRepository = require("../repositories/user.repository");

const log = createLogger("service");
const SALT_ROUNDS = 10;

const defaultAvatar = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=128`;

const signup = async ({ name, email, password, avatar }) => {
    log.debug("authService.signup: checking if email is already registered");
    const exists = await userRepository.existsByEmail(email);
    if (exists) {
        log.debug("Email already registered → 409 EMAIL_EXISTS");
        throw ApiError.conflict("EMAIL_EXISTS", "An account with this email already exists", { field: "email" });
    }

    log.debug(`Email is free. Hashing password with bcrypt (${SALT_ROUNDS} salt rounds)`);
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    log.debug(`Saving user${avatar ? "" : " with a generated avatar"}`);
    const user = await userRepository.create({
        name,
        email,
        password: hashedPassword,
        avatar: avatar || defaultAvatar(name),
    });

    log.debug("Generating JWT for the new user");
    const token = generateToken(user);

    log.info({ userId: user.id }, "New user signed up");
    return { user, token };
};

const login = async ({ email, password }) => {
    log.debug("authService.login: finding user by email (including the hashed password)");
    const user = await userRepository.findByEmailWithPassword(email);

    if (!user) {
        log.debug("No user with this email");
    } else {
        log.debug("User found. Comparing password with bcrypt.compare()");
    }

    // Same message for "no user" and "wrong password" → attackers can't guess which emails exist
    const isMatch = user && (await bcrypt.compare(password, user.password));
    if (!isMatch) {
        log.warn({ userId: user?.id || null }, "Failed login attempt → 401 INVALID_CREDENTIALS");
        throw ApiError.unauthorized("INVALID_CREDENTIALS", "Invalid email or password");
    }

    log.debug(`Password correct. Generating JWT (role: ${user.role})`);
    const token = generateToken(user);

    log.info({ userId: user.id, role: user.role }, "User logged in");
    return { user, token };
};

module.exports = { signup, login };
