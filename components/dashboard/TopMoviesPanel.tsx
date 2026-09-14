"use client";

import Link from "next/link";
import Image from "next/image";
import { Film, Star } from "lucide-react";
import { usePopular } from "@/lib/hooks";
import { TMDBMovie } from "@/lib/types";

const posterUrl = (movie: TMDBMovie) => movie.poster_path
  ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
  : "https://i.imgur.com/wjVuAGb.png";

const TopMoviesPanel = () => {
  const { data, isLoading } = usePopular("movie", 1);
  const movies = (data?.results || []).filter((item): item is TMDBMovie => "title" in item).slice(0, 5);

  return (
    <aside className="dashboard-panel space-y-8" aria-label="Movie recommendations">
      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-white">Top Movies</h2>
          <span className="h-2 w-2 rounded-full bg-dashboard-accent shadow-[0_0_14px_rgba(240,51,78,0.8)]" aria-hidden="true" />
        </div>
        <div className="space-y-4">
          {isLoading && Array.from({ length: 5 }).map((_, index) => <div key={index} className="h-[74px] animate-pulse rounded-xl bg-white/[0.05]" />)}
          {!isLoading && movies.map((movie, index) => (
            <Link href={`/movie/${movie.id}`} key={movie.id} className="group flex items-center gap-3 rounded-xl p-1 transition hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent">
              <div className="relative h-[70px] w-[52px] shrink-0 overflow-hidden rounded-lg bg-white/5">
                <Image src={posterUrl(movie)} alt={`${movie.title} poster`} fill sizes="52px" className="object-cover transition duration-300 group-hover:scale-105" />
                <span className="absolute left-1 top-1 rounded bg-black/75 px-1 py-0.5 text-[9px] font-bold text-white">{index + 1}</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-slate-100 group-hover:text-dashboard-accent">{movie.title}</h3>
                <p className="mt-1 flex items-center gap-1 truncate text-xs text-slate-500"><Film className="h-3 w-3" aria-hidden="true" /> Movie</p>
              </div>
              <div className="flex shrink-0 items-center gap-1 text-xs font-semibold text-dashboard-accent"><Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />{movie.vote_average.toFixed(1)}</div>
            </Link>
          ))}
        </div>
        <Link href="/movie?category=popular" className="mt-5 flex w-full items-center justify-center rounded-xl border border-dashboard-accent/50 py-3 text-xs font-bold uppercase tracking-[0.16em] text-dashboard-accent transition hover:bg-dashboard-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent">See All</Link>
      </section>
      <GenrePills />
    </aside>
  );
};

const GenrePills = () => {
  const genres = ["Action", "Fantasy", "Comedy", "Sci-Fi", "Drama", "Romance", "Mystery", "Horror"];
  return (
    <section>
      <h2 className="mb-4 text-lg font-bold tracking-tight text-white">Favorite Genres</h2>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => <Link key={genre} href={`/movie?genre=${genre}`} className="rounded-lg border border-white/[0.07] bg-white/[0.035] px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-dashboard-accent/40 hover:bg-dashboard-accent/10 hover:text-white">{genre}</Link>)}
      </div>
    </section>
  );
};

export default TopMoviesPanel;
