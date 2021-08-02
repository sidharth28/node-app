'use strict';

const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login-controller');

router.route('/login').post(loginController.login);


module.exports = {
    router: router
};
