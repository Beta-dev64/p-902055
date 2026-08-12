// Style: Molten Systems — case studies are evidence surfaces, not a repetitive card grid.
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type CaseStudy = { id: string; slug: string; title: string; description: string | null; image: string | null; tags: string[] | null };

const Portfolio = () => {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("portfolios").select("*").order("created_at", { ascending: false }).limit(3).then(({ data }) => {
      setStudies(((data as CaseStudy[]) || []).filter((study) => {
        const haystack = `${study.title || ""} ${study.description || ""}`.toLowerCase();
        return study.title.trim().length > 8 && (study.description || "").trim().length > 30 && !/hjjk|best design|placeholder/.test(haystack);
      }));
      setLoading(false);
    });
  }, []);

  return (
    <section id="portfolio" className="bg-[#F3EEE6] py-24 text-[#171311] sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 border-b border-[#D7CFC4] pb-10 lg:flex-row lg:items-end"><div><p className="eyebrow text-[#B1691B]">Selected work</p><h2 className="display-title mt-5 max-w-2xl">Proof, not promises.</h2></div><Link to="/portfolio" className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em] text-[#171311]">View all work <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link></div>
        {loading ? <div className="py-20 text-sm text-[#6D645B]">Loading selected work…</div> : studies.length === 0 ? <div className="py-20 text-sm text-[#6D645B]">Case studies will appear here as the portfolio grows.</div> : <div className="portfolio-mosaic mt-10">{studies.map((study, index) => <Link key={study.id} to={`/case-study/${study.slug}`} className={`portfolio-tile portfolio-tile-${index + 1} group`}>{study.image && <img src={study.image} alt="" className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />}<div className="absolute inset-0 bg-gradient-to-t from-[#171311]/95 via-[#171311]/20 to-transparent" /><div className="relative mt-auto p-6 text-[#F7F1E8] sm:p-8"><div className="flex flex-wrap gap-2">{(study.tags || []).slice(0, 3).map((tag) => <span key={tag} className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#F2CDA6]">{tag}</span>)}</div><h3 className="mt-4 max-w-lg font-display text-3xl tracking-[-0.06em] sm:text-4xl">{study.title}</h3><p className="mt-3 max-w-md text-sm leading-relaxed text-[#D0C6BB]">{study.description || "A FuseLabs case study."}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#F2CDA6]">Read case study <ArrowUpRight size={15} /></span></div></Link>)}</div>}
      </div>
    </section>
  );
};

export default Portfolio;
