import millify from "millify";
import { Link } from "react-router-dom";

export type HeroSectionProps = {
  coin: {
    uuid: string;
    name: string;
    price: number;
    iconUrl: string;
    marketCap: number;
    rank: number;
    symbol: string;
    change: number;
    "24hVolume": number;
  };
};

const HeroSection = (props: HeroSectionProps) => {
  const { coin } = props;
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg p-4 sm:p-8 mx-4 lg:mx-auto max-w-7xl mt-4 sm:mt-8">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>

      <div className="flex flex-col items-center justify-between gap-8 relative z-10">
        <div className="w-full text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <span className="text-xs sm:text-sm font-medium">
              Rank #{coin.rank}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <img
              src={coin.iconUrl}
              className="w-12 h-12 sm:hidden"
              alt={`${coin.name} icon`}
            />
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
              {coin.name}
              <span className="text-base sm:text-lg lg:text-2xl text-gray-500 dark:text-gray-400 ml-2">
                {coin.symbol}
              </span>
            </h1>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto">
              <div className="px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Current Price
                </p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                  ${millify(coin.price)}
                </p>
              </div>
              <div className="px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Market Cap
                </p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                  ${millify(Number(coin.marketCap))}
                </p>
              </div>
            </div>

            <Link to={`/coins/${coin.uuid}`}>
              <button className="inline-flex mt-3 items-center px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                View Details
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        <div className="relative hidden sm:block">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <img
            src={coin.iconUrl}
            className="relative w-48 lg:w-72 aspect-square object-contain"
            alt={`${coin.name} icon`}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
