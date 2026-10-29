const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 });
const usdCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 2,
});

export const toNum = (v: string | number | null | undefined) => {
  const n = typeof v === "number" ? v : parseFloat(v ?? "");
  return Number.isFinite(n) ? n : null;
};

/** Price with precision that scales to its magnitude: $81,281.52 · $0.4821 · $0.00001234 */
export function usd(v: string | number | null | undefined) {
  const n = toNum(v);
  if (n === null) return "—";
  const abs = Math.abs(n);
  const digits = abs >= 1000 ? 2 : abs >= 1 ? 2 : abs >= 0.01 ? 4 : 8;
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: abs >= 1000 ? 0 : Math.min(digits, 2),
    maximumFractionDigits: abs >= 1000 ? 0 : digits,
  });
}

export function usdShort(v: string | number | null | undefined) {
  const n = toNum(v);
  if (n === null) return "—";
  return Math.abs(n) < 1000 ? usd(n) : usdCompact.format(n);
}

export function count(v: string | number | null | undefined) {
  const n = toNum(v);
  return n === null ? "—" : compact.format(n);
}

export function pct(v: string | number | null | undefined, signed = true) {
  const n = toNum(v);
  if (n === null) return "—";
  const s = Math.abs(n).toFixed(Math.abs(n) >= 100 ? 0 : 2) + "%";
  return signed ? (n > 0 ? "+" : n < 0 ? "−" : "") + s : s;
}

export function timeAgo(unixSeconds: number) {
  const diff = Date.now() / 1000 - unixSeconds;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(unixSeconds * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function date(unixSeconds: number, withTime = false) {
  return new Date(unixSeconds * 1000).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}

/** Deterministic serial like "CZ·04·BTC·7741" used on note faces. */
export function serialFor(seed: string, rank?: number) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const tail = String(h % 10000).padStart(4, "0");
  return `CZ ${String(rank ?? 0).padStart(3, "0")} ${tail}`;
}
