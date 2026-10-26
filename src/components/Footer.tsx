import React from "react";
import { ArrowUpRight } from "lucide-react";
import { SocialIcons } from "@/components/FollowUs";
import { FuseLabsLogo } from "@/components/FuseLabsLogo";
import { MaskLabel, Reveal, usePageCurtain } from "@/components/motion";

const GROUPS: { label: string; links: { text: string; to: string }[] }[] = [
  {
    label: "studio",
    links: [
      { text: "All Services", to: "/services" },
      { text: "Startup Acceleration", to: "/services/startup-acceleration" },
      { text: "Product Development", to: "/services/product-development" },
      { text: "Growth Engineering", to: "/services/growth-engineering" },
      { text: "Portfolio", to: "/portfolio" },
    ],
  },
  {
    label: "learn",
    links: [
      { text: "Academy", to: "/academic" },
      { text: "Blog", to: "/blog" },
      { text: "Start a Project", to: "/start-project" },
    ],
  },
  {
    label: "connect",
    links: [
      { text: "Contact", to: "/#details" },
      { text: "Home", to: "/" },
      { text: "Privacy Policy", to: "/#contact" },
      { text: "Terms of Service", to: "/#contact" },
    ],
  },
];

const Footer = () => {
  const { go } = usePageCurtain();

  const handleNavClick = (to: string) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    go(to);
  };

  return (
    <footer className="relative overflow-hidden bg-[#070605] text-white">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(222,131,33,0.16),transparent_65%)] blur-2xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 pb-28 pt-16 sm:px-6 md:pb-32 md:pt-24 lg:px-8">
        <Reveal className="mb-14 max-w-3xl md:mb-20">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
            [ let&rsquo;s build ]
          </p>
          <a
            href="/start-project"
            onClick={handleNavClick("/start-project")}
            className="font-display text-[clamp(1.9rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-tight text-white transition-opacity duration-300 hover:opacity-90"
          >
            <MaskLabel text="Have a product in mind?" />
          </a>
          <a
            href="/start-project"
            onClick={handleNavClick("/start-project")}
            className="btn-motion group mt-7 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium uppercase tracking-[0.14em] text-white transition-colors hover:border-primary hover:text-primary"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 border-t border-white/10 pt-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <FuseLabsLogo variant="onAccent" markClassName="h-11 w-11" className="text-white" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              FuseLabs IO is a senior product, engineering and AI team. We take startups from first
              prototype to scaled platform — and keep shipping after launch.
            </p>
            <div className="mt-6">
              <SocialIcons className="[&>a]:text-white/40 [&>a:hover]:text-primary" />
            </div>
          </div>

          {GROUPS.map((group) => (
            <nav key={group.label} className="md:col-span-2" aria-label={group.label}>
              <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-white/40">
                [ {group.label} ]
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.to}
                      onClick={handleNavClick(link.to)}
                      className="text-sm text-white/70"
                    >
                      <MaskLabel text={link.text} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between md:text-sm">
          <p>© {new Date().getFullYear()} FuseLabs IO. All rights reserved.</p>
          <p className="font-display italic tracking-wide">You dream it, we execute it.</p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-4 select-none overflow-hidden px-4 text-center md:-bottom-6"
      >
        <span
          className="block font-display text-[clamp(4rem,17vw,15rem)] font-bold leading-[0.8] tracking-[-0.02em] text-transparent"
          style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.22)",
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 45%, rgba(222,131,33,0.16) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          FuseLabsIO
        </span>
      </div>
    </footer>
  );
};

export default Footer;
