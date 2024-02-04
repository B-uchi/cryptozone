import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptocurrencyApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url: string) => ({ url, headers: cryptocurrencyApiHeaders });

export const cryptocurrencyApi = createApi({
  reducerPath: "cryptocurrencyApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptocurrencies: builder.query({
      query: () => createRequest("/coins"),
    }),
    getCryptocurrencyDetails: builder.query({
      query: (coinUuid) => createRequest(`/coin/${coinUuid}`),
    }),
  }),
});

export const { useGetCryptocurrenciesQuery, useGetCryptocurrencyDetailsQuery } = cryptocurrencyApi;