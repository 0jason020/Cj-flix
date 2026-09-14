import React from "react";

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  minHeight?: boolean; // For search results that need min-h-screen
}

const ResponsiveGrid = ({
  children,
  className = "",
  minHeight = false,
}: ResponsiveGridProps) => {
  const baseClasses =
    "grid grid-cols-2 gap-x-3 gap-y-8 px-5 py-10 sm:grid-cols-3 sm:gap-x-5 sm:px-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";
  const heightClass = minHeight ? "min-h-screen" : "";

  return (
    <div className={`${baseClasses} ${heightClass} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;
