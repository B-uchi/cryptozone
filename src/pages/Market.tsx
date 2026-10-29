import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useGetCoinsQuery } from "../api/coinranking";
import { useDebounced, useDocumentTitle, useVisiblePolling } from "../lib/hooks";
import type { SortKey, TimePeriod } from "../lib/types";
import { EngravedRule } from "../components/Engraving";
import { ErrorState } from "../components/Bits";
import MarketTable, { type Sort } from "../components/MarketTable";

const PERIODS: TimePeriod[] = ["1h", "24h", "7d", "30d", "1y"];
const PAGE = 50;
const SORTS: SortKey[] = ["marketCap", "price", "24hVolume", "change", "listedAt"];

export function Segmented<T extends string>({ value, options, onChange, label }: { value: T; options: readonly T[]; onChange: (v: T) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-lg border border-rule bg-panel p-0.5">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={`serial h-8 min-w-[2.75rem] rounded-md px-2.5 text-xs transition-colors duration-150 ${
            value === o ? "bg-note text-note-ink" : "text-muted hover:bg-sunk hover:text-ink"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function Market() {
  useDocumentTitle("Market");
  const [params, setParams] = useSearchParams();
  const period = (PERIODS.includes(params.get("period") as TimePeriod) ? params.get("period") : "24h") as TimePeriod;
  const sortKey = (SORTS.includes(params.get("sort") as SortKey) ? params.get("sort") : "marketCap") as SortKey;
  const dir = params.get("dir") === "asc" ? "asc" : "desc";
  const page = Math.max(1, parseInt(params.get("page") ?? "1", 10) || 1);
  const [search, setSearch] = useState(params.get("q") ?? "");
  const q = useDebounced(search.trim(), 300);

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(patch)) (v === null ? next.delete(k) : next.set(k, v));
    setParams(next, { replace: true });
  };

  useEffect(() => {
    if ((params.get("q") ?? "") !== q) update({ q: q || null, page: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const polling = useVisiblePolling(60_000);
  const { data, isFetching, isError, refetch } = useGetCoinsQuery(
    { limit: PAGE, offset: (page - 1) * PAGE, orderBy: sortKey, orderDirection: dir, timePeriod: period, search: q || undefined },
    { pollingInterval: polling }
  );

  const total = data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE));

  const onSort = (key: SortKey) => {
    const nextDir = sortKey === key && dir === "desc" ? "asc" : "desc";
    update({ sort: key === "marketCap" && nextDir === "desc" ? null : key, dir: nextDir === "desc" ? null : "asc", page: null });
  };
  const sort: Sort = { key: sortKey, dir };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="denom text-4xl leading-none sm:text-5xl">Market</h1>
          <p className="mt-3 max-w-lg text-muted">
            {data ? `${total.toLocaleString()} coins` : "Every coin"} ranked by live data. Sort any column, change the period, star what you want to follow.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex h-10 items-center rounded-lg border border-rule bg-panel focus-within:border-faint sm:w-72">
            <span className="sr-only">Filter coins by name or symbol</span>
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 h-4 w-4 text-faint" aria-hidden="true" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by name or symbol"
              className="h-full w-full bg-transparent pl-9 pr-9 text-sm outline-none placeholder:text-faint"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} aria-label="Clear filter" className="absolute right-2 grid h-6 w-6 place-items-center rounded text-faint hover:bg-sunk hover:text-ink">
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </label>
          <Segmented label="Change period" value={period} options={PERIODS} onChange={(p) => update({ period: p === "24h" ? null : p, sort: sortKey === "change" ? "change" : params.get("sort") })} />
        </div>
      </header>
      <EngravedRule seed="market" text="cryptozone market ledger · ranked by live data" />

      <div className="mt-4">
        {isError ? (
          <ErrorState onRetry={refetch} />
        ) : data && data.coins.length === 0 ? (
          <div className="hatch rounded-note border border-dashed border-rule px-6 py-16 text-center">
            <p className="text-lg font-semibold">No coin matches “{q}”</p>
            <p className="mt-1 text-sm text-muted">Check the spelling, or try the ticker symbol instead (BTC, SOL, DOGE).</p>
            <button type="button" className="btn-outline mt-5" onClick={() => setSearch("")}>
              Clear filter
            </button>
          </div>
        ) : (
          <MarketTable
            coins={data?.coins}
            loading={isFetching}
            rows={12}
            sort={sort}
            onSort={onSort}
            periodLabel={period}
            caption={`Cryptocurrencies sorted by ${sortKey}, ${dir}ending`}
          />
        )}
      </div>

      {data && pages > 1 && (
        <nav aria-label="Pagination" className="mt-6 flex items-center justify-between gap-4">
          <p className="num text-sm text-muted">
            {((page - 1) * PAGE + 1).toLocaleString()}–{Math.min(page * PAGE, total).toLocaleString()} of {total.toLocaleString()}
          </p>
          <div className="flex items-center gap-2">
            <button type="button" className="btn-outline" disabled={page <= 1} onClick={() => update({ page: page - 1 > 1 ? String(page - 1) : null })}>
              <ChevronLeftIcon className="h-4 w-4" /> <span className="hidden sm:inline">Previous</span>
            </button>
            <span className="serial px-2 text-xs text-muted">
              {page} / {pages.toLocaleString()}
            </span>
            <button type="button" className="btn-outline" disabled={page >= pages} onClick={() => update({ page: String(page + 1) })}>
              <span className="hidden sm:inline">Next</span> <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
