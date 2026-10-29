import { useState } from "react";
import { ArrowDownRightIcon, ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { pct, toNum } from "../lib/format";
import { useWatchlist } from "../lib/hooks";

/** Change with sign and arrow so gain/loss never relies on colour alone. */
export function Change({ value, className = "", size = "sm" }: { value: string | number | null | undefined; className?: string; size?: "sm" | "lg" }) {
  const n = toNum(value);
  const up = n !== null && n > 0;
  const down = n !== null && n < 0;
  const Icon = up ? ArrowUpRightIcon : down ? ArrowDownRightIcon : null;
  return (
    <span
      className={`num inline-flex items-center gap-0.5 font-semibold ${up ? "text-up" : down ? "text-down" : "text-muted"} ${className}`}
    >
      {Icon && <Icon className={size === "lg" ? "h-5 w-5" : "h-3.5 w-3.5"} aria-hidden="true" />}
      {pct(n, false)}
      <span className="sr-only">{up ? "up" : down ? "down" : ""}</span>
    </span>
  );
}

export function CoinIcon({ src, name, className = "h-7 w-7", eager }: { src?: string; name: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <span
        className={`${className} grid shrink-0 place-items-center rounded-full bg-mint text-[0.6rem] font-bold text-ink`}
        aria-hidden="true"
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt=""
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={`${className} shrink-0 rounded-full object-contain`}
    />
  );
}

export function StarButton({ uuid, name, className = "" }: { uuid: string; name: string; className?: string }) {
  const { has, toggle } = useWatchlist();
  const on = has(uuid);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(uuid);
      }}
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from watchlist` : `Add ${name} to watchlist`}
      title={on ? "Remove from watchlist" : "Add to watchlist"}
      className={`grid h-8 w-8 place-items-center rounded-full transition-colors duration-150 hover:bg-sunk ${on ? "text-serial" : "text-faint hover:text-ink"} ${className}`}
    >
      {on ? <StarSolid className="h-[18px] w-[18px]" /> : <StarIcon className="h-[18px] w-[18px]" />}
    </button>
  );
}

export function Sparkline({ data, change, className = "h-9 w-28" }: { data: (string | null)[]; change?: string | number | null; className?: string }) {
  const pts = data.map(toNum).filter((n): n is number => n !== null);
  if (pts.length < 2) return <span className={className} />;
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const span = max - min || 1;
  const w = 100;
  const h = 32;
  const d = pts.map((p, i) => `${i ? "L" : "M"}${((i / (pts.length - 1)) * w).toFixed(1)} ${(h - 2 - ((p - min) / span) * (h - 4)).toFixed(1)}`).join("");
  // Colour by the reported period change so the line never disagrees with the % column.
  const c = toNum(change);
  const up = c !== null ? c >= 0 : pts[pts.length - 1] >= pts[0];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={`${className} ${up ? "text-up" : "text-down"}`} aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  );
}

export function Skeleton({ className }: { className: string }) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />;
}

export function ErrorState({ title = "The market feed didn't respond", detail, onRetry }: { title?: string; detail?: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="hatch flex flex-col items-center gap-3 rounded-note border border-dashed border-rule px-6 py-14 text-center">
      <ExclamationTriangleIcon className="h-7 w-7 text-serial" aria-hidden="true" />
      <p className="text-lg font-semibold">{title}</p>
      <p className="max-w-sm text-sm text-muted">
        {detail ?? "This is usually a rate limit or a dropped connection on the data provider's side. Try again in a moment."}
      </p>
      {onRetry && (
        <button type="button" className="btn-outline mt-2" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

