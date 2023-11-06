const mongoose = require("mongoose");

// We'er using mongoose to create schema for MongoDB
const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// registaring the schema
const AUTH = mongoose.model("Auth", authSchema);

module.exports = AUTH;