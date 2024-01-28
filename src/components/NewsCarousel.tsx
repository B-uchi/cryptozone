import { useState } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";

export type NewsCarouselProps = {
  news: {
    title: string;
    body: string;
    imageurl: string;
    published_on: number;
    url: string;
    source: string;
    tags: string;
  }[];
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
    <div className="w-full mt-5 flex justify-center items-center">
      <div className="w-[90%] h-[60vh] bg-white dark:bg-black flex justify-center items-center border-[2px] border-[#efefef] dark:border-[#171717] cursor-pointer relative">
        <div className="flex ">
          <div className="w-1/2 flex justify-center">
            <img
              src={carouselItems[index].imageurl}
              alt=""
              className="w-[50%] rounded-md"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl font-bold">{carouselItems[index].title}</h1>
            <p className="text-md w-[90%] mt-3 line-clamp-2">
              {carouselItems[index].body}
            </p>
            <div className="">
              <p className="text-sm mt-3">
                Source: {carouselItems[index].source}
              </p>
              <p className="text-sm mt-3">
                Tags: {carouselItems[index].tags.split("|").join(", ")}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute left-2 top-[50%] text-black dark:text-white">
          <button
            type="button"
            title="next_article"
            onClick={() => prevCarouselItem()}
          >
            <IoChevronBack size={25} />
          </button>
        </div>
        <div className="absolute right-2 top-[50%] text-black dark:text-white">
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
