import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import PageTitle from "@/components/title/PageTitle";
import SeriesPageClient from "@/components/series/SeriesPageClient";
import { PageLoading } from "@/components/loading/PageLoading";

export const metadata: Metadata = createPageMetadata(
  "TV Shows & Series",
  "Stream unlimited TV shows and series. Browse trending, top-rated, and new releases on CJ FLIX.",
  "/series"
);

export default function SeriesPage() {
  return (
    <main className="app-bg-enhanced min-h-screen mt-24" role="main">
      <PageTitle
        segments={[
          { text: "TV Shows &" },
          { text: " Series", isPrimary: true },
        ]}
      />

      <Suspense fallback={<PageLoading>Loading TV shows...</PageLoading>}>
        <SeriesPageClient />
      </Suspense>
    </main>
  );
}
