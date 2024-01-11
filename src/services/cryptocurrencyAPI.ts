import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptocurrencyApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "d611980c9bmsha19dd833aeb41d9p1c24fbjsn325ea659ad23",
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
  }),
});

export const { useGetCryptocurrenciesQuery } = cryptocurrencyApi;