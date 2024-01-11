import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="bg-[#fafafa]  dark:bg-[#000000] w-full">
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
