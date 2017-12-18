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


//POST request for new registration of a user to /api/user
userRouter.post('/user', jsonParser, (req, res) => {
  const requiredKeys = ["username", "email", "password", "user"];
  requiredKeys.forEach( key => {
    if(!(key in req.body)) {
      const message = {message:`Please fill out all required fields.  Missing ${key} in request body, please try again.`};
      return res.status(400).json(message);
    }
  });
  User.create({
    userName: req.body.username,
    userEmail: req.body.email,
    password: req.body.password,
    joinDate: Date.now(),
    avatar: req.body.avatar
  })
  .then(() => {
    const message = {message:`Successfully created user ${req.body.username}`};
    return res.status(200).json(message)
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({message: 'Sorry, something went wrong, please try again...'});
  })
});