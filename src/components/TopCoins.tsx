import { HeroSectionProps } from "./HeroSection";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { FaArrowRight  } from "react-icons/fa";
import millify from "millify";

export type TopCoinsProps = {
  coins: HeroSectionProps["coin"][];
};

const TopCoins = (props: TopCoinsProps) => {
  const coins = props.coins;
  return (
    <div className="text-black mt-20 md:mt-3 flex-col dark:text-white flex w-full justify-center items-center">
      <h1 className="text-3xl mb-3 font-bold">Top Cryptocurrencies</h1>
      <div className="w-[90%] flex flex-col mb-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {coins.map((coin) => (
            <div
              key={coin.name}
              className="p-6 hover:bg-red-400 dark:hover:bg-red-400 rounded-sm bg-white dark:bg-black border-[1px] border-[#efefef] dark:border-[#171717] cursor-pointer flex flex-col justify-center items-center gap-2"
            >
              <img src={coin.iconUrl} alt="coin_icon" className="w-20 mb-3" />
              <p className="font-bold text-center">
                {coin.rank}. {coin.name}
              </p>
              <p>Price: ${millify(coin.price)}</p>
              <p>Market Cap: ${millify(coin.marketCap)}</p>
              <p>24h Volumne: ${millify(coin["24hVolume"])}</p>
              <p>Change: {coin.change}</p>
            </div>
          ))}
        </div>
        <div className="dark:text-white text-black mt-3 p-1 flex justify-center">
          <button type="button" className="underline flex items-center gap-2">
            See all <FaArrowRight/>
          </button>
          
        </div>

      </div>
    </div>
  );
};

export default TopCoins;
