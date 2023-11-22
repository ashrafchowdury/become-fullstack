const mongoose = require("mongoose");

// We'er using mongoose to create schema for MongoDB
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: { type: Array },
  order: { type: Array },
});

// registaring the schema
const USER = mongoose.model("Users", userSchema);

module.exports = USER;
