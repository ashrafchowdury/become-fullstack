import React, { useState } from "react";

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.name);

  const handleUpdate = () => {
    if (updatedText.trim() !== "") {
      updateTodo(todo._id, {
        ...todo,
        name: updatedText,
      });
      setIsEditing(false);
    }
  };

  return (
    <li className="w-full flex items-center border border-gray-300 p-2 rounded-md mt-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() =>
          updateTodo(todo._id, { ...todo, completed: !todo.completed })
        }
        className="mr-2"
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            className="border rounded-md p-2 flex-grow"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-3 text-sm py-2 ml-2 rounded-md"
          >
            S
          </button>
        </>
      ) : (
        <>
          <span className={todo.completed ? "line-through" : ""}>
            {todo.name}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="ml-auto bg-green-500 text-white text-sm px-3 py-2 rounded-md"
          >
            E
          </button>
          <button
            onClick={() => deleteTodo(todo._id)}
            className="ml-2 bg-red-500 text-white text-sm px-3 py-2 rounded-md"
          >
            D
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
