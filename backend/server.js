// Helpers to read/write JSON DB
function readDB() {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}
function writeDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

// Student info
app.get("/api/student", (req, res) => {
  const db = readDB();
  res.json(db.student);
});

// GET todos
app.get("/api/todos", (req, res) => {
  const db = readDB();
  res.json(db.todos || []);
});

// POST todo
app.post("/api/todos", (req, res) => {
  const { title } = req.body || {};
  if (!title || !title.trim()) return res.status(400).json({ error: "title is required" });

  const db = readDB();
  db.todos = db.todos || [];

  const nextId = db.todos.length ? Math.max(...db.todos.map(t => t.id)) + 1 : 1;
  const todo = { id: nextId, title: title.trim(), done: false };

  db.todos.push(todo);
  writeDB(db);

  res.status(201).json(todo);
});

// DELETE todo
app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const db = readDB();
  const before = (db.todos || []).length;

  db.todos = (db.todos || []).filter(t => t.id !== id);
  if (db.todos.length === before) return res.status(404).json({ error: "not found" });

  writeDB(db);
  res.json({ ok: true });
});

// TOGGLE done
app.patch("/api/todos/:id/toggle", (req, res) => {
  const id = Number(req.params.id);
  const db = readDB();
  const todo = (db.todos || []).find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: "not found" });

  todo.done = !todo.done;
  writeDB(db);
  res.json(todo);
});
