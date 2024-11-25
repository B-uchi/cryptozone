import CryptoStats from "../components/CryptoStats";
import HeroSection from "../components/HeroSection";
import TopCoins from "../components/TopCoins";
import NewsCarousel from "../components/NewsCarousel";
import { useGetCryptocurrenciesQuery } from "../util/cryptocurrencyAPI";
import { AnimatePresence, motion } from "framer-motion";
import useFetchNews from "../util/useFetchNews";

const HomePage = () => {
  const { data, error, isLoading } = useGetCryptocurrenciesQuery({});
  const [newsdata, isLoadingNews, errorNews] = useFetchNews();

  const firstCoin = data?.data?.coins[0];
  const first10Coins = data?.data?.coins.slice(0, 12);
  const stats = data?.data?.stats;

  return (
    <div className="md:max-h-fit mt-0 flex relative w-full">
      {isLoading || isLoadingNews ? (
        <div className="newtons-cradle absolute left-[50%] top-[50vh]">
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>
      ) : error || errorNews ? (
        <p className="text-black dark:text-white text-sm md:text-xl absolute left-[50%] translate-x-[-50%] top-[50vh]">
          A network error occured....
        </p>
      ) : (
        <AnimatePresence>
          <motion.div
            key={'HomePage'}
            initial={{ x: -1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full p-2"
          >
            <HeroSection coin={firstCoin} />
            <CryptoStats stats={stats} />
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl text-center font-bold text-gray-900 dark:text-white mb-4">Latest News</h2>
              {newsdata && <NewsCarousel news={newsdata.slice(0, 5)} />}
            </div>
            <TopCoins coins={first10Coins} />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default HomePage;
