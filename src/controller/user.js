const {userService} = require('../services/index');
const { SuccessResponse} = require("../utils/response");
const asyncHandler = require('../utils/async-handler');

const signup = asyncHandler(async (req, res) => {
    const requestData = {...req.body};
    console.log(requestData);
    const responseRecord = await userService.signup({
            name: requestData.name,
            email: requestData.email,
            password: requestData.password,
        });
   
    return res.OK(responseRecord);
});

const login = asyncHandler(async (req, res) => {
    const {email,password} = req.body;
    const token = await userService.signin({email,password});
    
    return res.OK(token);
});

const resetPassword = asyncHandler(async(req, res) => {
    const requestData = {...req.body};
    const responseData = await userService.resetPassword(requestData.email);

    return res.OK(responseData);
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