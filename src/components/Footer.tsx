// Style: Signal in Motion closing surface — the footer is a final contact decision, not a utility dump.
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import BrandLockup from "./BrandLockup";

const Footer = () => (
  <footer className="footer-poster relative isolate overflow-hidden border-t border-[#3A2A1E] bg-[#100e0c] text-[#F7F1E8]">
    <div className="relative z-10 mx-auto max-w-[1540px] px-5 pb-10 pt-16 sm:px-8 sm:pb-12 sm:pt-20 lg:px-12 lg:pt-24">
      <div className="footer-contact-grid border-b border-[#3A2A1E] pb-16"><div><p className="eyebrow text-[#DE8321]">06 / Close the loop</p><h2 className="mt-6 max-w-4xl font-display text-[clamp(3.6rem,9vw,9rem)] font-medium leading-[0.8] tracking-[-0.1em]">Bring the hard part.<br /><em className="text-[#DE8321]">We’ll make it ship.</em></h2></div><div className="flex flex-col items-start justify-between gap-8 lg:items-end"><p className="max-w-xs text-base leading-relaxed text-[#B9ADA0] lg:text-right">Tell us what needs to become clearer, faster, or more reliable. We’ll bring the right people to the first conversation.</p><Link to="/#contact" className="footer-primary-cta group">Start a Project <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link></div></div>
      <div className="grid gap-12 border-b border-[#3A2A1E] py-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]"><div><BrandLockup light /><p className="mt-6 max-w-sm text-sm leading-relaxed text-[#8F8174]">Product strategy, engineering, and growth systems for teams building the next stage.</p><a href="mailto:hello@fuselabs.io" className="mt-6 inline-flex items-center gap-2 text-sm text-[#F2CDA6] transition hover:text-[#DE8321]"><Mail size={16} />hello@fuselabs.io</a></div><div><h3 className="eyebrow text-[#DE8321]">Navigate</h3><ul className="mt-6 grid gap-3 text-sm text-[#B9ADA0]"><li><Link to="/portfolio" className="footer-link">01 / Work</Link></li><li><a href="/#services" className="footer-link">02 / Services</a></li><li><Link to="/academy" className="footer-link">03 / Academy</Link></li><li><a href="/#contact" className="footer-link">04 / Contact</a></li></ul></div><div><h3 className="eyebrow text-[#DE8321]">Open channels</h3><ul className="mt-6 grid gap-3 text-sm text-[#B9ADA0]"><li><a href="#" className="footer-link inline-flex items-center gap-2">LinkedIn <ArrowUpRight size={14} /></a></li><li><a href="#" className="footer-link inline-flex items-center gap-2">GitHub <ArrowUpRight size={14} /></a></li><li><a href="mailto:hello@fuselabs.io" className="footer-link inline-flex items-center gap-2">Email us <ArrowUpRight size={14} /></a></li></ul></div></div>
      <div className="flex flex-col justify-between gap-3 pt-6 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#6F6358] sm:flex-row"><span>© {new Date().getFullYear()} FuseLabs</span><span>Build / Ship / Grow</span><span>Systems studio / Lagos → global</span></div>
    </div>
    <div className="footer-wordmark" aria-hidden="true">FuseLabs</div>
  </footer>
);

export default Footer;
