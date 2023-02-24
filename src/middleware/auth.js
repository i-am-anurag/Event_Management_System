const jwt = require("jsonwebtoken");
const {JWT_KEY} = require('../config/serverConfig');
const {ErrorResponse} = require("../utils/response")
const {ServerErrorCodes,ClientErrorCodes} = require('../utils/status-code');
const {userService} = require('../services/index');

const AuthValidator = (req, res, next) => {
    if(!req.body.email||!req.body.password||!req.body.name) {
        ErrorResponse.error = "Somethig went wrong";
        ErrorResponse.message = "missing required parameter";
        return res.status(400).json(ErrorResponse);
    }
    
    next();
}

const checkValidUser = async(req,res,next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            throw {
                message: "Token is missing",
                statusCode: ClientErrorCodes.BAD_REQUESET
            };
        }
        const object = jwt.verify(token, JWT_KEY);
        const user = await userService.getUserById(object.id);
        if (!user) {
            throw {
                message: "No user exist for corrosponding token",
                statusCode: ClientErrorCodes.BAD_REQUESET,
            };
        }
        req.user = user;
        next();
    } catch (error) {
        ErrorResponse.err = "Token is not verified";
        ErrorResponse.message = error.message;
        const statusCode = error.statusCode || ServerErrorCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json(ErrorResponse);
    }
}

module.exports = {
    AuthValidator,
    checkValidUser,
}