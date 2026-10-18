import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Hero from "@/components/hero/Hero";
import HomeSections from "@/components/home/HomeSections";

export const metadata: Metadata = createPageMetadata(
  "Home",
  "Stream unlimited movies and TV series. Discover trending, top-rated, and new releases with CJ FLIX."
);

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-[#08080a] pt-[4.5rem] text-white" role="main">
      <Hero />
      <HomeSections />
    </main>
  );
}
