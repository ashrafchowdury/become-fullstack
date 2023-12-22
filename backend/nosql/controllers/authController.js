const USER = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const client = require("../libs/redis");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
};

const getCurrentUser = async (req, res) => {
  try {
    const id = req.user._id;
    const isCacheUser = await client.get(`currentUser:${id}`);
    if (isCacheUser) {
      res.status(200).json([]);
      return;
    }
    const data = await USER.findOne({ _id: id });
    await client.set(`currentUser:${id}`, data);
    await client.expire(`currentUser:${id}`, 3000);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: `User: ${error.message}` });
  }
};

const createAccount = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // create hash password
    const slat = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, slat);
    // create new user
    const data = await USER.create({ name, email, password: hash });
    const token = createToken(data._id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: `Signup: ${error.message}` });
  }
};

const login = async (req, res) => {
  try {
    const token = createToken(req.data._id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: `Login: ${error.message}` });
  }
};

module.exports = { getCurrentUser, createAccount, login };
