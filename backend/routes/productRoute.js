const express = require("express");
const {
  getAllProducts,
  getCartProducts,
  addNewProductToCart,
  deleteCartProduct,
  orderProducts,
  addNewProducts,
} = require("../controllers/productController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Routes
router.get("/all-products", getAllProducts);
router.use(authMiddleware);
router.post("/add-product", addNewProducts);
router.get("/all-carts", getCartProducts);
router.post("/add-cart", addNewProductToCart);
router.delete("/delete-cart/:productId", deleteCartProduct);
router.post("/order-product", orderProducts);

module.exports = router;
