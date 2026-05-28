import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const navItems = [
    { href: "/", label: "Home", title: "Explore all movies and series" },
    { href: "/movie", label: "Movies", title: "Browse our movie collection" },
    { href: "/series", label: "Series", title: "Browse our TV series collection" },
  ];

  return (
    <header className="w-full fixed top-0 z-[100] bg-black/95 backdrop-blur-sm border-b border-white/10">
      <nav className="max-w-7xl flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 h-16" role="navigation" aria-label="Main navigation">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:block">
            <ul className="list-none flex text-white space-x-8 text-sm font-medium">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    title={item.title}
                    className="py-2 px-1 block text-white hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            href="/search"
            title="Search movies and series"
            className="p-2 rounded hover:bg-white/5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Search"
          >
            <BiSearch className="text-lg text-white hover:text-primary transition-colors" aria-hidden="true" />
          </Link>

          {/* Mobile Menu Button */}
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
