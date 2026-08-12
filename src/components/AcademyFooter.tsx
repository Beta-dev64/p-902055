// Style: Editorial Learning House — paper surface, cobalt annotations, and a human invitation to join the next cohort.
import { ArrowUpRight, Linkedin, Twitter, Github } from "lucide-react";
import { Link } from "react-router-dom";
import BrandLockup from "./BrandLockup";

const AcademyFooter = () => (
  <footer className="academy-footer border-t border-[#D8D0C5] bg-[#F5F1EA] text-[#1B2430]">
    <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-20">
      <div className="grid gap-12 border-b border-[#D8D0C5] pb-12 lg:grid-cols-[1.25fr_0.75fr_0.75fr]">
        <div><BrandLockup /><p className="mt-7 max-w-md text-sm leading-relaxed text-[#5F6872]">A focused, project-based path into frontend, backend, and AI/ML development. Learn with feedback, leave with work you can explain.</p><Link to="#apply" className="academy-footer-cta group mt-7 inline-flex items-center gap-3 rounded-full bg-[#1B2430] px-5 py-3 text-xs font-bold uppercase tracking-[0.13em] text-[#F8F4EE] transition hover:-translate-y-1 hover:bg-[#416C9A]">Join the next cohort <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link></div>
        <div><h3 className="eyebrow text-[#416C9A]">Learn</h3><ul className="mt-6 grid gap-3 text-sm text-[#5F6872]"><li><a href="#tracks" className="transition hover:text-[#416C9A]">Explore tracks</a></li><li><a href="#apply" className="transition hover:text-[#416C9A]">How to apply</a></li><li><Link to="/" className="transition hover:text-[#416C9A]">FuseLabs agency</Link></li></ul></div>
        <div><h3 className="eyebrow text-[#416C9A]">Stay close</h3><p className="mt-6 max-w-[14rem] text-sm leading-relaxed text-[#5F6872]">Small enough to be seen. Serious enough to ship.</p><div className="mt-6 flex gap-4 text-[#416C9A]"><a href="#" aria-label="Twitter" className="transition hover:text-[#1B2430]"><Twitter size={18} /></a><a href="#" aria-label="LinkedIn" className="transition hover:text-[#1B2430]"><Linkedin size={18} /></a><a href="#" aria-label="GitHub" className="transition hover:text-[#1B2430]"><Github size={18} /></a></div></div>
      </div>
      <div className="flex flex-col justify-between gap-3 pt-6 text-xs uppercase tracking-[0.14em] text-[#7B8793] sm:flex-row"><span>© {new Date().getFullYear()} FuseLabs Academy</span><span>Learn / Build / Ship</span></div>
    </div>
  </footer>
);

export default AcademyFooter;
