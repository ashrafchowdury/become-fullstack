const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  addProductReview,
  getProductReview,
} = require("../controllers/reviewController");
const router = express.Router();

// middlewares
router.use(authMiddleware);

// routes
router.get("/:productId", getProductReview);
router.post("/new-review", addProductReview);

module.exports = router;
