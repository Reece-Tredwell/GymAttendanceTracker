const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuthController');

router.post('/register', userAuthController.register);

router.post('/login', userAuthController.login);

router.post('/createSessionToken', userAuthController.createSessionToken);

router.post('/getSessionToken', userAuthController.getSessionToken);


module.exports = router;