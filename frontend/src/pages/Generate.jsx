import { useState, useEffect } from "react";


import axios from "axios";
import Editor from "@monaco-editor/react";

function Generate() {
  
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [language, setLanguage] = useState("python");
  const [history, setHistory] = useState([]);
  useEffect(() => {
  const savedHistory = localStorage.getItem("history");

  if (savedHistory) {
    setHistory(JSON.parse(savedHistory));
  }
}, []);
useEffect(() => {
  localStorage.setItem(
    "history",
    JSON.stringify(history)
  );
}, [history]);
  const copyCode = () => {
  navigator.clipboard.writeText(response);
  alert("Code copied!");
};
  const downloadCode = () => {
  const element = document.createElement("a");

  const file = new Blob([response], {
    type: "text/plain",
  });

  const extensionMap = {
    python: "py",
    java: "java",
    cpp: "cpp",
    javascript: "js",
  };

  element.href = URL.createObjectURL(file);

  element.download = `generated_code.${extensionMap[language]}`;

  document.body.appendChild(element);
  element.click();
};

const clearHistory = () => {
  localStorage.removeItem("history");
  setHistory([]);
};
  const generateCode = async () => {
    try {
      const res = await axios.post(
  "http://127.0.0.1:8001/generate",
  {
    prompt: prompt,
    language: language,
  }
);
 const result = res.data.response;

    setResponse(result);

    setHistory(prev => [
      ...prev,
      {
        prompt,
        response: result
      }
    ]);
      console.log(res.data);
setResponse(res.data.response);
    } catch (error) {
      setResponse(
        error.response?.data?.error || error.message
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Generate Code</h1>
<select
  value={language}
  onChange={(e) => setLanguage(e.target.value)}
>
  <option value="python">Python</option>
  <option value="java">Java</option>
  <option value="cpp">C++</option>
  <option value="javascript">JavaScript</option>
</select>

<br /><br />
      <Editor
        height="200px"
        defaultLanguage="python"
        value={prompt}
        onChange={(value) => setPrompt(value || "")}
      />

      <br />

      <button
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  onClick={generateCode}
>
  Generate Code
</button>

      <br />
      <br />

      <Editor
        height="300px"
        defaultLanguage={language}
        value={response}
        options={{
          readOnly: true,
        }}
      />
      <h2>History</h2>

{history.map((item, index) => (
  <div
    key={index}
    style={{
      border: "1px solid gray",
      padding: "10px",
      marginTop: "10px"
    }}
  >
    <p><strong>Prompt:</strong> {item.prompt}</p>
  </div>
))}
      <button
  onClick={copyCode}
  style={{
    marginTop: "10px",
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "5px"
  }}
>
  📋 Copy Code
</button>
<button
  onClick={downloadCode}
  style={{
    marginLeft: "10px",
    padding: "10px",
    background: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px"
  }}
>
  ⬇ Download
</button>
<button
  onClick={clearHistory}
  style={{
    background: "red",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    marginTop: "10px"
  }}
>
  Clear History
</button>
    </div>
  );
}

export default Generate;