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
    <footer className="w-full bg-gradient-to-t from-black via-black/80 to-black/40 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col">
            <Logo />
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              Your ultimate destination for streaming movies and TV series. 
              Discover unlimited entertainment with our extensive collection.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-sm mb-6 uppercase tracking-wide">Browse</h3>
            <nav role="navigation" aria-label="Footer navigation">
              <ul className="space-y-3">
                {navigationLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm"
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
            <h3 className="text-white font-semibold text-sm mb-6 uppercase tracking-wide">Legal</h3>
            <nav role="navigation" aria-label="Legal navigation">
              <ul className="space-y-3">
                {legalLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm"
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
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart
                className="h-4 w-4 text-red-500 fill-current"
                aria-hidden="true"
              />
              <span>
                © {currentYear} <span className="font-semibold text-white">CJ FLIX</span>
              </span>
            </div>

            <div className="text-center sm:text-right text-gray-500 text-xs space-y-2">
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
