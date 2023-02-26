const express = require('express');
const {eventControllers} = require('../controller/index');
const {checkValidUser} = require('../middleware/auth');
const router = express.Router();

router.post('/create',checkValidUser,eventControllers.createEvent);
router.get('/',checkValidUser,eventControllers.getAllEvents);
router.patch('/eventresponse',checkValidUser,eventControllers.updateEventStatus);
// router.get('')


module.exports = router;