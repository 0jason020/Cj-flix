"use client";

import Image from "next/image";
import { Clock3, Star } from "lucide-react";
import type { TMDBMovie, TMDBMovieDetail } from "@/lib/types";
import InfoNotFound from "@/components/not-found/InfoNotFound";
import MediaDetailLayout from "@/components/layout/MediaDetailLayout";
import MovieRecommendations from "./MovieRecommendations";
import MovieTrailerPlayer from "./MovieTrailerPlayer";
import MovieAvailabilityAction from "./MovieAvailabilityAction";
import WatchlistButton from "@/components/watchlist/WatchlistButton";
import MediaPlayer from "@/components/display/MediaPlayer";
import { useRef, useState } from "react";

interface MovieInfoProps {
  id: number;
  initialData?: TMDBMovieDetail | null;
  initialError?: boolean;
}

export default function MovieInfo({
  id,
  initialData,
  initialError,
}: MovieInfoProps) {
  const [isMoviePlayerVisible, setIsMoviePlayerVisible] = useState(false);
  const moviePlayerRef = useRef<HTMLDivElement>(null);
  if (initialError || !initialData) {
    return <InfoNotFound />;
  }

  const movie = initialData;
  const title = movie.title || movie.original_title || "Untitled movie";
  const year = movie.release_date?.slice(0, 4);
  const genres = movie.genres.map((genre) => genre.name);
  const watchlistMovie: TMDBMovie = {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    genre_ids: movie.genres.flatMap((genre) =>
      typeof genre.id === "number" ? [genre.id] : []
    ),
    adult: movie.adult,
    original_language: movie.original_language,
    original_title: movie.original_title,
    popularity: movie.popularity,
    video: movie.video,
  };

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  return (
    <MediaDetailLayout className="pt-16">
      <div className="space-y-10">
        <section
          className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[#101116] shadow-2xl"
          aria-labelledby="movie-title"
        >
          {backdropUrl && (
            <div
              className="absolute inset-0 -z-20 scale-105 bg-cover bg-center opacity-30 blur-sm"
              style={{ backgroundImage: `url("${backdropUrl}")` }}
              aria-hidden="true"
            />
          )}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#08090d]/95 via-[#08090d]/90 to-[#08090d]/80" />

          <div className="grid gap-5 p-4 sm:gap-7 sm:p-7 lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)] lg:p-8">
            <div className="min-w-0">
              <MovieTrailerPlayer
                movieId={movie.id}
                title={title}
                backdropPath={movie.backdrop_path}
              />
            </div>

            <article className="flex min-w-0 flex-col justify-center rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-sm sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-dashboard-accent">
                Movie details
              </p>
              <h1
                id="movie-title"
                className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl"
              >
                {title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-300">
                {year && <span>{year}</span>}
                {movie.runtime ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4 text-slate-400" />
                    {movie.runtime} min
                  </span>
                ) : null}
                {movie.vote_average > 0 && (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                    <Star className="h-4 w-4 fill-dashboard-accent text-dashboard-accent" />
                    {movie.vote_average.toFixed(1)}
                  </span>
                )}
              </div>

              {genres.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-slate-200"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 border-t border-white/10 pt-5">
                <h2 className="text-xs font-bold uppercase tracking-[0.17em] text-slate-400">
                  Synopsis
                </h2>
                <p className="mt-3 max-h-52 overflow-y-auto text-sm leading-6 text-slate-200/80">
                  {movie.overview ||
                    "A synopsis is not available for this movie yet."}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <MovieAvailabilityAction
                  movieId={movie.id}
                  onWatch={() => {
                    setIsMoviePlayerVisible(true);
                    window.setTimeout(
                      () => moviePlayerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
                      0
                    );
                  }}
                />
                <WatchlistButton
                  media={watchlistMovie}
                  className="w-full rounded-lg border border-white/20 bg-white/[0.06] px-5 py-3 text-white hover:border-dashboard-accent/50 hover:bg-white/10"
                />
              </div>
            </article>
          </div>

          <div className="flex items-center gap-2 border-t border-white/[0.08] px-5 py-3 text-xs text-slate-400 sm:px-8">
            {movie.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt=""
                width={24}
                height={36}
                className="h-9 w-6 rounded object-cover"
                unoptimized
              />
            )}
            <span>
              Trailer preview only. This page does not play the full movie.
            </span>
          </div>
        </section>

        {isMoviePlayerVisible && (
          <div ref={moviePlayerRef} id="full-movie" className="scroll-mt-24">
            <MediaPlayer mediaId={movie.id} title={title} type="movie" />
          </div>
        )}

        <MovieRecommendations movieId={id} />
      </div>
    </MediaDetailLayout>
  );
}
