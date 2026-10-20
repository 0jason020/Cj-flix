"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import type { TMDBMovie } from "@/lib/types";
import MediaCard from "@/components/display/MediaCard";

interface MovieRecommendationsProps {
  movieId: number;
}

export default function MovieRecommendations({
  movieId,
}: MovieRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<TMDBMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let active = true;

    const loadRecommendations = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const result = await api.getMovieRecommendations(movieId);
        if (active) setRecommendations(result.results);
      } catch (error) {
        console.error("Failed to load movie recommendations:", error);
        if (active) {
          setRecommendations([]);
          setHasError(true);
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };

    void loadRecommendations();
    return () => {
      active = false;
    };
  }, [movieId]);

  return (
    <section aria-labelledby="recommendations-title">
      <div className="mb-5">
        <h2 id="recommendations-title" className="text-2xl font-bold text-white">
          More like this
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Movie recommendations from TMDB
        </p>
      </div>
      {isLoading ? (
        <p className="flex items-center gap-2 text-sm text-slate-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading recommendations…
        </p>
      ) : hasError ? (
        <p role="status" className="text-sm text-slate-400">
          Recommendations could not be loaded. Please try again later.
        </p>
      ) : recommendations.length > 0 ? (
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
          {recommendations.slice(0, 12).map((movie) => (
            <MediaCard key={movie.id} media={movie} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-400">
          No recommendations are available for this movie yet.
        </p>
      )}
      <p className="mt-5 text-center text-xs text-slate-500">
        Movie recommendations provided by TMDB.
      </p>
    </section>
  );
}
