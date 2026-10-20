import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FuseLabsLogo } from "@/components/FuseLabsLogo";
import { MaskLabel, usePageCurtain } from "@/components/motion";

type NavItem = {
  label: string;
  to: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/#features" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Academy", to: "/academic" },
  { label: "Blog", to: "/blog" },
  { label: "Our Team", to: "/#team" },
  { label: "Contact", to: "/#details" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const { go } = usePageCurtain();
  const isHome = location.pathname === "/";
  const isAcademy = location.pathname === "/academic";
  const overDarkHero = isHome && !isScrolled;
  const overLightHero = isAcademy && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  // Never leave focus stranded inside the closed (aria-hidden) menu.
  useEffect(() => {
    if (isMenuOpen) return;
    const menu = document.getElementById("fullscreen-nav");
    if (menu && menu.contains(document.activeElement)) toggleRef.current?.focus();
  }, [isMenuOpen]);

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  };

  const handleNavClick = (to: string) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    closeMenu();
    go(to);
  };

  const desktopLinkClass = (active?: boolean) =>
    cn(
      "rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors",
      overDarkHero && "text-white/70 hover:bg-white/10 hover:text-white",
      overLightHero && "text-[#1e1b16]/65 hover:bg-[#1e1b16]/10 hover:text-[#1e1b16]",
      !overDarkHero &&
        !overLightHero &&
        "text-foreground/70 hover:bg-foreground/5 hover:text-foreground",
      active &&
        (overDarkHero
          ? "text-white"
          : overLightHero
            ? "text-[#1e1b16]"
            : "text-foreground")
    );

  const activeClass = (to: string) => to === location.pathname;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,backdrop-filter] duration-500 ease-out",
          isScrolled ? "bg-background/70 py-2.5 backdrop-blur-2xl" : "bg-transparent py-4"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-6 bottom-0 h-px origin-center bg-gradient-to-r from-transparent via-border to-transparent transition-transform duration-700 ease-out",
            isScrolled ? "scale-x-100" : "scale-x-0"
          )}
        />
        <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className={cn(
              "flex items-center transition-opacity duration-300 hover:opacity-80",
              overDarkHero
                ? "text-white"
                : overLightHero
                  ? "text-[#1e1b16]"
                  : "text-foreground"
            )}
            aria-label="FuseLabs IO home"
            onClick={handleNavClick("/")}
          >
            <FuseLabsLogo
              variant={overDarkHero ? "onAccent" : "default"}
              markClassName={cn("transition-all duration-500 ease-out", isScrolled ? "h-10 w-10" : "h-12 w-12")}
            />
          </a>

          <nav
            className={cn(
              "nav-pill hidden lg:flex",
              overDarkHero && "border-white/10 bg-white/[0.04]",
              overLightHero && "border-[#1e1b16]/10 bg-[#1e1b16]/[0.03]",
              !overDarkHero && !overLightHero && "border-border/70 bg-background/50"
            )}
            aria-label="Primary"
          >
            {NAV_ITEMS.filter((item) => item.label !== "Home").map((item) => (
              <a
                key={item.label}
                href={item.to}
                className={desktopLinkClass(activeClass(item.to))}
                onClick={handleNavClick(item.to)}
              >
                <MaskLabel text={item.label} />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle
              className={cn(
                overDarkHero && "border-white/20 bg-white/10 text-white",
                overLightHero && "border-[#1e1b16]/15 bg-[#1e1b16]/5 text-[#1e1b16]"
              )}
            />
            <a
              href="/#details"
              onClick={handleNavClick("/#details")}
              className="btn-motion group hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary-600 sm:inline-flex"
            >
              Start a Project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              ref={toggleRef}
              className={cn(
                "btn-motion inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md lg:hidden",
                overDarkHero && "border-white/20 bg-white/10 text-white",
                overLightHero && "border-[#1e1b16]/15 bg-[#1e1b16]/5 text-[#1e1b16]",
                !overDarkHero && !overLightHero && "border-border/70 bg-background/40 text-foreground"
              )}
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

      <div
        id="fullscreen-nav"
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
        className={cn(
          "fixed inset-0 z-[60] flex min-h-[100dvh] flex-col transition-[opacity,visibility] duration-300 ease-out lg:hidden",
          "bg-primary text-white dark:bg-background-50 dark:text-text-950",
          isMenuOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,rgba(222,131,33,0.28),transparent_60%)]"
        />
        <div className="relative flex items-center justify-between px-4 py-4 sm:px-8">
          <a
            href="/"
            onClick={handleNavClick("/")}
            className="text-white dark:text-text-950"
            aria-label="FuseLabs IO home"
          >
            <FuseLabsLogo variant="onAccent" markClassName="h-12 w-12" />
          </a>

          <div className="flex items-center gap-3">
            <ThemeToggle variant="menu" />
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-accent-500 transition-transform duration-200 hover:scale-105 dark:bg-primary-500 dark:text-background-50"
            >
              <X size={22} strokeWidth={2} />
            </button>
          </div>
        </div>

        <nav
          className="relative flex flex-1 flex-col items-center justify-center gap-3 px-6 pb-10 sm:gap-5"
          aria-label="Mobile"
        >
          {NAV_ITEMS.map((item, index) => (
            <span
              key={item.label}
              className={cn("mask-sleeve", isMenuOpen && "nav-mask-enter")}
              style={{ animationDelay: `${120 + index * 70}ms` } as React.CSSProperties}
            >
            <a
              href={item.to}
              onClick={handleNavClick(item.to)}
              className="font-display text-[clamp(2rem,7vw,3.5rem)] font-semibold uppercase leading-none tracking-[0.04em]"
            >
              <MaskLabel text={item.label} className="mask-alt-on-primary" />
            </a>
            </span>
          ))}

          <span
            className={cn("mask-sleeve mt-3", isMenuOpen && "nav-mask-enter")}
            style={{ animationDelay: `${120 + NAV_ITEMS.length * 70}ms` } as React.CSSProperties}
          >
            <a
              href="/#details"
              onClick={handleNavClick("/#details")}
              className={cn(
                "btn-motion inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em]",
                "bg-background text-primary-700 dark:bg-primary-500 dark:text-background-50"
              )}
            >
                Start a Project
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </span>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
