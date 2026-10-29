import { useEffect, useId, useMemo, useRef, useState } from "react";
import { usd } from "../lib/format";

export type Point = { t: number; p: number };

type Props = {
  points: Point[];
  onHover: (p: Point | null) => void;
  withTime: boolean;
  label: string;
};

const H = 340;
const PAD = { top: 24, right: 72, bottom: 30, left: 4 };

function ticks(min: number, max: number, n = 4) {
  const step = (max - min) / n;
  return Array.from({ length: n + 1 }, (_, i) => min + step * i);
}

export default function PriceChart({ points, onHover, withTime, label }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(320);
  const [idx, setIdx] = useState<number | null>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(280, e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => setIdx(null), [points]);

  const geo = useMemo(() => {
    const ps = points.map((d) => d.p);
    const min = Math.min(...ps);
    const max = Math.max(...ps);
    const pad = (max - min) * 0.08 || max * 0.01 || 1;
    const lo = min - pad;
    const hi = max + pad;
    const t0 = points[0]?.t ?? 0;
    const t1 = points[points.length - 1]?.t ?? 1;
    const innerW = width - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;
    const x = (t: number) => PAD.left + ((t - t0) / (t1 - t0 || 1)) * innerW;
    const y = (p: number) => PAD.top + (1 - (p - lo) / (hi - lo)) * innerH;
    const line = points.map((d, i) => `${i ? "L" : "M"}${x(d.t).toFixed(1)} ${y(d.p).toFixed(1)}`).join("");
    const area = `${line}L${x(t1).toFixed(1)} ${H - PAD.bottom}L${x(t0).toFixed(1)} ${H - PAD.bottom}Z`;
    const hiI = ps.indexOf(max);
    const loI = ps.indexOf(min);
    return { x, y, line, area, lo, hi, t0, t1, innerW, hiI, loI };
  }, [points, width]);

  const up = points.length > 1 && points[points.length - 1].p >= points[0].p;
  const tone = up ? "rgb(var(--up))" : "rgb(var(--down))";

  const setFromX = (clientX: number) => {
    const rect = wrap.current!.getBoundingClientRect();
    const rel = (clientX - rect.left - PAD.left) / geo.innerW;
    const t = geo.t0 + Math.min(1, Math.max(0, rel)) * (geo.t1 - geo.t0);
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < points.length; i++) {
      const d = Math.abs(points[i].t - t);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    setIdx(best);
    onHover(points[best]);
  };

  const clear = () => {
    setIdx(null);
    onHover(null);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End", "Escape"].includes(e.key)) return;
    e.preventDefault();
    if (e.key === "Escape") return clear();
    const last = points.length - 1;
    const cur = idx ?? last;
    const step = e.shiftKey ? 10 : 1;
    const next = e.key === "Home" ? 0 : e.key === "End" ? last : Math.min(last, Math.max(0, cur + (e.key === "ArrowLeft" ? -step : step)));
    setIdx(next);
    onHover(points[next]);
  };

  const fmtT = (t: number) =>
    new Date(t * 1000).toLocaleString("en-US", withTime ? { hour: "2-digit", minute: "2-digit" } : { month: "short", day: "numeric", ...(geo.t1 - geo.t0 > 86400 * 400 ? { year: "2-digit" } : {}) });

  const active = idx !== null ? points[idx] : null;
  const xTicks = [0, 0.33, 0.66, 1].map((f) => geo.t0 + f * (geo.t1 - geo.t0));

  return (
    <div
      ref={wrap}
      className="relative w-full touch-pan-y select-none overflow-hidden rounded-lg"
      tabIndex={0}
      role="img"
      aria-label={`${label}. Use left and right arrow keys to inspect prices.`}
      onKeyDown={onKey}
      onPointerMove={(e) => setFromX(e.clientX)}
      onPointerDown={(e) => setFromX(e.clientX)}
      onPointerLeave={clear}
      onBlur={clear}
    >
      <svg width={width} height={H} className="block overflow-visible">
        <defs>
          <pattern id={`hatch-${id}`} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
            <line x1="0" y1="0" x2="0" y2="4" stroke={tone} strokeWidth="0.9" />
          </pattern>
          <linearGradient id={`fade-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0.55" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id={`mask-${id}`}>
            <rect x="0" y="0" width={width} height={H} fill={`url(#fade-${id})`} />
          </mask>
        </defs>

        {ticks(geo.lo, geo.hi).map((v, i) => (
          <g key={i}>
            <line x1={PAD.left} x2={width - PAD.right + 8} y1={geo.y(v)} y2={geo.y(v)} stroke="rgb(var(--rule))" strokeDasharray={i === 0 ? undefined : "2 4"} />
            <text x={width - PAD.right + 14} y={geo.y(v)} dy="0.32em" className="num fill-faint text-[11px]">
              {usd(v)}
            </text>
          </g>
        ))}
        {xTicks.map((t, i) => (
          <text
            key={i}
            x={geo.x(t)}
            y={H - 8}
            textAnchor={i === 0 ? "start" : i === xTicks.length - 1 ? "end" : "middle"}
            className="num fill-faint text-[11px]"
          >
            {fmtT(t)}
          </text>
        ))}

        <path d={geo.area} fill={`url(#hatch-${id})`} mask={`url(#mask-${id})`} />
        <path d={geo.line} fill="none" stroke={tone} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {/* High and low markers */}
        {[
          { i: geo.hiI, tag: "H", dy: -10 },
          { i: geo.loI, tag: "L", dy: 18 },
        ].map(({ i, tag, dy }) =>
          points[i] ? (
            <g key={tag} opacity={active ? 0.35 : 1} className="transition-opacity">
              <circle cx={geo.x(points[i].t)} cy={geo.y(points[i].p)} r="2.5" fill="rgb(var(--ink))" />
              <text
                x={Math.min(Math.max(geo.x(points[i].t), 40), width - PAD.right - 40)}
                y={geo.y(points[i].p) + dy}
                textAnchor="middle"
                className="num fill-muted text-[10.5px] font-semibold"
              >
                {tag} {usd(points[i].p)}
              </text>
            </g>
          ) : null
        )}

        {active && (
          <g>
            <line x1={geo.x(active.t)} x2={geo.x(active.t)} y1={PAD.top - 8} y2={H - PAD.bottom} stroke="rgb(var(--ink))" strokeOpacity="0.35" />
            <line x1={PAD.left} x2={width - PAD.right} y1={geo.y(active.p)} y2={geo.y(active.p)} stroke="rgb(var(--ink))" strokeOpacity="0.2" strokeDasharray="3 3" />
            <circle cx={geo.x(active.t)} cy={geo.y(active.p)} r="9" fill={tone} opacity="0.18" />
            <circle cx={geo.x(active.t)} cy={geo.y(active.p)} r="4" fill="rgb(var(--panel))" stroke={tone} strokeWidth="2" />
            <g transform={`translate(${width - PAD.right + 4}, ${geo.y(active.p)})`}>
              <rect x="0" y="-11" width={PAD.right - 4} height="22" rx="4" fill="rgb(var(--ink))" />
              <text x={(PAD.right - 4) / 2} dy="0.34em" textAnchor="middle" className="num fill-paper text-[10.5px] font-semibold">
                {usd(active.p)}
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
