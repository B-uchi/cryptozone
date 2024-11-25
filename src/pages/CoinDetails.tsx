import { useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  useGetCryptocurrencyDetailsQuery,
  useGetCryptocurrencyPriceHistoryQuery,
} from "../util/cryptocurrencyAPI";
import HTMLReactParser from "html-react-parser";
import { FaHashtag } from "react-icons/fa";
import { BsFillLightningFill } from "react-icons/bs";
import { BsCoin } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
import { CgArrowsExchangeV } from "react-icons/cg";
import { GoTrophy } from "react-icons/go";
import { IoTrendingUp } from "react-icons/io5";
import millify from "millify";
import LineChart from "../components/LineChart";

const CoinDetails = () => {
  const [timePeriod, setTimePeriod] = useState("5y");
  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];
  const { uuid } = useParams<{ uuid: string }>();
  const { data, isLoading, error } = useGetCryptocurrencyDetailsQuery(uuid);
  const { data: priceHistory, isLoading: priceLoading } =
    useGetCryptocurrencyPriceHistoryQuery({
      uuid: uuid,
      timePeriod: timePeriod,
    });
  const priceHistoryData = priceHistory?.data;
  const coinData = data?.data?.coin;

  type CoinStat = {
    title: string;
    value: string | number;
    icon: JSX.Element;
  };

  const coinStat: CoinStat[] = [
    {
      title: "Rank",
      value: coinData?.rank,
      icon: <FaHashtag size={24} />,
    },
    {
      title: "Price",
      value: `$${millify(Number(coinData?.price))}`,
      icon: <BsCoin size={24} />,
    },
    {
      title: "Change",
      value: `${millify(Number(coinData?.change))}`,
      icon: <CgArrowsExchangeV size={24} />,
    },
    {
      title: "Exchanges",
      value: millify(Number(coinData?.numberOfExchanges)),
      icon: <BsCashCoin size={24} />,
    },
    {
      title: "Total Markets",
      value: millify(Number(coinData?.numberOfMarkets)),
      icon: <IoTrendingUp size={24} />,
    },
    {
      title: "All Time High",
      value: `$${millify(Number(coinData?.allTimeHigh.price))}`,
      icon: <GoTrophy size={24} />,
    },
    {
      title: "24h Volume",
      value: `$${millify(Number(coinData?.["24hVolume"]))}`,
      icon: <BsFillLightningFill size={24} />,
    },
    {
      title: "Market Cap",
      value: `$${millify(Number(coinData?.marketCap))}`,
      icon: <FaHashtag size={24} />,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500 text-xl">Network error occurred...</p>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            key={uuid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-8"
          >
            <div className="flex flex-col space-y-8">
              {/* Header Section */}
              <div className="flex items-center space-x-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <img 
                  src={coinData.iconUrl} 
                  alt={coinData.name} 
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    {coinData.name} 
                    <span className="text-lg text-gray-500 dark:text-gray-400">
                      {coinData.symbol}
                    </span>
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                    {HTMLReactParser(coinData.description)}
                  </p>
                </div>
              </div>

              {/* Stats Grid - Redesigned */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Market Statistics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {coinStat.map((stat, index) => (
                    <div
                      key={index}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative bg-gray-50 dark:bg-gray-700 p-6 rounded-xl transform transition-transform duration-300 group-hover:-translate-y-1">
                        <div className="flex flex-col space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-3 bg-blue-100 dark:bg-gray-600 rounded-lg text-blue-600 dark:text-blue-300">
                              {stat.icon}
                            </div>
                            <span className="font-medium text-gray-500 dark:text-gray-300">
                              {stat.title}
                            </span>
                          </div>
                          <div className="pl-2">
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                              {stat.value}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart Section */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-4 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Price History
                  </h2>
                  <select
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {time.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {priceLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  priceHistoryData && (
                    <LineChart
                      priceHistoryData={priceHistoryData}
                      currentPrice={coinData.price}
                      coinName={coinData.name}
                    />
                  )
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default CoinDetails;
