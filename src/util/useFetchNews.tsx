import { useState, useEffect } from "react";
import axios from "axios";
import { NewsCarouselProps } from "../components/NewsCarousel";

const useFetchNews = () => {
  const [newsdata, setNews] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: "POST",
          url: `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${
            import.meta.env.VITE_CRYPTOCOMPAREAPI
          }`,
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.request(requestOptions);
        const responseData: NewsCarouselProps[] = response.data.Data
        setNews(responseData);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(true)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 

  return [newsdata, isLoading, error];
};

export default useFetchNews;
