const EventService = require('../services/event');
const {SuccessResponse} = require("../utils/response");
const asyncHandler = require('../utils/async-handler');

const createEvent = asyncHandler(async(req, res)=>{
    const requestData = { ...req.body,userId: req.user.id };
    // console.log(requestData);
    const response = await EventService.createEvent(requestData);
    
    return res.OK(response);
});

const getAllEvents = asyncHandler(async(req, res)=>{
    const requestData = {userId: req.user.id };
    const responseData = await EventService.getAll(requestData);
    const response = SuccessResponse(responseData, "Successfully fetch all events");

    return res.OK(response);
});

const updateEventStatus = asyncHandler(async(req, res)=>{
    console.log("requested user id is: ",req.user.id);
    const requestData = { ...req.body,userId: req.user.id };
    const response = await EventService.updateEventStatus(requestData);

    return res.OK(response);
});

const updateEvent = asyncHandler(async(req, res)=>{
    const RequestData = {...req.body,...req.params}
    const userId = req.user.id;
    const eventRecord = await EventService.updateEvent(RequestData.id,RequestData,userId);

    return res.OK(eventRecord);
});

const deleteEvent = asyncHandler(async (req, res) => {
    const RequestData = {...req.params}
    const userId = req.user.id;
    const eventRecord = await EventService.deleteEvent(RequestData.id,userId);

    return res.OK(eventRecord);
});

const getInvitationList = asyncHandler(async(req, res)=>{
    const userId = req.user.id;
    const eventRecord = await EventService.getInvitationList(userId);

    return res.OK(eventRecord);
});
module.exports = {
    createEvent,
    getAllEvents,
    updateEventStatus,
    updateEvent,
    deleteEvent,
    getInvitationList,
}