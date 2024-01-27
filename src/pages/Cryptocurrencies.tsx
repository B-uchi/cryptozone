import { useEffect, useState } from "react";
import CoinGrid from "../components/CoinGrid";
import { useGetCryptocurrenciesQuery } from "../services/cryptocurrencyAPI";
import { IoMdSearch } from "react-icons/io";
import { MdCancel } from "react-icons/md";
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
    const filtered = data?.data?.coins.filter((coin: CoinType["coin"]) => {
      return coin.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredCoins(filtered);
  };

  return (
    <div className="md:max-h-fit flex justify-center relative w-full text-black dark:text-white">
      {isLoading ? (
        <div className="newtons-cradle absolute top-[50vh]">
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
              <div className="border-[1px] text-black dark:text-white search-box border-black dark:border-[#9e9e9e] p-2 rounded-full text-[12px] flex items-center gap-3">
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
                {searchParam.length > 0 && (
                  <button
                    type="button"
                    title="cancel-btn"
                    onClick={() => {
                      setFilteredCoins(data?.data?.coins);
                      setSearchParam("");
                    }}
                  >
                    <MdCancel size={20} />
                  </button>
                )}
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
