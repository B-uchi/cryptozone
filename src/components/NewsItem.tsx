import * as React from "react";
import { NewsItemProps } from "./NewsCarousel";

const NewsItem: React.FC<NewsItemProps> = (props) => {
  const news = props.news;
  return (
    <div className="p-3 gap-3 rounded-md h-[200px] bg-white dark:bg-[#12131f] flex items-center justify-center border-[1px] border-[#efefef] dark:border-[#171717]">
      <div className="w-[60%] flex flex-col justify-center">
        <div className="">
          <h1 className="line-clamp-1 font-bold">{news.title}</h1>
          <p className="line-clamp-3 text-sm">{news.body}</p>
        </div>
        <div className="">
          <p className="text-sm mt-3">
            <span className="font-bold">Source:</span> {news.source}
          </p>
          <div className="flex">
            <a href={news.url} target="_blank">
              <button
                type="button"
                className="p-1 px-2 mt-3 border-[1px] dark:border-none shadow-md border-[#efefef] bg-[#fafafa] dark:bg-[#202236] rounded-lg"
              >
                Read more
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="w-[30%] p-2">
        <img src={news.imageurl} alt="" className="w-full rounded-md" />
      </div>
    </div>
  );
};

export default NewsItem;
