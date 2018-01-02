const express = require('express');
const User = require('../models/user.model');
const config = require('../config/main');

const userRouter = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

userRouter.use(bodyParser.urlencoded({extended: false}));


