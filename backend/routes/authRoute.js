const express = require("express");
const {
  getCurrentUser,
  createAccount,
  login,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Routes
router.get("/user", authMiddleware, getCurrentUser);
router.post("/signup", createAccount);
router.post("/login", login);

module.exports = router;
