import React, { useState } from "react";

function AddTodo({ addTodo }) {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      addTodo({
        name: newTodo,
        completed: false,
      });
      setNewTodo("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-6">
      <input
        type="text"
        placeholder="Add a new todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="border rounded-md p-3 w-[440px]"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-3 ml-2 rounded-md"
      >
        Add
      </button>
    </form>
  );
}

export default AddTodo;
