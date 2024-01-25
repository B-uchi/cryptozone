import millify from "millify";

type CryptoStatsProps = {
  stats: {
    totalCoins: number;
    totalExchanges: number;
    totalMarketCap: number;
    total24hVolume: number;
    totalMarkets: number;
  };
};

const CryptoStats = (props: CryptoStatsProps) => {
  const {
    totalCoins,
    totalExchanges,
    totalMarketCap,
    total24hVolume,
    totalMarkets,
  } = props.stats;
  const params = [
    totalCoins,
    totalExchanges,
    totalMarketCap,
    total24hVolume,
    totalMarkets,
  ];
  return (
    <div className="text-black mt-10 md:mt-3 flex-col dark:text-white flex w-full justify-center items-center mb-10">
      <h1 className="text-3xl mb-3 font-bold">Crypto Stats</h1>
      <div className="flex flex-col md:flex-row gap-3  w-[90%]">
        {params.slice(0, 3).map((param, index) => (
          <div
            key={index}
            className="flex flex-col-reverse md:w-1/3 h-[150px] justify-center items-center gap-2 p-2 bg-white dark:bg-black rounded-md border-[1px] border-[#efefef] dark:border-[#171717] cursor-pointer"
          >
            <p className="font-bold text-2xl">{millify(param)}</p>
            <p className="text-sm">
              {index === 0
                ? "Coins"
                : index === 1
                ? "Exchanges"
                : index === 2
                ? "Market Cap"
                : index === 3
                ? "24h Volume"
                : "Markets"}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-3 w-[90%] mt-3">
        {params.slice(3, 5).map((param, index) => (
          <div
            key={index}
            className="flex flex-col-reverse md:w-1/2 justify-center h-[150px]  items-center gap-2 p-2 bg-white dark:bg-black rounded-md border-[1px] border-[#efefef] dark:border-[#171717] cursor-pointer"
          >
            <p className="font-bold text-2xl">{millify(param)}</p>
            <p className="text-sm">{index === 0 ? "24h Volume" : "Markets"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoStats;
