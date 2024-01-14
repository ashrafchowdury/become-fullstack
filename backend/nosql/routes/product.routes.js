const express = require("express");
const {
  getAllProducts,
  getCartProducts,
  addNewProductToCart,
  deleteCartProduct,
  addNewProducts,
  searchProducts,
  productRecomendation,
} = require("../controllers/product.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

// Global Routes
router.get("/all-products", getAllProducts);
router.post("/recomendation", productRecomendation);
router.get("/search", searchProducts);

// Auth middleware
router.use(authMiddleware);

// Protected routes
router.post("/add-product", addNewProducts);
router.get("/all-carts", getCartProducts);
router.post("/add-cart", addNewProductToCart);
router.delete("/delete-cart/:productId", deleteCartProduct);

module.exports = router;
