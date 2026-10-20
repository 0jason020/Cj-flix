"use client";

import useSWR from "swr";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import type { TMDBMovieVideosResponse } from "@/lib/types";
import { selectOfficialTrailer } from "@/lib/trailer-selection";

interface MovieTrailerPlayerProps {
  movieId: number;
  title: string;
  backdropPath: string | null;
}

export default function MovieTrailerPlayer({
  movieId,
  title,
  backdropPath,
}: MovieTrailerPlayerProps) {
  const { data, error, isLoading } = useSWR<TMDBMovieVideosResponse>(
    `movie/${movieId}/videos`,
    () => api.getMovieVideos(movieId),
    { revalidateOnFocus: false, dedupingInterval: 24 * 60 * 60 * 1000 }
  );
  const trailer = data ? selectOfficialTrailer(data.results) : null;
  const backdropUrl = backdropPath
    ? `https://image.tmdb.org/t/p/w1280${backdropPath}`
    : null;

  return (
    <section
      className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
      aria-label={`${title} trailer`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[#08080a]">
        {backdropUrl && (
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center opacity-35 blur-sm"
            style={{ backgroundImage: `url("${backdropUrl}")` }}
            aria-hidden="true"
          />
        )}

        {trailer && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailer.key)}?autoplay=1&mute=1&controls=1&playsinline=1&rel=0`}
            title={`${title} official trailer`}
            className="absolute inset-0 z-10 h-full w-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}

        {isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 text-sm text-slate-200">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading official trailer…
          </div>
        )}
        {error && (
          <div
            role="status"
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 px-6 text-center text-sm text-slate-200"
          >
            Trailer information is temporarily unavailable.
          </div>
        )}
        {!isLoading && !error && !trailer && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 px-6 text-center text-sm text-slate-200">
            An official trailer is not available for this movie.
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
          Official trailer
        </p>
        <p className="text-right text-[11px] text-slate-500">
          Trailer preview · Not the full movie
        </p>
      </div>
    </section>
  );
}
