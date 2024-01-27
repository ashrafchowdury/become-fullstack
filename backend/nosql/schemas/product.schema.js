const mongoose = require("mongoose");

// We'er using mongoose to create schema for MongoDB
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  cetagory: { type: String, required: true },
  keywords: { type: Array, required: true },
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number, default: 1 },
    },
  ],
  orderDate: { type: Date, default: Date.now },
  total: { type: Number, default: 0 },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  delivaryTime: { type: Date, required: false },
});

// registaring the schema
const PRODUCTS = mongoose.model("Products", productSchema);
const CART = mongoose.model("Carts", cartSchema);
const ORDER = mongoose.model("Orders", orderSchema);

module.exports = { PRODUCTS, CART, ORDER };
