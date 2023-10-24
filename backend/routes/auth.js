const express = require("express");
const app = express();
const AUTH = require("../models/authSchema");
const cookieParser = require("cookie-parser");
require("../db/authDB");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.get("/user", async (req, res) => {
  try {
    const cookieValue = req.cookies.auth;
    if (cookieValue) {
      const data = await AUTH.findOne({ email: cookieValue });
      res.status(200).json(data);
    } else {
      res.status(200).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkExsistence = await AUTH.findOne({ email: email });
    if (!checkExsistence) {
      const data = await AUTH.insertMany({
        name: name,
        email: email,
        password: password,
      });
      res.cookie("auth", data[0].email, { maxAge: 60 * 60 * 1000 });
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: "User already exsist" });
    }
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await AUTH.findOne({ email: email, password: password });
    if (data) {
      res.cookie("auth", data.email, { maxAge: 60 * 60 * 1000 });
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: "Something went wrong!" });
    }
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.post("/logout", async (req, res) => {
  try {
    const { email } = req.body;
    res.cookie("auth", email, { expires: new Date(0) });
    res.status(200).json({ message: "User Logout Succcessfully" });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});
app.listen(5000, () => console.log("Server Connected..."));
