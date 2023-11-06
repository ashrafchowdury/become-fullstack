const express = require("express");
const app = express();
const { PRODUCTS, CART, ORDER } = require("../../models/mongo/grocerySchema");
require("../../database/mongo/groceryDB");

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

app.get("/cart", async (req, res) => {
  try {
    const data = await CART.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.post("/cart", async (req, res) => {
  const product = req.body;
  try {
    const data = await CART.insertMany({ ...product });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.delete("/cart", async (req, res) => {
  try {
    await CART.findByIdAndDelete({
      _id: req.body.id,
    });
    const data = await CART.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.post("/order", async (req, res) => {
  const order = req.body;
  try {
    const data = await ORDER.insertMany({ ...order });
    order.items.map(
      async (item) => await CART.findByIdAndDelete({ _id: item?._id })
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.listen(5000, () => console.log("Server Connected..."));
