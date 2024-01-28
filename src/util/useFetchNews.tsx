import { useState } from "react"
import axios from "axios"

type useFetchNewsProps = {
    category: string,
    count: number
}

const useFetchNews = (props: useFetchNewsProps) => {
    const [news, setNews] = useState([])
    const [isloading, setIsLoading] = useState(true)
    const { category, count } = props

    const fetchNews = () => {
        const requestOptions = {
          method: "POST",
          url: "https://newsnow.p.rapidapi.com/",
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "newsnow.p.rapidapi.com",
          },
          data: {
            text: {category} || "cryptocurrency",
            region: "wt-wt",
            max_results: {count},
          },
        };
        axios
          .request(requestOptions)
          .then((response) => {
            console.log(response.data.news);
            setIsLoading(false);
          })
          .catch((e) => {
            console.log(e.message);
            setIsLoading(false);
          });
      };
      fetchNews();
      return [isloading, news]
}

export default useFetchNews