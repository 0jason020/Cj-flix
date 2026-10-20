"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Loader2, Search, X } from "lucide-react";
import { useDebounce } from "use-debounce";
import { api } from "@/lib/api";
import type { TMDBMovie, TMDBTVShow } from "@/lib/types";

interface SearchBarProps {
  onTyping: (value: string) => void;
  onSearch?: (value: string) => void;
  initialValue?: string;
}

type Suggestion = TMDBMovie | TMDBTVShow;

function isTVShow(item: Suggestion): item is TMDBTVShow {
  return "name" in item;
}

const SearchBar = ({
  onTyping,
  onSearch,
  initialValue = "",
}: SearchBarProps) => {
  const searchBarRef = useRef<HTMLInputElement>(null);
  const requestRef = useRef(0);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [debouncedValue] = useDebounce(searchValue.trim(), 250);

  useEffect(() => setSearchValue(initialValue), [initialValue]);

  useEffect(() => {
    const requestId = ++requestRef.current;
    if (debouncedValue.length < 2) {
      setSuggestions([]);
      setIsLoadingSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);
    api
      .search(debouncedValue)
      .then((result) => {
        if (requestId !== requestRef.current) return;
        setSuggestions(
          result.results
            .filter((item): item is Suggestion => "title" in item || "name" in item)
            .slice(0, 6)
        );
        setActiveSuggestion(-1);
      })
      .catch(() => {
        if (requestId === requestRef.current) setSuggestions([]);
      })
      .finally(() => {
        if (requestId === requestRef.current) setIsLoadingSuggestions(false);
      });

    return () => {
      requestRef.current += 1;
    };
  }, [debouncedValue]);

  const handleTyping = (value: string) => {
    setSearchValue(value);
    onTyping(value);
  };

  const openSuggestion = (index: number) => {
    const item = suggestions[index];
    if (!item) return;
    router.push(isTVShow(item) ? `/series/${item.id}` : `/movie/${item.id}`);
  };

  const handleSearch = () => {
    if (!searchValue.trim()) {
      searchBarRef.current?.focus();
      return;
    }
    if (onSearch) onSearch(searchValue.trim());
    else onTyping(searchValue.trim());
    searchBarRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && suggestions.length > 0) {
      event.preventDefault();
      setActiveSuggestion((current) => (current + 1) % suggestions.length);
    } else if (event.key === "ArrowUp" && suggestions.length > 0) {
      event.preventDefault();
      setActiveSuggestion((current) =>
        current <= 0 ? suggestions.length - 1 : current - 1
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (activeSuggestion >= 0) openSuggestion(activeSuggestion);
      else handleSearch();
    } else if (event.key === "Escape") {
      setIsFocused(false);
    }
  };

  const showSuggestions = isFocused && Boolean(searchValue.trim());

  return (
    <div className="mx-auto mt-8 w-full max-w-3xl px-4 sm:mt-12 sm:px-6">
      <div className="relative w-full">
        <div
          className={`relative flex items-center gap-2 rounded-2xl border bg-[#111216]/95 p-2 shadow-[0_24px_80px_-40px_rgba(229,9,20,0.35)] backdrop-blur-xl transition duration-200 sm:rounded-[1.35rem] ${
            isFocused
              ? "border-dashboard-accent/60 shadow-[0_0_0_4px_rgba(229,9,20,0.12),0_24px_80px_-40px_rgba(229,9,20,0.4)]"
              : "border-white/10 hover:border-white/20"
          }`}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] sm:h-12 sm:w-12">
            <Search
              className={`h-5 w-5 transition-colors ${
                isFocused ? "text-dashboard-accent" : "text-slate-400"
              }`}
              aria-hidden="true"
            />
          </div>
          <input
            ref={searchBarRef}
            value={searchValue}
            type="search"
            name="search"
            id="search"
            placeholder="Search movies and TV shows"
            aria-label="Search movies and TV shows"
            aria-autocomplete="list"
            aria-controls="search-suggestions"
            aria-activedescendant={
              activeSuggestion >= 0
                ? `search-suggestion-${activeSuggestion}`
                : undefined
            }
            className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm font-medium text-white outline-none placeholder:text-slate-500 sm:text-base"
            onChange={(event) => handleTyping(event.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => window.setTimeout(() => setIsFocused(false), 150)}
            autoComplete="off"
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => {
                handleTyping("");
                setSuggestions([]);
                searchBarRef.current?.focus();
              }}
              onMouseDown={(event) => event.preventDefault()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/[0.07] hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            aria-label="Search"
            className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-dashboard-accent px-4 text-sm font-bold text-white transition hover:bg-dashboard-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:px-5"
            onClick={handleSearch}
            onMouseDown={(event) => event.preventDefault()}
            disabled={!searchValue.trim()}
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {showSuggestions && (
          <div className="absolute inset-x-0 top-full z-50 mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#111216]/[0.98] shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                {suggestions.length && !isLoadingSuggestions
                  ? "Suggested titles"
                  : "Search"}
              </p>
              {isLoadingSuggestions ? (
                <Loader2
                  className="h-4 w-4 animate-spin text-dashboard-accent"
                  aria-label="Loading suggestions"
                />
              ) : suggestions.length > 0 ? (
                <span className="text-[11px] text-slate-500">
                  ↑ ↓ to navigate · Enter to open
                </span>
              ) : null}
            </div>
            {searchValue.trim().length < 2 ? (
              <div className="px-4 py-5 text-sm text-slate-400">
                Type one more character to find matching titles.
              </div>
            ) : isLoadingSuggestions ? (
              <div className="px-4 py-5 text-sm text-slate-400">
                Finding matching titles…
              </div>
            ) : suggestions.length ? (
              <ul
                id="search-suggestions"
                className="max-h-[min(26rem,60vh)] overflow-y-auto p-2"
                role="listbox"
                aria-label="Matching movies and shows"
              >
                {suggestions.map((item, index) => {
                  const isTV = isTVShow(item);
                  const title = isTV ? item.name : item.title;
                  const date = isTV ? item.first_air_date : item.release_date;
                  return (
                    <li
                      key={`${isTV ? "tv" : "movie"}-${item.id}`}
                      id={`search-suggestion-${index}`}
                      role="option"
                      aria-selected={activeSuggestion === index}
                    >
                      <button
                        type="button"
                        className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition ${
                          activeSuggestion === index
                            ? "bg-white/[0.09]"
                            : "hover:bg-white/[0.06]"
                        }`}
                        onMouseDown={(event) => event.preventDefault()}
                        onMouseEnter={() => setActiveSuggestion(index)}
                        onClick={() => openSuggestion(index)}
                      >
                        <span className="relative h-[4.1rem] w-11 shrink-0 overflow-hidden rounded-lg bg-white/[0.06]">
                          {item.poster_path ? (
                            <Image
                              src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                              alt=""
                              fill
                              sizes="44px"
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <span className="flex h-full items-center justify-center text-[10px] text-slate-500">
                              No art
                            </span>
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-white">
                            {title}
                          </span>
                          <span className="mt-1 block text-xs text-slate-400">
                            {isTV ? "TV series" : "Movie"}
                            {date ? ` · ${date.slice(0, 4)}` : ""}
                          </span>
                        </span>
                        {activeSuggestion === index ? (
                          <Check
                            className="mr-2 h-4 w-4 shrink-0 text-dashboard-accent"
                            aria-hidden="true"
                          />
                        ) : (
                          <span className="mr-2 rounded-full border border-white/10 px-2 py-1 text-[10px] font-medium text-slate-400">
                            {isTV ? "SERIES" : "FILM"}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="px-4 py-5 text-sm text-slate-400">
                No matching titles found. Try another name.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
