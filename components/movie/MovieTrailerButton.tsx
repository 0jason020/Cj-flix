"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { ExternalLink, Loader2, Play } from "lucide-react";
import { api } from "@/lib/api";
import type { TMDBMovieVideosResponse } from "@/lib/types";
import { selectOfficialTrailer } from "@/lib/trailer-selection";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MovieTrailerButtonProps {
  movieId: number;
  title: string;
  className?: string;
}

export default function MovieTrailerButton({
  movieId,
  title,
  className = "",
}: MovieTrailerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, isLoading } = useSWR<TMDBMovieVideosResponse>(
    isOpen ? `movie/${movieId}/videos` : null,
    () => api.getMovieVideos(movieId),
    { revalidateOnFocus: false, dedupingInterval: 24 * 60 * 60 * 1000 }
  );

  const trailer = useMemo(
    () => (data ? selectOfficialTrailer(data.results) : null),
    [data]
  );
  const youtubeUrl = trailer
    ? `https://www.youtube.com/watch?v=${encodeURIComponent(trailer.key)}`
    : null;
  const embedUrl = trailer
    ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailer.key)}?autoplay=1&controls=1&playsinline=1&rel=0`
    : null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={className}
          aria-label={`Watch trailer for ${title}`}
        >
          <Play className="mr-2 h-4 w-4 fill-current" aria-hidden="true" />
          Watch Trailer
        </button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-4xl border-white/10 bg-[#101116] p-4 text-white sm:p-6">
        <DialogHeader className="pr-8 text-left">
          <DialogTitle className="text-lg font-bold">{title} — Trailer</DialogTitle>
          <DialogDescription className="text-slate-400">
            Official trailer information provided by TMDB. This is a trailer,
            not the full movie.
          </DialogDescription>
        </DialogHeader>
        <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center text-sm text-slate-300">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Finding the trailer…
            </div>
          )}
          {!isLoading && error && (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-slate-300">
              Trailer information could not be loaded. Please try again later.
            </div>
          )}
          {!isLoading && !error && embedUrl && (
            <iframe
              src={embedUrl}
              title={`${title} official trailer`}
              className="absolute inset-0 h-full w-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          )}
          {!isLoading && !error && !trailer && (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-slate-300">
              Trailer unavailable for this movie.
            </div>
          )}
        </div>
        {youtubeUrl && (
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-dashboard-accent/60 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent"
          >
            Open trailer on YouTube
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </DialogContent>
    </Dialog>
  );
}
