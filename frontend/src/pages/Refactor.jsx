import { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

function Refactor() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");

  const refactorCode = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8001/refactor",
        {
          code: code
        }
      );

      setResponse(res.data.refactored_code);
    } catch (error) {
      setResponse("Error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Refactor Code</h1>

      <Editor
        height="200px"
        defaultLanguage="python"
        value={code}
        onChange={(value) => setCode(value || "")}
      />

      <br />

      <button
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  onClick={refactorCode}
>
  Refactor Code
</button>

      <br />
      <br />

      <Editor
        height="300px"
        defaultLanguage="python"
        value={response}
        options={{
          readOnly: true,
        }}
      />
    </div>
  );
}

export default Refactor;