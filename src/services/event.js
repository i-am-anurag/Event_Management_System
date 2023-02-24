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
    const eventRecord = await Event.find(userId);

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
module.exports = {
    createEvent,
    getAll,
    updateEventStatus,
}