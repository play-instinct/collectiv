const express = require('express');
const Users = require('../models/user.model');
const config = require('../config/main');

const userRouter = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

userRouter.use(bodyParser.urlencoded({extended: false}));
userRouter.use(passport.initialize());
require('../config/passport')(passport);

mongoose.Promise = global.Promise;
const {User} = require('../models/user');