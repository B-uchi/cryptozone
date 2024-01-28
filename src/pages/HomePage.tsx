import { useEffect } from "react";
import CryptoStats from "../components/CryptoStats";
import HeroSection from "../components/HeroSection";
import TopCoins from "../components/TopCoins";
import { useGetCryptocurrenciesQuery } from "../services/cryptocurrencyAPI";
import axios from 'axios'

const HomePage = () => {
  const { data, error, isLoading } = useGetCryptocurrenciesQuery({});
  const firstCoin = data?.data?.coins[0];
  const first10Coins = data?.data?.coins.slice(0, 12);
  const stats = data?.data?.stats;

  useEffect(()=>{
    const fetchNews = async () => {
      const { data } = await axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN')
      console.log(data)
      
    }
    fetchNews()
  },[])


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
        <p className="text-white text-3xl">An error occured</p>
      ) : (
        <div className="w-full p-2">
          <HeroSection coin={firstCoin} />
          <CryptoStats stats={stats} />
          <TopCoins coins={first10Coins} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
