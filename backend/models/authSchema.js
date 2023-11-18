const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

// We'er using mongoose to create schema for MongoDB
const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
authSchema.statics.signup = async function (name, email, password) {
  const isEmailExist = await this.findOne({ email });

  if (isEmailExist) {
    throw Error("User email already exist");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const slat = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, slat);

  const user = await this.create({ name, email, password: hash });
  return user;
};

// static signin method
authSchema.statics.signin = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid Email");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid Passeord");
  }

  return user;
};

// registaring the schema
const AUTH = mongoose.model("Users", authSchema);

module.exports = AUTH;
