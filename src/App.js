import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

    // Styling
    const style = {
      color: "rgba(0, 0, 0, 0.233)",
      textDecoration: "line-through",
    };

  function getTodos() {
    axios
      .get("http://localhost:5000/todos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getTodos();
  }, []);

  async function addTodo() {
    await axios.post("http://localhost:5000/todos", {
      task: todo,
    });
    getTodos();
  }

  async function deleteTodo(id) {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    getTodos();
  }

  async function complete(id) {
    const todo = todos.find((todo) => todo.id === id);
    await axios.patch(`http://localhost:5000/todos/${id}`, {
      completed: !todo.completed,
    });

    getTodos();
  }

  function handleChange(e) {
    setTodo(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTodo("");
  }

 

  return (
    <div className="bodyDiv">
      <h1>My Todo List</h1>
      <div className="formDiv">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            name="text"
            placeholder="Write a to do.."
          ></input>
          <button onClick={() => addTodo(todo)}>Add</button>
        </form>
      </div>

      <ul>
        {todos.map((todo) => (
          <div key={todo.id} className="todoDiv">
            <li>
              <input
                className="checkbox"
                type="checkbox"
                onChange={() => complete(todo.id)}
                checked={todo.completed || false}
              />
             <h5 style={todo.completed ? style : undefined}>{todo.task}</h5>
              
              <button
                className="deleteButton"
                onClick={() => deleteTodo(todo.id)}
              >
                x
              </button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
