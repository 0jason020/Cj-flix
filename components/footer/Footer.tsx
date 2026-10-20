import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import Logo from "../navbar/Logo";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/movie", label: "Movies" },
    { href: "/series", label: "Series" },
  ];

  const legalLinks = [
    { href: "#privacy", label: "Privacy Policy" },
    { href: "#terms", label: "Terms of Service" },
    { href: "#contact", label: "Contact Us" },
  ];

  return (
    <footer className="mt-auto w-full border-t border-white/[0.08] bg-[#08080b]/80">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        {/* Main Footer Content */}
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand Section */}
          <div className="flex flex-col">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-7 text-mist">
              Your ultimate destination for streaming movies and TV series. 
              Discover unlimited entertainment with our extensive collection.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col">
            <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-dashboard-accent">Browse</h3>
            <nav role="navigation" aria-label="Footer navigation">
              <ul className="space-y-3">
                {navigationLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-mist transition-colors duration-200 hover:text-paper"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Legal & Info */}
          <div className="flex flex-col">
            <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-dashboard-accent">Legal</h3>
            <nav role="navigation" aria-label="Legal navigation">
              <ul className="space-y-3">
                {legalLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-mist transition-colors duration-200 hover:text-paper"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 py-8">
          {/* Copyright & Credits */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-sm text-mist">
              <span>Made with</span>
              <Heart
                className="h-4 w-4 fill-current text-ember"
                aria-hidden="true"
              />
              <span>
                © {currentYear} <span className="font-semibold text-white">Craft Movies</span>
              </span>
            </div>

            <div className="space-y-2 text-center text-xs text-mist/70 sm:text-right">
              <p>Powered by TMDB API • Next.js • Tailwind CSS</p>
              <p>
                This product uses the TMDB API but is not endorsed or certified
                by TMDB.
              </p>
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block underline underline-offset-4 transition hover:text-white"
              >
                Movie data and artwork provided by TMDB
              </a>
            </div>
          </div>
        </div>

        {/* Schema Markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": SITE_NAME,
              "description": "Discover popular movies, trending TV shows, new releases, and top-rated stories.",
              "url": SITE_URL,
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
