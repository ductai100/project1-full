import { useEffect, useMemo, useState } from "react";

export default function App() {
  // ✅ gọi API qua Vercel proxy, không cần env
  const API = useMemo(() => "/api", []);

  const [student, setStudent] = useState({
    hoTen: "Nguyễn Đức Tài",
    mssv: "DH52201386",
    lop: "D22_TH09",
  });

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    const res = await fetch(`${API}/todos`);
    const data = await res.json();
    // cho đẹp: mới nhất lên đầu
    setTodos(Array.isArray(data) ? data.slice().reverse() : []);
  };

  useEffect(() => {
    loadTodos().catch(console.error);
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;

    setLoading(true);
    try {
      const res = await fetch(`${API}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: t }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Add failed");
        return;
      }
      const created = await res.json();

      // ✅ HIỂN THỊ NGAY, KHÔNG CẦN LOAD LẠI
      setTodos((prev) => [created, ...prev]);
      setTitle("");
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id) => {
    // ✅ update UI trước (nhanh)
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

    const res = await fetch(`${API}/todos/${id}/toggle`, { method: "PATCH" });
    if (!res.ok) {
      // nếu fail thì load lại cho chắc
      await loadTodos();
    }
  };

  const deleteTodo = async (id) => {
    // ✅ xóa ngay trên UI
    setTodos((prev) => prev.filter((t) => t.id !== id));

    const res = await fetch(`${API}/todos/${id}`, { method: "DELETE" });
    if (!res.ok) {
      await loadTodos();
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "system-ui" }}>
      <h1>Project 1 Fullstack</h1>

      <div style={{ marginBottom: 16 }}>
        <p>
          <b>Frontend:</b> Vercel
        </p>
        <p>
          <b>Backend + DB:</b> Render (proxy qua <code>/api</code>)
        </p>
      </div>

      <div style={{ marginBottom: 16 }}>
        <h3>Thông tin sinh viên</h3>
        <p><b>Họ tên:</b> {student.hoTen}</p>
        <p><b>MSSV:</b> {student.mssv}</p>
        <p><b>Lớp:</b> {student.lop}</p>
      </div>

      <hr />

      <h2>Todo (CRUD + Database)</h2>

      <form onSubmit={addTodo} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập task..."
          style={{ padding: 10, width: 320 }}
        />
        <button disabled={loading} type="submit">
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      <ul style={{ paddingLeft: 18 }}>
        {todos.map((t) => (
          <li key={t.id} style={{ marginBottom: 8 }}>
            <span
              onClick={() => toggleTodo(t.id)}
              style={{
                cursor: "pointer",
                textDecoration: t.done ? "line-through" : "none",
                marginRight: 10,
              }}
              title="Click để toggle done"
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
