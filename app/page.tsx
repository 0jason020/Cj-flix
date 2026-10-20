import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Hero from "@/components/hero/Hero";
import HomeSections from "@/components/home/HomeSections";

export const metadata: Metadata = createPageMetadata(
  "Discover Popular Movies & TV Shows",
  "Explore popular movies, trending TV shows, top-rated films, and new releases. Find your next favorite story on Craft Movies."
);

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-[#08080a] pt-[4.5rem] text-white" role="main">
      <Hero />
      <HomeSections />
    </main>
  );
}
