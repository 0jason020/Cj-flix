import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="group flex items-center gap-2" aria-label="Craft Movies home">
      <span className="text-[1.2rem] font-black uppercase leading-none tracking-[-0.06em] text-dashboard-accent transition-colors group-hover:text-white">
        Craft
      </span>
      <span className="text-[1.2rem] font-extrabold uppercase leading-none tracking-[-0.04em] text-white">
        Movies
      </span>
    </Link>
  );
};

export default Logo;
