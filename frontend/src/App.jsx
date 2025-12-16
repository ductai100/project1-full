import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [student, setStudent] = useState(null);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const load = async () => {
    const s = await fetch(`${API}/api/student`).then(r => r.json());
    const t = await fetch(`${API}/api/todos`).then(r => r.json());
    setStudent(s);
    setTodos(t);
  };

  useEffect(() => { load(); }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    if (!res.ok) return alert("Thêm thất bại");
    setTitle("");
    await load();
  };

  const toggleTodo = async (id) => {
    await fetch(`${API}/api/todos/${id}/toggle`, { method: "PATCH" });
    await load();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/api/todos/${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div style={{ padding: 40, fontFamily: "system-ui" }}>
      <h1>Project 1 Fullstack</h1>
      <p><b>Backend:</b> {API}</p>

      {student && (
        <div style={{ margin: "16px 0" }}>
          <p><b>Họ tên:</b> {student.hoTen}</p>
          <p><b>MSSV:</b> {student.mssv}</p>
          <p><b>Lớp:</b> {student.lop}</p>
        </div>
      )}

      <hr />

      <h2>Todo (CRUD + Database)</h2>
      <form onSubmit={addTodo} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập task..."
          style={{ padding: 10, width: 280 }}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(t => (
          <li key={t.id} style={{ marginBottom: 8 }}>
            <span
              onClick={() => toggleTodo(t.id)}
              style={{
                cursor: "pointer",
                textDecoration: t.done ? "line-through" : "none",
                marginRight: 10
              }}
            >
              #{t.id} {t.title}
            </span>
            <button onClick={() => deleteTodo(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
