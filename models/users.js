const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    maxlength: 6,
    trim: true,
    enum: ['Male', 'Female', 'male', 'female']
  },
  age: {
    type: Number,
    min: 1,
    max: 120
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
    trim: true
  },
});

module.exports = mongoose.model('users', userSchema);



