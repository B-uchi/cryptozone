import { useState } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";

export type NewsItemProps = {
  news: {
    id: number;
    title: string;
    body: string;
    imageurl: string;
    published_on: number;
    url: string;
    source: string;
    tags: string;
  };
};

export type NewsCarouselProps = {
  news: NewsItemProps["news"][];
};

const NewsCarousel: React.FC<NewsCarouselProps> = (props) => {
  const [index, setIndex] = useState(0);
  const carouselItems = props.news;

  const nextCarouselItem = () => {
    setIndex((index + 1) % carouselItems.length);
  };

  const prevCarouselItem = () => {
    setIndex((index - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex flex-col md:flex-row min-h-[400px] md:h-[500px]">
          <div className="md:w-1/2 p-6 md:p-12 flex items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                {carouselItems[index].source}
              </span>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                {carouselItems[index].title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 line-clamp-4 md:line-clamp-6">
                {carouselItems[index].body}
              </p>

              <div className="space-y-4">
                <a 
                  href={carouselItems[index].url}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                >
                  Read Full Article
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {carouselItems[index].tags.split("|").map((tag, i) => (
                    <span key={i} className="inline-block mr-2">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-r-2xl"></div>
            <img
              src={carouselItems[index].imageurl}
              alt={carouselItems[index].title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2">
          {carouselItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                i === index 
                  ? "bg-blue-600 dark:bg-blue-400" 
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>

        <button
          onClick={prevCarouselItem}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
        >
          <IoChevronBack size={24} />
        </button>

        <button
          onClick={nextCarouselItem}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
        >
          <IoChevronForward size={24} />
        </button>
      </div>
    </div>
  );
};

export default NewsCarousel;
