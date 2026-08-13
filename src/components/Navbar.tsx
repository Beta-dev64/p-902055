// Style: Signal in Motion — the navigation is an operating surface: numbered routes, direct contact, one clear action, and a deliberate exit.
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Instagram, Linkedin, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import BrandLockup from "./BrandLockup";

const NAV_ITEMS = [
  { label: "Work", to: "/portfolio", note: "Selected systems and shipped surfaces" },
  { label: "Services", to: "/#services", note: "From product signal to reliable system" },
  { label: "Academy", to: "/academy", note: "Build the skills behind the next stage" },
  { label: "Contact", to: "/#contact", note: "Start a conversation with the studio" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isAcademy = location.pathname === "/academy" || location.pathname === "/academic";
  const ctaLabel = isAcademy ? "Join the cohort" : "Start a Project";
  const ctaTo = isAcademy ? "/academy#apply" : "/#contact";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousActive = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); return; }
      if (event.key !== "Tab" || !menuRef.current) return;
      const focusables = Array.from(menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      if (!focusables.length) return;
      const first = focusables[0]; const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKeyDown); window.requestAnimationFrame(() => previousActive && previousActive !== document.body && previousActive.focus()); };
  }, [open]);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "py-3" : "py-5")}>
        <div className={cn("mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-all sm:px-8 lg:px-12", scrolled && "fuselabs-nav-shell") }>
          <Link to="/" aria-label="FuseLabs home" className="focus-ring"><BrandLockup light /></Link>
          <div className="hidden items-center gap-3 md:flex"><span className="nav-status"><span className="nav-status-dot" />Systems studio / 2026</span><Link to={ctaTo} className={cn("rounded-full px-5 py-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] transition-transform duration-300 hover:-translate-y-0.5", isAcademy ? "bg-[#F5F1EA] text-[#1B2430] hover:bg-[#AFC8E3]" : "bg-[#DE8321] text-[#17110b] hover:bg-[#F2CDA6]")}>{ctaLabel}</Link></div>
          <button ref={triggerRef} type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="fuselabs-menu" aria-label="Open FuseLabs menu" className="focus-ring inline-flex h-11 items-center gap-3 rounded-full border border-white/15 bg-[#100e0c]/70 px-4 text-[#F7F1E8] backdrop-blur-xl transition hover:border-[#DE8321]/60 hover:text-[#F2CDA6]"><span className="hidden text-[0.65rem] font-bold uppercase tracking-[0.16em] sm:inline">Menu</span><Menu size={19} /></button>
        </div>
      </header>
      <div ref={menuRef} id="fuselabs-menu" role="dialog" aria-modal="true" aria-label="FuseLabs navigation and contact" className={cn("fuselabs-menu fixed inset-0 z-[60] overflow-y-auto bg-[#F3EEE6] text-[#171311] transition-[opacity,visibility] duration-500", open ? "visible opacity-100" : "invisible pointer-events-none opacity-0")}>
        <div className="menu-shape menu-shape-one" aria-hidden="true" /><div className="menu-shape menu-shape-two" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-full max-w-[1600px] flex-col px-6 py-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between"><Link to="/" aria-label="FuseLabs home" onClick={() => setOpen(false)}><BrandLockup /></Link><button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close FuseLabs menu" className="menu-close focus-ring"><X size={30} strokeWidth={1.8} /></button></div>
          <div className="grid flex-1 gap-16 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24 lg:py-20"><div><p className="eyebrow text-[#B1691B]">Navigate the system</p><nav className="mt-9 grid gap-2" aria-label="Full-screen navigation">{NAV_ITEMS.map((item, index) => <Link key={item.label} to={item.to} onClick={() => setOpen(false)} className="menu-route group focus-ring"><span className="menu-route-number">0{index + 1}</span><span className="menu-route-label">{item.label}</span><span className="menu-route-note">{item.note}</span><ArrowUpRight className="menu-route-arrow" size={24} /></Link>)}</nav></div><aside className="flex flex-col justify-between gap-12 lg:pb-4"><div><p className="eyebrow text-[#B1691B]">Open channel</p><p className="mt-5 max-w-sm text-xl leading-snug text-[#51483F]">Bring the hard part. We’ll make the system legible, useful, and ready to ship.</p><Link to={ctaTo} onClick={() => setOpen(false)} className="menu-primary-cta focus-ring">{ctaLabel}<ArrowUpRight size={18} /></Link></div><div className="grid gap-7 border-t border-[#CFC5B9] pt-7 text-sm"><div><span className="menu-contact-label">Email</span><a href="mailto:hello@fuselabs.io" className="menu-contact-link">hello@fuselabs.io</a></div><div><span className="menu-contact-label">Signal</span><a href="tel:+2340000000000" className="menu-contact-link">+234 000 000 0000</a></div><div><span className="menu-contact-label">Based in</span><span className="menu-contact-value">Lagos / working globally</span></div><div className="flex items-center gap-5 pt-2"><a href="#" aria-label="FuseLabs on Instagram" className="menu-social focus-ring"><Instagram size={20} /></a><a href="#" aria-label="FuseLabs on LinkedIn" className="menu-social focus-ring"><Linkedin size={20} /></a><span className="menu-contact-value">Available for select builds</span></div></div></aside></div>
          <div className="flex flex-col justify-between gap-3 border-t border-[#CFC5B9] pt-5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#877B70] sm:flex-row"><span>FuseLabs / Product engineering studio</span><span>Esc to close / 04 routes</span></div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
