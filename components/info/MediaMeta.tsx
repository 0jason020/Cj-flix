import React from "react";
import {
  Star,
  Calendar,
  Clock,
  Users,
  Tv,
  Film,
} from "lucide-react";
import WatchlistButton from "@/components/watchlist/WatchlistButton";
import { TMDBMovie, TMDBTVShow } from "@/lib/types";

interface MediaMetaProps {
  type: "movie" | "tv";
  title: string;
  year?: string;
  rating?: number;
  ratingCount?: number;
  runtime?: number | null;
  seasons?: number;
  episodes?: number;
  genres: string[];
  overview?: string;
  className?: string;
  // Media data for watchlist functionality
  media: TMDBMovie | TMDBTVShow;
}

/**
 * MediaMeta - Modern metadata component for movies and TV shows
 * Features responsive design with beautiful icons and glass morphism
 */
const MediaMeta= ({
  type,
  title,
  year,
  rating,
  ratingCount,
  runtime,
  seasons,
  episodes,
  genres,
  overview,
  media,
  className = "",
}: MediaMetaProps) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="relative overflow-hidden rounded-[32px] border border-red-600/30 bg-gradient-to-br from-[#050505] via-[#140202] to-[#090909] p-6 shadow-[0_35px_80px_-45px_rgba(255,0,0,0.75)]">
        <div className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full bg-red-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 left-8 h-36 w-36 rounded-full bg-red-500/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

        <div className="relative space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-red-200 shadow-sm shadow-red-500/10">
              {type === "movie" ? <Film className="w-4 h-4" /> : <Tv className="w-4 h-4" />}
              {type === "movie" ? "Movie" : "TV Series"}
            </span>

            <WatchlistButton media={media} variant="default" />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-black tracking-[-0.02em] text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.35)] sm:text-5xl xl:text-6xl">
              {title}
            </h1>
            <div className="h-1 w-28 rounded-full bg-gradient-to-r from-red-500 via-transparent to-red-500/50" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {year && (
              <div className="flex items-center gap-3 rounded-3xl border border-red-500/20 bg-black/40 px-4 py-3 text-sm text-red-100 shadow-[0_1px_15px_rgba(255,0,0,0.08)]">
                <Calendar className="w-4 h-4 text-red-400" />
                <span className="font-medium">{year}</span>
              </div>
            )}

            {type === "movie" && runtime && (
              <div className="flex items-center gap-3 rounded-3xl border border-red-500/20 bg-black/40 px-4 py-3 text-sm text-red-100 shadow-[0_1px_15px_rgba(255,0,0,0.08)]">
                <Clock className="w-4 h-4 text-red-400" />
                <span className="font-medium">{runtime} min</span>
              </div>
            )}

            {type === "tv" && seasons && (
              <div className="flex items-center gap-3 rounded-3xl border border-red-500/20 bg-black/40 px-4 py-3 text-sm text-red-100 shadow-[0_1px_15px_rgba(255,0,0,0.08)]">
                <Tv className="w-4 h-4 text-red-400" />
                <span className="font-medium">
                  {seasons} Season{seasons !== 1 ? "s" : ""}
                </span>
              </div>
            )}

            {type === "tv" && episodes && (
              <div className="flex items-center gap-3 rounded-3xl border border-red-500/20 bg-black/40 px-4 py-3 text-sm text-red-100 shadow-[0_1px_15px_rgba(255,0,0,0.08)]">
                <Users className="w-4 h-4 text-red-400" />
                <span className="font-medium">
                  {episodes} Episode{episodes !== 1 ? "s" : ""}
                </span>
              </div>
            )}

            {rating && (
              <div className="flex items-center gap-3 rounded-3xl border border-red-500/20 bg-black/40 px-4 py-3 text-sm text-red-100 shadow-[0_1px_15px_rgba(255,0,0,0.08)]">
                <Star className="w-4 h-4 text-red-400" />
                <div className="flex flex-col">
                  <p className="font-semibold text-red-100">{rating.toFixed(1)}</p>
                  {ratingCount && (
                    <p className="text-xs text-red-300">{ratingCount.toLocaleString()} votes</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {genres.length > 0 && (
            <div className="pt-3">
              <div className="flex flex-wrap gap-2">
                {genres.map((genre, index) => {
                  return (
                    <span
                      key={index}
                      className="rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-red-500/20"
                    >
                      {genre}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {overview && (
            <div className="pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
                Overview
              </h3>
              <p className="mt-3 text-sm leading-7 text-red-100">
                {overview}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaMeta;
