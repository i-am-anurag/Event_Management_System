const express = require('express');
const {eventControllers} = require('../controller/index');
const {checkValidUser} = require('../middleware/auth');
const router = express.Router();

router.post('/create',checkValidUser,eventControllers.createEvent);
router.get('/',checkValidUser,eventControllers.getAllEvents);
router.get('/InvitationList',checkValidUser,eventControllers.getInvitationList);
router.patch('/eventresponse',checkValidUser,eventControllers.updateEventStatus);
router.patch('/updateevent/:id',checkValidUser,eventControllers.updateEvent);
router.delete('/:id',checkValidUser,eventControllers.deleteEvent);


module.exports = router;