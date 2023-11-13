const express = require("express");
const cookieParser = require("cookie-parser");
const {
  getCurrentUser,
  createAccount,
  login,
  logout,
} = require("../controllers/authController");
require("../database/mongo/authDB");
const router = express.Router();

router.use(cookieParser());

// Routes
router.get("/user", getCurrentUser);
router.post("/signup", createAccount);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
