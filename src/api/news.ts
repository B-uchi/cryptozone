import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { NewsArticle } from "../lib/types";

type NewsArgs = { categories?: string; before?: number };

const rawBaseQuery = fetchBaseQuery({ baseUrl: "https://min-api.cryptocompare.com/data/v2" });

export const newsApi = createApi({
  reducerPath: "newsApi",
  // CryptoCompare reports failures (rate limits, bad keys) as HTTP 200 with a non-array Data field.
  baseQuery: async (args: string, api, extra) => {
    const result = await rawBaseQuery(args, api, extra);
    const body = result.data as { Data?: unknown; Message?: string } | undefined;
    if (body && !Array.isArray(body.Data)) {
      return { error: { status: "CUSTOM_ERROR" as const, error: body.Message ?? "News feed unavailable" } };
    }
    return result;
  },
  endpoints: (builder) => ({
    getNews: builder.query<NewsArticle[], NewsArgs>({
      query: ({ categories, before }) => {
        const params = new URLSearchParams({ lang: "EN", api_key: import.meta.env.VITE_CRYPTOCOMPAREAPI });
        if (categories) params.set("categories", categories);
        if (before) params.set("lTs", String(before));
        return `/news/?${params}`;
      },
      transformResponse: (res: { Data: NewsArticle[] }) => res.Data,
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
