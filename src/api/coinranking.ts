import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import type { Coin, CoinDetail, CoinRef, GlobalStats, PricePoint, SortKey, TimePeriod } from "../lib/types";

type CoinsArgs = {
  limit?: number;
  offset?: number;
  orderBy?: SortKey;
  orderDirection?: "asc" | "desc";
  search?: string;
  timePeriod?: TimePeriod;
  uuids?: string[];
};

type CoinsResult = { coins: Coin[]; total: number };

function coinsQuery(args: CoinsArgs) {
  const params = new URLSearchParams();
  params.set("limit", String(args.limit ?? 50));
  if (args.offset) params.set("offset", String(args.offset));
  if (args.orderBy) params.set("orderBy", args.orderBy);
  if (args.orderDirection) params.set("orderDirection", args.orderDirection);
  if (args.search) params.set("search", args.search);
  if (args.timePeriod) params.set("timePeriod", args.timePeriod);
  args.uuids?.forEach((id) => params.append("uuids[]", id));
  return `/coins?${params}`;
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "https://coinranking1.p.rapidapi.com",
  prepareHeaders: (headers) => {
    headers.set("x-rapidapi-host", "coinranking1.p.rapidapi.com");
    headers.set("x-rapidapi-key", import.meta.env.VITE_RAPIDAPI_KEY);
    return headers;
  },
});

export const coinrankingApi = createApi({
  reducerPath: "coinrankingApi",
  // The free RapidAPI tier rate-limits bursts, so back off and retry on 429s and transient failures.
  baseQuery: retry(
    async (args: string, api, extra) => {
      const result = await rawBaseQuery(args, api, extra);
      const status = result.error?.status;
      if (result.error && status !== 429 && status !== "FETCH_ERROR" && !(typeof status === "number" && status >= 500)) {
        retry.fail(result.error);
      }
      return result;
    },
    { maxRetries: 3, backoff: (attempt) => new Promise((r) => setTimeout(r, 800 * 2 ** attempt + Math.random() * 400)) }
  ),
  endpoints: (builder) => ({
    getCoins: builder.query<CoinsResult, CoinsArgs>({
      query: coinsQuery,
      transformResponse: (res: { data: { coins: Coin[]; stats: { total: number } } }) => ({
        coins: res.data.coins,
        total: res.data.stats.total,
      }),
    }),
    getStats: builder.query<GlobalStats, void>({
      query: () => "/stats",
      transformResponse: (res: { data: GlobalStats }) => res.data,
    }),
    getCoin: builder.query<CoinDetail, string>({
      query: (uuid) => `/coin/${uuid}`,
      transformResponse: (res: { data: { coin: CoinDetail } }) => res.data.coin,
    }),
    getHistory: builder.query<{ change: string | null; history: PricePoint[] }, { uuid: string; timePeriod: TimePeriod }>({
      query: ({ uuid, timePeriod }) => `/coin/${uuid}/history?timePeriod=${timePeriod}`,
      transformResponse: (res: { data: { change: string | null; history: PricePoint[] } }) => res.data,
    }),
    searchCoins: builder.query<CoinRef[], string>({
      query: (q) => `/search-suggestions?query=${encodeURIComponent(q)}`,
      transformResponse: (res: { data: { coins: CoinRef[] } }) => res.data.coins,
    }),
  }),
});

export const {
  useGetCoinsQuery,
  useGetStatsQuery,
  useGetCoinQuery,
  useGetHistoryQuery,
  useSearchCoinsQuery,
} = coinrankingApi;
