const express = require('express');
const response = require('../middleware/response');
const userRoutes = require('./user');
const eventRoutes = require('./event');

const router = express.Router();

router.use('/',response,userRoutes);
router.use('/user/event',response,eventRoutes);

module.exports = router