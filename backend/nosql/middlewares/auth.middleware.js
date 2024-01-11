const IP = require("ip");
const jwt = require("jsonwebtoken");
const USER = require("../schemas/user.schema");
const validator = require("validator");
const bcrypt = require("bcrypt");
const client = require("../libs/redis");

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
  // if (!validator.isStrongPassword(password)) {
  //   res.status(400).json({ error: "Password is not strong enough" });
  // }
  next();
};

const loginVlidation = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await USER.findOne({ email });

    if (!user) {
      throw new Error("Invalid Email");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Invalid Password");
    }

    req.data = user; // assign data to user object
    next();
  } catch (error) {
    res.status(500).end("Something went wrong: loginVlidation");
  }
};

const maxTry = async (req, res, next) => {
  const clientIp = IP.address();
  try {
    const hasTried = await client.hget(`maxtry:${clientIp}`, "request");

    // login try for first time
    if (hasTried === null) {
      await client.hset(`maxtry:${clientIp}`, { ip: clientIp, request: 1 });
      await client.expire(`maxtry:${clientIp}`, 480);
      next();
      return;
    }

    // max try 5 times and 8 minute
    if (hasTried >= 5) {
      throw new Error("You have reached your limit please try again later");
    }

    // after first try every try will increament by 1
    await client.hincrby(`maxtry:${clientIp}`, "request", 1);
    next();
  } catch (error) {
    res.status(500).end("Something went wrong: maxTry");
  }
};

module.exports = { authMiddleware, signupVlidation, loginVlidation, maxTry };
