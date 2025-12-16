import { useEffect, useState } from "react";

const API =
  import.meta.env.VITE_API_URL || "https://project1-full.onrender.com";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/hello`)
      .then((res) => res.json())
      .then(setData)
      .catch((e) => setData({ error: String(e) }));
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Project 1 Fullstack</h1>
      <p><b>Backend:</b> {API}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
