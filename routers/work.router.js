const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const {User} = require('../models/user');
const {Work} = require('../models/work');
const workRouter = express.Router();

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const {AWS_BUCKET} = require('../config/main')

const s3 = new AWS.S3();