const ApiError = require("../utils/ApiError");
const { createLogger } = require("../utils/requestContext");

const log = createLogger("validate");

// Runs a validator function against req.body / req.query / req.params.
// A validator returns { errors: [{ field, message }], value } — value is the cleaned data.
//
//   router.post("/signup", validate(signupValidator), controller.signup)
const validate = (validator, source = "body") => (req, res, next) => {
    const { errors, value } = validator(req[source] || {});

    if (errors.length) {
        log.debug({ errors }, `${validator.name}(${source}) failed: ${errors.length} error(s) → 400`);
        return next(
            ApiError.badRequest("VALIDATION_ERROR", errors[0].message, {
                field: errors[0].field,
                details: errors,
            })
        );
    }

    log.debug(`${validator.name}(${source}) passed`);
    if (source === "body") req.body = value; // replace with trimmed / cleaned values
    else req.validated = { ...(req.validated || {}), [source]: value };
    next();
};

module.exports = validate;
