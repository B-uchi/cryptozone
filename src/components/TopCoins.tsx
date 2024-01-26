import CoinGrid from "./CoinGrid";
import { HeroSectionProps } from "./HeroSection";
import { FaArrowRight } from "react-icons/fa";

export type TopCoinsProps = {
  coins: HeroSectionProps["coin"][];
};
const TopCoins = (props: TopCoinsProps) => {
  const coins = props.coins;
  return (
    <div className="text-black mt-20 md:mt-3 flex-col dark:text-white flex w-full justify-center items-center">
      <h1 className="text-3xl mb-3 font-bold">Top Cryptocurrencies</h1>
      <div className="w-[90%] flex flex-col mb-2">
        <CoinGrid coins={coins} />
        <div className="dark:text-white text-black mt-3 p-1 flex justify-center">
          <button type="button" className="underline flex items-center gap-2">
            See all <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopCoins;
