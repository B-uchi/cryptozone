import CryptoStats from "../components/CryptoStats";
import HeroSection from "../components/HeroSection";
import TopCoins from "../components/TopCoins";
import { useGetCryptocurrenciesQuery } from "../util/cryptocurrencyAPI";

const HomePage = () => {
  const { data, error, isLoading } = useGetCryptocurrenciesQuery({});
  const firstCoin = data?.data?.coins[0];
  const first10Coins = data?.data?.coins.slice(0, 12);
  const stats = data?.data?.stats;

  return (
    <div className="md:max-h-fit mt-0 flex relative w-full">
      {isLoading ? (
        <div className="newtons-cradle absolute left-[50%] top-[50vh]">
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>
      ) : error ? (
        <p className="text-black dark:text-white text-xl absolute left-[50%] translate-x-[-50%] top-[50vh]">
          A network error occured....
        </p>
      ) : (
        <div className="w-full p-2">
          <HeroSection coin={firstCoin} />
          <CryptoStats stats={stats} />
          <TopCoins coins={first10Coins} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
