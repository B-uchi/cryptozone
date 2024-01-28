export type NewsType = {
  news: {
    title: string;
    date: string;
    body: string;
    image: string;
    source: string;
    url: string;
  };
};
export type NewsCarouselProps = {
  news: NewsType[];
};

const NewsCarousel = (props: NewsCarouselProps) => {
  const carouselItems = props.news;
  return <div>
    
    
  </div>;
};

export default NewsCarousel;
