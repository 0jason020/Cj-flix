import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import MoviePageClient from "@/components/movie/MoviePageClient";
import { Suspense } from "react";
import { Film, Sparkles } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata(
    "Movies",
    "Browse our extensive collection of movies. Filter by genre, rating, and release date.",
    "/movie"
  );
}

export default async function MoviePage() {
  return (
    <main className="app-bg-enhanced min-h-screen pt-20" role="main">
      <header className="mx-auto max-w-[1500px] px-5 pt-8 sm:px-8 sm:pt-12 lg:px-10">
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#261510] via-[#11131a] to-[#0b0b0e] px-6 py-8 sm:px-10 sm:py-10">
          <div className="absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl" />
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
            <Sparkles className="h-4 w-4" />
            Find your next favorite
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            The movie collection
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Browse big-screen favorites, discover something by genre, and
            explore the latest releases.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/80">
            <Film className="h-4 w-4 text-orange-300" />
            Filter by category, genre, year, and rating
          </div>
        </div>
      </header>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center text-gray-300">
            Loading movies...
          </div>
        }
      >
        <MoviePageClient />
      </Suspense>
    </main>
  );
}