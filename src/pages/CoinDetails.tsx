import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useGetCryptocurrencyDetailsQuery } from "../util/cryptocurrencyAPI";
import HTMLReactParser from "html-react-parser";
import { FaHashtag } from "react-icons/fa";
import { BsFillLightningFill } from "react-icons/bs";
import { BsCoin } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
import { CgArrowsExchangeV } from "react-icons/cg";
import { GoTrophy } from "react-icons/go";
import { IoTrendingUp } from "react-icons/io5";

import millify from "millify";

const CoinDetails = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const { data, isLoading, error } = useGetCryptocurrencyDetailsQuery(uuid);
  const coinData = data?.data?.coin;
  console.log(coinData);
  type CoinStat = {
    title: string;
    value: string | number;
    icon: JSX.Element;
  }
  const coinStat:CoinStat[] = [
    {
      title: "Rank",
      value: coinData?.rank,
      icon: <FaHashtag size={35}/>,
    },
    {
      title: "Price",
      value: `$${millify(coinData?.price)}`,
      icon: <BsCoin size={35}/>,
    },
    {
      title: "Change",
      value: `${millify(coinData?.change)}%`,
      icon: <CgArrowsExchangeV size={35}/>,
    },
    {
      title: "Exchanges",
      value: millify(coinData?.numberOfExchanges),
      icon: <BsCashCoin size={35}/>,
    },
    {
      title: "Total Markets",
      value: millify(coinData?.numberOfMarkets),
      icon: <IoTrendingUp size={35}/>,
    },
    {
      title: "All Time High (daily avg.)",
      value: `$${millify(coinData?.allTimeHigh.price)}`,
      icon: <GoTrophy size={35}/>,
    },
    {
      title: "24h Trading Volume",
      value: `$${millify(coinData?.["24hVolume"])}`,
      icon: <BsFillLightningFill size={35}/>,
    },
    {
      title: "Market Cap",
      value: `$${millify(coinData?.marketCap)}`,
      icon: <FaHashtag size={35}/>,
    },
    {
      title: "Total Supply",
      value: millify(coinData?.supply.total),
      icon: <FaHashtag size={35}/>,
    },
    {
      title: "Circulating Supply",
      value: millify(coinData?.supply.circulating),
      icon: <FaHashtag size={35}/>,
    },
  ]
  return (
    <div className="md:max-h-fit mt-0 flex relative w-full">
      {isLoading ? (
        <div className="newtons-cradle absolute left-[50%] top-[50vh]">
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>
      ) : error ? (
        <p className="text-black dark:text-white text-sm md:text-xl absolute left-[50%] translate-x-[-50%] top-[50vh]">
          A network error occured....
        </p>
      ) : (
        <AnimatePresence>
          <motion.div
            key={uuid}
            initial={{ x: 1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <div className="text-black dark:text-white flex flex-col items-center p-2 w-full">
              <div className="mt-2 w-full text-center flex flex-col items-center">
                <h1 className="font-bold text-3xl flex items-center gap-2">
                  <span>
                    <img className="w-9" src={coinData.iconUrl} alt=""/>
                  </span>
                  {coinData.name} ({coinData.symbol}){" "}
                </h1>
                <p className="text-sm md:text-lg">
                  {HTMLReactParser(coinData.description)}
                </p>
              </div>

              <div className="mt-3">
                <div className="">
                  <h1 className="font-bold text-2xl text-center">
                    {coinData.name} Stats
                  </h1>

                  <div className="w-[500px]">
                      {coinStat.map((stat, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border-b-[1px] border-[#e1e1e1]">
                          <span className="flex items-center gap-2">
                            {stat.icon}
                            {stat.title}:
                          </span>{" "}
                          <span>{stat.value}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default CoinDetails;
