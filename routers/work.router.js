const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const {Work} = require('../models/work.model');
const workRouter = express.Router();

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const {AWS_BUCKET} = require('../config/main')

const s3 = new AWS.S3();


const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET,
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, {
                fieldName: file.fieldname
            });
        },
        key: function(req, file, cb) {
            cb(null, file.originalname);
        }
    })
});



workRouter.post('/',
  jsonParser,
  upload.fields(
        [{
            name: 'imgFile',
            maxCount: 1
        }]
    ),
  (req, res) => {
  Work
  .create({
    full_size_url: (function() {
      if (req.files && req.files.imgFile) {
        return req.files.imgFile[0].location
      }
      else {
        return "/img/no-image.jpg"
      }
    })()
  })
  .then((result) => {
    const message = {message:`Successfully added ${req.files.imgFile[0].location}`};
    return res.status(200).json(message);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({message: 'Something went wrong, unable to create'});
  })
});


module.exports = {workRouter};
