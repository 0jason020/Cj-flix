import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="group flex items-center gap-2" aria-label="CJ FLIX home">
      <span className="flex h-8 items-center justify-center text-[1.35rem] font-black tracking-[-0.1em] text-dashboard-accent transition-transform group-hover:rotate-[-8deg]">CJ</span>
      <span className="text-[1.2rem] font-extrabold uppercase leading-none tracking-[-0.04em] text-white">FLIX</span>
    </Link>
  );
};

export default Logo;
