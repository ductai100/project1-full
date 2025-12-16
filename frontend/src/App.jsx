import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/hello`)
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Project 1 Fullstack</h1>
      <p>
        Backend: {import.meta.env.VITE_API_URL}
      </p>
      <p><b>Ho Ten:</b>Nguyen Duc Tai</p>
      <p><b>MSSV:</b>DH52201386</p>
      <p><b>Lop:</b>D22_TH09</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
