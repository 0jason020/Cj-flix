"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Loader2 } from "lucide-react";
import useSWR from "swr";
import { TMDBMovie, TMDBTVShow } from "@/lib/types";

type ReleaseQualityResponse = { quality: "HD" | "CAM" };

const fetchReleaseQuality = async (url: string): Promise<ReleaseQualityResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    return { quality: "CAM" };
  }
  return res.json();
};

// Type guard function using a reliable discriminant
function isTVShow(item: TMDBMovie | TMDBTVShow): item is TMDBTVShow {
  return "first_air_date" in item && item.first_air_date !== undefined;
}

interface MediaCardProps {
  media: TMDBMovie | TMDBTVShow;
  variant?: "horizontal" | "grid"; // For different layouts
  className?: string;
}

const MediaCard: React.FC<MediaCardProps> = ({
  media,
  variant = "grid",
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isTV = isTVShow(media);
  const href = isTV ? `/series/${media.id}` : `/movie/${media.id}`;
  const titleVal = isTV ? media.name : media.title;

  const { data: qualityData } = useSWR<ReleaseQualityResponse>(
    isTV ? null : `/api/movie/${media.id}/release-quality`,
    fetchReleaseQuality,
    { revalidateOnFocus: false, dedupingInterval: 3600_000 }
  );

  const qualityLabel = !isTV ? qualityData?.quality : undefined;
  const handleCardClick = () => setIsLoading(true);

  const poster_path = media.poster_path
    ? `https://image.tmdb.org/t/p/w342/${media.poster_path}`
    : "https://i.imgur.com/wjVuAGb.png";

  // Dynamic classes based on variant
  const getCardClasses = () => {
    const baseClasses =
      "group relative rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1";
    const premiumEffects =
      "bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/80";

    if (variant === "horizontal") {
      // For horizontal scrolling (CategorySection)
      return `w-[160px] sm:w-[180px] md:w-[200px] ${baseClasses} ${premiumEffects} ${className}`;
    } else {
      // For grid layout (MovieDisplay, TvDisplay) - responsive sizing
      return `w-full ${baseClasses} ${premiumEffects} ${className}`;
    }
  };


  return (
    <div className={getCardClasses()}>
      <Link href={href} title={titleVal} className="group block w-full" onClick={handleCardClick}>
        <div className="aspect-[2/3] w-full relative overflow-hidden">
          {/* Premium image container with enhanced effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <Image
            src={poster_path}
            alt={`${titleVal} ${isTV ? "TV series" : "movie"} poster`}
            width={342}
            height={513}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
            unoptimized
          />

          {/* US digital/physical release heuristic: HD vs CAM */}
          {qualityLabel && (
            <div className={`absolute bottom-2 right-2 z-[22] rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-lg backdrop-blur-sm border-red-600/40 bg-black/70 text-red-200`}>
              {qualityLabel}
            </div>
          )}

          {/* Premium overlay content */}
          <div className="absolute inset-0 z-20">
            {/* Icon badge shown on hover */}
            <div className="absolute top-3 left-1/2 z-30 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/80 px-3 py-2 text-white text-xs font-semibold uppercase tracking-[0.18em] shadow-lg shadow-black/40">
                <Play className="h-4 w-4" />
                Play
              </div>
            </div>

            {/* Rating badge */}
            {media.vote_average > 0 && (
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-black/80 backdrop-blur-md px-2 py-1 rounded-lg border border-red-600/30">
                  <span className="text-red-400 text-xs font-bold">⭐ {media.vote_average.toFixed(1)}</span>
                </div>
              </div>
            )}

            {/* Movie/Series info on hover - bottom left */}
            <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="space-y-1">
                {/* Media type badge */}
                <div className="w-fit bg-gradient-to-r from-red-600 to-red-400 backdrop-blur-md px-1 py-1 rounded-lg border border-red-500/30">
                  <span className="text-white text-xs uppercase tracking-wider">{isTV ? "Series" : "Movie"}</span>
                </div>
                {/* Title */}
                <div className="bg-black/80 backdrop-blur-md px-2 py-1 rounded-lg border border-gray-600/30">
                  <h3 className="text-white text-xs font-semibold line-clamp-2 leading-tight">
                    {titleVal}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {isLoading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center rounded-xl bg-black/70">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/90 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/50">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading...
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaCard;
