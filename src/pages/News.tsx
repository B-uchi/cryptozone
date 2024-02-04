import CoinGrid from "../components/CoinGrid";
import NewsCarousel from "../components/NewsCarousel";
import useFetchNews from "../util/useFetchNews";
import { AnimatePresence, motion } from "framer-motion";

const News = () => {
  const [newsdata, isLoading, error] = useFetchNews();

  return (
    <div className="text-black dark:text-white">
      {isLoading ? (
        <div className="newtons-cradle absolute left-[50%] top-[50vh]">
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>
      ) : error ? (
        <p className="text-black dark:text-white  absolute left-[50%] translate-x-[-50%] top-[50vh] text-sm md:text-xl">
          A network error occured....
        </p>
      ) : (
        <AnimatePresence>
          <motion.div
            key={"HomePage"}
            initial={{ x: 1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" flex flex-col items-center gap-7 w-[90%] mx-auto scroll-smooth"
          >
            <NewsCarousel news={newsdata.slice(0, 5)} />
            <h1 className="text-3xl font-bold text-left w-[90%]">Other News</h1>
            <CoinGrid news={newsdata} gridSize="3" />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default News;
