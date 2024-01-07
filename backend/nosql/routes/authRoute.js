const express = require("express");
const {
  getCurrentUser,
  createAccount,
  login,
  logout,
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
router.delete("/logout", authMiddleware, logout);

module.exports = router;
