const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const validator = require("validator");
const bcrypt = require("bcrypt");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await USER.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(500).json({ error: "Authorization error" });
  }
};

const signupVlidation = async (req, res, next) => {
  const { email, password } = req.body;
  const isEmailExist = await USER.findOne({ email });

  if (isEmailExist) {
    res.status(400).json({ error: "User email already exist" });
  }
  if (!validator.isEmail(email)) {
    res.status(400).json({ error: "Invalid Email" });
  }
  if (!validator.isStrongPassword(password)) {
    res.status(400).json({ error: "Password is not strong enough" });
  }
  next();
};

const loginVlidation = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await USER.findOne({ email });

  if (!user) {
    res.status(400).json({ error: "Invalid Email" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(400).json({ error: "Invalid Password" });
  }

  req.data = user; // assign data to user object
  next();
};

module.exports = { authMiddleware, signupVlidation, loginVlidation };
