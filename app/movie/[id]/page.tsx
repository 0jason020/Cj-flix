import { Metadata } from "next";
import { Suspense } from "react";
import MovieInfo from "@/components/movie/MovieInfo";
import { PageLoading } from "@/components/loading/PageLoading";
import InfoNotFound from "@/components/not-found/InfoNotFound";
import { api } from "@/lib/api";
import { TMDBMovieDetail } from "@/lib/types";

interface MovieDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Dynamic Metadata with real movie title
export async function generateMetadata({
  params,
}: MovieDetailPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const parsedId = parseInt(id, 10);
    
    if (isNaN(parsedId) || parsedId <= 0) {
      return {
        title: "Movie | CJ-FLIX",
        description: "Browse all movies available on CJ-FLIX.",
      };
    }

    const movieData = (await api.getDetails(
      "movie",
      parsedId
    )) as TMDBMovieDetail;

    return {
      title: `${movieData.title} | CJ-FLIX`,
      description:
        movieData.overview ||
        "Stream this movie on CJ-FLIX. Find trending, top-rated, and new releases.",
      openGraph: {
        title: movieData.title,
        description: movieData.overview || "Watch on CJ-FLIX",
        images: movieData.poster_path
          ? [
              {
                url: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
                width: 500,
                height: 750,
              },
            ]
          : [],
      },
    };
  } catch {
    return {
      title: "Movie | CJ-FLIX",
      description: "Browse all movies available on CJ-FLIX.",
    };
  }
}

async function getMovieData(id: number): Promise<TMDBMovieDetail | null> {
  try {
    return (await api.getDetails("movie", id)) as TMDBMovieDetail;
  } catch (error) {
    console.error(`Failed to fetch movie ${id}:`, error);
    return null;
  }
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const { id } = await params;
  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId) || parsedId <= 0) {
    return <InfoNotFound />;
  }

  // Fetch data on the server for faster initial load
  const movieData = await getMovieData(parsedId);

  // If fetch fails completely, show error
  if (!movieData) {
    return <InfoNotFound />;
  }

  return (
    <div className="app-bg-enhanced mt-24">
      <Suspense fallback={<PageLoading>Loading movie details...</PageLoading>}>
        <MovieInfo id={parsedId} initialData={movieData} />
      </Suspense>
    </div>
  );
}
