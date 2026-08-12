// Style: Molten Systems closing poster — utility navigation sits above a viewport-spanning FuseLabs wordmark clipped by the lower boundary.
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import BrandLockup from "./BrandLockup";

const Footer = () => (
  <footer className="footer-poster relative isolate overflow-hidden border-t border-[#3A2A1E] bg-[#100e0c] text-[#F7F1E8]">
    <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-10 pt-16 sm:px-8 sm:pb-12 sm:pt-20 lg:px-12 lg:pt-24">
      <div className="grid gap-14 border-b border-[#3A2A1E] pb-14 lg:grid-cols-[1.35fr_0.65fr_0.65fr]">
        <div><BrandLockup light /><p className="mt-7 max-w-md text-sm leading-relaxed text-[#9E9285]">FuseLabs helps ambitious teams turn difficult product ideas into reliable software, from first release to the systems that make growth repeatable.</p><Link to="/#contact" className="group mt-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[#F2CDA6]">Start a project <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link><div className="mt-8 flex gap-4 text-[#9E9285]"><a href="#" aria-label="Twitter" className="transition hover:text-[#DE8321]"><Twitter size={18} /></a><a href="#" aria-label="LinkedIn" className="transition hover:text-[#DE8321]"><Linkedin size={18} /></a><a href="#" aria-label="GitHub" className="transition hover:text-[#DE8321]"><Github size={18} /></a></div></div>
        <div><h3 className="eyebrow text-[#DE8321]">Services</h3><ul className="mt-6 grid gap-3 text-sm text-[#B9ADA0]"><li><a href="/#services" className="transition hover:text-[#F2CDA6]">Product development</a></li><li><a href="/#services" className="transition hover:text-[#F2CDA6]">Growth engineering</a></li><li><a href="/#services" className="transition hover:text-[#F2CDA6]">Cloud & DevOps</a></li><li><a href="/#services" className="transition hover:text-[#F2CDA6]">AI solutions</a></li></ul></div>
        <div><h3 className="eyebrow text-[#DE8321]">Explore</h3><ul className="mt-6 grid gap-3 text-sm text-[#B9ADA0]"><li><Link to="/portfolio" className="transition hover:text-[#F2CDA6]">Selected work</Link></li><li><Link to="/academy" className="transition hover:text-[#F2CDA6]">Academy</Link></li><li><a href="/#contact" className="transition hover:text-[#F2CDA6]">Contact</a></li><li><a href="#" className="transition hover:text-[#F2CDA6]">Privacy</a></li></ul></div>
      </div>
      <div className="flex flex-col justify-between gap-3 pt-6 text-xs uppercase tracking-[0.14em] text-[#6F6358] sm:flex-row"><span>© {new Date().getFullYear()} FuseLabs</span><span>Build / Ship / Grow</span></div>
    </div>
    <div className="footer-wordmark" aria-hidden="true">FuseLabs</div>
  </footer>
);

export default Footer;
