const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuthController');

router.post('/register', userAuthController.register);

router.post('/registerHiddenLogic', userAuthController.registerHiddenLogic);

router.post('/login', userAuthController.login);

router.post('/loginHiddenLogic', userAuthController.loginHiddenLogic);

router.post('/CreateSessionToken', userAuthController.CreateSessionToken);

router.post('/CreateSessionTokenHiddenLogic', userAuthController.CreateSessionTokenHiddenLogic);

router.post('/getSessionToken', userAuthController.getSessionToken);

router.post('/getSessionTokenHiddenLogic', userAuthController.getSessionTokenHiddenLogic);

module.exports = router;