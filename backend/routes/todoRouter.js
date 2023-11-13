const express = require("express");
const {
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
require("../database/mongo/todoDB");
const router = express.Router();

// Routes
router.get("/todos", getTodo);
router.post("/todos", addTodo);
router.put("/todos", updateTodo);
router.delete("/todos", deleteTodo);

module.exports = router;
