import { Link } from "react-router-dom";
import { useDocumentTitle } from "../lib/hooks";
import { Microprint, Rosette } from "../components/Engraving";

export default function NotFound() {
  useDocumentTitle("Page not found");
  return (
    <div className="mx-auto max-w-3xl px-4 pt-16 sm:px-6">
      <div className="relative isolate overflow-hidden rounded-note bg-note px-8 py-14 text-note-ink shadow-note sm:px-12">
        <div className="pointer-events-none absolute inset-2 rounded-[10px] border border-note-ink/15" aria-hidden="true" />
        <Rosette seed="void" className="pointer-events-none absolute -right-20 top-1/2 -z-10 h-[420px] w-[420px] -translate-y-1/2 text-note-dim opacity-50" />
        <span
          aria-hidden="true"
          className="denom pointer-events-none absolute right-10 top-10 -rotate-12 rounded-md border-4 border-note-serial px-3 py-1 text-3xl text-note-serial opacity-90 sm:right-16 sm:text-4xl"
        >
          VOID
        </span>
        <p className="denom text-7xl leading-none sm:text-8xl">404</p>
        <h1 className="mt-6 text-2xl font-bold tracking-[-0.015em]">This note isn't in circulation</h1>
        <p className="mt-2 max-w-sm text-note-dim">The page you followed doesn't exist or has moved. The market is still where you left it.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn bg-note-ink text-note shadow-lift hover:bg-note-ink/90">Back to overview</Link>
          <Link to="/coins" className="btn bg-note-ink/10 hover:bg-note-ink/20">Open the market</Link>
        </div>
      </div>
      <Microprint text="void · not legal tender · cryptozone" className="mt-2 text-faint/60" />
    </div>
  );
}
