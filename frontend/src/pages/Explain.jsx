import { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

function Explain() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");

  const explainCode = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8001/explain",
        {
    code: code
  }
      );

      setResponse(res.data.explanation);
    } catch (error) {
      setResponse("Error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Explain Code</h1>

      <Editor
        height="200px"
        defaultLanguage="python"
        value={code}
        onChange={(value) => setCode(value || "")}
      />

      <br />

      <button
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  onClick={explainCode}
>
  Explain Code
</button>

      <br /><br />

      <Editor
        height="300px"
        defaultLanguage="markdown"
        value={response}
        options={{ readOnly: true }}
      />
    </div>
  );
}

export default Explain;