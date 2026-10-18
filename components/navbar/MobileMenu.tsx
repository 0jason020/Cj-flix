"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleNavbar = () => setIsOpen((prev) => !prev);
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/movie", label: "Movies" },
    { href: "/tv", label: "TV Shows" },
    { href: "/movies", label: "Categories" },
    { href: "/movie?category=upcoming", label: "Coming Soon" },
    { href: "/search", label: "Search" },
    { href: "/my-list", label: "My List" },
  ];

  return (
    <>
      <div className="ml-2 lg:hidden">
        <button
          onClick={toggleNavbar}
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 top-16 w-full border-t border-white/10 bg-[#0b0b0e]/95 px-4 py-3 shadow-2xl backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Mobile navigation">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent ${
                        isActive
                          ? "bg-dashboard-accent/10 text-dashboard-accent"
                          : "text-white hover:bg-white/10"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};
export default MobileMenu;
