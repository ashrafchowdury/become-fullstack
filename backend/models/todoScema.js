const mongoose = require("mongoose");

// We'er using mongoose to create schema for MongoDB
const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// registaring the schema
const TODO = mongoose.model("Todos", todoSchema);

module.exports = TODO;
