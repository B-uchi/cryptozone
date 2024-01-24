import { HeroSectionProps } from "./HeroSection";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import millify from "millify";

export type TopCoinsProps = {
  coins: HeroSectionProps["coin"][];
};

const TopCoins = (props: TopCoinsProps) => {
  const coins = props.coins;
  return (
    <div className="text-black mt-20 md:mt-3 flex-col dark:text-white flex w-full justify-center items-center">
      <h1 className="text-3xl mb-3 font-bold">Top Cryptocurrencies</h1>
      <div className=" md:w-[80%] w-full flex flex-col gap-2 mb-2">
        <table>
          <thead>
            <tr>
              <th className="w-[8%] text-left">Rank</th>
              <th className="w-[20%] text-left">Name</th>
              <th className="w-[20%] text-right">Price</th>
              <th className="text-right">Change</th>
              <th className="text-right">24h Volume</th>
              <th className="text-right">Market Cap</th>
            </tr>
          </thead>
          <tbody className="text-center coin-list">
            {coins.map((coin) => (
              <tr key={coin.name} className="">
                <td className="text-left">{coin.rank}</td>
                <td className="text-left">
                  <div className="flex items-center gap-4">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={coin.iconUrl}
                      alt={coin.name}
                    />
                    <p className="flex flex-col md:flex-row gap-1">
                      {coin.name}{" "}
                      <span className="text-[#171717] dark:text-[#8d8d8d] ">
                        {" "}
                        ({coin.symbol})
                      </span>{" "}
                    </p>
                  </div>
                </td>
                <td className="text-right">${millify(coin.price)}</td>
                <td className="text-right flex justify-end items-center">
                  {coin.change.toString()[0] === "-" ? (
                    <div className="text-red-700 flex items-center gap-1"><BiSolidDownArrow />{coin.change.toString().slice(1)}%</div>
                  ) : (
                    <div className="text-green-700 flex gap-1 items-center">
                      <BiSolidUpArrow />{coin.change}%
                    </div>
                  )}
                </td>
                <td className="text-right">${String(coin["24hVolume"]).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td className="text-right">${coin.marketCap.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopCoins;
