import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="text-2xl font-extrabold tracking-tight text-white">CJ</span>
      <span className="text-2xl font-extrabold tracking-tight text-primary">flix</span>
    </Link>
  );
};

export default Logo;
