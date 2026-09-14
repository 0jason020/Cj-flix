"use client";

import Link from "next/link";
import { useState } from "react";
import { Compass, Download, Moon, Settings, Star, Clock3, Flame, X } from "lucide-react";

const menuItems = [
  { href: "/", label: "Discovery", icon: Compass },
  { href: "/movie?category=top_rated", label: "Top Rated", icon: Star },
  { href: "/movie?category=upcoming", label: "Coming Soon", icon: Clock3 },
];

const libraryItems = [
  { href: "/watchlist", label: "Recent Played", icon: Flame },
  { href: "/watchlist", label: "Download", icon: Download },
  { href: "#theme", label: "Dark Mode", icon: Moon },
  { href: "#settings", label: "Settings", icon: Settings },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const renderGroup = (label: string, items: typeof menuItems) => (
    <div className="space-y-3">
      <p className="px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </p>
      <ul className="space-y-1">
        {items.map(({ href, label: itemLabel, icon: Icon }, index) => (
          <li key={itemLabel}>
            <Link
              href={href}
              onClick={onClose}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent ${index === 0 && label === "MENU" ? "bg-dashboard-accent/10 text-white" : "text-slate-400"}`}
            >
              {index === 0 && label === "MENU" && (
                <span className="absolute left-0 top-2 h-8 w-1 rounded-r-full bg-dashboard-accent" />
              )}
              <Icon className={`h-[18px] w-[18px] ${index === 0 && label === "MENU" ? "text-dashboard-accent" : "text-slate-500 group-hover:text-dashboard-accent"}`} aria-hidden="true" />
              {itemLabel}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <button type="button" aria-label="Open sidebar" onClick={() => setOpen(true)} className="fixed bottom-5 left-5 z-30 rounded-full bg-dashboard-accent p-3 text-white shadow-xl shadow-dashboard-accent/20 lg:hidden"><Compass className="h-5 w-5" /></button>
      {open && <button type="button" aria-label="Close sidebar" onClick={onClose} className="fixed inset-0 z-40 bg-black/70 lg:hidden" />}
      <aside className={`fixed left-0 top-[4.5rem] z-50 h-[calc(100vh-4.5rem)] w-[236px] border-r border-white/[0.07] bg-dashboard-sidebar px-4 py-7 transition-transform duration-300 lg:sticky lg:top-[4.5rem] lg:z-0 lg:block lg:h-[calc(100vh-4.5rem)] lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`} aria-label="Sidebar navigation">
        <div className="mb-10 flex items-center justify-between px-3 lg:hidden">
          <span className="font-semibold text-white">Browse</span>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Close menu"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-9">
          {renderGroup("MENU", menuItems)}
          {renderGroup("LIBRARY", libraryItems)}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
