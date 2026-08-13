// Style: Signal in Motion — an engineered signal map makes the delivery promise tangible without obscuring the copy or CTA.
import { Activity, ArrowDownRight, ArrowRight, Blocks, Code2, GitBranch, Gauge } from "lucide-react";
import { Link } from "react-router-dom";
import ParticleField from "./ParticleField";

const Hero = () => (
  <section id="hero" className="relative isolate flex min-h-[min(980px,100svh)] items-end overflow-hidden bg-[#100e0c] pt-32">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_74%_38%,rgba(222,131,33,0.16),transparent_30%),linear-gradient(120deg,#100e0c_15%,#18120d_100%)]" />
    <ParticleField className="-z-[1] opacity-75" />
    <div className="hero-grid absolute inset-0 -z-[1] opacity-25" />
    <div className="absolute inset-x-0 bottom-0 -z-[1] h-[48%] bg-gradient-to-t from-[#100e0c] via-[#100e0c]/80 to-transparent" />

    <div className="relative mx-auto grid w-full max-w-[1540px] gap-10 px-5 pb-8 sm:px-8 lg:px-12 lg:pb-10">
      <div className="hero-rail hero-stagger hero-stagger-1 flex flex-col justify-between gap-3 border-y border-white/10 py-3 text-[0.6rem] font-bold uppercase tracking-[0.17em] text-[#8F8174] sm:flex-row"><span>FuseLabs / Product engineering studio</span><span><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#DE8321]" />Signal map online / Lagos → global</span></div>
      <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
        <div className="hero-copy max-w-4xl">
          <p className="hero-stagger hero-stagger-2 eyebrow mb-6 text-[#DE8321]">The technical partner for ambitious teams</p>
          <h1 className="hero-stagger hero-stagger-3 font-display text-[clamp(4.25rem,10.5vw,10.5rem)] font-medium leading-[0.8] tracking-[-0.1em] text-[#F7F1E8]">Make the <em className="text-[#DE8321]">next stage</em><br />shippable.</h1>
          <p className="hero-stagger hero-stagger-4 mt-9 max-w-xl text-lg leading-relaxed text-[#C9C0B5] sm:text-xl">FuseLabs turns difficult product ideas into reliable software, from first release to the systems that make growth repeatable.</p>
          <div className="hero-stagger hero-stagger-5 mt-9 flex flex-col gap-3 sm:flex-row"><Link to="/#contact" className="group inline-flex items-center justify-center gap-3 bg-[#DE8321] px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-[#17110b] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F2CDA6]">Start a Project <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></Link><Link to="/academy" className="group inline-flex items-center justify-center gap-3 border border-[#F7F1E8]/25 px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-[#F7F1E8] transition-all duration-300 hover:border-[#DE8321] hover:text-[#F2CDA6]">Join the Academy <ArrowDownRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" /></Link></div>
        </div>

        <div className="hero-stagger hero-stagger-6 hero-system-panel">
          <div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="eyebrow text-[#DE8321]">01 / Delivery graph</span><span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[#8F8174]"><Activity size={13} className="text-[#DE8321]" /> live</span></div>
          <div className="hero-system-graph">
            <div className="hero-graph-line hero-graph-line-one" /><div className="hero-graph-line hero-graph-line-two" />
            <div className="hero-node hero-node-one"><Code2 size={18} /><span>product</span></div><div className="hero-node hero-node-two"><Blocks size={18} /><span>system</span></div><div className="hero-node hero-node-three"><Gauge size={18} /><span>growth</span></div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-4 text-[0.62rem] uppercase tracking-[0.12em] text-[#8F8174]"><span><strong className="block font-display text-xl font-medium tracking-[-0.05em] text-[#F7F1E8]">04</strong>workstreams</span><span><strong className="block font-display text-xl font-medium tracking-[-0.05em] text-[#F7F1E8]">01</strong>delivery team</span><span><strong className="block font-display text-xl font-medium tracking-[-0.05em] text-[#F7F1E8]">∞</strong>room to grow</span></div>
          <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4 font-mono text-[0.64rem] text-[#B9ADA0]"><GitBranch size={14} className="text-[#DE8321]" /><span>input → architecture → outcome</span></div>
        </div>
      </div>
      <div className="hero-bottom-rail hero-stagger hero-stagger-6 flex flex-col justify-between gap-3 border-t border-white/10 pt-4 text-[0.62rem] uppercase tracking-[0.16em] text-[#766A60] sm:flex-row"><span>Scroll to inspect the system</span><span>Strategy / product / engineering / growth</span><span className="hidden sm:inline">Scroll 01 ↓</span></div>
    </div>
  </section>
);

export default Hero;
