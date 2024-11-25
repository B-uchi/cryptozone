import { Link } from "react-router-dom";
import CoinGrid from "./CoinGrid";
import { HeroSectionProps } from "./HeroSection";
import { FaArrowRight } from "react-icons/fa";
import { NewsCarouselProps } from "./NewsCarousel";

export type TopCoinsProps = {
  coins: HeroSectionProps["coin"][];
  news?: NewsCarouselProps['news'][];
};
const TopCoins = (props: TopCoinsProps) => {
  const coins = props.coins;
  return (
    <div className="text-black mt-20 md:mt-3 flex-col dark:text-white flex w-[100%] justify-center items-center">
      <h1 className="text-3xl mb-3 font-bold">Top Cryptocurrencies</h1>
      <div className="w-[90%] flex flex-col mb-2">
        <CoinGrid coins={coins} gridSize="4"/>
        <div className="dark:text-white text-black mt-3 p-1 flex justify-center">
          <Link to={"/coins"}>
            <button type="button" className="underline flex items-center gap-2">
              See all <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopCoins;
