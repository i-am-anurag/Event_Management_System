const asyncHandler = (fn) => (req, res, next) => {
    const controllerFunction = fn(req, res, next);
    Promise.resolve(controllerFunction).catch(next);
}

module.exports = asyncHandler;