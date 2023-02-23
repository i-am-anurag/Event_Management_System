const User = require('../models/user');
const Otp = require('../models/otp');
const {sendEmail} = require('../services/sendmail');
const ErrorResponse = require('../utils/error');
const {ClientErrorCodes} = require('../utils/status-code');

const getUserByEmail = async(email)=>{
    const user = await User.findOne({email});

    return user;
}

const getUserById = async (userId) => {
    const user = await User.findById(userId);
    
    return user;
}

const signup = async(data)=>{
    const user = await User.create(data);
    
    return user;
}

const signin = async(data)=>{
    const userRecord = await getUserByEmail(data.email);
    if(!userRecord) {
        throw new ErrorResponse('User Not Found',
            ClientErrorCodes.NOT_FOUND);
    }
    if(!userRecord.comparePassword(data.password)) {
        throw new ErrorResponse('Incorrect Password',
        ClientErrorCodes.BAD_REQUESET);
    }
    const token = userRecord.genJWT();

    return token;
}

const resetPassword = async (email) => {
    const userRecord = await getUserByEmail(email);
    const userId = userRecord._id;
    if(!userRecord) {
        throw new ErrorResponse('User Not Found',
        ClientErrorCodes.NOT_FOUND);
    }
    const OTP = Math.floor(100000 + Math.random() * 900000);
    const otp = new Otp({ userId, OTP });
    otp.save();

    sendEmail(otp, email).then((response) => {
        console.log("OTP sent successfully");
    });

    return true;
}

const changePassword = async(otp,userId,newPassword) => {
    const otpRecord = await Otp.findOne({userId: userId });
    if(otpRecord.OTP!==otp)
        throw new ErrorResponse('OTP not match',
            ClientErrorCodes.BAD_REQUESET);
            
    const userRecord = await User.findByIdAndUpdate(userId, { password: newPassword }, { new: true,runValidators: true });
    userRecord.save();

    return userRecord;
}


module.exports = {
    signin,
    signup,
    getUserById,
    resetPassword,
    changePassword,
}