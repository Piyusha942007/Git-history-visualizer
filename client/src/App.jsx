import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  const [repoData, setRepoData] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home setRepoData={setRepoData} />} />
        <Route
          path="/dashboard"
          element={<Dashboard repoData={repoData} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;