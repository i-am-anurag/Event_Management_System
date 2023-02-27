const Event = require('../models/event');
const User = require('../models/user');
const {getUserById} = require('./user')
const {codeGenerator} = require('../utils/helper');
const ErrorResponse = require('../utils/error');
const ErrorCodes = require('../utils/status-code');
const { use } = require('../config/email-config');

const createEvent = async(data)=>{
    const eventCode = await codeGenerator();
    data.eventCode = eventCode;
    // console.log("This is my data",data);
    const eventRecord = await Event.create(data);

    // data.invitedUsers.forEach(async(invitedUser)=>{
    //     const userRecord= await User.findById(invitedUser.user);
    //     userRecord.invitedEventId.push({eventCode:eventCode,},
    //         {userId:eventRecord.userId});
    //     userRecord.save();
    // });
    
    return eventRecord;
}

const getAll = async(userId) => {
    const eventRecord = await Event.find(userId).populate('invitedUsers.user').lean();
    return eventRecord;
}


const updateEventStatus = async(data) => {
    const {eventCode,status,userId} = data;
    const eventRecord = await Event.findOne({eventCode:eventCode});
    console.log(eventRecord);
    if(!eventRecord) {
        throw new ErrorResponse('Incorrect Event code',
            ErrorCodes.BAD_REQUESETBAD_REQUESET);
    }
    const invitedUsers = eventRecord.invitedUsers;
    invitedUsers.forEach(async(invitedUsers)=>{
        if(invitedUsers.user.equals(userId)) {
            invitedUsers.status = status;
            invitedUsers.respondTime = new Date();
            await eventRecord.save();

            return invitedUsers;
        }

        throw new ErrorResponse('You are not invited for Event',ErrorCodes.UNAUTHORIZED);
    });

}
// const sendMailUser = async (email,eventCode) => {
//     const userRecord = await userService.getUserByEmail(email);
//     const userId = userRecord._id;
//     if(!userRecord) {
//         throw new ErrorResponse('User Not Found',
//         ErrorCodesNOT_FOUND);
//     }

//     const eventRecord = await Event.findOne({eventCode: eventCode});
//     return true;
// }

const deleteEvent = async(eventId,userId) => {
    const eventRecord = await Event.findOneAndDelete(
        {
            _id: eventId,
            userId: userId,
        },
    );

    if(!eventRecord)
        throw new ErrorResponse("No record found",ErrorCodes.BAD_REQUESET);

    const deleteUseIds = eventRecord.invitedUsers.map(user =>user._id);
    await User.deleteMany(
        {_id:{$in: deleteUseIds}},
        { $pull: { invitedEventId: { userId: userId } } }
    );

    return true;
}

//how many types to get an event means by name , by ID OR all event
const updateEvent = async(eventId,data,userId) => {
    const eventRecord = await Event.findOneAndUpdate(
        {
            _id: eventId,
            userId: userId,
        },
        data,
        {new:true}
    );

    if(!eventRecord)
        throw new ErrorResponse("No record found",ErrorCodes.BAD_REQUESET);
    
    return eventRecord;
}

// const getInvitationList = async(userId)=> {
//     const userRecord = await User.findById(userId);
//     if(!userRecord)
//         throw new ErrorResponse("No User found",ErrorCodes.BAD_REQUESET);
//     const eventRecord = userRecord.invitedEventId;

//     return eventRecord;
// }

const getInvitationList = async(userId)=> {
    const eventRecord = await Event.find({ invitedUsers: { $elemMatch: { user: userId } } }).populate("userId");

    return eventRecord;
}

module.exports = {
    createEvent,
    getAll,
    updateEventStatus,
    updateEvent,
    deleteEvent,
    getInvitationList,
}