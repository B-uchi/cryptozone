import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { useGetCoinsQuery, useGetStatsQuery } from "../api/coinranking";
import { useGetNewsQuery } from "../api/news";
import { count, serialFor, toNum, usd, usdShort } from "../lib/format";
import { useDocumentTitle, useVisiblePolling } from "../lib/hooks";
import type { Coin, CoinRef } from "../lib/types";
import { Change, CoinIcon, ErrorState, Skeleton } from "../components/Bits";
import { GuillocheBand, Microprint, Rosette } from "../components/Engraving";
import MarketTable from "../components/MarketTable";
import { LeadStory, StoryRow, StoryRowSkeleton } from "../components/NewsBits";

const today = new Date();
const issued = today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();

function MarketNote({ btc }: { btc?: Coin }) {
  const { data: stats, isError, refetch } = useGetStatsQuery();
  const series = useMemo(() => (btc?.sparkline ?? []).map(toNum).filter((n): n is number => n !== null), [btc]);

  if (isError) return <ErrorState title="Couldn't load global market stats" onRetry={refetch} />;

  return (
    <section
      aria-labelledby="note-title"
      className="relative isolate overflow-hidden rounded-note bg-note text-note-ink shadow-note"
    >
      {/* Engraved frame */}
      <div className="pointer-events-none absolute inset-2 rounded-[10px] border border-note-ink/15" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-[13px] rounded-[7px] border border-note-ink/10" aria-hidden="true" />
      <Rosette
        seed={`market-${issued}`}
        accent="rgb(var(--note-serial))"
        className="pointer-events-none absolute -right-44 -top-44 -z-10 h-[380px] w-[380px] text-note-dim opacity-40 sm:-right-16 sm:top-1/2 sm:h-[620px] sm:w-[620px] sm:-translate-y-1/2 sm:opacity-50 lg:right-6 lg:opacity-70"
      />

      <div className="relative px-6 pb-0 pt-7 sm:px-10 sm:pt-9">
        <div className="flex justify-end text-[0.7rem]">
          <span className="serial text-note-serial">{serialFor(issued, 1)}</span>
        </div>

        <h1 id="note-title" className="sr-only">Crypto market overview</h1>

        <div className="mt-10 max-w-2xl sm:mt-14">
          {stats ? (
            <p className="denom animate-rise text-[3.25rem] leading-[0.9] sm:text-7xl lg:text-[6rem]">
              {usdShort(stats.totalMarketCap)}
            </p>
          ) : (
            <div className="h-[0.9em] w-[5ch] animate-pulse rounded-lg bg-note-ink/10 text-[3.25rem] sm:text-7xl lg:text-[6rem]" />
          )}
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-note-dim">
            Total value of every coin in circulation, across {stats ? count(stats.totalCoins) : "…"} tracked currencies and{" "}
            {stats ? count(stats.totalExchanges) : "…"} exchanges.
          </p>
        </div>

        <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-note-ink/15 pt-6 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-note-dim">24h volume</dt>
            <dd className="num mt-1 text-xl font-bold">{stats ? usdShort(stats.total24hVolume) : "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-note-dim">Bitcoin dominance</dt>
            <dd className="mt-1">
              <span className="num text-xl font-bold">{stats ? `${stats.btcDominance.toFixed(1)}%` : "—"}</span>
              <span className="mt-2 block h-1 w-full max-w-[9rem] overflow-hidden rounded-full bg-note-ink/15">
                <span
                  className="block h-full rounded-full bg-note-ink transition-[width] duration-700 ease-out"
                  style={{ width: `${stats?.btcDominance ?? 0}%` }}
                />
              </span>
            </dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-xs text-note-dim">Bitcoin</dt>
            <dd className="mt-1 flex items-baseline gap-2">
              {btc ? (
                <>
                  <Link to={`/coins/${btc.uuid}`} className="num text-xl font-bold underline decoration-note-ink/30 underline-offset-4 hover:decoration-note-ink">
                    {usd(btc.price)}
                  </Link>
                  <span className="rounded bg-note-ink px-1.5 py-0.5 [&_*]:!text-[rgb(var(--note))]">
                    <Change value={btc.change} />
                  </span>
                </>
              ) : (
                <span className="num text-xl font-bold">—</span>
              )}
            </dd>
          </div>
        </dl>
      </div>

      <div className="relative mt-6">
        <GuillocheBand series={series} className="h-24 w-full text-note-dim sm:h-28" />
        <p className="sr-only">Decorative engraving traced from Bitcoin's last 24 hours of price.</p>
      </div>
      <div className="relative flex items-center gap-4 border-t border-note-ink/15 px-6 py-2.5 sm:px-10">
        <span className="serial shrink-0 text-[0.65rem] text-note-dim">CryptoZone global market · Issued {issued}</span>
        <Microprint text="value of the global crypto market · engraved from live data" className="flex-1 text-note-dim/70" />
        <span className="serial shrink-0 text-[0.65rem] text-note-dim">BTC 24h trace</span>
      </div>
    </section>
  );
}

function Movers({ coins }: { coins?: Coin[] }) {
  const [tab, setTab] = useState<"gainers" | "losers">("gainers");
  const list = useMemo(() => {
    if (!coins) return null;
    const valid = coins.filter((c) => toNum(c.change) !== null && toNum(c["24hVolume"])! > 1_000_000);
    const sorted = [...valid].sort((a, b) => toNum(b.change)! - toNum(a.change)!);
    return (tab === "gainers" ? sorted : sorted.reverse()).slice(0, 6);
  }, [coins, tab]);

  return (
    <section aria-labelledby="movers-title" className="ledger">
      <div className="flex items-center justify-between gap-3">
        <h2 id="movers-title" className="text-lg font-bold tracking-[-0.01em]">Movers, 24h</h2>
        <div role="tablist" aria-label="Movers" className="flex rounded-lg bg-sunk p-0.5 text-xs font-semibold">
          {(["gainers", "losers"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              type="button"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-md px-2.5 py-1 capitalize transition-colors duration-150 ${tab === t ? "bg-panel text-ink shadow-sm" : "text-muted hover:text-ink"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-1 text-xs text-faint">Top 100 by market cap, over $1M daily volume</p>
      <ol className="mt-3 divide-y divide-rule/70">
        {list
          ? list.map((c) => (
              <li key={c.uuid}>
                <Link to={`/coins/${c.uuid}`} className="flex items-center gap-3 py-2.5 hover:bg-sunk/60">
                  <CoinIcon src={c.iconUrl} name={c.name} className="h-6 w-6" />
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                    {c.name} <span className="serial ml-0.5 text-[0.65rem] text-faint">{c.symbol}</span>
                  </span>
                  <span className="num text-sm text-muted">{usd(c.price)}</span>
                  <Change value={c.change} className="w-[4.5rem] justify-end text-sm" />
                </Link>
              </li>
            ))
          : Array.from({ length: 6 }, (_, i) => (
              <li key={i} className="flex items-center gap-3 py-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-3.5 flex-1" />
                <Skeleton className="h-3.5 w-14" />
              </li>
            ))}
      </ol>
    </section>
  );
}

function CoinChips({ title, coins }: { title: string; coins?: CoinRef[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-muted">{title}</h3>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {coins
          ? coins.map((c) => (
              <Link
                key={c.uuid}
                to={`/coins/${c.uuid}`}
                className="flex items-center gap-2 rounded-full border border-rule bg-panel py-1 pl-1 pr-3 text-sm font-semibold transition-colors duration-150 hover:border-faint hover:bg-sunk"
              >
                <CoinIcon src={c.iconUrl} name={c.name} className="h-5 w-5" />
                {c.name}
              </Link>
            ))
          : Array.from({ length: 3 }, (_, i) => <Skeleton key={i} className="h-7 w-24 rounded-full" />)}
      </div>
    </div>
  );
}

export default function Overview() {
  useDocumentTitle("");
  const polling = useVisiblePolling(60_000);
  const { data, isError, refetch } = useGetCoinsQuery({ limit: 100 }, { pollingInterval: polling });
  const { data: stats } = useGetStatsQuery();
  const { data: news, isError: newsError } = useGetNewsQuery({});
  const coins = data?.coins;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8">
      <MarketNote btc={coins?.find((c) => c.symbol === "BTC")} />

      <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
        <section aria-labelledby="leaders-title">
          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <h2 id="leaders-title" className="text-2xl font-bold tracking-[-0.015em]">Market leaders</h2>
              <p className="mt-1 text-sm text-muted">The ten largest coins by market cap. Prices refresh every minute.</p>
            </div>
            <Link to="/coins" className="btn-quiet shrink-0 px-2 text-ink">
              Full market <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          {isError ? (
            <ErrorState onRetry={refetch} />
          ) : (
            <MarketTable coins={coins?.slice(0, 10)} compact caption="Top ten cryptocurrencies by market cap" />
          )}
        </section>

        <aside className="flex flex-col gap-8">
          <Movers coins={coins} />
          <div className="flex flex-col gap-6 px-1">
            <CoinChips title="Best performers on Coinranking" coins={stats?.bestCoins} />
            <CoinChips title="Newly listed" coins={stats?.newestCoins} />
          </div>
        </aside>
      </div>

      <section aria-labelledby="news-title" className="mt-20">
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-rule pb-3">
          <h2 id="news-title" className="text-2xl font-bold tracking-[-0.015em]">Headlines</h2>
          <Link to="/news" className="btn-quiet shrink-0 px-2 text-ink">
            All news <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        {newsError ? (
          <ErrorState title="Couldn't load the news feed" />
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
            {news?.[0] ? <LeadStory a={news[0]} /> : <Skeleton className="aspect-[16/7] w-full rounded-note" />}
            <div className="divide-y divide-rule/70 lg:-mt-4">
              {news ? news.slice(1, 5).map((a) => <StoryRow key={a.id} a={a} />) : Array.from({ length: 4 }, (_, i) => <StoryRowSkeleton key={i} />)}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
