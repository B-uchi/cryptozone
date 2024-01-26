import CoinItem from "./CoinItem";
import { HeroSectionProps } from "./HeroSection";

export type TopCoinsProps = {
  coins: HeroSectionProps["coin"][];
};

const CoinGrid = (props: TopCoinsProps) => {
  const coins = props.coins;
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-2">
      {coins.map((coin) => (
        <CoinItem coin={coin} />
      ))}
    </div>
  );
};

export default CoinGrid;
