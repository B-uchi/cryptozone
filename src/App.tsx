import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cryptocurrencies from "./pages/Cryptocurrencies";
import News from "./pages/News";
import CoinDetails from "./pages/CoinDetails";

function App() {
  return (
    <Router>
      <div className=" h-fit w-full">
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins" element={<Cryptocurrencies/>} />
            <Route path="/news" element={<News/>} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
            <Route path="/coins/:id" element={<CoinDetails/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
