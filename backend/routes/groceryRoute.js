const express = require("express");
const {
  getAllProducts,
  getCartProducts,
  addNewProductToCart,
  deleteCartProduct,
  orderProducts,
} = require("../controllers/groceryController");
require("../database/mongo/groceryDB");
const router = express.Router();

// Routes
router.get("/products", getAllProducts);
router.get("/cart", getCartProducts);
router.post("/cart", addNewProductToCart);
router.delete("/cart", deleteCartProduct);
router.post("/order", orderProducts);

module.exports = router;
