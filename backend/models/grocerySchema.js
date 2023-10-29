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

const cartSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
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
  quantity: {
    type: Number,
    required: true,
  },
});

// registaring the schema
const PRODUCTS = mongoose.model("Products", productSchema);
const CART = mongoose.model("Carts", cartSchema);

module.exports = { PRODUCTS, CART };
