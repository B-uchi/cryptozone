import { Link } from "react-router-dom";
import { HeroSectionProps } from "./HeroSection";
import millify from "millify";

type CoinItemProps = {
  coin: HeroSectionProps["coin"];
};

const CoinItem = (props: CoinItemProps) => {
  const coin = props.coin;
  return (
    <Link to={`/coins/${coin.uuid}`}>
      <div className="p-6 w-full md:w-[330px] rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img src={coin.iconUrl} alt={coin.name} className="w-12 h-12" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {coin.name}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Rank #{coin.rank}
              </span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            Number(coin.change) > 0 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {coin.change}%
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Price</span>
            <span className="font-medium text-gray-900 dark:text-white">
              ${millify(Number(coin.price))}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Market Cap</span>
            <span className="font-medium text-gray-900 dark:text-white">
              ${millify(Number(coin.marketCap))}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">24h Volume</span>
            <span className="font-medium text-gray-900 dark:text-white">
              ${millify(Number(coin["24hVolume"]))}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CoinItem;
