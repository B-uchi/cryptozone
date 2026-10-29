import { configureStore } from "@reduxjs/toolkit";
import { coinrankingApi } from "./api/coinranking";
import { newsApi } from "./api/news";

const store = configureStore({
  reducer: {
    [coinrankingApi.reducerPath]: coinrankingApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(coinrankingApi.middleware, newsApi.middleware),
});

export default store;
