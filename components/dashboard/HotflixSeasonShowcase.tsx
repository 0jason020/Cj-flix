"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePopular } from "@/lib/hooks";
import type { TMDBMovie } from "@/lib/types";

const fallbackTitles = [
  "The Edge of Tom...",
  "Benched",
  "Green Hell",
  "Survival Spliton",
  "The Chebod",
];

const fallbackGenres = [
  "Action, Thriller",
  "Comedy",
  "Romance, Drama",
  "Comedy, Drama",
  "Drama",
];

const fallbackPosterUrls = [
  "https://image.tmdb.org/t/p/w780/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
  "https://image.tmdb.org/t/p/w780/hxCu17l9Xf5YzjLOb0VhE4uA5lt.jpg",
  "https://image.tmdb.org/t/p/w780/ojF0mu6jiW9SUNSkQNEB2mE3b29.jpg",
  "https://image.tmdb.org/t/p/w780/8cLNtYKhyd6wO5B7Bazvwp5NWoB.jpg",
  "https://image.tmdb.org/t/p/w780/3kcEKfZJ9Jc2HfQm6LxjauVg6Wc.jpg",
];

const formatTitle = (title: string) => {
  if (title.length <= 18) return title;
  return `${title.slice(0, 15)}...`;
};

export default function HotflixSeasonShowcase() {
  const { data, isLoading } = usePopular("movie", 1);

  const items = (data?.results || []).filter((item): item is TMDBMovie => "title" in item).slice(0, 5);

  const displayItems = isLoading || items.length === 0
    ? fallbackTitles.map((title, index) => ({
        id: index + 1,
        title,
        vote_average: [8.4, 7.1, 7.9, 6.8, 9.1][index],
        backdrop_path: fallbackPosterUrls[index],
        release_date: "2025",
        genre: fallbackGenres[index],
      }))
    : items.map((movie, index) => ({
        ...movie,
        title: formatTitle(movie.title),
        genre: fallbackGenres[index % fallbackGenres.length],
      }));

  return (
    <section className="mx-auto max-w-[1500px] px-4 pb-20 pt-10 sm:px-8 lg:px-10">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.32em] text-dashboard-accent">Curated for tonight</p>
          <h1 className="max-w-2xl text-4xl font-light uppercase leading-[0.92] tracking-[-0.045em] text-white md:text-6xl lg:text-[5.25rem]">
            New on the big screen
          </h1>
        </div>
        <p className="hidden max-w-[190px] pb-1 text-right text-xs leading-5 text-slate-500 md:block">Fresh stories, cult favorites, and the movies everyone is talking about.</p>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            aria-label="Previous items"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-dashboard-accent/60 hover:bg-dashboard-accent hover:text-dashboard-bg"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next items"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-dashboard-accent/60 hover:bg-dashboard-accent hover:text-dashboard-bg"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-5">
        {displayItems.map((movie, index) => {
          const imageUrl = movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
            : fallbackPosterUrls[index % fallbackPosterUrls.length];

          return (
            <article key={`${movie.id}-${index}`} className="group relative">
              <div className="relative h-[430px] overflow-hidden rounded-[14px] border border-white/10 bg-[#101418] shadow-[0_30px_60px_rgba(0,0,0,0.35)] transition duration-500 group-hover:-translate-y-2 group-hover:border-dashboard-accent/40 group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.52)] md:h-[470px]">
                <Image
                  src={imageUrl}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 1280px) 50vw, 20vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-black/5" />

                <span className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-dashboard-accent/80 bg-black/40 text-sm font-semibold text-dashboard-accent shadow-[0_0_20px_rgba(199,243,107,0.28)] backdrop-blur-sm">
                  {movie.vote_average.toFixed(1)}
                </span>

                <div className="absolute inset-x-0 bottom-0 z-10 p-4">
                  <div className="flex min-h-[90px] flex-col justify-end">
                    <h2 className="text-2xl font-semibold leading-none tracking-[-0.03em] text-white">
                      {movie.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-300">{movie.genre}</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
