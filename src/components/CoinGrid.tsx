import CoinItem from "./CoinItem";
import { HeroSectionProps } from "./HeroSection";

export type TopCoinsProps = {
  coins: HeroSectionProps["coin"][];
};

const CoinGrid = (props: TopCoinsProps) => {
  const coins = props.coins;
  console.log(coins);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-2 relative">
      {coins.length > 0 ? coins.map((coin) => (
        <CoinItem coin={coin} key={coin.name}/>
      )) : <p className="dark:text-white text-black absolute top-[50px] left-[50%] text-xl mx-auto">No coins found</p>} 
    </div>
  );
};

export default CoinGrid;
