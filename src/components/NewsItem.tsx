import * as React from "react"
import { NewsItemProps } from "./NewsCarousel"

const NewsItem: React.FC<NewsItemProps> = (props) => {
  const news = props.news;
  return (
    <div className="p-3 gap-3 rounded-md h-[200px] bg-[#12131f] flex items-center">
      <div className="w-[70%] h-[80%]">
        <h1 className="line-clamp-1 font-bold">{news.title}</h1>
        <p className="line-clamp-6 text-sm">{news.body}</p>
      </div>
      <div className="w-[30%] p-2">
        <img src={news.imageurl} alt="" className="w-full rounded-md"/>
      </div>
    </div>
  )
}

export default NewsItem