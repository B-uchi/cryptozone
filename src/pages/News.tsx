import { useEffect, useState } from "react";
import NewsCarousel from "../components/NewsCarousel";
import axios from "axios";

const News = () => {
  const [carousel, setCarousel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
    console.log(carousel)
  useEffect(() => {
    const fetchNews = () => {
      const requestOptions = {
        method: "POST",
        url: "https://newsnow.p.rapidapi.com/",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "newsnow.p.rapidapi.com",
        },
        data: {
          text: "cryptocurrency",
          region: "wt-wt",
          max_results: 40,
        },
      };
      axios
        .request(requestOptions)
        .then((response) => {
          setCarousel(response.data.news.slice(0, 5));
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
        });
    };
    fetchNews();
  }, []);
  return (
    <div className="text-black dark:text-white">
      {isLoading ? (
        <div
          className="newtons-cradle absolute left-[50%] top-[50vh]
        "
        >
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>
      ) : (
        <div className="">
            <NewsCarousel news={carousel} />
        </div>
      )}
    </div>
  );
};

export default News;
