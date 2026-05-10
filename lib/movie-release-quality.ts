import type { TMDBMovieReleaseDatesResponse } from "@/lib/types";

/**
 * TMDB release_types: 4 = Digital, 5 = Physical / home media.
 * If US has a Digital or Physical release date strictly in the past → treat as HD availability;
 * otherwise CAM (theatrical-only / not yet on home formats per this heuristic).
 */
export function inferMovieQualityFromUsReleaseDates(
  data: TMDBMovieReleaseDatesResponse
): "HD" | "CAM" {
  const us = data.results?.find((r) => r.iso_3166_1 === "US");
  if (!us?.release_dates?.length) {
    return "CAM";
  }

  const now = Date.now();

  const hasPastDigitalOrPhysical = us.release_dates.some((rd) => {
    const t = rd.type;
    if (t !== 4 && t !== 5) return false;
    if (!rd.release_date) return false;
    const ms = new Date(rd.release_date).getTime();
    if (Number.isNaN(ms)) return false;
    return ms < now;
  });

  return hasPastDigitalOrPhysical ? "HD" : "CAM";
}
