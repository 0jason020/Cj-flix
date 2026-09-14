import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Hero from "@/components/hero/Hero";
import CategorySection from "@/components/info/CategorySection";
import Sidebar from "@/components/dashboard/Sidebar";
import StudioLogos from "@/components/dashboard/StudioLogos";
import ContinueWatchingRow from "@/components/dashboard/ContinueWatchingRow";
import TopMoviesPanel from "@/components/dashboard/TopMoviesPanel";

export const metadata: Metadata = createPageMetadata(
  "Home",
  "Stream unlimited movies and TV series. Discover trending, top-rated, and new releases with CJ FLIX."
);

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-dashboard-bg pt-[4.5rem]" role="main">
      <div className="mx-auto flex max-w-[1500px]">
        <Sidebar />
        <div className="min-w-0 flex-1 px-5 py-6 sm:px-8 lg:px-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0">
              <Hero />
              <StudioLogos />
              <ContinueWatchingRow />
              <div className="mt-12 space-y-12">
                <CategorySection title="Popular Movies" mediaType="movie" category="popular" seeAllHref="/movie?category=popular" />
                <CategorySection title="Top Rated Movies" mediaType="movie" category="top_rated" seeAllHref="/movie?category=top_rated" />
                <CategorySection title="Now Playing" mediaType="movie" category="now_playing" seeAllHref="/movie?category=now_playing" />
                <CategorySection title="Upcoming Movies" mediaType="movie" category="upcoming" seeAllHref="/movie?category=upcoming" />
                <CategorySection title="Popular TV Shows" mediaType="tv" category="popular" seeAllHref="/series?category=popular" />
                <CategorySection title="Top Rated TV Shows" mediaType="tv" category="top_rated" seeAllHref="/series?category=top_rated" />
                <CategorySection title="On The Air" mediaType="tv" category="on_the_air" seeAllHref="/series?category=on_the_air" />
                <CategorySection title="Airing Today" mediaType="tv" category="airing_today" seeAllHref="/series?category=airing_today" />
              </div>
            </div>
            <TopMoviesPanel />
          </div>
        </div>
      </div>
    </main>
  );
}
