"use client";
import React from "react";
import MediaDetailLayout from "../layout/MediaDetailLayout";
import { Button } from "../ui/button";
import Link from "next/link";

interface InfoNotFoundProps {
  type?: "movie" | "tv";
}

const InfoNotFound = ({ type = "movie" }: InfoNotFoundProps) => {
  return (
    <MediaDetailLayout className="pt-16">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-400">404</h1>
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            {type === "movie" ? "Movie" : "TV Show"} Not Found
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            The {type === "movie" ? "movie" : "TV show"} you&apos;re looking for
            doesn&apos;t exist or has been removed from our database.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Back
          </Button>
          <Link href={type === "movie" ? "/movie" : "/tv"}>
            <Button className="px-6 py-3 border border-white/15 text-white font-medium rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              Browse {type === "movie" ? "Movies" : "TV Shows"}
            </Button>
          </Link>
        </div>
      </div>
    </MediaDetailLayout>
  );
};

export default InfoNotFound;
