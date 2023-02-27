const jwt = require("jsonwebtoken");
const {JWT_KEY} = require('../config/serverConfig');
const ErrorResponse = require("../utils/error");
const ErrorCodes = require('../utils/status-code');
const {userService} = require('../services/index');
const asyncHandler = require("../utils/async-handler");

const AuthValidator = (req, res, next) => {
    if(!req.body.email||!req.body.password||!req.body.name)
        throw new ErrorResponse("missing required parameters",ErrorCodes.BAD_REQUESET);
        
    next();
}

const checkValidUser = asyncHandler(async(req,res,next) => {
        const token = req.headers['x-access-token'];
        if (!token) {
            throw new ErrorResponse("Token is missing",ErrorCodes.BAD_REQUESET);
        }
        const object = jwt.verify(token, JWT_KEY);
        const user = await userService.getUserById(object.id);
        if (!user) {
            throw new ErrorResponse("No user Exist for corresponding Token",ErrorCodes.BAD_REQUESET);
        }
        req.user = user;
        next();
})

module.exports = {
    AuthValidator,
    checkValidUser,
}