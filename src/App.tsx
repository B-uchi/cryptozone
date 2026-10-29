import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shell from "./components/Shell";
import Overview from "./pages/Overview";
import Market from "./pages/Market";
import Watchlist from "./pages/Watchlist";
import CoinDetail from "./pages/CoinDetail";
import News from "./pages/News";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Overview />} />
          <Route path="coins" element={<Market />} />
          <Route path="coins/:uuid" element={<CoinDetail />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="news" element={<News />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
