import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CoinRef } from "./types";

/* ---------- localStorage-backed state shared across components ---------- */

const listeners = new Map<string, Set<() => void>>();

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

const cache = new Map<string, unknown>();

function useStored<T>(key: string, fallback: T) {
  const subscribe = useCallback(
    (cb: () => void) => {
      if (!listeners.has(key)) listeners.set(key, new Set());
      listeners.get(key)!.add(cb);
      const onStorage = (e: StorageEvent) => {
        if (e.key === key) {
          cache.delete(key);
          cb();
        }
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.get(key)!.delete(cb);
        window.removeEventListener("storage", onStorage);
      };
    },
    [key]
  );
  const get = () => {
    if (!cache.has(key)) cache.set(key, read(key, fallback));
    return cache.get(key) as T;
  };
  const value = useSyncExternalStore(subscribe, get);
  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = (cache.has(key) ? cache.get(key) : read(key, fallback)) as T;
      const v = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      cache.set(key, v);
      try {
        localStorage.setItem(key, JSON.stringify(v));
      } catch {
        /* storage unavailable: keep in-memory value */
      }
      listeners.get(key)?.forEach((l) => l());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key]
  );
  return [value, set] as const;
}

const EMPTY: string[] = [];
const EMPTY_REFS: CoinRef[] = [];

export function useWatchlist() {
  const [ids, setIds] = useStored<string[]>("cz:watchlist", EMPTY);
  const has = useCallback((id: string) => ids.includes(id), [ids]);
  const toggle = useCallback(
    (id: string) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setIds]
  );
  return { ids, has, toggle };
}

export function useRecentCoins() {
  const [recent, setRecent] = useStored<CoinRef[]>("cz:recent", EMPTY_REFS);
  const push = useCallback(
    (c: CoinRef) =>
      setRecent((prev) => [c, ...prev.filter((x) => x.uuid !== c.uuid)].slice(0, 5)),
    [setRecent]
  );
  return { recent, push };
}

export type ThemePref = "light" | "dark" | "system";

export function useTheme() {
  const [pref, setPref] = useStored<ThemePref>("cz:theme", "system");
  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = pref === "dark" || (pref === "system" && mq.matches);
      document.documentElement.classList.toggle("dark", dark);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [pref]);
  return [pref, setPref] as const;
}

/* ---------- small utilities ---------- */

export function useDebounced<T>(value: T, ms = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

/** Poll only while the tab is visible so the API quota isn't burned in background tabs. */
export function useVisiblePolling(ms: number) {
  const [visible, setVisible] = useState(() => document.visibilityState === "visible");
  useEffect(() => {
    const on = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);
  return visible ? ms : 0;
}

/** Returns "up" | "down" briefly after a numeric value changes, for price flashes. */
export function useFlash(value: number | null) {
  const prev = useRef(value);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  useEffect(() => {
    if (value !== null && prev.current !== null && value !== prev.current) {
      setFlash(value > prev.current ? "up" : "down");
      const t = setTimeout(() => setFlash(null), 1400);
      prev.current = value;
      return () => clearTimeout(t);
    }
    prev.current = value;
  }, [value]);
  return flash;
}

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} · CryptoZone` : "CryptoZone · Live crypto market";
  }, [title]);
}
