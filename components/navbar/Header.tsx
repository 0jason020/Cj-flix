"use client";

import { useState } from "react";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { Bell, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

const navItems = [
  { href: "/movie", label: "Movies", title: "Browse our movie collection" },
  { href: "/series", label: "Series", title: "Browse our TV series collection" },
  { href: "/movie?category=popular", label: "Animation", title: "Browse popular animation" },
  { href: "/movie", label: "Genres", title: "Explore movie genres" },
];

const Header = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] w-full border-b border-white/[0.08] bg-[#0b0b0e]/85 backdrop-blur-2xl">
      <nav className="mx-auto flex h-[4.5rem] max-w-[1500px] items-center justify-between px-5 sm:px-8" role="navigation" aria-label="Main navigation">
        <div className="flex items-center gap-10">
          <Logo />
          <ul className="hidden list-none items-center gap-8 text-[13px] font-semibold text-slate-400 lg:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} title={item.title} className="group relative block px-1 py-2 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dashboard-accent">
                  {item.label}
                  <span className="absolute inset-x-1 -bottom-[1.25rem] h-0.5 origin-left scale-x-0 bg-dashboard-accent transition-transform group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/search" title="Search movies and series" aria-label="Search" className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-2.5 text-slate-300 transition hover:border-dashboard-accent/60 hover:bg-dashboard-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent">
            <BiSearch className="text-lg" aria-hidden="true" />
          </Link>
          <Link href="/movie" className="hidden rounded-full bg-dashboard-accent px-4 py-2 text-xs font-bold text-dashboard-bg transition hover:bg-dashboard-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent sm:block">Start watching</Link>
          <button type="button" aria-label="Notifications" className="relative hidden rounded-xl border border-white/[0.08] p-2.5 text-slate-300 transition hover:border-dashboard-accent/60 hover:text-white sm:block">
            <Bell className="h-[18px] w-[18px]" aria-hidden="true" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-dashboard-accent ring-2 ring-dashboard-bg" aria-label="Unread notifications" />
          </button>
          <button type="button" onClick={() => setProfileOpen((open) => !open)} aria-expanded={profileOpen} aria-label="Open profile menu" className="hidden items-center gap-2 rounded-xl p-1 transition hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent sm:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-dashboard-accent to-dashboard-accent-soft text-xs font-bold text-white">CJ</span>
            <ChevronDown className={`h-4 w-4 text-slate-500 transition ${profileOpen ? "rotate-180" : ""}`} />
          </button>
          {profileOpen && <div className="absolute right-16 top-14 w-36 rounded-xl border border-white/[0.08] bg-dashboard-card p-2 shadow-2xl"><span className="block px-3 py-2 text-xs text-slate-400">Welcome back</span><Link href="/watchlist" className="block rounded-lg px-3 py-2 text-sm text-white hover:bg-white/[0.06]">Watchlist</Link></div>}
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
