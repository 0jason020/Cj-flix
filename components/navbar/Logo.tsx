import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="group flex items-center gap-2" aria-label="CJ FLIX home">
      <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-dashboard-accent text-sm font-black tracking-[-0.08em] text-dashboard-bg transition-transform group-hover:rotate-[-8deg]">CJ</span>
      <span className="font-display text-[2rem] uppercase leading-none tracking-[0.04em] text-paper">FLIX<span className="text-dashboard-accent">.</span></span>
    </Link>
  );
};

export default Logo;
