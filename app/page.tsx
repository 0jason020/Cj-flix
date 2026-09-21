import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import HotflixSeasonShowcase from "@/components/dashboard/HotflixSeasonShowcase";

export const metadata: Metadata = createPageMetadata(
  "Home",
  "Stream unlimited movies and TV series. Discover trending, top-rated, and new releases with CJ FLIX."
);

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-[#0d1117] pt-[4.5rem] text-white" role="main">
      <HotflixSeasonShowcase />
    </main>
  );
}
