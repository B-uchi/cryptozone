import { HeroSectionProps } from "./HeroSection";
import millify from "millify";

type CoinItemProps = {
  coin: HeroSectionProps["coin"];
};

const CoinItem = (props: CoinItemProps) => {
  const coin = props.coin;
  return (
    <div
      className="p-6 md:w-[330px] hover:bg-gray-100 dark:hover:bg-gray-500 rounded-lg bg-white dark:bg-black border-[1px] border-[#efefef] dark:border-[#171717] cursor-pointer flex flex-col justify-center items-center gap-2"
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
  );
};

export default CoinItem;
