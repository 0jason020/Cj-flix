import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  "Watchlist",
  "Manage your personal watchlist of movies and TV shows. Save and organize your favorite content on CJ FLIX.",
  "/watchlist"
);

export default function WatchlistPage() {
  redirect("/");
}
