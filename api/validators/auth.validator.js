const { EMAIL_REGEX, URL_REGEX, isEmpty, isString } = require("./helpers");

// POST /auth/signup
const signupValidator = (body) => {
    const errors = [];
    const value = {
        name: isString(body.name) ? body.name.trim() : body.name,
        email: isString(body.email) ? body.email.trim().toLowerCase() : body.email,
        password: body.password,
        avatar: isString(body.avatar) ? body.avatar.trim() : undefined,
    };

    if (isEmpty(value.name)) errors.push({ field: "name", message: "Name is required" });
    else if (!isString(value.name) || value.name.length < 2 || value.name.length > 50)
        errors.push({ field: "name", message: "Name must be 2 to 50 characters" });

    if (isEmpty(value.email)) errors.push({ field: "email", message: "Email is required" });
    else if (!isString(value.email) || !EMAIL_REGEX.test(value.email))
        errors.push({ field: "email", message: "Please enter a valid email address" });

    if (isEmpty(value.password)) errors.push({ field: "password", message: "Password is required" });
    else if (!isString(value.password) || value.password.length < 6)
        errors.push({ field: "password", message: "Password must be at least 6 characters" });
    else if (!/[A-Za-z]/.test(value.password) || !/\d/.test(value.password))
        errors.push({ field: "password", message: "Password must contain at least one letter and one number" });

    if (value.avatar && !URL_REGEX.test(value.avatar))
        errors.push({ field: "avatar", message: "Avatar must be a valid http(s) URL" });

    return { errors, value };
};

// POST /auth/login
const loginValidator = (body) => {
    const errors = [];
    const value = {
        email: isString(body.email) ? body.email.trim().toLowerCase() : body.email,
        password: body.password,
    };

    if (isEmpty(value.email)) errors.push({ field: "email", message: "Email is required" });
    else if (!isString(value.email) || !EMAIL_REGEX.test(value.email))
        errors.push({ field: "email", message: "Please enter a valid email address" });

    if (isEmpty(value.password)) errors.push({ field: "password", message: "Password is required" });

    return { errors, value };
};

module.exports = { signupValidator, loginValidator };
