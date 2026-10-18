"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { usePopular, useTrending } from "@/lib/hooks";
import type { TMDBMovie, TMDBTVShow } from "@/lib/types";
import MediaCard from "@/components/display/MediaCard";

type Media = TMDBMovie | TMDBTVShow;

interface MediaRailProps {
  title: string;
  items: Media[];
  isLoading: boolean;
  error?: Error;
  href: string;
}

function MediaRail({ title, items, isLoading, error, href }: MediaRailProps) {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    if (!railRef.current) return;
    railRef.current.scrollBy({
      left: direction * railRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section className="mb-11" aria-label={title}>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {title}
          </h2>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Hand-picked for your next movie night
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label={`Scroll ${title} left`}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75 transition hover:border-dashboard-accent/50 hover:bg-dashboard-accent hover:text-white sm:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label={`Scroll ${title} right`}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75 transition hover:border-dashboard-accent/50 hover:bg-dashboard-accent hover:text-white sm:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <Link
            href={href}
            className="ml-1 inline-flex items-center gap-1 text-xs font-semibold text-slate-400 transition hover:text-dashboard-accent sm:ml-3 sm:text-sm"
          >
            See all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {error ? (
        <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-5 text-sm text-slate-400">
          Couldn&apos;t load titles right now. Please try again later.
        </p>
      ) : (
        <div
          ref={railRef}
          className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide horizontal-scroll touch-scroll sm:gap-4"
          tabIndex={0}
          aria-label={`${title} titles`}
        >
          {isLoading
            ? Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[2/3] w-[160px] shrink-0 animate-pulse rounded-xl bg-white/[0.06] sm:w-[180px] md:w-[200px]"
                />
              ))
            : items.slice(0, 12).map((item) => (
                <MediaCard
                  key={item.id}
                  media={item}
                  variant="horizontal"
                  className="rounded-xl"
                />
              ))}
          {!isLoading && items.length === 0 && (
            <p className="py-5 text-sm text-slate-400">
              No titles are available at the moment.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default function HomeSections() {
  const trending = useTrending("all", "week");
  const movies = usePopular("movie");
  const shows = usePopular("tv");

  const trendingItems = (trending.data?.results ?? []).filter(
    (item): item is Media => "title" in item || "name" in item
  );

  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-14 pt-8 sm:px-8 sm:pt-10 lg:px-10">
      <MediaRail
        title="Trending This Week"
        items={trendingItems}
        isLoading={trending.isLoading}
        error={trending.error}
        href="/movies"
      />
      <MediaRail
        title="Popular Movies"
        items={movies.data?.results ?? []}
        isLoading={movies.isLoading}
        error={movies.error}
        href="/movies"
      />
      <MediaRail
        title="Popular TV Shows"
        items={shows.data?.results ?? []}
        isLoading={shows.isLoading}
        error={shows.error}
        href="/tv"
      />
    </div>
  );
}
