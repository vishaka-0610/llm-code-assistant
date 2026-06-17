import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>LLM Code Assistant</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Link to="/">
          <button>Generate Code</button>
        </Link>

        <Link to="/refactor">
          <button>Refactor Code</button>
        </Link>

        <Link to="/explain">
          <button>Explain Code</button>
        </Link>

        <Link to="/debug">
          <button>Debug Code</button>
        </Link>
      </div>

      {/* Add Statistics Card Here */}
      <div
        style={{
          marginTop: "30px",
          border: "1px solid gray",
          padding: "20px"
        }}
      >
        <h2>Project Features</h2>

        <ul>
          <li>Code Generation</li>
          <li>Code Refactoring</li>
          <li>Code Explanation</li>
          <li>Code Debugging</li>
          <li>SQLite History</li>
        </ul>
      </div>

    </div>
  );
}

export default Home;