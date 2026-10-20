import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import SeriesPageClient from "@/components/series/SeriesPageClient";
import { PageLoading } from "@/components/loading/PageLoading";
import { Clapperboard, Sparkles, Tv } from "lucide-react";

export const metadata: Metadata = createPageMetadata(
  "TV Shows & Series",
  "Browse trending TV shows, top-rated series, and new episodes on Craft Movies.",
  "/series"
);

export default function SeriesPage() {
  return (
    <main className="app-bg-enhanced min-h-screen pt-20" role="main">
      <div className="mx-auto max-w-[1500px] px-5 pt-8 sm:px-8 sm:pt-12 lg:px-10">
        <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1d182c] via-[#11131a] to-[#0b0b0e] px-6 py-9 sm:px-10 sm:py-12">
          <div className="absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 -z-10 h-64 w-64 rounded-full bg-dashboard-accent/10 blur-3xl" />
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
            <Sparkles className="h-4 w-4" />
            Your next binge starts here
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Series worth staying in for.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Explore popular shows, find a new favorite by genre, and catch up on
            the stories everyone is talking about.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/80">
              <Tv className="h-4 w-4 text-violet-300" />
              Popular series
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/80">
              <Clapperboard className="h-4 w-4 text-dashboard-accent" />
              New episodes
            </span>
          </div>
        </section>
      </div>
      <div className="mx-auto max-w-[1500px] px-5 pb-10 sm:px-8 lg:px-10">
        <Suspense fallback={<PageLoading>Loading TV shows...</PageLoading>}>
          <SeriesPageClient />
        </Suspense>
      </div>
    </main>
  );
}
