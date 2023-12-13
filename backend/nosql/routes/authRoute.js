const express = require("express");
const {
  getCurrentUser,
  createAccount,
  login,
} = require("../controllers/authController");
const {
  authMiddleware,
  signupVlidation,
  loginVlidation,
} = require("../middlewares/authMiddleware");
const router = express.Router();

// Routes
router.get("/user", authMiddleware, getCurrentUser);
router.post("/signup", signupVlidation, createAccount);
router.post("/login", loginVlidation, login);

module.exports = router;
