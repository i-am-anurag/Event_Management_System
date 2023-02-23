const express = require('express');
const {userControllers} = require('../controller/index');
const {AuthValidator} = require('../middleware/auth');

const router = express.Router();

router.post('/signup',AuthValidator,userControllers.signup);
router.post('/login',AuthValidator,userControllers.login);
router.post('/resetpassword',userControllers.resetPassword);
router.post("/changepassword", userControllers.changePassword);

module.exports = router;