import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-baseline gap-1.5" aria-label="CJ FLIX home">
      <span className="font-display text-3xl uppercase leading-none tracking-wide text-paper">CJ</span>
      <span className="font-display text-3xl uppercase leading-none tracking-wide text-ember">FLIX</span>
    </Link>
  );
};

export default Logo;
