import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cryptocurrencies from "./pages/Cryptocurrencies";
import News from "./pages/News";
import CoinDetails from "./pages/CoinDetails";
import Exchanges from "./pages/Exchanges";

function App() {
  return (
    <Router>
      <div className=" h-fit w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins" element={<Cryptocurrencies />} />
          <Route path="/news" element={<News />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/coins/:uuid" element={<CoinDetails />} />
          <Route path="/exchanges" element={<Exchanges />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
