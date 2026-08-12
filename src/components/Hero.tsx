// Style: Molten Systems — dark industrial confidence, one molten signal, and a cursor-reactive field that behaves like product infrastructure.
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ParticleField from "./ParticleField";
import BrandLockup from "./BrandLockup";

const Hero = () => (
  <section id="hero" className="relative isolate flex min-h-[min(900px,100svh)] items-end overflow-hidden bg-[#100e0c] pt-32">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_32%,rgba(222,131,33,0.18),transparent_33%),linear-gradient(120deg,#100e0c_12%,#17120d_100%)]" />
    <ParticleField className="-z-[1] opacity-90" />
    <div className="hero-grid absolute inset-0 -z-[1] opacity-30" />
    <div className="absolute inset-x-0 bottom-0 -z-[1] h-[42%] bg-gradient-to-t from-[#100e0c] via-[#100e0c]/72 to-transparent" />

    <div className="relative mx-auto grid w-full max-w-[1440px] gap-12 px-5 pb-14 sm:px-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-end lg:px-12 lg:pb-20">
      <div className="hero-copy max-w-3xl">
        <div className="hero-stagger hero-stagger-1 mb-9 flex items-center gap-4 text-[#F7F1E8]/70"><BrandLockup light compact /><span className="h-px w-10 bg-[#DE8321]/70" /><span className="eyebrow">Build / Ship / Grow</span></div>
        <p className="hero-stagger hero-stagger-2 eyebrow mb-5 text-[#DE8321]">The technical partner for ambitious teams</p>
        <h1 className="hero-stagger hero-stagger-3 font-display text-[clamp(4rem,9.8vw,9.8rem)] font-medium leading-[0.82] tracking-[-0.09em] text-[#F7F1E8]">Make the <em className="text-[#DE8321]">next</em><br />stage shippable.</h1>
        <p className="hero-stagger hero-stagger-4 mt-8 max-w-xl text-lg leading-relaxed text-[#C9C0B5] sm:text-xl">FuseLabs helps founders and growing teams turn difficult product ideas into reliable software, from first release to the systems that make growth repeatable.</p>
        <div className="hero-stagger hero-stagger-5 mt-9 flex flex-col gap-3 sm:flex-row">
          <Link to="/#contact" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#DE8321] px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-[#17110b] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F2CDA6]">Start a Project <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></Link>
          <Link to="/academy" className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#F7F1E8]/25 px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-[#F7F1E8] transition-all duration-300 hover:border-[#DE8321] hover:text-[#F2CDA6]">Join the Academy <ArrowDownRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" /></Link>
        </div>
      </div>
      <div className="flex justify-start lg:justify-end">
        <div className="hero-note hero-stagger hero-stagger-6 max-w-xs border-l border-[#DE8321]/60 pl-5 text-sm leading-relaxed text-[#B3A99D] lg:mb-8">
          <span className="mb-4 block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#DE8321]">01 / Signal to system</span>
          <p>Strategy, product engineering, cloud, AI, and growth—held together by one delivery partner.</p>
        </div>
      </div>
    </div>
    <div className="absolute bottom-5 right-5 hidden items-center gap-3 text-[0.62rem] uppercase tracking-[0.18em] text-[#B3A99D] sm:flex lg:right-12"><span className="h-2 w-2 rounded-full bg-[#DE8321]" /> Move your cursor through the field</div>
  </section>
);

export default Hero;
