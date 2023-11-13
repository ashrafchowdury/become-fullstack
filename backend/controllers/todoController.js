const TODO = require("../models/todoScema");

const getTodo = async (req, res) => {
  try {
    const data = await TODO.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};

const addTodo = async (req, res) => {
  try {
    const data = await TODO.insertMany({
      name: req.body.name,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
};

const updateTodo = async (req, res) => {
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
};

const deleteTodo = async (req, res) => {
  try {
    await TODO.findByIdAndDelete({
      _id: req.body.id,
    });
    const data = await TODO.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
};

module.exports = { getTodo, addTodo, updateTodo, deleteTodo };
