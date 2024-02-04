import { useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  useGetCryptocurrencyDetailsQuery,
  useGetCryptocurrencyPriceHistoryQuery,
} from "../util/cryptocurrencyAPI";
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
  const [timePeriod, setTimePeriod] = useState("7d");
  const { uuid } = useParams<{ uuid: string }>();
  const { data, isLoading, error } = useGetCryptocurrencyDetailsQuery(uuid);
  const { data: priceHistoryData, isLoading: priceHistoryLoading } = useGetCryptocurrencyPriceHistoryQuery({
    coinId: uuid,
    timePeriod,
  });
  const coinData = data?.data?.coin;
  type CoinStat = {
    title: string;
    value: string | number;
    icon: JSX.Element;
  };
  const coinStat: CoinStat[] = [
    {
      title: "Rank",
      value: coinData?.rank,
      icon: <FaHashtag size={35} />,
    },
    {
      title: "Price",
      value: `$${millify(Number(coinData?.price))}`,
      icon: <BsCoin size={35} />,
    },
    {
      title: "Change",
      value: `${millify(Number(coinData?.change))}`,
      icon: <CgArrowsExchangeV size={35} />,
    },
    {
      title: "Exchanges",
      value: millify(Number(coinData?.numberOfExchanges)),
      icon: <BsCashCoin size={35} />,
    },
    {
      title: "Total Markets",
      value: millify(Number(coinData?.numberOfMarkets)),
      icon: <IoTrendingUp size={35} />,
    },
    {
      title: "All Time High (daily avg.)",
      value: `$${millify(Number(coinData?.allTimeHigh.price))}`,
      icon: <GoTrophy size={35} />,
    },
    {
      title: "24h Trading Volume",
      value: `$${millify(Number(coinData?.["24hVolume"]))}`,
      icon: <BsFillLightningFill size={35} />,
    },
    {
      title: "Market Cap",
      value: `$${millify(Number(coinData?.marketCap))}`,
      icon: <FaHashtag size={35} />,
    },
    {
      title: "Total Supply",
      value: millify(Number(coinData?.supply.total)),
      icon: <FaHashtag size={35} />,
    },
    {
      title: "Circulating Supply",
      value: millify(Number(coinData?.supply.circulating)),
      icon: <FaHashtag size={35} />,
    },
  ];
  return (
    <div className="md:max-h-fit mt-0 flex relative w-full">
      {isLoading && priceHistoryLoading ? (
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
                <img className="w-32" src={coinData.iconUrl} alt="" />

                <h1 className="font-bold mt-3 text-3xl flex items-center gap-2">
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
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 border-b-[1px] border-[#e1e1e1]"
                      >
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
