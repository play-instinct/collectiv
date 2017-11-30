const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {type: String},
  icon_url: {type: String, required: true},
  email: {type: String, required: true},
  website: {type: String},
});