import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white p-4 flex gap-6">
      <Link to="/">Generate</Link>
      <Link to="/refactor">Refactor</Link>
      <Link to="/explain">Explain</Link>
      <Link to="/debug">Debug</Link>
      <Link to="/history" style={{ color: "white" }}>
  History
</Link>
    </nav>
  );
}

export default Navbar;