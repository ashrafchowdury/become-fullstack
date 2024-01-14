const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const {
  addProductReview,
  getProductReview,
} = require("../controllers/review.controller");
const router = express.Router();

// routes
router.get("/:productId", getProductReview);
router.post("/new-review", authMiddleware, addProductReview);

module.exports = router;
