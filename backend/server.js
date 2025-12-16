const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// =======================
// DATABASE (JSON FILE)
// =======================
const DB_PATH = path.join(__dirname, "data.json");

// =======================
// API
// =======================
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend is running!" });
});

app.get("/api/db", (req, res) => {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    res.json(JSON.parse(raw));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// SERVE FRONTEND (VITE BUILD)
// =======================
const FRONTEND_DIST = path.join(__dirname, "../frontend/dist");
app.use(express.static(FRONTEND_DIST));

app.get("/*", (req, res) => {
  res.sendFile(path.join(FRONTEND_DIST, "index.html"));
});


// =======================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
