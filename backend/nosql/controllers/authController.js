const USER = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const client = require("../libs/redis");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
};

const getCurrentUser = async (req, res) => {
  const id = req.user._id;
  try {
    // get cached user data from redis
    const isCacheUser = await client.hgetall(`currentUser:${id}`);
    if (isCacheUser.email) {
      res.status(200).json(isCacheUser);
      return;
    }

    const data = await USER.findOne({ _id: id });
    // caching user data to redis
    await client.hset(`currentUser:${id}`, {
      _id: id,
      name: data.name,
      email: data.email,
      password: data.password,
    });
    await client.expire(`currentUser:${id}`, "900");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).end({ error: `User: ${error.message}` });
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

const logout = async (req, res) => {
  const userId = req.user._id;
  try {
    // expired user from redis
    await client.expire(`currentUser:${userId}`, 0);

    res.status(200).json("User has been logout successfully");
  } catch (error) {
    res.status(400).end("Something went wrong!");
  }
};

module.exports = { getCurrentUser, createAccount, login, logout };
