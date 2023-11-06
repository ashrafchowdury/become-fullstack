const express = require("express");
const app = express();
const { getDB, connectDB } = require("../../database/mongo/mongoDB");

// express middlwwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// databse connection
let database;
connectDB((error) => {
  if (!error) {
    app.listen(5000, () => console.log("Server Connected..."));
    database = getDB();
  }
});

// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.get("/products", async (req, res) => {
  try {
    const data = await database.collection("products");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error" });
  }
});

app.get("/cart", async (req, res) => {
  try {
    const data = await database.collection("carts");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.post("/cart", async (req, res) => {
  const product = req.body;
  try {
    const data = await database.collection("carts").insertMany({ ...product });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.delete("/cart", async (req, res) => {
  try {
    await database.collection("carts").deleteOne({ _id: req.body.id });
    const data = await database.collection("carts");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.post("/order", async (req, res) => {
  const order = req.body;
  try {
    const data = await database.collection("orders").insertMany({ ...order });
    order.items.map(
      async (item) =>
        await database.collection("carts").deleteOne({ _id: item?._id })
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});
