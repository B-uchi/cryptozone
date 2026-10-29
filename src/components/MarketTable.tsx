import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon, ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { toNum, usd, usdShort } from "../lib/format";
import { useFlash } from "../lib/hooks";
import type { Coin, SortKey } from "../lib/types";
import { Change, CoinIcon, Skeleton, Sparkline, StarButton } from "./Bits";

export type Sort = { key: SortKey; dir: "asc" | "desc" };

type Props = {
  coins?: Coin[];
  loading?: boolean;
  rows?: number;
  sort?: Sort;
  onSort?: (key: SortKey) => void;
  periodLabel?: string;
  compact?: boolean;
  caption: string;
};

const Row = memo(function Row({ coin, compact }: { coin: Coin; compact?: boolean }) {
  const navigate = useNavigate();
  const flash = useFlash(toNum(coin.price));
  return (
    <tr
      onClick={() => navigate(`/coins/${coin.uuid}`)}
      className="group cursor-pointer border-b border-rule/70 transition-colors duration-100 last:border-0 hover:bg-sunk/70"
    >
      <td className="w-10 py-3 pl-2 sm:pl-3">
        <StarButton uuid={coin.uuid} name={coin.name} />
      </td>
      <td className="serial w-12 py-3 pr-2 text-xs text-faint">{coin.rank}</td>
      <td className="py-3 pr-4">
        <Link
          to={`/coins/${coin.uuid}`}
          onClick={(e) => e.stopPropagation()}
          className="flex min-w-0 items-center gap-3 outline-offset-4"
        >
          <CoinIcon src={coin.iconUrl} name={coin.name} />
          <span className="flex min-w-0 flex-col leading-tight sm:flex-row sm:items-baseline sm:gap-2">
            <span className="truncate font-semibold group-hover:underline group-hover:decoration-rule group-hover:underline-offset-4">
              {coin.name}
            </span>
            <span className="serial text-[0.7rem] text-faint">{coin.symbol}</span>
          </span>
        </Link>
      </td>
      <td className={`num py-3 pr-4 text-right font-semibold ${flash === "up" ? "animate-flash-up" : flash === "down" ? "animate-flash-down" : ""}`}>
        {usd(coin.price)}
      </td>
      <td className="py-3 pr-4 text-right">
        <Change value={coin.change} />
      </td>
      <td className="num hidden py-3 pr-4 text-right text-muted md:table-cell">{usdShort(coin.marketCap)}</td>
      {!compact && <td className="num hidden py-3 pr-4 text-right text-muted lg:table-cell">{usdShort(coin["24hVolume"])}</td>}
      <td className="hidden py-3 pr-3 sm:table-cell">
        <Sparkline data={coin.sparkline} change={coin.change} className="ml-auto h-9 w-28" />
      </td>
    </tr>
  );
});

function SortHeader({ label, k, sort, onSort, className = "" }: { label: string; k: SortKey; sort?: Sort; onSort?: (k: SortKey) => void; className?: string }) {
  const active = sort?.key === k;
  const Icon = !active ? ChevronUpDownIcon : sort!.dir === "desc" ? ChevronDownIcon : ChevronUpIcon;
  if (!onSort) return <th scope="col" className={`label py-3 pr-4 text-right font-semibold ${className}`}>{label}</th>;
  return (
    <th scope="col" aria-sort={active ? (sort!.dir === "desc" ? "descending" : "ascending") : "none"} className={`py-2 pr-4 text-right ${className}`}>
      <button
        type="button"
        onClick={() => onSort(k)}
        className={`label inline-flex items-center gap-1 rounded px-1 py-1 transition-colors hover:text-ink ${active ? "text-ink" : ""}`}
      >
        {label}
        <Icon className={`h-3.5 w-3.5 ${active ? "text-serial" : "opacity-50"}`} aria-hidden="true" />
      </button>
    </th>
  );
}

export default function MarketTable({ coins, loading, rows = 10, sort, onSort, periodLabel = "24h", compact, caption }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[340px] border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-rule">
            <th scope="col" className="w-10"><span className="sr-only">Watchlist</span></th>
            <th scope="col" className="label w-12 py-3 pr-2 text-left">#</th>
            <th scope="col" className="label py-3 pr-4 text-left">Coin</th>
            <SortHeader label="Price" k="price" sort={sort} onSort={onSort} />
            <SortHeader label={periodLabel} k="change" sort={sort} onSort={onSort} />
            <SortHeader label="Market cap" k="marketCap" sort={sort} onSort={onSort} className="hidden md:table-cell" />
            {!compact && <SortHeader label="Volume 24h" k="24hVolume" sort={sort} onSort={onSort} className="hidden lg:table-cell" />}
            <th scope="col" className="label hidden py-3 pr-3 text-right sm:table-cell">{periodLabel} trend</th>
          </tr>
        </thead>
        <tbody className={loading && coins ? "opacity-60 transition-opacity" : ""}>
          {coins
            ? coins.map((c) => <Row key={c.uuid} coin={c} compact={compact} />)
            : Array.from({ length: rows }, (_, i) => (
                <tr key={i} className="border-b border-rule/70">
                  <td className="py-4 pl-3"><Skeleton className="h-4 w-4 rounded-full" /></td>
                  <td className="py-4"><Skeleton className="h-3 w-5" /></td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-7 w-7 rounded-full" />
                      <Skeleton className="h-3.5 w-28" />
                    </div>
                  </td>
                  <td className="py-4 pr-4"><Skeleton className="ml-auto h-3.5 w-20" /></td>
                  <td className="py-4 pr-4"><Skeleton className="ml-auto h-3.5 w-12" /></td>
                  <td className="hidden py-4 pr-4 md:table-cell"><Skeleton className="ml-auto h-3.5 w-16" /></td>
                  {!compact && <td className="hidden py-4 pr-4 lg:table-cell"><Skeleton className="ml-auto h-3.5 w-16" /></td>}
                  <td className="hidden py-4 pr-3 sm:table-cell"><Skeleton className="ml-auto h-8 w-28" /></td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
