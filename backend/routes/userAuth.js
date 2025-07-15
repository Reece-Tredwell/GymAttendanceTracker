const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuthController');

router.post('/register', userAuthController.register);

router.post('/registerHiddenLogic', userAuthController.registerHiddenLogic);

router.post('/login', userAuthController.login);

module.exports = router;