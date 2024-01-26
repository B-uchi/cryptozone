import CoinGrid from "../components/CoinGrid";
import { useGetCryptocurrenciesQuery } from "../services/cryptocurrencyAPI";

const Cryptocurrencies = () => {
  const { data, error, isLoading } = useGetCryptocurrenciesQuery({});
  const coins = data?.data?.coins;
  console.log(coins)
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
          <h1 className="text-3xl mb-5 font-bold">Cryptocurrencies</h1>
          <CoinGrid coins={coins} />
        </div>
      )}
    </div>
  );
};

export default Cryptocurrencies;
