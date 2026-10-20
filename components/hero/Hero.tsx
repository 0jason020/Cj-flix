"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, RefreshCw, Star } from "lucide-react";
import { api } from "@/lib/api";
import { useGenres } from "@/lib/hooks";
import type { TMDBMovie } from "@/lib/types";
import MovieTrailerButton from "@/components/movie/MovieTrailerButton";
import WatchlistButton from "@/components/watchlist/WatchlistButton";
import useSWR from "swr";
import type { TMDBMovieVideosResponse } from "@/lib/types";
import { selectOfficialTrailer } from "@/lib/trailer-selection";

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

function isEligibleMovie(movie: TMDBMovie): boolean {
  return (
    typeof movie.title === "string" &&
    movie.title.trim().length > 0 &&
    typeof movie.backdrop_path === "string" &&
    movie.backdrop_path.startsWith("/") &&
    typeof movie.release_date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(movie.release_date) &&
    !Number.isNaN(Date.parse(`${movie.release_date}T00:00:00Z`)) &&
    Number.isFinite(movie.vote_average) &&
    movie.vote_average > 0 &&
    movie.vote_average <= 10 &&
    Number.isInteger(movie.vote_count) &&
    movie.vote_count >= 0
  );
}

export default function Hero() {
  const [movie, setMovie] = useState<TMDBMovie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const requestIdRef = useRef(0);
  const lastRefreshRef = useRef(0);
  const { data: genres } = useGenres();
  const { data: trailerData } = useSWR<TMDBMovieVideosResponse>(
    movie ? `movie/${movie.id}/videos` : null,
    () => api.getMovieVideos(movie!.id),
    { revalidateOnFocus: false, dedupingInterval: 24 * 60 * 60 * 1000 }
  );
  const trailer = trailerData ? selectOfficialTrailer(trailerData.results) : null;

  const refreshRanking = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    setIsRefreshing(true);

    try {
      const [trending, masterplanSearch] = await Promise.all([
        api.getTrending("movie", "week"),
        api.search("Masterplan", "movie"),
      ]);
      if (requestId !== requestIdRef.current) return;

      const trendingMovies = trending.results
        .filter((item): item is TMDBMovie => "title" in item)
        .filter(isEligibleMovie);
      const masterplan = masterplanSearch.results.find((item): item is TMDBMovie =>
        "title" in item && item.title.trim().toLowerCase() === "masterplan"
      );
      const nextMovie = masterplan && isEligibleMovie(masterplan)
        ? masterplan
        : trendingMovies[0] ?? null;
      setMovie((currentMovie) =>
        currentMovie?.id === nextMovie?.id ? currentMovie : nextMovie
      );
      setImageUnavailable(false);
      setLoadError(false);
      lastRefreshRef.current = Date.now();
    } catch (error) {
      console.error("Failed to refresh the featured trending movie:", error);
      if (requestId === requestIdRef.current) {
        setLoadError(true);
        lastRefreshRef.current = Date.now();
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    void refreshRanking();
    const interval = window.setInterval(
      () => void refreshRanking(),
      REFRESH_INTERVAL_MS
    );
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        Date.now() - lastRefreshRef.current >= REFRESH_INTERVAL_MS
      ) {
        void refreshRanking();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      requestIdRef.current += 1;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refreshRanking]);

  if (isLoading && !movie) {
    return (
      <section
        className="relative h-[min(640px,82vh)] min-h-[500px] animate-pulse overflow-hidden bg-[#101116] sm:min-h-[560px]"
        aria-label="Loading featured trending movie"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-[#08080a]/70 to-transparent" />
        <div className="absolute bottom-20 left-5 space-y-5 sm:left-10 lg:left-16">
          <div className="h-4 w-36 rounded bg-white/10" />
          <div className="h-12 w-[min(70vw,520px)] rounded bg-white/10" />
          <div className="h-4 w-72 max-w-[80vw] rounded bg-white/10" />
          <div className="h-20 w-96 max-w-[80vw] rounded bg-white/[0.06]" />
          <div className="flex gap-3">
            <div className="h-12 w-36 rounded-lg bg-white/10" />
            <div className="h-12 w-32 rounded-lg bg-white/10" />
          </div>
        </div>
      </section>
    );
  }

  if (!movie) {
    return (
      <section className="flex min-h-[500px] items-center bg-[#08080a] px-5 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-[1500px]">
          <p className="text-sm font-semibold text-dashboard-accent">
            Trending new release
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            {loadError
              ? "Featured movies are temporarily unavailable."
              : "No eligible featured movie is available right now."}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
            A featured pick from this week&apos;s trending movies.
          </p>
          <button
            type="button"
            onClick={() => void refreshRanking()}
            disabled={isRefreshing}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-dashboard-accent px-5 py-3 text-sm font-bold text-white transition hover:bg-dashboard-accent-soft disabled:opacity-60"
          >
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Try again
          </button>
        </div>
      </section>
    );
  }

  const releaseYear = movie.release_date.slice(0, 4);
  const genreNames = (genres?.genres ?? [])
    .filter((genre) => movie.genre_ids.includes(genre.id))
    .map((genre) => genre.name);
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <section
      className="relative isolate min-h-[560px] overflow-hidden border-b border-white/[0.07] bg-[#08080a] sm:min-h-[620px]"
      aria-labelledby="featured-movie-title"
    >
      {!imageUnavailable && (
        <Image
          key={movie.id}
          src={backdropUrl}
          alt={`${movie.title} backdrop`}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center"
          unoptimized
          onError={() => setImageUnavailable(true)}
        />
      )}
      {trailer && (
        <iframe
          key={trailer.key}
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailer.key)}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${encodeURIComponent(trailer.key)}&rel=0`}
          title={`${movie.title} official trailer`}
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full scale-[1.35]"
          allow="autoplay; encrypted-media; picture-in-picture"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#08080a]/90 via-[#08080a]/48 to-[#08080a]/5" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#08080a]/85 via-[#08080a]/10 to-[#08080a]/10" />

      <div className="mx-auto grid min-h-[560px] max-w-[1500px] items-end gap-8 px-5 pb-20 pt-28 sm:min-h-[620px] sm:px-10 sm:pb-24 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center lg:px-16 lg:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-dashboard-accent/30 bg-black/40 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-dashboard-accent backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            {movie.title.trim().toLowerCase() === "masterplan" ? "Featured pick" : "Trending this week"} · Official trailer
          </div>
          <h1
            id="featured-movie-title"
            className="mt-5 max-w-3xl text-4xl font-extrabold leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl"
          >
            {movie.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-white/75">
            <span>{releaseYear}</span>
            <span aria-hidden="true" className="text-white/35">•</span>
            <span className="inline-flex items-center gap-1.5 text-white">
              <Star className="h-4 w-4 fill-dashboard-accent text-dashboard-accent" />
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-xs text-white/50">
              {movie.vote_count.toLocaleString()} TMDB votes
            </span>
          </div>

          {genreNames.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {genreNames.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs text-white/80 backdrop-blur-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {movie.overview && (
            <p className="mt-5 line-clamp-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
              {movie.overview}
            </p>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            <MovieTrailerButton
              movieId={movie.id}
              title={movie.title}
              className="inline-flex items-center justify-center rounded-lg bg-dashboard-accent px-5 py-3 text-sm font-bold text-white transition hover:bg-dashboard-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            />
            <Link
              href={`/movie/${movie.id}`}
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-black/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              View Details
            </Link>
            <WatchlistButton
              media={movie}
              variant="hero"
              className="rounded-lg border border-white/20 bg-black/30 px-5 py-3 text-white hover:bg-white/10"
            />
          </div>
          {loadError && (
            <p role="status" className="mt-4 text-xs text-slate-400">
              Could not refresh the featured movie. Showing the last successfully
              selected movie.
            </p>
          )}
        </div>

        {posterUrl && (
          <div className="hidden justify-self-end lg:block">
            <Image
              src={posterUrl}
              alt={`${movie.title} poster`}
              width={260}
              height={390}
              className="w-[220px] rounded-xl border border-white/15 object-cover shadow-2xl xl:w-[260px]"
              unoptimized
            />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => void refreshRanking()}
        disabled={isRefreshing}
        aria-label="Refresh featured movie"
        title="Refresh featured movie"
        className="absolute bottom-5 right-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/75 backdrop-blur transition hover:border-white/35 hover:text-white disabled:opacity-50 sm:bottom-7 sm:right-8"
      >
        <RefreshCw
          className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          aria-hidden="true"
        />
      </button>
    </section>
  );
}
