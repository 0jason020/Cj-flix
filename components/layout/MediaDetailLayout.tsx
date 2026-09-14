import React from "react";

interface MediaDetailLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * MediaDetailLayout - A modern, responsive layout container for media detail pages
 * Features glass morphism design with optimal spacing and mobile-first approach
 */
const MediaDetailLayout = ({
  children,
  className = "",
}: MediaDetailLayoutProps) => {
  return (
    <div
      className={`relative min-h-screen overflow-hidden bg-[#090a0c] ${className}`}
    >
      {/* Background overlay for better content readability */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(230,107,61,0.10),transparent_32%)]" />

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-5 py-8 sm:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
    </div>
  );
};

export default MediaDetailLayout;
