import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

type NavItem = {
  label: string;
  to?: string;
  href?: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Services", href: "/#features" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Academy", to: "/academic" },
  { label: "Our Team", href: "/#testimonials" },
  { label: "Contact", href: "/#details" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  };

  const handleNavClick = () => {
    closeMenu();
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "border-b border-border/60 bg-background/75 py-3 backdrop-blur-xl"
            : "bg-transparent py-4"
        )}
      >
        <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2"
            aria-label="FuseLabs IO home"
            onClick={closeMenu}
          >
            <img src="/logo.svg" alt="FuseLabs IO" className="h-7 sm:h-8" />
            <span className="hidden font-display text-sm font-semibold tracking-[0.18em] text-foreground uppercase sm:inline">
              FuseLabs
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link
              to="/#details"
              className="btn-motion hidden rounded-sm bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground sm:inline-flex"
            >
              Start a Project
            </Link>
            <button
              type="button"
              className="btn-motion inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border/70 bg-background/40 text-foreground backdrop-blur-md"
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-controls="fullscreen-nav"
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen navigation overlay */}
      <div
        id="fullscreen-nav"
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
        className={cn(
          "fixed inset-0 z-[60] flex min-h-[100dvh] flex-col transition-[opacity,visibility] duration-300 ease-out",
          /* Light: solid amber field (reference energy). Dark: void charcoal. */
          "bg-primary text-white dark:bg-background-50 dark:text-text-950",
          isMenuOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        )}
      >
        <div className="flex items-center justify-between px-4 py-4 sm:px-8">
          <Link
            to="/"
            onClick={handleNavClick}
            className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white dark:text-text-950"
          >
            FuseLabs
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle variant="menu" />
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-primary-50 text-accent-500 transition-transform duration-200 hover:scale-105 dark:bg-primary-500 dark:text-background-50"
            >
              <X size={22} strokeWidth={2} />
            </button>
          </div>
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center gap-5 px-6 pb-16 sm:gap-7">
          {NAV_ITEMS.map((item, index) => {
            const className = cn(
              "nav-fullscreen-link font-display text-[clamp(2rem,7vw,3.5rem)] font-semibold uppercase leading-none tracking-[0.04em]",
              /* Orange (light) menu: white → black on hover. Dark void menu: cream → amber. */
              "text-white hover:text-black dark:text-text-950 dark:hover:text-primary-500",
              isMenuOpen && "nav-fullscreen-enter"
            );
            const style = { animationDelay: `${index * 60}ms` } as React.CSSProperties;

            if (item.to) {
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={className}
                  style={style}
                  onClick={handleNavClick}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <a
                key={item.label}
                href={item.href}
                className={className}
                style={style}
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            );
          })}

          <a
            href="/#details"
            onClick={handleNavClick}
            className={cn(
              "btn-motion mt-6 inline-flex items-center rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em]",
              "bg-background text-primary-700 dark:bg-primary-500 dark:text-background-50",
              isMenuOpen && "nav-fullscreen-enter"
            )}
            style={{ animationDelay: `${NAV_ITEMS.length * 60}ms` }}
          >
            Start a Project
          </a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
