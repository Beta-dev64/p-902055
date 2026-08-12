// Style: Shared FuseLabs identity — a dark, quiet close that leaves the final action and navigation legible.
import { Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import BrandLockup from "./BrandLockup";

const Footer = () => (
  <footer className="relative overflow-hidden border-t border-[#3A2A1E] bg-[#100e0c] py-12 text-[#F7F1E8] sm:py-16">
    <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
      <div className="grid gap-12 border-b border-[#3A2A1E] pb-12 lg:grid-cols-[1.5fr_0.75fr_0.75fr]">
        <div><BrandLockup light /><p className="mt-6 max-w-md text-sm leading-relaxed text-[#9E9285]">FuseLabs helps ambitious teams turn difficult product ideas into reliable software, from first release to the systems that make growth repeatable.</p><div className="mt-7 flex gap-4 text-[#9E9285]"><a href="#" aria-label="Twitter" className="transition hover:text-[#DE8321]"><Twitter size={18} /></a><a href="#" aria-label="LinkedIn" className="transition hover:text-[#DE8321]"><Linkedin size={18} /></a><a href="#" aria-label="GitHub" className="transition hover:text-[#DE8321]"><Github size={18} /></a></div></div>
        <div><h3 className="eyebrow text-[#DE8321]">Services</h3><ul className="mt-6 grid gap-3 text-sm text-[#B9ADA0]"><li><a href="/#services" className="transition hover:text-[#F2CDA6]">Product development</a></li><li><a href="/#services" className="transition hover:text-[#F2CDA6]">Growth engineering</a></li><li><a href="/#services" className="transition hover:text-[#F2CDA6]">Cloud & DevOps</a></li><li><a href="/#services" className="transition hover:text-[#F2CDA6]">AI solutions</a></li></ul></div>
        <div><h3 className="eyebrow text-[#DE8321]">Company</h3><ul className="mt-6 grid gap-3 text-sm text-[#B9ADA0]"><li><Link to="/portfolio" className="transition hover:text-[#F2CDA6]">Portfolio</Link></li><li><Link to="/academy" className="transition hover:text-[#F2CDA6]">Academy</Link></li><li><a href="/#contact" className="transition hover:text-[#F2CDA6]">Contact</a></li><li><a href="#" className="transition hover:text-[#F2CDA6]">Privacy</a></li></ul></div>
      </div>
      <div className="flex flex-col justify-between gap-3 pt-6 text-xs uppercase tracking-[0.14em] text-[#6F6358] sm:flex-row"><span>© {new Date().getFullYear()} FuseLabs. All rights reserved.</span><span>Build / Ship / Grow</span></div>
    </div>
    <div className="pointer-events-none absolute -bottom-10 left-0 right-0 overflow-hidden text-center font-display text-[18vw] leading-none tracking-[-0.1em] text-[#F7F1E8]/[0.025]">FuseLabs</div>
  </footer>
);

export default Footer;
