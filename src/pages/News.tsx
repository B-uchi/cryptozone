import NewsCarousel from "../components/NewsCarousel";
import useFetchNews from "../util/useFetchNews";

const News = () => {
  const [newsdata, isLoading] = useFetchNews();

  return (
    <div className="text-black dark:text-white">
      {isLoading ? (
        <div
          className="newtons-cradle absolute left-[50%] top-[50vh]"
        >
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>
      ) : (
        <div className="">
          <NewsCarousel news={newsdata}/> 
        </div>
      )}
    </div>
  );
};

export default News;
