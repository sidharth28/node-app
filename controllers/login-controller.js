"use strict";

const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');





const login = async (req, res) => {
    const methodName = "[login] : ";
    

    try {
        res.json({success: true});
    } catch (e) {
       comsole.log(e);
    }

};



module.exports = {
    login: login
};
