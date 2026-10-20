import React from "react";
import { Clapperboard, Radio, X } from "lucide-react";

interface MediaPlayerProps {
  mediaId: string | number;
  title: string;
  type?: "movie" | "tv";
  season?: number;
  episode?: number;
  className?: string;
  onClose?: () => void;
}

const MediaPlayer = ({
  mediaId,
  title,
  type = "movie",
  season,
  episode,
  className = "",
  onClose,
}: MediaPlayerProps) => {
  const embedUrl =
    type === "movie"
      ? `https://vidsrc.mov/embed/movie/${encodeURIComponent(String(mediaId))}`
      : season && episode
      ? `https://v2.vidsrc.me/embed/${mediaId}/${season}-${episode}`
      : `https://v2.vidsrc.me/embed/tv/${mediaId}`;

  return (
    <section
      aria-label={`Watch ${title}`}
      className={`overflow-hidden rounded-2xl border border-white/10 bg-[#101116] shadow-[0_28px_90px_rgba(0,0,0,0.4)] ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] bg-gradient-to-r from-white/[0.035] to-transparent px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-dashboard-accent/15 text-dashboard-accent">
            <Clapperboard className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold text-white sm:text-base">
              {title}
              {type === "tv" && season && episode && (
                <span className="ml-2 text-slate-400">
                  S{season} · E{episode}
                </span>
              )}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {onClose ? "Now playing · Craft Movies" : "Video player"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-dashboard-accent/25 bg-dashboard-accent/10 px-3 py-1.5 text-xs font-semibold text-slate-200">
            <Radio className="h-3.5 w-3.5 text-dashboard-accent" aria-hidden="true" />
            Playing
          </span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent"
              aria-label="Close movie player"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="bg-[radial-gradient(ellipse_at_top,rgba(229,9,20,0.1),transparent_45%),#050506] p-2 sm:p-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_20px_70px_rgba(0,0,0,0.6)]">
          <iframe
            src={embedUrl}
            title={`${title} - Video Player`}
            className="absolute inset-0 h-full w-full border-0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 px-4 py-4 text-xs leading-5 text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Playback controls are available inside the player.</p>
        <p className="shrink-0 text-slate-500">Craft Movies</p>
a      </div>
    </section>
  );
};

export default MediaPlayer;
