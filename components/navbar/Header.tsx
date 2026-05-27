import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <nav className="w-full fixed top-0 z-[100] bg-black/95 backdrop-blur-sm border-b border-black/40">
      <div className="max-w-7xl flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center gap-6">
          {/* logo */}
          <Logo />

          {/* Desktop Navigation Links (Netflix-style) */}
          <div className="hidden lg:block">
            <ul className="list-none flex text-white space-x-6 text-sm font-medium">
              {[
                { href: "/", label: "Home" },
                { href: "/movie", label: "Movies" },
                { href: "/series", label: "Series" },
              ].map((item) => (
                <li key={item.href} className="relative group">
                  <Link href={item.href} className="py-2 px-1 block text-sm text-white hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/search">
            <div className="p-2 rounded hover:bg-white/5 transition-all duration-200">
              <BiSearch className="text-lg text-white hover:text-primary transition-colors" />
            </div>
          </Link>

          {/* Mobile Hamburger Button */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Header;
