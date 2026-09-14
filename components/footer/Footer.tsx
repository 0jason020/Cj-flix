import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import Logo from "../navbar/Logo";

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
    <footer className="mt-auto w-full border-t border-white/10 bg-[#070809]">
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
            <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-ember">Browse</h3>
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
            <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-ember">Legal</h3>
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
                © {currentYear} <span className="font-semibold text-white">CJ FLIX</span>
              </span>
            </div>

            <div className="space-y-2 text-center text-xs text-mist/70 sm:text-right">
              <p>Powered by TMDB API • Next.js • Tailwind CSS</p>
              <p>All content provided by The Movie Database (TMDB)</p>
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
              "name": "CJ FLIX",
              "description": "Stream unlimited movies and TV series",
              "url": "https://cjflix.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://cjflix.com/search?q={search_term_string}"
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
