import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetNewsQuery } from "../api/news";
import { useDocumentTitle } from "../lib/hooks";
import type { NewsArticle } from "../lib/types";
import { EngravedRule } from "../components/Engraving";
import { ErrorState, Skeleton } from "../components/Bits";
import { LeadStory, StoryCard, StoryRow } from "../components/NewsBits";

const TOPICS = [
  { id: "", label: "All" },
  { id: "BTC", label: "Bitcoin" },
  { id: "ETH", label: "Ethereum" },
  { id: "Trading", label: "Trading" },
  { id: "Regulation", label: "Regulation" },
  { id: "Market", label: "Markets" },
  { id: "Mining", label: "Mining" },
  { id: "Technology", label: "Technology" },
  { id: "Altcoin", label: "Altcoins" },
];

function CardsSkeleton() {
  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[16/10] w-full rounded-xl" />
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      ))}
    </div>
  );
}

/** One page of older stories, fetched with CryptoCompare's timestamp cursor. */
function OlderPage({ topic, before, onLoaded }: { topic: string; before: number; onLoaded: (last?: NewsArticle) => void }) {
  const { data, isError, refetch } = useGetNewsQuery({ categories: topic || undefined, before });
  useEffect(() => {
    if (data) onLoaded(data[data.length - 1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  if (isError) return <ErrorState title="Couldn't load older stories" onRetry={refetch} />;
  if (!data) return <CardsSkeleton />;
  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {data.filter((a) => a.published_on < before).map((a) => <StoryCard key={a.id} a={a} />)}
    </div>
  );
}

export default function News() {
  useDocumentTitle("News");
  const [params, setParams] = useSearchParams();
  const topic = TOPICS.some((t) => t.id === params.get("topic")) ? params.get("topic")! : "";
  const { data, isError, refetch, isFetching } = useGetNewsQuery({ categories: topic || undefined });
  const [cursors, setCursors] = useState<number[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);

  useEffect(() => {
    setCursors([]);
    setNextCursor(data?.length ? data[data.length - 1].published_on : null);
  }, [data, topic]);

  const label = TOPICS.find((t) => t.id === topic)?.label ?? "All";

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <header>
        <h1 className="denom text-4xl leading-none sm:text-5xl">News</h1>
        <p className="mt-3 max-w-lg text-muted">Crypto reporting from across the web, newest first.</p>
      </header>
      <EngravedRule seed="news" text="cryptozone dispatches · crypto reporting from across the web" />

      <div role="tablist" aria-label="Topics" className="-mx-4 mt-6 flex gap-1.5 overflow-x-auto border-b border-rule px-4 pb-3 [scrollbar-width:none] sm:mx-0 sm:px-0">
        {TOPICS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={topic === t.id}
            onClick={() => setParams(t.id ? { topic: t.id } : {}, { replace: true })}
            className={`h-8 shrink-0 rounded-full px-3.5 text-sm font-semibold transition-colors duration-150 ${
              topic === t.id ? "bg-note text-note-ink" : "text-muted hover:bg-sunk hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={`mt-10 transition-opacity duration-200 ${isFetching ? "opacity-60" : ""}`}>
        {isError ? (
          <ErrorState title="Couldn't load the news feed" onRetry={refetch} />
        ) : !data ? (
          <div className="space-y-12">
            <Skeleton className="aspect-[16/6] w-full rounded-note" />
            <CardsSkeleton />
          </div>
        ) : data.length === 0 ? (
          <p className="py-20 text-center text-muted">
            {topic ? `No recent stories about ${label}. Try another topic.` : "No stories have been published recently. Check back shortly."}
          </p>
        ) : (
          <div className="space-y-16">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
              <LeadStory a={data[0]} />
              <div className="divide-y divide-rule/70 lg:-mt-4">
                {data.slice(1, 4).map((a) => <StoryRow key={a.id} a={a} withImage={false} />)}
              </div>
            </div>
            <div className="grid gap-x-8 gap-y-12 border-t border-rule pt-12 sm:grid-cols-2 lg:grid-cols-3">
              {data.slice(4).map((a) => <StoryCard key={a.id} a={a} />)}
            </div>
            {cursors.map((c) => (
              <OlderPage key={c} topic={topic} before={c} onLoaded={(last) => setNextCursor(last ? last.published_on : null)} />
            ))}
            {nextCursor && (
              <div className="flex justify-center">
                <button
                  type="button"
                  className="btn-outline h-11 px-6"
                  disabled={cursors.includes(nextCursor)}
                  onClick={() => setCursors((c) => [...c, nextCursor])}
                >
                  Load older stories
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
