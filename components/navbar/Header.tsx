"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { Bookmark } from "lucide-react";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

const navItems = [
  { href: "/", label: "Home", title: "Go to the CJ Flix homepage" },
  { href: "/movie", label: "Movies", title: "Browse movies" },
  { href: "/tv", label: "TV Shows", title: "Browse TV shows" },
  { href: "/movies", label: "Categories", title: "Browse movie categories" },
  { href: "/movie?category=upcoming", label: "Coming Soon", title: "Browse upcoming movies" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-[100] w-full border-b border-white/[0.08] bg-[#0b0b0e]/85 backdrop-blur-2xl">
      <nav className="mx-auto flex h-[4.5rem] max-w-[1500px] items-center justify-between px-5 sm:px-8" role="navigation" aria-label="Main navigation">
        <div className="flex items-center gap-10">
          <Logo />
          <ul className="hidden list-none items-center gap-7 text-[13px] font-medium text-slate-400 lg:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : !item.href.includes("?") &&
                    (pathname === item.href ||
                      pathname.startsWith(`${item.href}/`));

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    title={item.title}
                    aria-label={item.title}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative block whitespace-nowrap px-1 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dashboard-accent ${
                      isActive ? "text-white" : "hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-1 -bottom-[1.25rem] h-0.5 origin-left bg-dashboard-accent transition-transform ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/search" title="Search movies and TV shows" aria-label="Search movies and TV shows" className="rounded-full p-2.5 text-slate-300 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent">
            <BiSearch className="text-lg" aria-hidden="true" />
          </Link>
          <Link
            href="/my-list"
            title="Open your watchlist"
            aria-label="Open your watchlist"
            className="hidden rounded-full p-2.5 text-slate-300 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent sm:inline-flex"
          >
            <Bookmark className="h-[18px] w-[18px]" aria-hidden="true" />
          </Link>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
