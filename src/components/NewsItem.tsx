import * as React from "react";
import { NewsItemProps } from "./NewsCarousel";

const NewsItem: React.FC<NewsItemProps> = (props) => {
  const news = props.news;
  return (
    <div className="overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-[450px]">
      <div className="relative h-48">
        <img 
          src={news.imageurl} 
          alt={news.title} 
          loading="lazy" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-sm font-medium text-white bg-blue-600 w-fit px-3 py-1 rounded-full">
            {news.source}
          </p>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-3">
          {news.title}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm mb-4">
          {news.body}
        </p>

        <a 
          href={news.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          Read more
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
