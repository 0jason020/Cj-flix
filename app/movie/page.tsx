import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import MoviePageClient from "@/components/movie/MoviePageClient";
import { Suspense } from "react";

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