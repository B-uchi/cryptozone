import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon, ArrowsUpDownIcon } from "@heroicons/react/16/solid";
import { useGetCoinQuery, useGetHistoryQuery } from "../api/coinranking";
import { useGetNewsQuery } from "../api/news";
import { count, date, pct, serialFor, toNum, usd, usdShort } from "../lib/format";
import { useDocumentTitle, useFlash, useRecentCoins, useVisiblePolling } from "../lib/hooks";
import type { CoinDetail as Detail, TimePeriod } from "../lib/types";
import { Change, CoinIcon, ErrorState, Skeleton, StarButton } from "../components/Bits";
import { Microprint, Rosette } from "../components/Engraving";
import PriceChart, { type Point } from "../components/PriceChart";
import { Segmented } from "./Market";
import { StoryCard } from "../components/NewsBits";

const PERIODS: TimePeriod[] = ["24h", "7d", "30d", "3m", "1y", "3y", "5y"];

function NoteFace({ coin }: { coin: Detail }) {
  const price = toNum(coin.price);
  const flash = useFlash(price);
  const ath = toNum(coin.allTimeHigh?.price);
  const fromAth = price && ath ? ((price - ath) / ath) * 100 : null;
  return (
    <section aria-labelledby="coin-title" className="relative isolate overflow-hidden rounded-note bg-note text-note-ink shadow-note">
      <div className="pointer-events-none absolute inset-2 rounded-[10px] border border-note-ink/15" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-[13px] rounded-[7px] border border-note-ink/10" aria-hidden="true" />
      <Rosette
        seed={coin.uuid}
        accent="rgb(var(--note-serial))"
        className="pointer-events-none absolute -right-44 -top-44 -z-10 h-[360px] w-[360px] text-note-dim opacity-40 sm:-right-10 sm:top-1/2 sm:h-[560px] sm:w-[560px] sm:-translate-y-1/2 sm:opacity-45 lg:right-10 lg:opacity-70"
      />
      <div className="relative px-6 pb-8 pt-7 sm:px-10 sm:pb-10 sm:pt-9">
        <div className="flex justify-end text-[0.7rem]">
          <span className="serial text-note-serial">{serialFor(coin.uuid, coin.rank)}</span>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-note-ink p-2.5 shadow-lift">
            <CoinIcon src={coin.iconUrl} name={coin.name} className="h-full w-full" eager />
          </span>
          <div className="min-w-0">
            <h1 id="coin-title" className="truncate text-2xl font-bold tracking-[-0.015em] sm:text-3xl">
              {coin.name}
            </h1>
            <p className="serial text-xs text-note-dim">{coin.symbol} / USD · Rank {coin.rank}</p>
          </div>
        </div>

        <p
          className={`denom mt-8 inline-block rounded-lg text-[2.75rem] leading-none sm:text-7xl ${flash ? "animate-rise" : ""}`}
          aria-live="polite"
        >
          {usd(coin.price)}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <span className="flex items-center gap-2">
            <span className="rounded bg-note-ink px-1.5 py-0.5 [&_*]:!text-[rgb(var(--note))]">
              <Change value={coin.change} />
            </span>
            <span className="text-note-dim">last 24h</span>
          </span>
          {fromAth !== null && (
            <span className="text-note-dim">
              <span className="num font-semibold text-note-ink">{pct(fromAth)}</span> from all-time high of {usd(ath)}
            </span>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <span className="rounded-full bg-note-ink/10 [&_button]:text-note-ink [&_button:hover]:bg-note-ink/15">
            <StarButton uuid={coin.uuid} name={coin.name} />
          </span>
          {coin.websiteUrl && (
            <a
              href={coin.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-note-ink/10 px-3.5 text-sm font-semibold transition-colors hover:bg-note-ink/20"
            >
              Website <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
            </a>
          )}
          <a
            href={coin.coinrankingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-note-ink/10 px-3.5 text-sm font-semibold transition-colors hover:bg-note-ink/20"
          >
            Coinranking <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      <div className="relative border-t border-note-ink/15 px-6 py-2.5 sm:px-10">
        <Microprint text={`${coin.name} · ${coin.symbol} · rank ${coin.rank} · cryptozone`} className="text-note-dim/70" />
      </div>
    </section>
  );
}

function ChartPanel({ coin }: { coin: Detail }) {
  const [period, setPeriod] = useState<TimePeriod>("7d");
  const [hover, setHover] = useState<Point | null>(null);
  const { data, isFetching, isError, refetch } = useGetHistoryQuery({ uuid: coin.uuid, timePeriod: period });

  const points = useMemo<Point[]>(
    () =>
      (data?.history ?? [])
        .map((h) => ({ t: h.timestamp, p: toNum(h.price) }))
        .filter((d): d is Point => d.p !== null)
        .sort((a, b) => a.t - b.t),
    [data]
  );

  const stats = useMemo(() => {
    if (points.length < 2) return null;
    const ps = points.map((d) => d.p);
    return { open: ps[0], close: ps[ps.length - 1], high: Math.max(...ps), low: Math.min(...ps) };
  }, [points]);

  const withTime = period === "24h";
  const shown = hover ?? (points.length ? points[points.length - 1] : null);
  const shownChange = shown && stats ? ((shown.p - stats.open) / stats.open) * 100 : null;

  return (
    <section aria-labelledby="chart-title" className="min-w-0 rounded-note border border-rule bg-panel p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-h-[3.5rem]">
          <h2 id="chart-title" className="sr-only">{coin.name} price history</h2>
          {shown ? (
            <>
              <p className="num text-2xl font-bold tracking-[-0.01em]">
                {usd(shown.p)} <Change value={shownChange} className="ml-1 text-base" />
              </p>
              <p className="mt-0.5 text-sm text-muted">
                {hover ? date(hover.t, true) : `Latest · change over ${period}`}
              </p>
            </>
          ) : (
            <>
              <Skeleton className="h-7 w-40" />
              <Skeleton className="mt-2 h-3.5 w-28" />
            </>
          )}
        </div>
        <div className="overflow-x-auto">
          <Segmented label="Chart period" value={period} options={PERIODS} onChange={setPeriod} />
        </div>
      </div>

      <div className={`mt-4 transition-opacity duration-200 ${isFetching ? "opacity-50" : ""}`}>
        {isError ? (
          <ErrorState title="Couldn't load price history" onRetry={refetch} />
        ) : points.length > 1 ? (
          <PriceChart points={points} onHover={setHover} withTime={withTime} label={`${coin.name} price over ${period}`} />
        ) : (
          <Skeleton className="h-[340px] w-full" />
        )}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-4">
        {[
          ["Open", stats && usd(stats.open)],
          ["High", stats && usd(stats.high)],
          ["Low", stats && usd(stats.low)],
          ["Range", stats && pct(((stats.high - stats.low) / stats.low) * 100, false)],
        ].map(([k, v]) => (
          <div key={k} className="bg-panel px-4 py-3">
            <dt className="text-xs text-muted">{k} · {period}</dt>
            <dd className="num mt-0.5 font-semibold">{v ?? "—"}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Converter({ coin }: { coin: Detail }) {
  const price = toNum(coin.price) ?? 0;
  const [amount, setAmount] = useState("1");
  const [usdVal, setUsdVal] = useState(() => (price ? price.toFixed(2) : ""));
  const [lastEdited, setLastEdited] = useState<"coin" | "usd">("coin");

  useEffect(() => {
    // Keep the converter in step with live price updates.
    if (lastEdited === "coin") {
      const n = parseFloat(amount);
      setUsdVal(Number.isFinite(n) ? (n * price).toFixed(2) : "");
    } else {
      const n = parseFloat(usdVal);
      setAmount(Number.isFinite(n) && price ? String(+(n / price).toPrecision(8)) : "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);

  const field = "num h-11 w-full rounded-lg border border-rule bg-panel pl-3 pr-16 text-base font-semibold outline-none transition-colors focus:border-faint";

  return (
    <section aria-labelledby="convert-title" className="ledger">
      <h2 id="convert-title" className="text-lg font-bold tracking-[-0.01em]">Convert</h2>
      <span className="ledger-serial" aria-hidden="true">{coin.symbol} · FX</span>
      <div className="mt-4 flex flex-col gap-2">
        <label className="relative">
          <span className="sr-only">{coin.symbol} amount</span>
          <input
            inputMode="decimal"
            value={amount}
            onChange={(e) => {
              setLastEdited("coin");
              setAmount(e.target.value);
              const n = parseFloat(e.target.value);
              setUsdVal(Number.isFinite(n) ? (n * price).toFixed(2) : "");
            }}
            className={field}
          />
          <span className="serial pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">{coin.symbol}</span>
        </label>
        <ArrowsUpDownIcon className="mx-auto h-4 w-4 text-faint" aria-hidden="true" />
        <label className="relative">
          <span className="sr-only">US dollar amount</span>
          <input
            inputMode="decimal"
            value={usdVal}
            onChange={(e) => {
              setLastEdited("usd");
              setUsdVal(e.target.value);
              const n = parseFloat(e.target.value);
              setAmount(Number.isFinite(n) && price ? String(+(n / price).toPrecision(8)) : "");
            }}
            className={field}
          />
          <span className="serial pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">USD</span>
        </label>
      </div>
      <p className="mt-3 text-xs text-faint">At the live rate of {usd(price)} per {coin.symbol}.</p>
    </section>
  );
}

function Supply({ coin }: { coin: Detail }) {
  const circ = toNum(coin.supply?.circulating);
  const max = toNum(coin.supply?.max);
  const total = toNum(coin.supply?.total);
  const share = circ && max ? Math.min(100, (circ / max) * 100) : null;
  return (
    <section aria-labelledby="supply-title" className="ledger">
      <h2 id="supply-title" className="text-lg font-bold tracking-[-0.01em]">Supply</h2>
      <span className="ledger-serial" aria-hidden="true">{coin.symbol} · SP</span>
      <div className="mt-4">
        <div className="flex items-baseline justify-between text-sm">
          <span className="text-muted">Circulating</span>
          <span className="num font-semibold">{circ ? `${count(circ)} ${coin.symbol}` : "—"}</span>
        </div>
        {share !== null && (
          <div className="mt-2.5">
            <div className="hatch h-2.5 overflow-hidden rounded-full bg-sunk" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(share)} aria-label="Share of maximum supply in circulation">
              <div className="h-full rounded-full bg-note transition-[width] duration-700 ease-out" style={{ width: `${share}%` }} />
            </div>
            <p className="num mt-1.5 text-xs text-muted">{share.toFixed(1)}% of the maximum supply is in circulation</p>
          </div>
        )}
        <dl className="mt-4 space-y-2 border-t border-rule pt-3 text-sm">
          <div className="flex justify-between"><dt className="text-muted">Total</dt><dd className="num font-semibold">{total ? count(total) : "—"}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Maximum</dt><dd className="num font-semibold">{max ? count(max) : "No cap"}</dd></div>
        </dl>
      </div>
    </section>
  );
}

function Ledger({ coin }: { coin: Detail }) {
  const cap = toNum(coin.marketCap);
  const vol = toNum(coin["24hVolume"]);
  const rows: [string, string, string?][] = [
    ["Market cap", usdShort(coin.marketCap)],
    ["Fully diluted value", usdShort(coin.fullyDilutedMarketCap)],
    ["24h volume", usdShort(coin["24hVolume"])],
    ["Volume / market cap", cap && vol ? (vol / cap).toFixed(4) : "—", "How actively it trades relative to its size"],
    ["All-time high", usd(coin.allTimeHigh?.price), coin.allTimeHigh ? date(coin.allTimeHigh.timestamp) : undefined],
    ["Price in BTC", `${(toNum(coin.btcPrice) ?? 0).toPrecision(4)} BTC`],
    ["Markets", count(coin.numberOfMarkets), `on ${coin.numberOfExchanges} exchanges`],
    ["Listed", coin.listedAt ? date(coin.listedAt) : "—"],
  ];
  return (
    <section aria-labelledby="ledger-title" className="ledger">
      <h2 id="ledger-title" className="text-lg font-bold tracking-[-0.01em]">Market data</h2>
      <span className="ledger-serial" aria-hidden="true">{coin.symbol} · MD</span>
      <dl className="mt-3 grid sm:grid-cols-2 sm:gap-x-10">
        {rows.map(([k, v, note]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 border-b border-dashed border-rule py-3">
            <dt className="text-sm text-muted">
              {k}
              {note && <span className="block text-xs text-faint">{note}</span>}
            </dt>
            <dd className="num text-right font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const LINK_ORDER = ["website", "whitepaper", "explorer", "github", "twitter", "reddit", "telegram", "discord", "youtube", "medium", "facebook"];

function About({ coin }: { coin: Detail }) {
  const [expanded, setExpanded] = useState(false);
  const links = (coin.links ?? [])
    .filter((l) => l.type !== "cmc" && l.type !== "coingecko")
    .sort((a, b) => (LINK_ORDER.indexOf(a.type) + 99) % 99 - (LINK_ORDER.indexOf(b.type) + 99) % 99)
    .slice(0, 10);
  const desc = coin.description?.trim();
  return (
    <section aria-labelledby="about-title" className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div>
        <h2 id="about-title" className="text-2xl font-bold tracking-[-0.015em]">About {coin.name}</h2>
        {desc ? (
          <div className={`relative mt-3 max-w-[68ch] text-[1.02rem] leading-relaxed text-muted [&_a]:underline [&_h3]:mt-5 [&_h3]:font-bold [&_h3]:text-ink [&_p]:mt-3 ${expanded ? "" : "max-h-48 overflow-hidden"}`}>
            {HTMLReactParser(desc)}
            {!expanded && desc.length > 600 && <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-paper" />}
          </div>
        ) : (
          <p className="mt-3 text-muted">No description has been published for this coin yet.</p>
        )}
        {desc && desc.length > 600 && (
          <button type="button" className="btn-quiet mt-2 px-0 text-ink underline underline-offset-4" onClick={() => setExpanded((e) => !e)}>
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
        {coin.tags && coin.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {coin.tags.map((t) => (
              <span key={t} className="serial rounded border border-rule px-2 py-1 text-[0.65rem] text-muted">{t.replace(/-/g, " ")}</span>
            ))}
          </div>
        )}
      </div>
      {links.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted">Links</h3>
          <ul className="mt-2 divide-y divide-rule/70 border-y border-rule/70">
            {links.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-3 py-2.5 text-sm">
                  <span className="min-w-0">
                    <span className="serial block text-[0.6rem] text-faint">{l.type}</span>
                    <span className="block truncate font-semibold group-hover:underline group-hover:underline-offset-4">{l.name}</span>
                  </span>
                  <ArrowTopRightOnSquareIcon className="h-4 w-4 shrink-0 text-faint group-hover:text-ink" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function CoinNews({ coin }: { coin: Detail }) {
  const { data } = useGetNewsQuery({ categories: coin.symbol });
  const items = data?.filter((a) => a.categories.split("|").includes(coin.symbol)).slice(0, 3);
  if (!items || items.length === 0) return null;
  return (
    <section aria-labelledby="coin-news-title">
      <h2 id="coin-news-title" className="border-b border-rule pb-3 text-2xl font-bold tracking-[-0.015em]">
        In the news
      </h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a) => <StoryCard key={a.id} a={a} />)}
      </div>
    </section>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-[380px] animate-pulse rounded-note bg-note/80" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Skeleton className="h-[460px] rounded-note" />
        <div className="space-y-6">
          <Skeleton className="h-52 rounded-note" />
          <Skeleton className="h-52 rounded-note" />
        </div>
      </div>
    </div>
  );
}

export default function CoinDetail() {
  const { uuid = "" } = useParams();
  const polling = useVisiblePolling(60_000);
  const { data: coin, isLoading, isError, refetch, error } = useGetCoinQuery(uuid, { pollingInterval: polling });
  const { push } = useRecentCoins();
  useDocumentTitle(coin ? `${coin.name} ${usd(coin.price)}` : "Coin");

  useEffect(() => {
    if (coin) push({ uuid: coin.uuid, name: coin.name, symbol: coin.symbol, iconUrl: coin.iconUrl });
  }, [coin?.uuid]); // eslint-disable-line react-hooks/exhaustive-deps

  const status = (error as { status?: unknown } | undefined)?.status;
  const notFound = isError && (status === 404 || status === 422);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8">
      <Link to="/coins" className="btn-quiet -ml-2 mb-4 px-2">
        <ArrowLeftIcon className="h-4 w-4" /> Market
      </Link>
      {isLoading ? (
        <DetailSkeleton />
      ) : notFound ? (
        <ErrorState title="That coin isn't in the ledger" detail="The link may be outdated, or the coin was delisted. Search for it with ⌘K instead." />
      ) : isError || !coin ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <div className="space-y-6">
          <NoteFace coin={coin} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            <ChartPanel coin={coin} />
            <div className="flex flex-col gap-6">
              <Converter coin={coin} />
              <Supply coin={coin} />
            </div>
          </div>
          <Ledger coin={coin} />
          <div className="space-y-16 pt-10">
            <About coin={coin} />
            <CoinNews coin={coin} />
          </div>
        </div>
      )}
    </div>
  );
}
