import { useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import { timeAgo } from "../lib/format";
import type { NewsArticle } from "../lib/types";
import { Skeleton } from "./Bits";

const decode = (s: string) => {
  const t = document.createElement("textarea");
  t.innerHTML = s;
  return t.value;
};

function Thumb({ src, className }: { src: string; className: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) return <div className={`hatch bg-sunk ${className}`} aria-hidden="true" />;
  return <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} className={`bg-sunk object-cover ${className}`} />;
}

function Byline({ a }: { a: NewsArticle }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted">
      <span className="font-semibold text-ink">{a.source_info?.name ?? a.source}</span>
      <span aria-hidden="true" className="text-faint">·</span>
      <time dateTime={new Date(a.published_on * 1000).toISOString()}>{timeAgo(a.published_on)}</time>
    </div>
  );
}

export function LeadStory({ a }: { a: NewsArticle }) {
  return (
    <a href={a.url} target="_blank" rel="noreferrer" className="group grid gap-5 md:grid-cols-[1.25fr_1fr] md:gap-8">
      <div className="relative self-start overflow-hidden rounded-note">
        <Thumb src={a.imageurl} className="block aspect-[16/10] w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
        <div className="pointer-events-none absolute inset-0 rounded-note ring-1 ring-inset ring-ink/10" />
      </div>
      <div className="flex flex-col justify-center gap-3">
        <Byline a={a} />
        <h3 className="text-2xl font-bold leading-[1.15] tracking-[-0.015em] group-hover:underline group-hover:decoration-rule group-hover:decoration-2 group-hover:underline-offset-4 sm:text-3xl">
          {decode(a.title)}
        </h3>
        <p className="line-clamp-4 max-w-[60ch] text-[0.95rem] leading-relaxed text-muted">{decode(a.body)}</p>
        <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-ink">
          Read at {a.source_info?.name ?? "source"} <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}

export function StoryRow({ a, withImage = true }: { a: NewsArticle; withImage?: boolean }) {
  return (
    <a href={a.url} target="_blank" rel="noreferrer" className="group flex gap-4 py-4">
      <div className="min-w-0 flex-1">
        <Byline a={a} />
        <h3 className="mt-1.5 line-clamp-3 font-semibold leading-snug group-hover:underline group-hover:decoration-rule group-hover:underline-offset-4">
          {decode(a.title)}
        </h3>
      </div>
      {withImage && <Thumb src={a.imageurl} className="h-[72px] w-[96px] shrink-0 rounded-lg" />}
    </a>
  );
}

export function StoryCard({ a }: { a: NewsArticle }) {
  const tags = a.categories.split("|").filter((t) => t && t !== "OTHER").slice(0, 3);
  return (
    <a href={a.url} target="_blank" rel="noreferrer" className="group flex flex-col gap-3">
      <div className="overflow-hidden rounded-xl">
        <Thumb src={a.imageurl} className="aspect-[16/10] w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
      </div>
      <Byline a={a} />
      <h3 className="line-clamp-3 text-[1.05rem] font-bold leading-snug group-hover:underline group-hover:decoration-rule group-hover:underline-offset-4">
        {decode(a.title)}
      </h3>
      <p className="line-clamp-2 text-sm leading-relaxed text-muted">{decode(a.body)}</p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span key={t} className="serial rounded border border-rule px-1.5 py-0.5 text-[0.6rem] text-muted">
              {t}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}

export function StoryRowSkeleton() {
  return (
    <div className="flex gap-4 py-4">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton className="h-[72px] w-[96px] rounded-lg" />
    </div>
  );
}
