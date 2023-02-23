const Event = require('../models/event');
const {codeGenerator} = require('../utils/helper');

const createEvent = async(data)=>{
    console.log("This is my data",data);
    const eventCode = await codeGenerator();
    data.eventCode = eventCode;
    const eventRecord = await Event.create(data);

    return eventRecord;
}

const getAll = async(userId) => {
    const eventRecord = await Event.find(userId);

    return eventRecord;
}

const sendEventDetais = async (email) => {
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

// const deleteEvent = async(eventId,userId)=>{
//     const response = await Event.delete(eventId,userId);
// }

//how many types to get an event means by name , by ID OR all event
// const updateEvent = async(eventId,userId)=>{
    //If I will update an event, then the updated event will be send via email to user?
    //Can the event creator update the event after the reminder has been sent?
    //how the max user work on the concurenncy 

// }

module.exports = {
    createEvent,
    getAll,
}