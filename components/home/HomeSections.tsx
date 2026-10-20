"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useDiscover, usePopular, useTrending } from "@/lib/hooks";
import type { TMDBMovie, TMDBTVShow } from "@/lib/types";
import MediaCard from "@/components/display/MediaCard";

type Media = TMDBMovie | TMDBTVShow;

interface MediaRailProps {
  title: string;
  description: string;
  items: Media[];
  isLoading: boolean;
  error?: Error;
  href: string;
  onNearViewport?: () => void;
}

function MediaRail({
  title,
  description,
  items,
  isLoading,
  error,
  href,
  onNearViewport,
}: MediaRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !onNearViewport) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onNearViewport();
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [onNearViewport]);

  const scroll = (direction: -1 | 1) => {
    railRef.current?.scrollBy({
      left: direction * (railRef.current.clientWidth * 0.8),
      behavior: "smooth",
    });
  };

  return (
    <section ref={sectionRef} className="mb-12" aria-label={title}>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {title}
          </h2>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">{description}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
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
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 transition hover:text-dashboard-accent sm:ml-2 sm:text-sm"
          >
            See all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {error ? (
        <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-5 text-sm text-slate-400">
          Couldn&apos;t load this collection right now. Please try again later.
        </p>
      ) : (
        <div
          ref={railRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scrollbar-hide horizontal-scroll touch-scroll"
          tabIndex={0}
          aria-label={`${title} titles`}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[165px] shrink-0 animate-pulse"
                >
                  <div className="aspect-[2/3] w-[165px] rounded-t-2xl bg-white/[0.06]" />
                  <div className="mt-3 h-4 w-3/4 rounded bg-white/[0.06]" />
                </div>
              ))
            : items.slice(0, 20).map((item) => (
                <MediaCard
                  key={item.id}
                  media={item}
                  variant="horizontal"
                  showQuickPlay
                  className="snap-start"
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
  const [activeRails, setActiveRails] = useState<Record<string, boolean>>({ trending: true, shows: true });
  const activateRail = useCallback((key: string) => {
    setActiveRails((current) => current[key] ? current : { ...current, [key]: true });
  }, []);
  const trending = useTrending("all", "week", 1, activeRails.trending);
  const shows = usePopular("tv", 1, activeRails.shows);
  const action = useDiscover("movie", { genre: "28" }, activeRails.action);
  const romance = useDiscover("movie", { genre: "10749" }, activeRails.romance);
  const anime = useDiscover("movie", { genre: "16", language: "ja" }, activeRails.anime);
  const horror = useDiscover("movie", { genre: "27" }, activeRails.horror);
  const comedy = useDiscover("movie", { genre: "35" }, activeRails.comedy);
  const crime = useDiscover("movie", { genre: "80" }, activeRails.crime);
  const adventure = useDiscover("movie", { genre: "12" }, activeRails.adventure);
  const scienceFiction = useDiscover("movie", { genre: "878" }, activeRails.scienceFiction);
  const family = useDiscover("movie", { genre: "10751" }, activeRails.family);

  const trendingItems = (trending.data?.results ?? []).filter(
    (item): item is Media => "title" in item || "name" in item
  );

  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-14 pt-6 sm:px-8 sm:pt-8 lg:px-10">
      <MediaRail
        title="Trending This Week"
        description="The movies and shows everyone is talking about"
        items={trendingItems}
        isLoading={!activeRails.trending || trending.isLoading}
        error={trending.error}
        href="/movies"
        onNearViewport={() => activateRail("trending")}
      />
      <MediaRail
        title="Popular TV Shows"
        description="Binge-worthy series picked for you"
        items={shows.data?.results ?? []}
        isLoading={!activeRails.shows || shows.isLoading}
        error={shows.error}
        href="/tv"
        onNearViewport={() => activateRail("shows")}
      />
      <MediaRail
        title="Action"
        description="High-stakes stories and edge-of-your-seat adventures"
        items={action.data?.results ?? []}
        isLoading={!activeRails.action || action.isLoading}
        error={action.error}
        href="/movie?genre=28"
        onNearViewport={() => activateRail("action")}
      />
      <MediaRail
        title="Romance"
        description="Love stories, heartfelt drama, and new beginnings"
        items={romance.data?.results ?? []}
        isLoading={!activeRails.romance || romance.isLoading}
        error={romance.error}
        href="/movie?genre=10749"
        onNearViewport={() => activateRail("romance")}
      />
      <MediaRail
        title="Anime"
        description="Animated stories from Japan and around the world"
        items={anime.data?.results ?? []}
        isLoading={!activeRails.anime || anime.isLoading}
        error={anime.error}
        href="/movie?genre=16"
        onNearViewport={() => activateRail("anime")}
      />
      <MediaRail
        title="Horror"
        description="Dark tales and unforgettable scares"
        items={horror.data?.results ?? []}
        isLoading={!activeRails.horror || horror.isLoading}
        error={horror.error}
        href="/movie?genre=27"
        onNearViewport={() => activateRail("horror")}
      />
      <MediaRail
        title="Comedy"
        description="Feel-good favorites and laugh-out-loud movies"
        items={comedy.data?.results ?? []}
        isLoading={!activeRails.comedy || comedy.isLoading}
        error={comedy.error}
        href="/movie?genre=35"
        onNearViewport={() => activateRail("comedy")}
      />
      <MediaRail
        title="Crime"
        description="Mysteries, heists, and gripping investigations"
        items={crime.data?.results ?? []}
        isLoading={!activeRails.crime || crime.isLoading}
        error={crime.error}
        href="/movie?genre=80"
        onNearViewport={() => activateRail("crime")}
      />
      <MediaRail
        title="Adventure"
        description="Epic journeys and worlds waiting to be explored"
        items={adventure.data?.results ?? []}
        isLoading={!activeRails.adventure || adventure.isLoading}
        error={adventure.error}
        href="/movie?genre=12"
        onNearViewport={() => activateRail("adventure")}
      />
      <MediaRail
        title="Science Fiction"
        description="Explore the future, the unknown, and beyond"
        items={scienceFiction.data?.results ?? []}
        isLoading={!activeRails.scienceFiction || scienceFiction.isLoading}
        error={scienceFiction.error}
        href="/movie?genre=878"
        onNearViewport={() => activateRail("scienceFiction")}
      />
      <MediaRail
        title="Family Favorites"
        description="Feel-good adventures and stories for everyone"
        items={family.data?.results ?? []}
        isLoading={!activeRails.family || family.isLoading}
        error={family.error}
        href="/movie?genre=10751"
        onNearViewport={() => activateRail("family")}
      />
    </div>
  );
}
