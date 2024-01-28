import { useEffect, useState } from "react";
import NewsCarousel from "../components/NewsCarousel";
import axios from "axios";
import useFetchNews from "../util/useFetchNews";

const News = () => {
  const [carousel, setCarousel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isloading, news] = useFetchNews({
    category: "cryptocurrency",
    count: 5,
  });
  console.log(news, isloading)


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
