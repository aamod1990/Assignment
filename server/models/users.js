const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String
  }
})

const Users = mongoose.model('users', UserSchema)

module.exports = Users;