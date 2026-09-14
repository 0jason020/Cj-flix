import React from "react";
import { Download, ExternalLink } from "lucide-react";

interface MediaPlayerProps {
  mediaId: string | number;
  title: string;
  type?: "movie" | "tv";
  season?: number;
  episode?: number;
  className?: string;
}

/**
 * MediaPlayer - Modern, responsive video player component
 * Features glass morphism container with optimal aspect ratio
 */
const MediaPlayer = ({
  mediaId,
  title,
  type = "movie",
  season,
  episode,
  className = "",
}: MediaPlayerProps) => {
  // Construct embed URL with episode-specific parameters for TV shows
  const embedUrl =
    type === "movie"
      ? `https://v2.vidsrc.me/embed/${mediaId}`
      : season && episode
      ? `https://v2.vidsrc.me/embed/${mediaId}/${season}-${episode}`
      : `https://v2.vidsrc.me/embed/tv/${mediaId}`;

  return (
    <div className={`glass-container p-3 sm:p-5 lg:p-6 ${className}`}>
      <div className="relative">
        {/* Player Header */}
        <div className="mb-4">
          <h2 className="mb-3 font-display text-3xl uppercase tracking-wide text-paper lg:text-4xl">
            Watch {title}
            {type === "tv" && season && episode && (
              <span className="text-primary ml-2 text-lg">
                S{season}E{episode}
              </span>
            )}
          </h2>
          <div className="h-px w-full bg-gradient-to-r from-ember via-ember/50 to-transparent" />
        </div>

        {/* Video Container */}
        <div className="relative">
          {/* Responsive iframe container */}
          <div className="relative aspect-video w-full overflow-hidden rounded-md border border-white/10 bg-black/70">
            <iframe
              src={embedUrl}
              title={`${title} - Video Player`}
              className="absolute inset-0 w-full h-full border-0 rounded-xl"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Decorative glow effect */}
          <div
            className="absolute -inset-2 bg-gradient-to-r from-primary/10 via-blue-500/10 
                        to-primary/10 rounded-2xl blur-xl opacity-50 -z-10"
          />
        </div>

        {/* Player Footer */}
        <div className="mt-4 text-center">
          <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row">
            <p className="text-left text-sm leading-6 text-gray-400">
              Watch in high quality. Use the download option to open the movie source.
            </p>
            <a
              href={embedUrl}
              download={`${title}.mp4`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              title="Open the movie source in a new tab"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download
              <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
