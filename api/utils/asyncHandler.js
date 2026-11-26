// Wraps an async controller so thrown errors go to the error middleware.
// Without this, every controller would need its own try/catch.
// (Express 5 already forwards rejected promises, but this keeps the intent explicit.)
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
