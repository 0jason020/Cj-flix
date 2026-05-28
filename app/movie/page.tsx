import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Suspense from "@/components/movie/MoviePageClient";

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
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      </Suspense>
    </main>
  );
} 
    'url': `https://cj-flix.netlify.app/movie/${id}`,
    // You can expand this once you fetch real movie data
  };

  return (
    <div className="app-bg-enhanced mt-24">
      {/* Injecting JSON-LD into the head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Suspense fallback={<PageLoading>Loading movie details...</PageLoading>}>
        {/* Pass the ID to your info component */}
        <MovieInfo id={parsedId} />
      </Suspense>
    </div>
  );
}