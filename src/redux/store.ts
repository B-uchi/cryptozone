import { cryptoNewsApi } from "../util/cryptoNewsAPI";
import { configureStore } from "@reduxjs/toolkit";

import { cryptocurrencyApi } from "../util/cryptocurrencyAPI";

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
