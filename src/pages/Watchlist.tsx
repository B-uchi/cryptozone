import { useMemo } from "react";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";
import { useGetCoinsQuery } from "../api/coinranking";
import { toNum, usdShort } from "../lib/format";
import { useDocumentTitle, useVisiblePolling, useWatchlist } from "../lib/hooks";
import { Change, ErrorState } from "../components/Bits";
import { EngravedRule, Rosette } from "../components/Engraving";
import MarketTable from "../components/MarketTable";

export default function Watchlist() {
  useDocumentTitle("Watchlist");
  const { ids } = useWatchlist();
  const polling = useVisiblePolling(60_000);
  const { data, isError, refetch, isFetching } = useGetCoinsQuery({ uuids: ids, limit: 100 }, { skip: ids.length === 0, pollingInterval: polling });

  // Keep the list stable while the query refetches after a star is removed.
  const coins = useMemo(() => data?.coins.filter((c) => ids.includes(c.uuid)), [data, ids]);

  const summary = useMemo(() => {
    if (!coins?.length) return null;
    const changes = coins.map((c) => toNum(c.change)).filter((n): n is number => n !== null);
    const avg = changes.reduce((a, b) => a + b, 0) / (changes.length || 1);
    const best = [...coins].sort((a, b) => (toNum(b.change) ?? -Infinity) - (toNum(a.change) ?? -Infinity))[0];
    const cap = coins.reduce((a, c) => a + (toNum(c.marketCap) ?? 0), 0);
    return { avg, best, cap };
  }, [coins]);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="denom text-4xl leading-none sm:text-5xl">Watchlist</h1>
          <p className="mt-3 max-w-lg text-muted">Coins you've starred. Saved in this browser, no account needed.</p>
        </div>
        {summary && (
          <dl className="flex gap-8 text-sm">
            <div>
              <dt className="text-muted">Average 24h</dt>
              <dd className="mt-0.5 text-lg"><Change value={summary.avg} /></dd>
            </div>
            <div>
              <dt className="text-muted">Best today</dt>
              <dd className="mt-0.5 text-lg font-semibold">
                <Link to={`/coins/${summary.best.uuid}`} className="hover:underline">{summary.best.symbol}</Link>{" "}
                <Change value={summary.best.change} />
              </dd>
            </div>
            <div className="hidden sm:block">
              <dt className="text-muted">Combined cap</dt>
              <dd className="num mt-0.5 text-lg font-semibold">{usdShort(summary.cap)}</dd>
            </div>
          </dl>
        )}
      </header>
      <EngravedRule seed="watch" text="cryptozone watchlist · kept in this browser" />

      <div className="mt-8">
        {ids.length === 0 ? (
          <div className="relative overflow-hidden rounded-note border border-rule bg-panel px-6 py-16 sm:px-12">
            <Rosette seed="watchlist-empty" className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] text-rule" />
            <div className="relative max-w-md">
              <StarIcon className="h-8 w-8 text-serial" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-bold tracking-[-0.01em]">Nothing starred yet</h2>
              <p className="mt-2 leading-relaxed text-muted">
                Tap the star next to any coin in the market, or on a coin's page, and it will be kept here with live prices.
              </p>
              <Link to="/coins" className="btn-solid mt-6">
                Browse the market
              </Link>
            </div>
          </div>
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : (
          <MarketTable coins={coins} loading={isFetching} rows={Math.min(ids.length, 8)} caption="Your starred coins" />
        )}
      </div>
    </div>
  );
}
