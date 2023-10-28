const express = require("express");
const app = express();
const PRODUCTS = require("../models/grocerySchema");

require("../db/groceryDB");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.get("/products", async (req, res) => {
  try {
    const data = await PRODUCTS.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.post("/cart", async (req, res) => {});

app.listen(5000, () => console.log("Server Connected..."));
