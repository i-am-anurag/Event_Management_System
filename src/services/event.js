const Event = require('../models/event');
const User = require('../models/user');
const {codeGenerator} = require('../utils/helper');
const ErrorResponse = require('../utils/error');
const {ClientErrorCodes} = require('../utils/status-code');

const createEvent = async(data)=>{
    const eventCode = await codeGenerator();
    data.eventCode = eventCode;
    // console.log("This is my data",data);
    const eventRecord = await Event.create(data);

    data.invitedUsers.forEach(async(invitedUser)=>{
        const userRecord= await User.findById(invitedUser.user);
        userRecord.invitedEventId.push({eventCode});
        userRecord.save();
    });

    return eventRecord;
}

const getAll = async(userId) => {
    const eventRecord = await Event.find(userId).populate('invitedUsers.user');
    return eventRecord;
}


const updateEventStatus = async(data) => {
    const {eventCode,status,userId} = data;
    const eventRecord = await Event.findOne({eventCode:eventCode});
    console.log(eventRecord);
    if(!eventRecord) {
        throw new ErrorResponse('Incorrect Event code',
            ClientErrorCodes.BAD_REQUESET);
    }
    const invitedUsers = eventRecord.invitedUsers;
    invitedUsers.forEach(async(invitedUsers)=>{
        if(invitedUsers.user.equals(userId)) {
            invitedUsers.status = status;
            await eventRecord.save();

            return invitedUsers;
        }
    })

}
// const sendMailUser = async (email,eventCode) => {
//     const userRecord = await userService.getUserByEmail(email);
//     const userId = userRecord._id;
//     if(!userRecord) {
//         throw new ErrorResponse('User Not Found',
//         ClientErrorCodes.NOT_FOUND);
//     }

//     const eventRecord = await Event.findOne({eventCode: eventCode});
//     return true;
// }

const deleteEvent = async(eventId,userId)=>{
    const response = await Event.delete(eventId,userId);
}

//how many types to get an event means by name , by ID OR all event
// const updateEvent = async(eventId,userId)=>{
    //If I will update an event, then the updated event will be send via email to user?
    //Can the event creator update the event after the reminder has been sent?
    //how the max user work on the concurenncy 

// }

module.exports = {
    createEvent,
    getAll,
    updateEventStatus,
}