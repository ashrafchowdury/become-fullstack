import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";

const Todo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetch("/todos");
        const res = await data.json();
        setTodos(res);
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  // Function to add a new todo
  const addTodo = async (newTodo) => {
    try {
      const data = await fetch("/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const response = await data.json();
      setTodos([...todos, ...response]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Function to update a todo
  const updateTodo = async (id, updatedTodo) => {
    try {
      const data = await fetch("/todos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      const response = await data.json();
      setTodos(response);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Function to delete a todo
  const deleteTodo = async (id) => {
    const data = await fetch("/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const response = await data.json();
    setTodos(response);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-2xl mb-10">Todo List</h1>
      <AddTodo addTodo={addTodo} />
      <ul className=" w-[500px]">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default Todo;
