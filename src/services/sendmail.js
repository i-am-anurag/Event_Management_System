const sender = require('../config/email-config');
const {EMAIL_ID} = require('../config/serverConfig'); 

const sendEmail = async (data, email) => {
    try {
        const options = {
            subject: "Password reset OTP",
            from: EMAIL_ID,
            to: email,
            text: `Your OTP code is ${data.OTP}`,
        };
        const response = await sender.sendMail(options);
        
        return response;
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {
    sendEmail,
}