import CoinItem from "./CoinItem";
import { HeroSectionProps } from "./HeroSection";
import { NewsCarouselProps } from "./NewsCarousel";
import NewsItem from "./NewsItem";

export type TopCoinsProps = {
  coins?: HeroSectionProps["coin"][];
  news?: NewsCarouselProps["news"];
  gridSize: string;
};

const CoinGrid = (props: TopCoinsProps) => {
  const coins = props.coins;
  const news = props.news;
  const gridSize = props.gridSize;
  const styles =
    `grid grid-cols-1 gap-5 mt-2 relative md:grid-cols-${gridSize}`;
  return (
    <div className={styles}>
      {coins && coins.length > 0
        ? coins?.map((coin) => <CoinItem coin={coin} key={coin.name} />)
        : coins && (
            <p className="dark:text-white text-black absolute top-[50px] left-[50%] text-xl mx-auto">
              No coins found
            </p>
          )}
      {news && news.length > 0
        ? news?.map((news) => <NewsItem news={news} key={news.id} />)
        : news && (
            <p className="dark:text-white text-black absolute top-[50px] left-[50%] text-xl mx-auto">
              No news found
            </p>
          )}
    </div>
  );
};

export default CoinGrid;
