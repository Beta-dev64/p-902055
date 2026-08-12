// Style: Molten Systems — quiet fixed navigation, amber only for the primary action, full-screen menu for focus.
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import BrandLockup from "./BrandLockup";

const NAV_ITEMS = [
  { label: "Services", to: "/#services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Academy", to: "/academy" },
  { label: "Contact", to: "/#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isAcademy = location.pathname === "/academy" || location.pathname === "/academic";
  const ctaLabel = isAcademy ? "Join the cohort" : "Start a Project";
  const ctaTo = isAcademy ? "/academy#apply" : "/#contact";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, [location.pathname]);

  const toggle = () => {
    setOpen((current) => {
      document.body.style.overflow = current ? "" : "hidden";
      return !current;
    });
  };

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "border-b border-white/10 bg-[#100e0c]/85 py-3 backdrop-blur-2xl" : "bg-transparent py-5")}>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link to="/" aria-label="FuseLabs home" className="focus-ring"><BrandLockup light /></Link>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => <Link key={item.label} to={item.to} className="nav-quiet">{item.label}</Link>)}
          </nav>
          <div className="flex items-center gap-3">
            <Link to={ctaTo} className={cn("hidden rounded-full px-5 py-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex", isAcademy ? "bg-[#F5F1EA] text-[#1B2430] hover:bg-[#AFC8E3]" : "bg-[#DE8321] text-[#17110b] hover:bg-[#F2CDA6]")}>{ctaLabel}</Link>
            <button type="button" onClick={toggle} aria-expanded={open} aria-controls="fuselabs-menu" aria-label={open ? "Close menu" : "Open menu"} className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[#F7F1E8] transition hover:border-[#DE8321]/60 hover:text-[#DE8321] lg:hidden">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      <div id="fuselabs-menu" className={cn("fixed inset-0 z-40 flex flex-col bg-[#110f0d] px-6 pb-10 pt-28 transition-[opacity,visibility] duration-300 lg:hidden", open ? "visible opacity-100" : "invisible pointer-events-none opacity-0")}>
        <p className="eyebrow text-[#DE8321]">Navigate the system</p>
        <nav className="mt-8 flex flex-1 flex-col gap-5" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item, index) => <Link key={item.label} to={item.to} className="font-display text-[clamp(2.6rem,13vw,5rem)] font-medium leading-none tracking-[-0.07em] text-[#F7F1E8] transition-colors hover:text-[#DE8321]" style={{ transitionDelay: `${index * 40}ms` }}>{item.label}</Link>)}
        </nav>
        <Link to={ctaTo} className={cn("inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-sm font-bold uppercase tracking-[0.14em]", isAcademy ? "bg-[#F5F1EA] text-[#1B2430]" : "bg-[#DE8321] text-[#17110b]")}>{ctaLabel}</Link>
      </div>
    </>
  );
};

export default Navbar;
