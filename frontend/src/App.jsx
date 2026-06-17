import { BrowserRouter, Routes, Route } from "react-router-dom";
import History from "./pages/History";
import Navbar from "./components/Navbar";
import Generate from "./pages/Generate";
import Refactor from "./pages/Refactor";
import Explain from "./pages/Explain";
import Debug from "./pages/Debug";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Generate />} />
        <Route path="/refactor" element={<Refactor />} />
        <Route path="/explain" element={<Explain />} />
        <Route path="/debug" element={<Debug />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;