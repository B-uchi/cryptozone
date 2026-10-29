export type Coin = {
  uuid: string;
  symbol: string;
  name: string;
  color: string | null;
  iconUrl: string;
  marketCap: string | null;
  price: string | null;
  listedAt: number;
  change: string | null;
  rank: number;
  sparkline: (string | null)[];
  "24hVolume": string | null;
  btcPrice: string;
  coinrankingUrl: string;
};

export type CoinLink = { name: string; type: string; url: string };

export type CoinDetail = Coin & {
  description: string | null;
  websiteUrl: string | null;
  links: CoinLink[] | null;
  supply: {
    confirmed: boolean;
    max: string | null;
    total: string | null;
    circulating: string | null;
  };
  numberOfMarkets: number;
  numberOfExchanges: number;
  fullyDilutedMarketCap: string | null;
  allTimeHigh: { price: string; timestamp: number };
  tags?: string[];
};

export type CoinRef = Pick<Coin, "uuid" | "symbol" | "name" | "iconUrl"> & {
  price?: string | null;
};

export type GlobalStats = {
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: string;
  total24hVolume: string;
  btcDominance: number;
  bestCoins: CoinRef[];
  newestCoins: CoinRef[];
};

export type PricePoint = { price: string | null; timestamp: number };

export type NewsArticle = {
  id: string;
  title: string;
  body: string;
  url: string;
  imageurl: string;
  published_on: number;
  tags: string;
  categories: string;
  source: string;
  source_info: { name: string; img: string };
};

export type SortKey = "marketCap" | "price" | "24hVolume" | "change" | "listedAt";
export type TimePeriod = "1h" | "3h" | "12h" | "24h" | "7d" | "30d" | "3m" | "1y" | "3y" | "5y";
