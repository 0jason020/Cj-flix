import React from "react";
import {
  Star,
  Calendar,
  Clock,
  Users,
  Tv,
  Film,
} from "lucide-react";

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
  className = "",
}: MediaMetaProps) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#111316] p-5 shadow-2xl sm:p-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember to-transparent" />

        <div className="relative space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="inline-flex items-center gap-2 rounded-sm border border-ember/40 bg-ember/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-ember-soft">
              {type === "movie" ? <Film className="w-4 h-4" /> : <Tv className="w-4 h-4" />}
              {type === "movie" ? "Movie" : "TV Series"}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-display text-5xl uppercase leading-[0.9] tracking-wide text-paper sm:text-6xl xl:text-7xl">
              {title}
            </h1>
            <div className="h-px w-28 bg-gradient-to-r from-ember to-transparent" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {year && (
              <div className="flex items-center gap-3 rounded-md border border-white/10 bg-black/25 px-4 py-3 text-sm text-paper/80">
                <Calendar className="h-4 w-4 text-ember" />
                <span className="font-medium">{year}</span>
              </div>
            )}

            {type === "movie" && runtime && (
              <div className="flex items-center gap-3 rounded-md border border-white/10 bg-black/25 px-4 py-3 text-sm text-paper/80">
                <Clock className="h-4 w-4 text-ember" />
                <span className="font-medium">{runtime} min</span>
              </div>
            )}

            {type === "tv" && seasons && (
              <div className="flex items-center gap-3 rounded-md border border-white/10 bg-black/25 px-4 py-3 text-sm text-paper/80">
                <Tv className="h-4 w-4 text-ember" />
                <span className="font-medium">
                  {seasons} Season{seasons !== 1 ? "s" : ""}
                </span>
              </div>
            )}

            {type === "tv" && episodes && (
              <div className="flex items-center gap-3 rounded-md border border-white/10 bg-black/25 px-4 py-3 text-sm text-paper/80">
                <Users className="h-4 w-4 text-ember" />
                <span className="font-medium">
                  {episodes} Episode{episodes !== 1 ? "s" : ""}
                </span>
              </div>
            )}

            {rating && (
              <div className="flex items-center gap-3 rounded-md border border-white/10 bg-black/25 px-4 py-3 text-sm text-paper/80">
                <Star className="h-4 w-4 text-ember" />
                <div className="flex flex-col">
                    <p className="font-semibold text-paper">{rating.toFixed(1)}</p>
                  {ratingCount && (
                    <p className="text-xs text-mist">{ratingCount.toLocaleString()} votes</p>
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
                      className="rounded-sm border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-paper/80 transition hover:border-ember/60 hover:text-ember-soft"
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
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ember-soft">
                Overview
              </h3>
              <p className="mt-3 text-sm leading-7 text-paper/70">
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
