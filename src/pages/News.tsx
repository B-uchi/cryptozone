import CoinGrid from "../components/CoinGrid";
import NewsCarousel from "../components/NewsCarousel";
import useFetchNews from "../util/useFetchNews";
import { AnimatePresence, motion } from "framer-motion";

const News = () => {
  const [newsdata, isLoading, error] = useFetchNews();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="newtons-cradle">
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-4">
              A network error occurred
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Please check your connection and try again
            </p>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            key="NewsPage"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
          >
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center">
                Latest Crypto News
              </h1>
              <NewsCarousel news={newsdata.slice(0, 5)} />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  More News
                </h2>
                <div className="h-1 flex-1 mx-6 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
              </div>
              <CoinGrid news={newsdata} gridSize="3" />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default News;
