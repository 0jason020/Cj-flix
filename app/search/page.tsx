import { Metadata } from "next";
import { Suspense } from "react";
import { createPageMetadata } from "@/lib/seo";
import PageTitle from "@/components/title/PageTitle";
import SearchPageContent from "@/components/search/SearchPageContent";
import { PageLoading } from "@/components/loading/PageLoading";

export const metadata: Metadata = createPageMetadata(
  "Search",
  "Search for your favorite movies and TV shows. Find trending, top-rated, and new releases on Craft Movies.",
  "/search"
);

export default function SearchPage() {
  return (
    <main className="app-bg-enhanced min-h-screen mt-24" role="main">
      <PageTitle
        segments={[
          { text: "Explore, Discover, and" },
          { text: " Watch", isPrimary: true },
        ]}
      />
      <Suspense fallback={<PageLoading>Loading search...</PageLoading>}>
        <SearchPageContent />
      </Suspense>
    </main>
  );
}
