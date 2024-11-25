import { useEffect, useState } from "react";
import CoinGrid from "../components/CoinGrid";
import { useGetCryptocurrenciesQuery } from "../util/cryptocurrencyAPI";
import { IoMdSearch } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { HeroSectionProps } from "../components/HeroSection";
import { AnimatePresence, motion } from "framer-motion";

const Cryptocurrencies = () => {
  const { data, error, isLoading } = useGetCryptocurrenciesQuery({});
  const [searchParam, setSearchParam] = useState("");
  const [filteredCoins, setFilteredCoins] = useState<HeroSectionProps["coin"][]>([]);

  useEffect(() => {
    if (data?.data?.coins) {
      setFilteredCoins(data.data.coins);
    }
  }, [data]);

  useEffect(() => {
    if (data?.data?.coins) {
      const filtered = data.data.coins.filter((coin: HeroSectionProps["coin"]) => 
        coin.name.toLowerCase().includes(searchParam.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchParam.toLowerCase())
      );
      setFilteredCoins(filtered);
    }
  }, [searchParam, data]);

  const clearSearch = () => {
    setSearchParam("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="newtons-cradle">
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-gray-900 dark:text-white text-xl">
            A network error occurred...
          </p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Cryptocurrencies
            </h1>
            
            <div className="relative w-full sm:w-auto">
              <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-700">
                <IoMdSearch className="text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  className="ml-2 flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
                  placeholder="Search cryptocurrencies..."
                  value={searchParam}
                  onChange={(e) => setSearchParam(e.target.value)}
                />
                {searchParam && (
                  <button
                    onClick={clearSearch}
                    className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <MdCancel className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <AnimatePresence>
            <motion.div
              key="crypto-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredCoins.length > 0 ? (
                <CoinGrid coins={filteredCoins} gridSize="4" />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">
                    No cryptocurrencies found matching your search.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Cryptocurrencies;
