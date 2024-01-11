import millify from "millify";

export type HeroSectionProps = {
  coin: {
    name: string;
    price: number;
    iconUrl: string;
    marketCap: number;
    rank: number;
    symbol: string;
  };
};

const HeroSection = (props: HeroSectionProps) => {
  const { coin } = props;
  return (
    <div className="text-black dark:text-white flex flex-col-reverse md:flex-row w-full md:h-[60%]">
      <div className="md:w-1/2 flex flex-col justify-center items-center">
        <p>World's most popular cryptocurrency</p>
        <p className="font-extrabold">Rank: {coin.rank}</p>
        <p className="font-extrabold mt-5 text-6xl flex justify-center items-center gap-3">
          {coin.name}
          <span className="text-xl">({coin.symbol})</span>
        </p>
        <p className="mt-5 text-2xl font-extrabold">Price: ${millify(coin.price)}</p>
        <p className="mt-5 text-2xl font-extrabold">Market Cap: ${millify(coin.marketCap)}</p>
        <div className="">
            <button type="button" className="mt-10 p-2 px-3 bg-black text-white dark:bg-white dark:text-black rounded-md">
               Read More
            </button>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center items-center">
        <img src={coin.iconUrl} className="md:w-[15rem] w-40 mb-3 md:mb-0" alt="" />
      </div>
    </div>
  );
};

export default HeroSection;
