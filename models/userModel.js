const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 25
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    select: false
  },
  reviews: {
    type: Array,
    default: null
  },
  favourites: {
    type: Array,
    default: null
  }
});

module.exports = mongoose.model('User', userSchema);
