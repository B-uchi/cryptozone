import CryptoStats from "../components/CryptoStats";
import HeroSection from "../components/HeroSection";
import TopCoins from "../components/TopCoins";
import { useGetCryptocurrenciesQuery } from "../services/cryptocurrencyAPI";

const HomePage = () => {
  const { data, error, isLoading } = useGetCryptocurrenciesQuery({});
  const firstCoin = data?.data?.coins[0];
  const first10Coins = data?.data?.coins.slice(0, 10);
  const stats = data?.data?.stats;
  console.log(first10Coins)
  return (
    <div className="md:h-[100vh] flex relative w-full">
      {isLoading ? (
        <div className="newtons-cradle absolute left-[50%] top-[50%]">
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>
      ) : (
        <div className="w-full p-2">
          <HeroSection coin={firstCoin} />
          <CryptoStats stats={stats}/>
          <TopCoins coins={first10Coins}/>
        </div>
      )}
    </div>
  );
};

export default HomePage;
