import React, { lazy, Suspense } from "react";
import MediaPoster from "../display/MediaPoster";
import MediaMeta from "../info/MediaMeta";
import { Genre, TMDBMovieDetail } from "@/lib/types";
import InfoNotFound from "../not-found/InfoNotFound";
import MediaDetailLayout from "../layout/MediaDetailLayout";
import { PageLoading } from "../loading/PageLoading";

// Lazy load the media player for faster initial page load
const MediaPlayer = lazy(() => import("../display/MediaPlayer"));

interface MovieInfoProps {
  id: number;
  initialData?: TMDBMovieDetail | null;
  initialError?: boolean;
}

const MovieInfo = ({ id, initialData, initialError }: MovieInfoProps) => {
  // Use server-provided data or show error state
  const MovieDetail = initialData;
  const title =
    MovieDetail?.title || MovieDetail?.original_title || "Unknown Title";
  const releaseYear = MovieDetail?.release_date
    ? MovieDetail.release_date.slice(0, 4)
    : undefined;

  const genreArr = MovieDetail?.genres?.map((genre: Genre) => genre.name) || [];

  // Not Found State
  if (initialError || !MovieDetail) {
    return <InfoNotFound />;
  }

  return (
    <MediaDetailLayout className="pt-16">
      <div className="space-y-8 lg:space-y-12">
        {/* Hero Section - Poster and Metadata */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Poster */}
          <div className="lg:col-span-1">
            <MediaPoster
              posterPath={MovieDetail.poster_path}
              title={title}
              className="mx-auto lg:mx-0"
            />
          </div>

          {/* Metadata */}
          <div className="lg:col-span-3">
            <MediaMeta
              type="movie"
              title={title}
              year={releaseYear}
              rating={MovieDetail.vote_average}
              ratingCount={MovieDetail.vote_count}
              runtime={MovieDetail.runtime}
              genres={genreArr}
              overview={MovieDetail.overview}
            />
          </div>
        </div>

        {/* Video Player Section - Lazy loaded */}
        <Suspense fallback={<PageLoading>Loading player...</PageLoading>}>
          <MediaPlayer mediaId={id} title={title} type="movie" />
        </Suspense>

        {/* Additional Info Grid */}
        <div className="max-w-6xl mx-auto">
          {/* Additional movie details can be added here */}
        </div>
      </div>
    </MediaDetailLayout>
  );
};

export default MovieInfo;
