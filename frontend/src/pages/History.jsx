import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);
  
  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8001/history"
      );

      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const clearHistory = async () => {
  await axios.delete(
    "http://127.0.0.1:8001/history"
  );

  setHistory([]);
};
  return (
    <div style={{ padding: "20px" }}>
      <h1>History</h1>
        <button
      onClick={clearHistory}
      style={{
        background: "red",
        color: "white",
        padding: "10px",
        border: "none",
        borderRadius: "5px",
        marginBottom: "20px"
      }}
    >
      Clear Database History
    </button>
      {history.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <p><b>ID:</b> {item.id}</p>
          <p><b>Prompt:</b> {item.prompt}</p>
          <p><b>Language:</b> {item.language}</p>
        </div>
      ))}
    </div>
  );
}

export default History;