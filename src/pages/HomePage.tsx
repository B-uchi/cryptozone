import HeroSection from "../components/HeroSection";
import { useGetCryptocurrenciesQuery } from "../services/cryptocurrencyAPI";

const HomePage = () => {
  const { data, error, isLoading } = useGetCryptocurrenciesQuery({});
  const firstCoin = data?.data?.coins[0];
  console.log(firstCoin)
  return (
    <div className="h-[100vh] flex relative w-full">
      {isLoading ? (
        <div className="newtons-cradle absolute left-[50%] top-[50%]">
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>
      ) : (
        <div className="w-full">
          <HeroSection coin={firstCoin} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
