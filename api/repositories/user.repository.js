// Repository = the ONLY layer that talks to the database for users.
// Services call these functions; they never use the Mongoose model directly.
const User = require("../models/User");

const create = (data) => User.create(data);
const findById = (id) => User.findById(id);
const findByEmail = (email) => User.findOne({ email: email.toLowerCase() });
const findByEmailWithPassword = (email) => User.findOne({ email: email.toLowerCase() }).select("+password");
const existsByEmail = (email) => User.exists({ email: email.toLowerCase() });

module.exports = { create, findById, findByEmail, findByEmailWithPassword, existsByEmail };
