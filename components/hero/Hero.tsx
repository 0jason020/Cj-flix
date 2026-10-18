"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TMDBMovie, TMDBTVShow } from "@/lib/types";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Info, Pause, Play, PlayIcon, Star } from "lucide-react";
import { PageLoading } from "../loading/PageLoading";
import WatchlistButton from "../watchlist/WatchlistButton";

const Hero = () => {
  const [slides, setSlides] = useState<(TMDBMovie | TMDBTVShow)[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [announceText, setAnnounceText] = useState("");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const router = useRouter();

  // Fetch hero slides data
  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        // Try to fetch both movie and TV data with individual error handling
        const [movieResult, tvResult] = await Promise.allSettled([
          api.getPopular("movie", 1),
          api.getPopular("tv", 1),
        ]);

        const movieData =
          movieResult.status === "fulfilled"
            ? movieResult.value.results.slice(0, 4)
            : [];
        const tvData =
          tvResult.status === "fulfilled"
            ? tvResult.value.results.slice(0, 3)
            : [];

        // Log any failures for debugging
        if (movieResult.status === "rejected") {
          console.warn(
            "Failed to fetch popular movies for hero:",
            movieResult.reason
          );
        }
        if (tvResult.status === "rejected") {
          console.warn(
            "Failed to fetch popular TV shows for hero:",
            tvResult.reason
          );
        }

        // Combine available data
        const combined = [...movieData, ...tvData];

        // If we have no data at all, return some fallback data or empty array
        if (combined.length === 0) {
          console.warn("No hero slides data available, using empty array");
          setSlides([]);
          return;
        }

        // Validate and normalize dates to timestamps
        const getValidTimestamp = (
          dateStr: string | null | undefined
        ): number => {
          if (!dateStr || dateStr.trim() === "") {
            return Number.NEGATIVE_INFINITY; // Sort invalid dates to end
          }
          const timestamp = Date.parse(dateStr);
          return isNaN(timestamp) ? Number.NEGATIVE_INFINITY : timestamp;
        };

        const sortedSlides = combined.sort((a, b) => {
          // Extract candidate date strings
          const dateStringA =
            "release_date" in a ? a.release_date : a.first_air_date;
          const dateStringB =
            "release_date" in b ? b.release_date : b.first_air_date;

          const timestampA = getValidTimestamp(dateStringA);
          const timestampB = getValidTimestamp(dateStringB);

          return timestampB - timestampA; // Latest first
        });

        setSlides(sortedSlides);
      } catch (error) {
        console.error("Critical error in fetchHeroSlides:", error);
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSlides();
  }, []);

  // Reset currentIndex if it becomes invalid when slides array changes
  useEffect(() => {
    if (slides && slides.length > 0) {
      setCurrentIndex((ci) => (ci >= slides.length ? 0 : ci));
    }
  }, [slides]);

  // Announce slide changes for screen readers
  useEffect(() => {
    if (slides && slides.length > 0) {
      const currentSlide = slides[currentIndex];
      const isTV = "name" in currentSlide;
      const title = isTV ? currentSlide.name : currentSlide.title;
      setAnnounceText(
        `Now showing: ${title}, slide ${currentIndex + 1} of ${slides.length}`
      );
    }
  }, [currentIndex, slides]);

  // Auto-slide functionality - change slides every 10 seconds when not paused
  useEffect(() => {
    if (!slides || slides.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [slides, isPaused]);

  // Early return after all hooks are called
  if (loading) {
    return (
      <div
        className="h-[min(760px,92vh)] min-h-[620px] animate-pulse bg-gradient-to-br from-[#171116] via-[#08080a] to-[#08080a]"
        aria-label="Loading featured title"
      >
        <PageLoading>Finding your next movie...</PageLoading>
      </div>
    );
  }

  if (!slides || slides.length === 0) {
    return (
      <section className="flex min-h-[620px] items-center bg-[radial-gradient(ellipse_at_70%_40%,rgba(229,9,36,0.12),transparent_48%),#08080a] px-5 sm:px-8">
        <div className="mx-auto w-full max-w-[1500px]">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-dashboard-accent">
            Your next favorite is waiting
          </p>
          <h1 className="max-w-2xl text-5xl font-extrabold tracking-[-0.055em] text-white sm:text-7xl">
            Find your next great story.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-6 text-white/65 sm:text-base">
            Featured titles are unavailable right now. Explore the full library
            while we get things back on screen.
          </p>
          <Link
            href="/movies"
            className="mt-7 inline-flex items-center rounded-lg bg-dashboard-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-dashboard-accent-soft"
          >
            Explore Movies
          </Link>
        </div>
      </section>
    );
  }

  const currentSlide = slides[currentIndex];
  const isTV = "name" in currentSlide;
  const title = isTV ? currentSlide.name : currentSlide.title;
  const href = isTV
    ? `/series/${currentSlide.id}`
    : `/movie/${currentSlide.id}`;

  // Construct full TMDB image URL with fallback
  const backdropUrl = currentSlide.backdrop_path
    ? `https://image.tmdb.org/t/p/original${currentSlide.backdrop_path}`
    : "https://i.imgur.com/wjVuAGb.png"; // Fallback image
  const releaseDate =
    "release_date" in currentSlide
      ? currentSlide.release_date
      : currentSlide.first_air_date;
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : null;

  async function handlePlay(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    event.preventDefault();
    try {
      await router.push(href);
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  }

  // Handle mouse interactions for accessibility
  const handleMouseEnter = () => {
    if (slides.length > 1) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    resetTilt();
    if (slides.length > 1) {
      setIsPaused(false);
    }
  };

  // Handle focus events for accessibility
  const handleFocus = () => {
    if (slides.length > 1) {
      setIsPaused(true);
    }
  };

  const handleBlur = () => {
    if (slides.length > 1) {
      setIsPaused(false);
    }
  };

  // Toggle pause state
  const togglePause = () => {
    if (slides.length > 1) {
      setIsPaused(!isPaused);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (slides.length <= 1) return;

    // Only handle keys when the hero container itself has focus, not child elements
    if (event.currentTarget !== event.target) return;

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
        break;
      case "ArrowRight":
        event.preventDefault();
        setCurrentIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
        break;
      case " ":
      case "Enter":
        event.preventDefault();
        togglePause();
        break;
    }
  };

  const handleTilt = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    setTilt({
      x: (0.5 - py) * 16,
      y: (px - 0.5) * 18,
    });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      className="hero-carousel-focus relative h-[min(760px,92vh)] min-h-[620px] w-full overflow-hidden border-b border-white/[0.06] bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-dashboard-accent focus-visible:outline-offset-2 sm:min-h-[680px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onMouseMove={handleTilt}
      tabIndex={0}
      role="region"
      aria-label="Hero carousel"
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: 1.08,
        }}
        transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.7 }}
        className="absolute inset-0"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.12 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={backdropUrl}
              alt={`${title || "Featured content"} backdrop image`}
              fill
              className="object-cover"
              priority
              onError={(e) => {
                console.error("Failed to load image:", backdropUrl);
                e.currentTarget.src = "https://i.imgur.com/wjVuAGb.png";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-[#08080a]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/10 to-[#08080a]/20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_40%,transparent_0%,rgba(8,8,10,0.5)_100%)]" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div
        animate={{ x: tilt.y * 0.8, y: tilt.x * 0.6 }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        className="relative z-10 flex h-full items-end px-5 pb-28 sm:px-8 sm:pb-32 lg:items-center lg:pb-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-white"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-5 inline-flex items-center gap-2 rounded-md border border-dashboard-accent/20 bg-dashboard-accent/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-dashboard-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-dashboard-accent shadow-[0_0_12px_rgba(229,9,36,0.9)]" />
            #1 Trending Now
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-4 max-w-2xl font-sans text-5xl font-extrabold leading-[0.95] tracking-[-0.055em] text-white sm:text-7xl lg:text-[5.75rem]"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-white/75 sm:text-sm"
          >
            {releaseYear && <span>{releaseYear}</span>}
            {releaseYear && <span className="text-white/35">•</span>}
            <span>{isTV ? "TV Series" : "Movie"}</span>
            {currentSlide.vote_average > 0 && (
              <span className="inline-flex items-center gap-1 text-white">
                <Star className="h-3.5 w-3.5 fill-dashboard-accent text-dashboard-accent" />
                {currentSlide.vote_average.toFixed(1)}
              </span>
            )}
          </motion.div>

          <p className="mb-7 line-clamp-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
            {currentSlide.overview}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            <Button
              size="lg"
              className="rounded-lg bg-dashboard-accent px-6 py-3 font-bold text-white shadow-xl shadow-dashboard-accent/20 hover:bg-dashboard-accent-soft"
              onClick={handlePlay}
              aria-label={`Play ${title}`}
            >
              <Play className="mr-2 h-4 w-4" />
              Play Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-lg border-white/15 bg-white/[0.04] px-6 py-3 font-semibold text-white hover:border-white/30 hover:bg-white/10 hover:text-white"
              onClick={handlePlay}
            >
              <Info className="mr-2 h-4 w-4" />
              More Info
            </Button>
            <WatchlistButton
              media={currentSlide}
              variant="hero"
              className="rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-white hover:border-white/30 hover:bg-white/10"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Slide indicators and pause/play control */}
      <div className="absolute bottom-8 left-5 z-20 flex items-center space-x-4 sm:left-8">
        {/* Slide dots */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-black ${
                index === currentIndex
                  ? "w-10 bg-ember"
                  : "w-5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>

        {/* Pause/Play control - only show if multiple slides */}
        {slides.length > 1 && (
          <button
            onClick={togglePause}
            className="rounded-md border border-white/20 bg-black/40 p-2 text-white transition-all duration-200 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-black"
            aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
            aria-pressed={isPaused}
          >
            {isPaused ? (
              <PlayIcon className="h-4 w-4" />
            ) : (
              <Pause className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Pause indicator */}
      {isPaused && slides.length > 1 && (
        <div className="absolute right-5 top-24 z-20 flex items-center space-x-2 rounded-md border border-white/20 bg-black/50 px-3 py-1 text-sm text-white sm:right-8">
          <Pause className="h-3 w-3" />
          <span>Paused</span>
        </div>
      )}

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announceText}
      </div>
    </div>
  );
};

export default Hero;
