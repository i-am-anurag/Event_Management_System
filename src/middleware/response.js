const asyncHandler = require("../utils/async-handler");

const SuccessResponse = (data) => {
    return {
        success: true,
        message: "Operation complete successfully",
        data,
        error: {},
    }
};

const FailureResponse = (error) => {
    return {
        success: false,
        message: "something went wrong",
        data: {},
        error: error.message,
    }
};

const responses = asyncHandler(async (req, res, next) => {
    res.OK = (data) => {
        const resBody = SuccessResponse(data);
        return res.status(200).json(resBody);
    };

    res.CREATED = (data) => {
        const resBody = SuccessResponse(data);
        return res.status(201).json(resBody);
    }

    res.BADREQUEST = (error) => {
        const resBody = FailureResponse(error);
        return res.status(400).json(resBody);
    }

    res.APPERROR = (error) => {
        const resBody = FailureResponse(error);
        return res.status(500).json(resBody);
    }
    next();
});

module.exports = responses;