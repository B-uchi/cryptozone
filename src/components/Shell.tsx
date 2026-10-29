import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ComputerDesktopIcon, MoonIcon, SunIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useGetStatsQuery } from "../api/coinranking";
import { count, usdShort } from "../lib/format";
import { useTheme, useWatchlist, type ThemePref } from "../lib/hooks";
import CommandPalette from "./CommandPalette";
import { Mark, Microprint } from "./Engraving";

const NAV = [
  { to: "/", label: "Overview", end: true },
  { to: "/coins", label: "Market" },
  { to: "/watchlist", label: "Watchlist" },
  { to: "/news", label: "News" },
];

function MarketStrip() {
  const { data } = useGetStatsQuery();
  const items = data
    ? [
        ["Market cap", usdShort(data.totalMarketCap)],
        ["24h volume", usdShort(data.total24hVolume)],
        ["BTC dominance", `${data.btcDominance.toFixed(1)}%`],
        ["Coins", count(data.totalCoins)],
        ["Exchanges", count(data.totalExchanges)],
      ]
    : null;
  return (
    <div className="border-b border-rule bg-sunk/70">
      <div className="mx-auto flex h-8 max-w-7xl items-center gap-6 overflow-x-auto px-4 text-xs [scrollbar-width:none] sm:px-6">
        {items
          ? items.map(([k, v]) => (
              <span key={k} className="flex shrink-0 items-baseline gap-1.5">
                <span className="text-muted">{k}</span>
                <span className="num font-semibold text-ink">{v}</span>
              </span>
            ))
          : Array.from({ length: 4 }, (_, i) => <span key={i} className="skeleton h-3 w-28 shrink-0" />)}
        <span className="ml-auto hidden shrink-0 items-center gap-1.5 text-muted md:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-up opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-up" />
          </span>
          Live data
        </span>
      </div>
    </div>
  );
}

const THEMES: { value: ThemePref; label: string; Icon: typeof SunIcon }[] = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: ComputerDesktopIcon },
];

function ThemeControl() {
  const [pref, setPref] = useTheme();
  return (
    <div role="radiogroup" aria-label="Colour theme" className="flex rounded-lg border border-rule bg-panel p-0.5">
      {THEMES.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={pref === value}
          aria-label={`${label} theme`}
          title={`${label} theme`}
          onClick={() => setPref(value)}
          className={`grid h-7 w-7 place-items-center rounded-md transition-colors duration-150 ${
            pref === value ? "bg-sunk text-ink" : "text-faint hover:text-ink"
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

export default function Shell() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { ids } = useWatchlist();
  const location = useLocation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const navLink = ({ isActive }: { isActive: boolean }) =>
    `relative px-3 py-2 text-sm font-semibold transition-colors duration-150 ${
      isActive ? "text-ink after:absolute after:inset-x-3 after:-bottom-[13px] after:h-0.5 after:bg-serial" : "text-muted hover:text-ink"
    }`;

  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-panel focus:px-4 focus:py-2 focus:shadow-lift">
        Skip to content
      </a>
      <MarketStrip />
      <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75">
        <div className="mx-auto flex h-[60px] max-w-7xl items-center gap-2 px-4 sm:px-6">
          <Link to="/" className="mr-4 flex items-center gap-2.5" aria-label="CryptoZone home">
            <Mark className="h-8 w-8" />
            <span className="denom text-[1.05rem] tracking-[-0.02em]">CryptoZone</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center md:flex">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={navLink}>
                {n.label}
                {n.to === "/watchlist" && ids.length > 0 && (
                  <span className="num ml-1.5 rounded-full bg-mint px-1.5 py-px text-[0.65rem] font-bold text-ink">{ids.length}</span>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="ml-auto flex h-9 items-center gap-2 rounded-lg border border-rule bg-panel pl-3 pr-2 text-sm text-faint transition-colors duration-150 hover:border-faint hover:text-muted sm:w-64"
            aria-label="Search coins"
          >
            <MagnifyingGlassIcon className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Search coins…</span>
            <kbd className="serial ml-auto hidden rounded border border-rule bg-sunk px-1.5 py-0.5 text-[0.65rem] text-muted sm:block">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          </button>

          <div className="hidden md:block">
            <ThemeControl />
          </div>

          <button
            type="button"
            className="btn-quiet h-9 w-9 px-0 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div id="mobile-nav" className="animate-rise border-t border-rule bg-paper px-4 pb-4 pt-2 md:hidden">
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.end}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-b border-rule py-3.5 text-lg font-semibold ${isActive ? "text-ink" : "text-muted"}`
                  }
                >
                  {n.label}
                  {n.to === "/watchlist" && ids.length > 0 && <span className="num text-sm text-faint">{ids.length} starred</span>}
                </NavLink>
              ))}
            </nav>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-muted">Theme</span>
              <ThemeControl />
            </div>
          </div>
        )}
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-20 border-t border-rule">
        <Microprint text="CryptoZone · live market note · not legal tender" className="py-1 text-faint/70" />
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-ink">
            <Mark className="h-6 w-6" />
            <span className="denom text-sm">CryptoZone</span>
          </Link>
          <p className="sm:ml-6">
            Market data by{" "}
            <a className="underline decoration-rule underline-offset-4 hover:text-ink" href="https://coinranking.com" target="_blank" rel="noreferrer">
              Coinranking
            </a>
            , news by{" "}
            <a className="underline decoration-rule underline-offset-4 hover:text-ink" href="https://www.cryptocompare.com" target="_blank" rel="noreferrer">
              CryptoCompare
            </a>
            .
          </p>
          <p className="text-faint sm:ml-auto">Informational only. Not financial advice.</p>
        </div>
      </footer>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
