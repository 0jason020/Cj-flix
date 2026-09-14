"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Volume2 } from "lucide-react";
import { usePopular } from "@/lib/hooks";
import { useResume } from "@/lib/useResume";
import { TMDBMovie } from "@/lib/types";

const ContinueWatchingRow = () => {
  const { data, isLoading } = usePopular("movie", 1);
  const { getProgress } = useResume();
  const movies = (data?.results || []).filter((item): item is TMDBMovie => "title" in item).slice(0, 5);

  return (
    <section className="mt-9" aria-labelledby="continue-watching-title">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 id="continue-watching-title" className="text-xl font-bold tracking-tight text-white">Continue Watching</h2>
          <p className="mt-1 text-xs text-slate-500">Pick up where you left off</p>
        </div>
        <button type="button" aria-label="Scroll continue watching" className="rounded-lg border border-white/[0.08] p-2 text-slate-400 transition hover:border-dashboard-accent/50 hover:text-dashboard-accent"><ArrowRight className="h-4 w-4" /></button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" tabIndex={0} aria-label="Continue watching movies">
        {isLoading && Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-[178px] min-w-[280px] animate-pulse rounded-2xl bg-white/[0.05]" />)}
        {!isLoading && movies.map((movie, index) => {
          const progress = Math.max(0, Math.min(100, getProgress(movie.id, "movie") || (index + 1) * 12));
          const image = movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          return (
            <Link href={`/movie/${movie.id}`} key={movie.id} className="group relative h-[178px] min-w-[280px] overflow-hidden rounded-2xl border border-white/[0.08] bg-dashboard-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent">
              <Image src={image} alt={`${movie.title} still`} fill sizes="280px" className="object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="mb-2 flex items-center justify-between gap-2"><h3 className="truncate text-sm font-bold text-white">{movie.title}</h3><span className="text-[11px] text-slate-300">{movie.release_date?.slice(0, 4) || "Now"}</span></div>
                <div className="h-1 overflow-hidden rounded-full bg-white/20"><span className="block h-full rounded-full bg-dashboard-accent" style={{ width: `${progress}%` }} /></div>
                <div className="mt-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-slate-400"><span>{progress}% watched</span><span className="flex gap-2"><Play className="h-3.5 w-3.5 fill-current text-white" /><Volume2 className="h-3.5 w-3.5" /></span></div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ContinueWatchingRow;
