import millify from "millify";
import { BsCurrencyBitcoin, BsBuilding, BsCashCoin } from "react-icons/bs";
import { AiOutlineLineChart, AiOutlineTransaction } from "react-icons/ai";
import { MdShowChart } from "react-icons/md";

type CryptoStatsProps = {
  stats: {
    totalCoins: number;
    totalExchanges: number;
    totalMarketCap: number;
    total24hVolume: number;
    totalMarkets: number;
    total: number;
  };
};

const CryptoStats = (props: CryptoStatsProps) => {
  const stats = [
    {
      title: "Total Cryptocurrencies",
      value: props.stats.totalCoins,
      icon: <BsCurrencyBitcoin className="w-8 h-8 text-blue-500" />,
      color: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Total Exchanges",
      value: props.stats.totalExchanges,
      icon: <BsBuilding className="w-8 h-8 text-purple-500" />,
      color: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      title: "Total Market Cap",
      value: props.stats.totalMarketCap,
      prefix: "$",
      icon: <AiOutlineLineChart className="w-8 h-8 text-green-500" />,
      color: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "24h Trading Volume",
      value: props.stats.total24hVolume,
      prefix: "$",
      icon: <AiOutlineTransaction className="w-8 h-8 text-orange-500" />,
      color: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      title: "Total Markets",
      value: props.stats.totalMarkets,
      icon: <MdShowChart className="w-8 h-8 text-red-500" />,
      color: "bg-red-50 dark:bg-red-900/20"
    },
    {
      title: "Total",
      value: props.stats.total,
      icon: <BsCashCoin className="w-8 h-8 text-yellow-500" />,
      color: "bg-yellow-50 dark:bg-yellow-900/20"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Global Crypto Statistics
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} cursor-pointer rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg dark:shadow-gray-800/30`}
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                {stat.icon}
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Last 24h
              </span>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
                {stat.title}
              </h3>
              <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {stat.prefix}{millify(stat.value)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoStats;
