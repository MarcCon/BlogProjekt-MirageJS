import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Funktion zum Abrufen aller To-Dos beim Initialisieren der Komponente
  useEffect(() => {
    fetch("/api/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data.todos));
  }, []);

  // Funktion zum Hinzufügen eines neuen To-Dos
  const addTodo = () => {
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newTodo, isCompleted: false }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data.todo]);
        setNewTodo(""); // Setze das Eingabefeld zurück
      });
  };

  // Funktion zum Löschen eines To-Dos
  const deleteTodo = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };
  return (
    <div class="app">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Neues To-Do hinzufügen"
      />
      <button onClick={addTodo}>Hinzufügen</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Löschen</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
