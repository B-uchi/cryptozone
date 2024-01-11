import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="bg-[#fafafa] h-[100vh] dark:bg-[#000000] w-full">
        <Navbar />
        <div className="p-3">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
