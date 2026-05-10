import { Metadata } from "next";
import InfoNotFound from "@/components/not-found/InfoNotFound";
import MovieInfo from "@/components/movie/MovieInfo";

export const metadata: Metadata = {
  title: "Movie | Pifilms",
  description:
    "Browse all movies available on Pifilms. Find trending, top-rated, and new releases.",
};

interface MovieDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const { id } = await params;
  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId) || parsedId <= 0) {
    return <InfoNotFound />;
  }

  return <MovieInfo id={parsedId} />;
}
