const AUTH = require("../models/authSchema");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
};

const getCurrentUser = async (req, res) => {
  try {
    const id = req.user._id;
    const data = await AUTH.findOne({ _id: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createAccount = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const data = await AUTH.signup(name, email, password);
    const token = createToken(data._id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await AUTH.signin(email, password);
    const token = createToken(data._id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getCurrentUser, createAccount, login };
