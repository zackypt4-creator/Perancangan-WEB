import { useEffect, useState } from "react";
import "./index.css";

const API_URL = "http://localhost:3000/api";

function App() {
  const emptyForm = {
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    due_date: "",
  };

  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const response = await fetch(`${API_URL}/todos`);
    const result = await response.json();
    setTodos(result.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveTodo = async (e) => {
    e.preventDefault();

    if (editingId) {
      await fetch(`${API_URL}/todos/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    }

    setForm(emptyForm);
    setEditingId(null);

    getTodos();
  };

  const editTodo = (todo) => {
    setEditingId(todo.id);

    setForm({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      status: todo.status,
      due_date: todo.due_date,
    });
  };

  const deleteTodo = async (id) => {
    if (!window.confirm("Delete this todo?")) return;

    await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });

    getTodos();
  };

  return (
    <div className="container">
      <h1>Todo List</h1>

      <form onSubmit={saveTodo}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <select name="priority" value={form.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select name="status" value={form.status} onChange={handleChange}>
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <input
          type="date"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
        />

        <button type="submit">{editingId ? "Update Todo" : "Add Todo"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id}>
              <td>{index + 1}</td>

              <td>
                <strong>{todo.title}</strong>
                <br />
                <small>{todo.description}</small>
              </td>

              <td>{todo.priority}</td>

              <td>{todo.status}</td>

              <td>{todo.due_date}</td>

              <td>
                <button className="edit" onClick={() => editTodo(todo)}>
                  Edit
                </button>

                <button className="delete" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
