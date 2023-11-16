const express = require("express");
const {
  getAllProducts,
  getCartProducts,
  addNewProductToCart,
  deleteCartProduct,
  orderProducts,
  addNewProducts,
} = require("../controllers/groceryController");
require("../database/mongo/db");
const router = express.Router();

// Routes
router.get("/api/products", getAllProducts);
router.post("/api/addproduct", addNewProducts);
router.get("/api/cart", getCartProducts);
router.post("/api/cart", addNewProductToCart);
router.delete("/api/cart", deleteCartProduct);
router.post("/api/order", orderProducts);

module.exports = router;
