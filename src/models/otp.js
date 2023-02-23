const mongoose = require('mongoose');
const { Schema } = mongoose;

const otpSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
  OTP: { type: String, required: true },
  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: '10m'
  }
});

module.exports = mongoose.model('Otp', otpSchema,'otp');
