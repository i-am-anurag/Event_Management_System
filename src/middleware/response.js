const asyncHandler = require("../utils/async-handler");

const responses = asyncHandler(async (req, res, next) => {
    res.OK = (responseBody) => {
        return res.status(200).json(responseBody);
    };

    res.CREATED = (responseBody) => {
        return res.status(201).json(responseBody);
    }

    res.BADREQUEST = (responseBody) => {
        return res.status(400).json(responseBody);
    }

    res.APPERROR = (responseBody) => {
        return res.status(500).json(responseBody);
    }
    next();
});

module.exports = responses;