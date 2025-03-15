// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Must be a valid email address
    match: [
      /^\S+@\S+\.\S+$/,
      'Please use a valid email address.'
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long'],
    // Must include uppercase, lowercase, digit, special char
    match: [
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}/,
      'Password must include uppercase, lowercase, number, and special character.'
    ]
  },
  profilePic: {
    type: String,
    default: '/images/default.png'
  },
  bio: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('User', UserSchema);
