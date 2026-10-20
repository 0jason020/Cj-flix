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
    "flex flex-wrap justify-center gap-5 px-5 py-8 sm:justify-start sm:px-8";
  const heightClass = minHeight ? "min-h-screen" : "";

  return (
    <div className={`${baseClasses} ${heightClass} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;
