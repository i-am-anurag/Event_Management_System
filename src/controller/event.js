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
    console.log(`User all events are :${responseData}`);
    const response = SuccessResponse(responseData, "Successfully fetch all events");
    
    return res.OK(response);
});


module.exports = {
    createEvent,
    getAllEvents,
}