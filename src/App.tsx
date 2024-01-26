import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cryptocurrencies from "./pages/Cryptocurrencies";

function App() {
  return (
    <Router>
      <div className=" h-fit w-full">
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins" element={<Cryptocurrencies/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
