import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Profile", href: "#focus" },
  { label: "What I Build", href: "#capabilities" },
  { label: "Connect", href: "#connect" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="brand-link group flex items-center gap-3"
          onClick={closeMenu}
          aria-label="Abdul Sameeh K home"
        >
          <span className="brand-mark">AS</span>
          <span className="brand-name">
            <span className="brand-name-full">Abdul Sameeh K</span>
            <span className="brand-name-short">Sameeh K</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="mobile-nav-button md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <nav className="mobile-nav md:hidden" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
