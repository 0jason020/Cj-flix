import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import WatchListClient from "@/components/watchlist/WatchListClient";

export const metadata: Metadata = {
  ...createPageMetadata(
    "My List",
    "Manage your saved movies and TV shows on Craft Movies.",
    "/watchlist"
  ),
  robots: {
    index: false,
    follow: false,
  },
};

export default function WatchlistPage() {
  return (
    <main className="app-bg-enhanced min-h-screen px-4 pb-16 pt-24" role="main">
      <div className="mx-auto max-w-[1500px]">
        <h1 className="mb-8 font-display text-5xl uppercase tracking-wide text-white sm:text-6xl">
          My List
        </h1>
        <WatchListClient />
      </div>
    </main>
  );
}
