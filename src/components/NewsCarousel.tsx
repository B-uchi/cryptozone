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
  }
};

export type NewsCarouselProps = {
  news: NewsItemProps['news'][];
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
      <div className="w-[100%] h-[70vh] md:h-[60vh] bg-white dark:bg-black flex justify-center items-center border-[2px] border-[#efefef] dark:border-[#171717] cursor-pointer relative">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-[50%] flex md:justify-center md:items-center ">
            <img
              src={carouselItems[index].imageurl}
              alt=""
              className="w-[80%] md:w-[60%] rounded-md"
            />
          </div>
          <div className="w-[90%] md:w-[50%] flex flex-col justify-center items-start p-2">
            <h1 className="text-lg md:text-3xl line-clamp-1 md:line-clamp-none font-bold">{carouselItems[index].title}</h1>
            <p className="text-md hidden md:block w-[90%] md:w-[80%] mt-3 line-clamp-3">
              {carouselItems[index].body}
            </p>
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
