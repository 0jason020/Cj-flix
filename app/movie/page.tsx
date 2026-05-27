import { Metadata } from "next";
import { Suspense } from "react";
import MovieInfo from "@/components/movie/MovieInfo"; // Using the component you mentioned earlier
import { PageLoading } from "@/components/loading/PageLoading";

interface MovieDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// 1. Dynamic Metadata (Fixes the SEO/Index issue)
export async function generateMetadata({ params }: MovieDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Watch Movie ${id} | ALLAN `,
    description: `Stream movie ${id} on ALLAN. Find trending, top-rated, and new releases.`,
  };
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  // 2. Await the params (Required in Next.js 15+)
  const { id } = await params;
  const parsedId = parseInt(id, 10);

  // 3. Schema.org JSON-LD (For Google Search "Rich Results")
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    'name': `Movie ${id}`, 
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