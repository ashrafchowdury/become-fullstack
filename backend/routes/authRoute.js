const express = require("express");
const cookieParser = require("cookie-parser");
const {
  getCurrentUser,
  createAccount,
  login,
  logout,
} = require("../controllers/authController");
require("../database/mongo/db");
const router = express.Router();

router.use(cookieParser());

// Routes
router.get("/api/auth/user", getCurrentUser);
router.post("/api/auth/signup", createAccount);
router.post("/api/auth/login", login);
router.post("/api/auth/logout", logout);

module.exports = router;
