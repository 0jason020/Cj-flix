"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Play } from "lucide-react";
import { TMDBMovie, TMDBTVShow } from "@/lib/types";
import MediaPlayer from "@/components/display/MediaPlayer";
import { createPortal } from "react-dom";

// Type guard function using a reliable discriminant
function isTVShow(item: TMDBMovie | TMDBTVShow): item is TMDBTVShow {
  return "first_air_date" in item && item.first_air_date !== undefined;
}

interface MediaCardProps {
  media: TMDBMovie | TMDBTVShow;
  variant?: "horizontal" | "grid"; // For different layouts
  className?: string;
  showQuickPlay?: boolean;
}

const MediaCard: React.FC<MediaCardProps> = ({
  media,
  className = "",
  showQuickPlay = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const isTV = isTVShow(media);
  const href = isTV ? `/series/${media.id}` : `/movie/${media.id}`;
  const titleVal = isTV ? media.name : media.title;
  const handleCardClick = () => setIsLoading(true);

  const poster_path = media.poster_path
    ? `https://image.tmdb.org/t/p/w342/${media.poster_path}`
    : "https://i.imgur.com/wjVuAGb.png";

  const getCardClasses = () => {
    const baseClasses =
      "group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl";
    const premiumEffects =
      "border border-white/[0.09] bg-[#101010] hover:border-white/20";

    return `w-[165px] shrink-0 ${baseClasses} ${premiumEffects} ${className}`;
  };


  return (
    <div className={getCardClasses()}>
      <Link href={href} title={titleVal} className="group block w-full" onClick={handleCardClick}>
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-white/[0.04]">
          <Image
            src={poster_path}
            alt={`${titleVal} ${isTV ? "TV series" : "movie"} poster`}
            width={330}
            height={495}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            unoptimized
          />
        </div>
      </Link>

      <div className="px-3 py-2.5">
        <Link
          href={href}
          title={titleVal}
          className="block"
          onClick={handleCardClick}
        >
          <h3 className="line-clamp-2 min-h-9 text-[13px] font-semibold leading-[1.15rem] text-white transition-colors group-hover:text-white/90">
            {titleVal}
          </h3>
          <p className="mt-1.5 truncate text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
            {(isTV ? media.first_air_date : media.release_date)?.slice(0, 4) ||
              "Release date TBA"}
            <span className="mx-1.5 text-slate-600">·</span>
            {isTV ? "TV Series" : "Movie"}
          </p>
        </Link>
        {showQuickPlay && !isTV && (
          <button
            type="button"
            onClick={() => setIsPlayerOpen(true)}
            className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-dashboard-accent px-2 py-2 text-[11px] font-bold text-white transition hover:bg-dashboard-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={`Watch ${titleVal}`}
          >
            <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            Watch movie
          </button>
        )}
      </div>

      {isLoading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center rounded-2xl bg-black/70">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/90 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/50">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading...
          </div>
        </div>
      )}

      {isPlayerOpen && !isTV && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Watch ${titleVal}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsPlayerOpen(false);
          }}
        >
          <div className="w-full max-w-6xl">
            <MediaPlayer
              mediaId={media.id}
              title={titleVal}
              type="movie"
              onClose={() => setIsPlayerOpen(false)}
              className="border-white/15 shadow-[0_40px_140px_rgba(0,0,0,0.7)]"
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default MediaCard;
