import React from "react";
import MediaDetailLayout from "../layout/MediaDetailLayout";
import MediaPoster from "../display/MediaPoster";
import MediaMeta from "../info/MediaMeta";
import SeasonDisplay from "./SeasonDisplay";
import { Genre, TMDBTVDetail } from "@/lib/types";
import InfoNotFound from "../not-found/InfoNotFound";

interface TvInfoProps {
  id: number;
  initialData?: TMDBTVDetail | null;
  initialError?: boolean;
}

const TvInfo = ({ initialData, initialError }: TvInfoProps) => {
  const tvDetail = initialData;

  // Defensive extraction with safe defaults
  const seasons = tvDetail?.seasons ?? [];
  const seasonCount = tvDetail?.number_of_seasons ?? 0;
  const episodeCount = tvDetail?.number_of_episodes ?? 0;

  const title = tvDetail?.name || tvDetail?.original_name || "Unknown Title";
  const firstAirYear = tvDetail?.first_air_date
    ? tvDetail.first_air_date.slice(0, 4)
    : undefined;

  const genreArr = tvDetail?.genres?.map((genre: Genre) => genre.name) || [];

  // Not Found State
  if (initialError || !tvDetail) {
    return <InfoNotFound type="tv" />;
  }

  return (
    <MediaDetailLayout className="pt-16">
      <div className="space-y-8 lg:space-y-12">
        {/* Hero Section - Poster and Metadata */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Poster */}
          <div className="lg:col-span-1">
            <MediaPoster
              posterPath={tvDetail.poster_path}
              title={title}
              className="mx-auto lg:mx-0"
            />
          </div>

          {/* Metadata */}
          <div className="lg:col-span-3">
            <MediaMeta
              type="tv"
              title={title}
              year={firstAirYear}
              rating={tvDetail.vote_average}
              ratingCount={tvDetail.vote_count}
              seasons={seasonCount}
              episodes={episodeCount}
              genres={genreArr}
              overview={tvDetail.overview}
            />
          </div>
        </div>

        {/* Seasons Section */}
        {seasons.length > 0 && (
          <div className="glass-container">
            <div className="space-y-6">
              <>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  Seasons & Episodes
                </h2>
                <div className="w-full h-px bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
              </>

              <SeasonDisplay
                key={tvDetail?.id}
                SeasonCards={seasons}
                TvDetails={tvDetail}
              />
            </div>
          </div>
        )}

        {/* Additional series details can be added here */}
        <div className="max-w-6xl mx-auto" />
      </div>
    </MediaDetailLayout>
  );
};

export default TvInfo;
