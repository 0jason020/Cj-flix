import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Hero from "@/components/hero/Hero";
import CategorySection from "@/components/info/CategorySection";

export const metadata: Metadata = createPageMetadata(
  "Home",
  "Stream unlimited movies and TV series. Discover trending, top-rated, and new releases with CJ FLIX."
);

export default async function HomePage() {
  return (
    <main className="app-bg-enhanced mt-16" role="main">
      <Hero />
      <div className="relative z-10 pt-8">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            <CategorySection
              title="Popular Movies"
              mediaType="movie"
              category="popular"
              seeAllHref="/movie?category=popular"
            />
            <CategorySection
              title="Top Rated Movies"
              mediaType="movie"
              category="top_rated"
              seeAllHref="/movie?category=top_rated"
            />
            <CategorySection
              title="Now Playing"
              mediaType="movie"
              category="now_playing"
              seeAllHref="/movie?category=now_playing"
            />
            <CategorySection
              title="Upcoming Movies"
              mediaType="movie"
              category="upcoming"
              seeAllHref="/movie?category=upcoming"
            />
            <CategorySection
              title="Popular TV Shows"
              mediaType="tv"
              category="popular"
              seeAllHref="/series?category=popular"
            />
            <CategorySection
              title="Top Rated TV Shows"
              mediaType="tv"
              category="top_rated"
              seeAllHref="/series?category=top_rated"
            />
            <CategorySection
              title="On The Air"
              mediaType="tv"
              category="on_the_air"
              seeAllHref="/series?category=on_the_air"
            />
            <CategorySection
              title="Airing Today"
              mediaType="tv"
              category="airing_today"
              seeAllHref="/series?category=airing_today"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
