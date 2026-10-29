import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon, ArrowDownLeftIcon } from "@heroicons/react/20/solid";
import { ClockIcon, NewspaperIcon, StarIcon, TableCellsIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useSearchCoinsQuery, useGetCoinsQuery } from "../api/coinranking";
import { useDebounced, useRecentCoins } from "../lib/hooks";
import { usd } from "../lib/format";
import { CoinIcon } from "./Bits";
import type { CoinRef } from "../lib/types";

type Item =
  | { kind: "coin"; coin: CoinRef; group: string }
  | { kind: "page"; label: string; to: string; icon: typeof HomeIcon; group: string };

const PAGES: Item[] = [
  { kind: "page", label: "Overview", to: "/", icon: HomeIcon, group: "Go to" },
  { kind: "page", label: "Market", to: "/coins", icon: TableCellsIcon, group: "Go to" },
  { kind: "page", label: "Watchlist", to: "/watchlist", icon: StarIcon, group: "Go to" },
  { kind: "page", label: "News", to: "/news", icon: NewspaperIcon, group: "Go to" },
];

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const q = useDebounced(query.trim(), 220);
  const { recent } = useRecentCoins();

  const { data: results, isFetching } = useSearchCoinsQuery(q, { skip: !open || q.length < 1 });
  const { data: top } = useGetCoinsQuery({ limit: 6 }, { skip: !open });

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => input.current?.focus());
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  const items = useMemo<Item[]>(() => {
    if (q) {
      const coins = (results ?? []).slice(0, 8).map((coin) => ({ kind: "coin" as const, coin, group: "Coins" }));
      const pages = PAGES.filter((p) => p.kind === "page" && p.label.toLowerCase().includes(q.toLowerCase()));
      return [...coins, ...pages];
    }
    const rec = recent.map((coin) => ({ kind: "coin" as const, coin, group: "Recently viewed" }));
    const tops = (top?.coins ?? [])
      .filter((c) => !recent.some((r) => r.uuid === c.uuid))
      .slice(0, 5 - Math.min(rec.length, 3))
      .map((coin) => ({ kind: "coin" as const, coin, group: "Top by market cap" }));
    return [...rec, ...tops, ...PAGES];
  }, [q, results, recent, top]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const choose = (item: Item | undefined) => {
    if (!item) return;
    onClose();
    navigate(item.kind === "coin" ? `/coins/${item.coin.uuid}` : item.to);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(items.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(items[active]);
    }
  };

  let lastGroup = "";

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
      aria-label="Search coins and pages"
      className="m-0 mx-auto mt-[12vh] w-[min(640px,calc(100vw-32px))] max-w-none overflow-hidden rounded-note border border-rule bg-panel p-0 text-ink shadow-note backdrop:bg-[rgb(var(--shadow)/0.35)] open:animate-rise"
    >
      <div className="flex items-center gap-3 border-b border-rule px-4">
        <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-faint" aria-hidden="true" />
        <input
          ref={input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKey}
          placeholder="Search any coin, or jump to a page…"
          className="h-14 w-full bg-transparent text-base outline-none placeholder:text-faint"
          role="combobox"
          aria-expanded="true"
          aria-controls="cz-palette-list"
          aria-activedescendant={`cz-opt-${active}`}
        />
        <kbd className="serial hidden rounded border border-rule px-1.5 py-0.5 text-[0.65rem] text-faint sm:block">Esc</kbd>
      </div>

      <ul ref={list} id="cz-palette-list" role="listbox" className="max-h-[min(60vh,440px)] overflow-y-auto p-2">
        {q && !isFetching && results?.length === 0 && (
          <li className="px-3 py-8 text-center text-sm text-muted">
            No coin matches “{q}”. Try a ticker like <span className="font-semibold text-ink">SOL</span>.
          </li>
        )}
        {items.map((item, i) => {
          const header = item.group !== lastGroup ? item.group : null;
          lastGroup = item.group;
          const selected = i === active;
          return (
            <li key={item.kind === "coin" ? `${item.group}-${item.coin.uuid}` : item.to} role="presentation">
              {header && <div className="label px-3 pb-1.5 pt-3">{header}</div>}
              <div
                id={`cz-opt-${i}`}
                data-index={i}
                role="option"
                aria-selected={selected}
                onMouseMove={() => setActive(i)}
                onClick={() => choose(item)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 ${selected ? "bg-sunk" : ""}`}
              >
                {item.kind === "coin" ? (
                  <>
                    <CoinIcon src={item.coin.iconUrl} name={item.coin.name} className="h-6 w-6" />
                    <span className="min-w-0 flex-1 truncate font-semibold">
                      {item.coin.name} <span className="serial ml-1 text-xs text-faint">{item.coin.symbol}</span>
                    </span>
                    {item.coin.price && <span className="num text-sm text-muted">{usd(item.coin.price)}</span>}
                    {item.group === "Recently viewed" && <ClockIcon className="h-4 w-4 text-faint" aria-hidden="true" />}
                  </>
                ) : (
                  <>
                    <item.icon className="h-5 w-5 text-faint" aria-hidden="true" />
                    <span className="flex-1 font-medium">{item.label}</span>
                  </>
                )}
                {selected && <ArrowDownLeftIcon className="h-4 w-4 text-faint" aria-hidden="true" />}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-4 border-t border-rule bg-sunk/60 px-4 py-2 text-xs text-muted">
        <span><kbd className="font-semibold">↑↓</kbd> to move</span>
        <span><kbd className="font-semibold">Enter</kbd> to open</span>
        <span className="ml-auto">Live search across 7,000+ coins</span>
      </div>
    </dialog>
  );
}
