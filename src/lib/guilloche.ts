/*
 * Security-print line work, generated from data.
 * Rosettes are seeded by a coin so every note face carries its own pattern;
 * bands follow a price series so the engraving is the chart.
 */

function hash(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  return h;
}

function rng(seed: string) {
  let s = hash(seed) || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 10000) / 10000;
  };
}

const f = (n: number) => n.toFixed(2);

function polyline(points: [number, number][]) {
  return "M" + points.map(([x, y]) => `${f(x)} ${f(y)}`).join("L") + "Z";
}

/** Returns path strings for a rosette centred at 0,0 that fits in radius 100. */
export function rosette(seed: string) {
  const r = rng(seed);
  const lobes = 7 + Math.floor(r() * 7); // outer ring wave count
  const strands = 28 + Math.floor(r() * 12);
  const petals = 5 + Math.floor(r() * 6);
  const steps = 260;
  const tau = Math.PI * 2;

  // Outer woven band: offset sine rings.
  let outer = "";
  for (let k = 0; k < strands; k++) {
    const phase = (k / strands) * tau;
    const pts: [number, number][] = [];
    for (let i = 0; i < steps; i++) {
      const t = (i / steps) * tau;
      const rad = 84 + 9 * Math.sin(lobes * t + phase) + 2.5 * Math.sin(lobes * 3 * t - phase);
      pts.push([rad * Math.cos(t), rad * Math.sin(t)]);
    }
    outer += polyline(pts);
  }

  // Inner epitrochoid petals, rotated copies.
  let inner = "";
  const copies = 18;
  const a = 34 + r() * 8;
  for (let k = 0; k < copies; k++) {
    const rot = (k / copies) * (tau / petals);
    const b = 20 + 6 * Math.sin((k / copies) * tau);
    const pts: [number, number][] = [];
    for (let i = 0; i < steps; i++) {
      const t = (i / steps) * tau;
      const x = a * Math.cos(t) + b * Math.cos((petals + 1) * t);
      const y = a * Math.sin(t) - b * Math.sin((petals + 1) * t);
      pts.push([x * Math.cos(rot) - y * Math.sin(rot), x * Math.sin(rot) + y * Math.cos(rot)]);
    }
    inner += polyline(pts);
  }

  // Fine concentric rings between the two.
  let rings = "";
  for (let k = 0; k < 4; k++) {
    const rad = 64 + k * 2.2;
    rings += `M${f(rad)} 0A${f(rad)} ${f(rad)} 0 1 0 ${f(-rad)} 0A${f(rad)} ${f(rad)} 0 1 0 ${f(rad)} 0Z`;
  }

  return { outer, inner, rings };
}

/** Smoothly resample a series to n points in [0,1] (0 = lowest). */
function normalise(series: number[], n: number) {
  if (series.length < 2) return Array.from({ length: n }, () => 0.5);
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  return Array.from({ length: n }, (_, i) => {
    const p = (i / (n - 1)) * (series.length - 1);
    const lo = Math.floor(p);
    const hi = Math.min(series.length - 1, lo + 1);
    const t = p - lo;
    const s = t * t * (3 - 2 * t);
    return (series[lo] * (1 - s) + series[hi] * s - min) / span;
  });
}

/** A bundle of interweaving engraved lines that follows a price series. */
export function band(series: number[], width: number, height: number, lines = 16) {
  const n = 160;
  const norm = normalise(series, n);
  const paths: string[] = [];
  const amp = height * 0.16;
  for (let k = 0; k < lines; k++) {
    const offset = (k - (lines - 1) / 2) * (height * 0.018);
    let d = "";
    for (let i = 0; i < n; i++) {
      const u = i / (n - 1);
      const x = u * width;
      const weave = Math.sin(u * Math.PI * 9 + k * 0.42) * amp * (0.35 + 0.65 * Math.sin(u * Math.PI));
      const y = height * 0.82 - norm[i] * height * 0.6 + offset + weave * 0.35;
      d += (i ? "L" : "M") + f(x) + " " + f(y);
    }
    paths.push(d);
  }
  return paths;
}
