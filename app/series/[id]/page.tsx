import { Metadata } from "next";
import { Suspense } from "react";
import TvInfo from "@/components/series/TvInfo";
import { PageLoading } from "@/components/loading/PageLoading";
import InfoNotFound from "@/components/not-found/InfoNotFound";
import { api } from "@/lib/api";
import { TMDBTVDetail } from "@/lib/types";

interface SeriesDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Dynamic Metadata with real series title
export async function generateMetadata({
  params,
}: SeriesDetailsPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const parsedId = parseInt(id, 10);
    
    if (isNaN(parsedId) || parsedId <= 0) {
      return {
        title: "Series | CJ-FLIX",
        description: "Browse all series available on CJ-FLIX.",
      };
    }

    const seriesData = (await api.getDetails("tv", parsedId)) as TMDBTVDetail;

    return {
      title: `${seriesData.name} | CJ-FLIX`,
      description:
        seriesData.overview ||
        "Stream this series on CJ-FLIX. Find trending, top-rated, and new releases.",
      openGraph: {
        title: seriesData.name,
        description: seriesData.overview || "Watch on CJ-FLIX",
        images: seriesData.poster_path
          ? [
              {
                url: `https://image.tmdb.org/t/p/w500${seriesData.poster_path}`,
                width: 500,
                height: 750,
              },
            ]
          : [],
      },
    };
  } catch {
    return {
      title: "Series | CJ-FLIX",
      description: "Browse all series available on CJ-FLIX.",
    };
  }
}

async function getSeriesData(id: number): Promise<TMDBTVDetail | null> {
  try {
    return (await api.getDetails("tv", id)) as TMDBTVDetail;
  } catch (error) {
    console.error(`Failed to fetch series ${id}:`, error);
    return null;
  }
}

export default async function SeriesDetailsPage({
  params,
}: SeriesDetailsPageProps) {
  const { id } = await params;
  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId) || parsedId <= 0) {
    return <InfoNotFound type="tv" />;
  }

  // Fetch data on the server for faster initial load
  const seriesData = await getSeriesData(parsedId);

  // If fetch fails completely, show error
  if (!seriesData) {
    return <InfoNotFound type="tv" />;
  }

  return (
    <div className="app-bg-enhanced mt-24">
      <Suspense fallback={<PageLoading>Loading series details...</PageLoading>}>
        <TvInfo id={parsedId} initialData={seriesData} />
      </Suspense>
    </div>
  );
}
