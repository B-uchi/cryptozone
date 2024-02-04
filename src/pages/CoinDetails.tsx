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
import LineChart from "../components/LineChart";

const CoinDetails = () => {
  const [timePeriod, setTimePeriod] = useState("5y");
  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];
  const { uuid } = useParams<{ uuid: string }>();
  const { data, isLoading, error } = useGetCryptocurrencyDetailsQuery(uuid);
  const { data: priceHistory, isLoading: priceLoading } =
    useGetCryptocurrencyPriceHistoryQuery({
      uuid: uuid,
      timePeriod: timePeriod,
    });
  const priceHistoryData = priceHistory?.data;
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
            <div className="text-black dark:text-white flex flex-col items-center p-5 w-full">
              <div className="flex w-[90%] justify-between mb-5">
                <div className="mt-2 border-[1px] dark:bg-black bg-white rounded-xl border-[#efefef] dark:border-[#171717] justify-center text-center flex flex-col items-center w-[45%] shadow-sm">
                  <img className="w-32" src={coinData.iconUrl} alt="" />

                  <h1 className="font-bold mt-3 text-3xl flex items-center gap-2">
                    {coinData.name} ({coinData.symbol}){" "}
                  </h1>
                  <p className="text-sm md:text-lg dark:text-[rgb(221,210,210)]">
                    {HTMLReactParser(coinData.description)}
                  </p>
                </div>
                <div className="mt-2 border-[1px] dark:bg-black bg-white rounded-xl border-[#efefef] dark:border-[#171717] flex w-[45%] p-3 justify-center items-center shadow-sm">
                  <div className="">
                    <h1 className="font-bold text-2xl text-center">
                      {coinData.name} Stats
                    </h1>

                    <div className="w-[500px]">
                      {coinStat.map((stat, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 border-b-[1px] dark:text-[rgb(221,210,210)] border-[#e1e1e1] dark:border-[#202020]"
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
              <div className="w-[90%] relative border-[2px] border-[#efefef] dark:border-[#171717] bg-white dark:bg-slate-300 h-[100vh] shadow-md p-2 mt-3 rounded-lg">
                {priceLoading ? (
                  <div className="newtons-cradle absolute left-[50%] top-[50vh]">
                    <div className="newtons-cradle__dot"></div>
                    <div className="newtons-cradle__dot"></div>
                    <div className="newtons-cradle__dot"></div>
                    <div className="newtons-cradle__dot"></div>
                  </div>
                ) : (
                  <div className="">
                    <div className="flex gap-2 text-black items-center">
                      Select a time period:
                      <select
                        value={timePeriod}
                        className="border-black border-[2px] rounded-lg w-20"
                        title="chart time period"
                        id=""
                        onChange={(event) => setTimePeriod(event.target.value)}
                      >
                        {time.map((date, index) => (
                          <option key={index} value={date}>
                            {date}
                          </option>
                        ))}
                      </select>
                    </div>

                    {priceHistoryData && (
                      <LineChart
                        priceHistoryData={priceHistoryData}
                        currentPrice={coinData.price}
                        coinName={coinData.name}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default CoinDetails;
