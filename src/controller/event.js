const EventService = require('../services/event');
const {SuccessResponse} = require("../utils/response");
const asyncHandler = require('../utils/async-handler');

const createEvent = asyncHandler(async(req, res)=>{
    const requestData = { ...req.body,userId: req.user._id };
    // console.log(requestData);
    const responseData = await EventService.createEvent(requestData);
    console.log(responseData);
    const response = SuccessResponse(responseData, "Successfully created a new event");

    return res.OK(response);
});

const getAllEvents = asyncHandler(async(req, res)=>{
    const requestData = {userId: req.user._id };
    // console.log(requestData);
    const responseData = await EventService.getAll(requestData);
    const response = SuccessResponse(responseData, "Successfully fetch all events");

    return res.OK(response);
});

const updateEventStatus = asyncHandler(async(req, res)=>{
    console.log("requested user id is: ",req.user._id);
    const requestData = { ...req.body,userId: req.user._id };
    const responseData = await EventService.updateEventStatus(requestData);
    const response = SuccessResponse(responseData, "sucessfuly accept events");
    
    return res.OK(response);
})
module.exports = {
    createEvent,
    getAllEvents,
    updateEventStatus,
}