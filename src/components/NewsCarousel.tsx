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
    <div className="w-full mt-5 flex ">
      <div className="w-[100%] h-[73vh] md:h-[60vh] bg-white dark:bg-black flex justify-center items-center border-[2px] border-[#efefef] dark:border-[#171717] cursor-pointer relative">
        <div className="md:flex flex-col md:flex-row items-center justify-center  h-full">
          <div className="md:w-[50%] flex justify-center items-center ">
            <img
              src={carouselItems[index].imageurl}
              alt=""
              className="w-full md:w-[60%] rounded-md"
            />
          </div>
          <div className="md:w-[50%] flex flex-col justify-center items-start p-2">
            <h1 className="text-lg md:text-3xl line-clamp-1 md:line-clamp-none font-bold">
              {carouselItems[index].title}
            </h1>
            <p className="md:text-md text-sm  md:w-[80%] mt-3 line-clamp-2">
              {carouselItems[index].body}
            </p>
            <div className="flex w-full justify-center">
              <a href={carouselItems[index].url} target="_blank">
                <button
                  type="button"
                  className="p-1 px-2 mt-3 bg-[#b6b4b4] dark:bg-[#202236] rounded-lg"
                >
                  Read more
                </button>
              </a>
            </div>
            <div className="hidden md:block">
              <p className="text-sm mt-3">
                Source: {carouselItems[index].source}
              </p>
              <p className="text-sm mt-3">
                Tags: {carouselItems[index].tags.split("|").join(", ")}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute left-2 top-[50%] text-black dark:text-white dark:bg-[#12131f] bg-slate-300 flex p-1 rounded-full">
          <button
            type="button"
            title="next_article"
            onClick={() => prevCarouselItem()}
          >
            <IoChevronBack size={25} />
          </button>
        </div>
        <div className="absolute right-2 top-[50%] text-black dark:text-white bg-slate-300 dark:bg-[#12131f] flex p-1 rounded-full">
          <button
            type="button"
            title="next_article"
            onClick={() => nextCarouselItem()}
          >
            <IoChevronForward size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel;
