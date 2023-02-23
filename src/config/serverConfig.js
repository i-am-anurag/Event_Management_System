const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

dotenv.config();

const connect = async () => {
    await mongoose.connect('mongodb://localhost/EventManagementSystem_db');
}

module.exports = {
    connect,
    PORT: process.env.PORT,
    JWT_KEY:process.env.JWT_KEY,
    EMAIL_ID:process.env.EMAIL_ID,
    EMAIL_PASS:process.env.EMAIL_PASS,
};