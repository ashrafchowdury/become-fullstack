const express = require("express");
const app = express();
const TODO = require("./models/todoScema");
require("./db/todoDB");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello");
  res.status(200).json({ message: "success" });
});

app.get("/todos", async (req, res) => {
  try {
    const data = await TODO.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    // res.status(400).json({ message: "error" });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const data = await TODO.insertMany({
      name: req.body.name,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.put("/todos", async (req, res) => {
  try {
    const ddd = await TODO.findByIdAndUpdate(
      req.body._id,
      { name: req.body.name },
      { new: true }
    );
    const data = await TODO.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.delete("/todos", async (req, res) => {
  try {
    await TODO.findByIdAndDelete({
      _id: req.body.id,
    });
    const data = await TODO.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.listen(5000, () => console.log("Server Connected..."));
