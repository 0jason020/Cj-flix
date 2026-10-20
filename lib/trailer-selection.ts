import type { TMDBMovieVideo } from "@/lib/types";

export const isValidYouTubeVideo = (video: TMDBMovieVideo) =>
  video.site.toLowerCase() === "youtube" &&
  /^[A-Za-z0-9_-]{11}$/.test(video.key);

export function selectOfficialTrailer(videos: TMDBMovieVideo[]) {
  return (
    videos
      .filter((video) => video.official && isValidYouTubeVideo(video))
      .sort((a, b) => trailerRank(a) - trailerRank(b))[0] ?? null
  );
}

function trailerRank(video: TMDBMovieVideo) {
  const type = video.type.toLowerCase();
  if (type === "trailer") return 0;
  if (type === "teaser") return 1;
  return 2;
}
