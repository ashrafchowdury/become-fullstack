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

const orderSchema = new mongoose.Schema({
  items: [
    {
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
    },
  ],
  detaile: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  pay: {
    name: { type: String, required: true },
    number: { type: String, required: true },
    date: { type: String, required: true },
    cvc: { type: Number, required: true },
  },
});

// registaring the schema
const PRODUCTS = mongoose.model("Products", productSchema);
const CART = mongoose.model("Carts", cartSchema);
const ORDER = mongoose.model("Orders", orderSchema);

module.exports = { PRODUCTS, CART, ORDER };
