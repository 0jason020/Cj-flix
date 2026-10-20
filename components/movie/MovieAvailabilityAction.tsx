"use client";

import { useState } from "react";
import useSWR from "swr";
import { ExternalLink, Play } from "lucide-react";
import { api } from "@/lib/api";
import type { TMDBMovieWatchProvidersResponse } from "@/lib/types";

const REGIONS = [
  ["US", "United States"],
  ["GB", "United Kingdom"],
  ["CA", "Canada"],
  ["AU", "Australia"],
  ["IN", "India"],
  ["RW", "Rwanda"],
] as const;

interface MovieAvailabilityActionProps {
  movieId: number;
  onWatch: () => void;
}

function getSafeAvailabilityUrl(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "https:" ? parsedUrl.toString() : null;
  } catch {
    return null;
  }
}

export default function MovieAvailabilityAction({
  movieId,
  onWatch,
}: MovieAvailabilityActionProps) {
  const [region, setRegion] = useState<(typeof REGIONS)[number][0]>("US");
  const { data, error } = useSWR<TMDBMovieWatchProvidersResponse>(
    `movie/${movieId}/watch/providers`,
    () => api.getMovieWatchProviders(movieId),
    { revalidateOnFocus: false, dedupingInterval: 30 * 60 * 1000 }
  );
  const regionUrl = getSafeAvailabilityUrl(data?.results[region]?.link);

  return (
    <div className="space-y-2">
      <label className="flex items-center justify-between gap-3 text-xs text-slate-400">
        Region
        <select
          value={region}
          onChange={(event) => {
            const nextRegion = REGIONS.find(
              ([code]) => code === event.target.value
            )?.[0];
            if (nextRegion) setRegion(nextRegion);
          }}
          className="rounded-md border border-white/15 bg-[#17181e] px-2.5 py-1.5 text-xs text-white outline-none focus:border-dashboard-accent"
        >
          {REGIONS.map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <button
          type="button"
          onClick={onWatch}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-dashboard-accent px-5 py-3 text-sm font-bold text-white shadow-lg shadow-dashboard-accent/20 transition hover:-translate-y-0.5 hover:bg-dashboard-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Play className="h-4 w-4 fill-current" aria-hidden="true" />
          Watch Full Movie
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </button>
      {regionUrl && (
        <a href={regionUrl} target="_blank" rel="noopener noreferrer" className="block text-center text-[11px] leading-4 text-slate-500 hover:text-slate-300">
          View authorized options in {REGIONS.find(([code]) => code === region)?.[1] ?? "your region"}
        </a>
      )}
      {error && <p role="status" className="text-center text-[11px] text-slate-500">Provider options are temporarily unavailable.</p>}
    </div>
  );
}
