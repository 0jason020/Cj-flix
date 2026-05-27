import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Watchlist | CJ FLIX",
  description:
    "Browse and manage your personal watchlist of movies and TV shows on CJ FLIX.",
};

export default function WatchlistPage() {
  redirect("/");
}
