import { HeroSectionProps } from "./HeroSection";

export type TopCoinsProps = {
  coins: HeroSectionProps["coin"][];
};

const TopCoins = (props: TopCoinsProps) => {
  const coins = props.coins;
  return (
    <div className="text-black mt-20 md:mt-3 flex-col dark:text-white flex w-full justify-center items-center">
      <h1 className="text-3xl mb-3 font-bold">Top Cryptocurrencies</h1>
      <div className=" md:w-[80%] flex flex-col gap-2 mb-2">
        {coins.map((coin) => (
          <div
            className="p-3 bg-white dark:bg-black rounded-md border-[2px] border-[#efefef] dark:border-[#171717]  flex"
            key={coin.name}
          >
            <p className="mr-5">{coin.rank}.</p>
            <div className="flex items-center gap-4">
                <img
                    className="w-8 h-8 rounded-full"
                    src={coin.iconUrl}
                    alt={coin.name}
                />
              <p>{coin.name} <span>({coin.symbol})</span> </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCoins;
