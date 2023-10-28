const mongoose = require("mongoose");

// We'er using mongoose to create schema for MongoDB
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
});

// registaring the schema
const PRODUCTS = mongoose.model("Products", productSchema);

module.exports = PRODUCTS;
