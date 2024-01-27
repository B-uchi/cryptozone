import { cryptoNewsApi } from "./../services/cryptoNewsAPI";
import { configureStore } from "@reduxjs/toolkit";

import { cryptocurrencyApi } from "../services/cryptocurrencyAPI";

export default configureStore({
  reducer: {
    [cryptocurrencyApi.reducerPath]: cryptocurrencyApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cryptocurrencyApi.middleware,
      cryptoNewsApi.middleware
    ),
});
