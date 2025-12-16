import { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/api/todos")
      .then(res => res.json())
      .then(setTodos);
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: text })
    });
    const todo = await res.json();
    setTodos([todo, ...todos]);
    setText("");
  };

  const removeTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Project 1 Fullstack</h1>

      <h3>Thông tin sinh viên</h3>
      <p><b>Họ tên:</b> Nguyễn Đức Tài</p>
      <p><b>MSSV:</b> DH52201386</p>
      <p><b>Lớp:</b> D22_TH09</p>

      <h3>Todo (CRUD + Database)</h3>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(t => (
          <li key={t.id}>
            {t.title}
            <button onClick={() => removeTodo(t.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
c