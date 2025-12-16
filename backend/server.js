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
// API ROUTES
// =======================

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend is running!" });
});

// Simple API
app.get("/api/hello", (req, res) => {
  res.json({ msg: "Hello from Render backend 🚀" });
});

// DATABASE API
app.get("/api/db", (req, res) => {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    const data = JSON.parse(raw);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
