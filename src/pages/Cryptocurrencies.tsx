import { useEffect, useState } from "react";
import CoinGrid from "../components/CoinGrid";
import { useGetCryptocurrenciesQuery } from "../services/cryptocurrencyAPI";
import { IoMdSearch } from "react-icons/io";
import { HeroSectionProps } from "../components/HeroSection";

const Cryptocurrencies = () => {
  const { data, error, isLoading } = useGetCryptocurrenciesQuery({});
  const [searchParam, setSearchParam] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [filteredCoins, setFilteredCoins] = useState([]);

  type CoinType = {
    coin: HeroSectionProps["coin"];
  };

  useEffect(() => {
    if (!isLoading) {
      setFilteredCoins(data?.data?.coins);
    }
  }, [isLoading]);

  const searchCoins = (search: string) => {
    const filtered = data?.data?.coins.filter((coin: CoinType['coin']) => {
      return coin.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredCoins(filtered);
  };

  return (
    <div className="md:h-[100vh] flex justify-center  w-full text-black dark:text-white">
      {isLoading ? (
        <div className="newtons-cradle absolute left-[50%] top-[50%]">
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>
      ) : (
        <div className="w-[90%] p-2 mt-3">
          <div
            className="flex justify-evenly items-baseline w-full
          "
          >
            <h1 className="text-2xl mb-5 font-bold">Cryptocurrencies</h1>
            {!showSearch ? (
              <div className="p-2">
                <button
                  type="button"
                  title="search_btn"
                  onClick={() => setShowSearch(true)}
                >
                  <IoMdSearch size={28} />
                </button>
              </div>
            ) : (
              <div className="border-[1px] search-box border-[#d3d3d3] dark:border-[#9e9e9e] p-2 rounded-full text-[12px] text-[#d3d3d3] flex items-center gap-3">
                <button
                  type="button"
                  title="search-btn"
                  onClick={() => searchCoins(searchParam)}
                >
                  <IoMdSearch size={25} />
                </button>
                <input
                  type="text"
                  className="w-[90%] bg-transparent outline-none"
                  placeholder="Type to search..."
                  onChange={(e) => setSearchParam(e.target.value)}
                  value={searchParam}
                />
              </div>
            )}
          </div>
          <CoinGrid coins={filteredCoins} />
        </div>
      )}
    </div>
  );
};

export default Cryptocurrencies;
