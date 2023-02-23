const {userService} = require('../services/index');
const { SuccessResponse} = require("../utils/response");
const asyncHandler = require('../utils/async-handler');

const signup = asyncHandler(async (req, res) => {
    const requestData = {...req.body};
    const responseRecord = await userService.signup({
            name: requestData.name,
            email: requestData.email,
            password: requestData.password,
        });
    const response = SuccessResponse(responseRecord, "Successfully created a new account");
    return res.OK(response);
});

const login = asyncHandler(async (req, res) => {
    const {email,password} = req.body;
    const token = await userService.signin({email,password});
    const response = SuccessResponse(token, "User LoggedIn sucessfully");

    return res.OK(response);
});

const resetPassword = asyncHandler(async(req, res) => {
    const requestData = {...req.body};
    const responseData = await userService.resetPassword(requestData.email);
    const response = SuccessResponse(responseData, "User Request sent sucessfully");

    return res.OK(response);
});

const changePassword = async(req, res) => {
    const requestData = {...req.body };
    const responseData = await userService.changePassword(requestData.OTP, requestData.userId, requestData.password);   
    const response = SuccessResponse(responseData, "Password updated sucessfully");

    return res.OK(response);
}


module.exports = {
    signup,
    login,  
    resetPassword,
    changePassword,
}