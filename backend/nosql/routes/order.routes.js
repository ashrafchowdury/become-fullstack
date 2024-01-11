const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const {
  orderProducts,
  orderHistory,
  paymentIntent,
} = require("../controllers/order.controller");
const router = express.Router();

// middlewares
router.use(authMiddleware);

// routes
router.get("/create-payment-intent", paymentIntent);
router.post("/checkout", orderProducts);
router.get("/history", orderHistory);

module.exports = router;
