

export type NewsCarouselProps = {
  news: {
    title: string;
    description: string;
    imageUrl: string;
    date: string;
  }[];
};

const NewsCarousel: React.FC<NewsCarouselProps> = (props) => {
  const carouselItems = props.news;
  return <div>
    <div className="bg-red-500 w-full h-[60vh] flex">g</div>
    </div>;
};

export default NewsCarousel;



