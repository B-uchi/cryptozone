import { useMemo } from "react";
import { band, rosette } from "../lib/guilloche";

type RosetteProps = { seed: string; className?: string; accent?: string };

export function Rosette({ seed, className, accent }: RosetteProps) {
  const r = useMemo(() => rosette(seed), [seed]);
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true" fill="none">
      <path d={r.outer} stroke="currentColor" strokeWidth="0.32" opacity="0.75" />
      <path d={r.rings} stroke="currentColor" strokeWidth="0.3" opacity="0.6" />
      <path d={r.inner} stroke={accent ?? "currentColor"} strokeWidth="0.34" opacity="0.85" />
      <circle r="5" fill={accent ?? "currentColor"} opacity="0.9" />
    </svg>
  );
}

type BandProps = { series: number[]; className?: string; lines?: number };

export function GuillocheBand({ series, className, lines = 16 }: BandProps) {
  const paths = useMemo(() => band(series, 1000, 120, lines), [series, lines]);
  return (
    <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className={className} aria-hidden="true" fill="none">
      {paths.map((d, i) => (
        <path key={i} d={d} stroke="currentColor" strokeWidth="0.9" vectorEffect="non-scaling-stroke" opacity={0.3 + (i % 4) * 0.12} />
      ))}
    </svg>
  );
}

/** Thin engraved rule for page headers: a seeded line bundle over a microprint line. */
export function EngravedRule({ seed, text }: { seed: string; text: string }) {
  const series = useMemo(() => {
    let h = 0;
    for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return Array.from({ length: 24 }, (_, i) => Math.sin(i / 3 + (h % 7)) + Math.sin(i / 1.7 + (h % 5)) * 0.4);
  }, [seed]);
  return (
    <div className="mt-8" aria-hidden="true">
      <GuillocheBand series={series} lines={10} className="h-10 w-full text-note/50 dark:text-note-dim/40" />
      <Microprint text={text} className="mt-1 text-faint/70" />
    </div>
  );
}

/** A rule of tiny repeated text, as printed along a note's frame. */
export function Microprint({ text, className = "" }: { text: string; className?: string }) {
  const line = `${text} · `.repeat(40);
  return (
    <div className={`microprint ${className}`} aria-hidden="true">
      {line}
    </div>
  );
}

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="rgb(var(--note))" />
      <g fill="none" stroke="rgb(var(--note-ink))" strokeWidth="1.1">
        <circle cx="16" cy="16" r="9" />
        <ellipse cx="16" cy="16" rx="9" ry="4.2" />
        <ellipse cx="16" cy="16" rx="9" ry="4.2" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="9" ry="4.2" transform="rotate(120 16 16)" />
      </g>
      <circle cx="16" cy="16" r="2.2" fill="rgb(var(--serial))" />
    </svg>
  );
}
