// Style: Signal in Motion — case studies read like an annotated archive, with hover revealing the artifact behind each delivery signal.
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type CaseStudy = { id: string; slug: string; title: string; description: string | null; image: string | null; tags: string[] | null };

const Portfolio = () => {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("portfolios").select("id, slug, title, description, image, tags").order("created_at", { ascending: false }).limit(5).then(({ data }) => {
      setStudies(((data as CaseStudy[]) || []).filter((study) => {
        const haystack = `${study.title || ""} ${study.description || ""}`.toLowerCase();
        return study.title.trim().length > 8 && (study.description || "").trim().length > 30 && !/hjjk|best design|placeholder/.test(haystack);
      }));
      setLoading(false);
    });
  }, []);

  return (
    <section id="portfolio" className="project-index bg-[#F3EEE6] py-24 text-[#171311] sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-b border-[#D7CFC4] pb-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end"><div><p className="eyebrow text-[#B1691B]">03 / Selected work</p><h2 className="display-title mt-5 max-w-md">Work that makes the signal visible.</h2></div><div className="flex items-end justify-between gap-8"><p className="max-w-sm text-sm leading-relaxed text-[#6D645B]">A small index of products, systems, and growth surfaces built with teams who needed the next stage to hold.</p><Link to="/portfolio" className="group inline-flex shrink-0 items-center gap-3 text-xs font-bold uppercase tracking-[0.14em]">View all work <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link></div></div>
        {loading ? <div className="py-20 text-sm text-[#6D645B]">Loading the work index…</div> : studies.length === 0 ? <div className="py-20 text-sm text-[#6D645B]">Case studies will appear here as the portfolio grows.</div> : <div className="project-list mt-8">{studies.map((study, index) => <Link key={study.id} to={`/case-study/${study.slug}`} className="project-row group"><span className="project-number font-mono text-xs text-[#B1691B]">0{index + 1}</span><div className="project-meta"><div className="flex flex-wrap gap-2">{(study.tags || []).slice(0, 3).map((tag) => <span key={tag} className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#B1691B]">{tag}</span>)}</div><h3 className="mt-3 font-display text-3xl tracking-[-0.06em] sm:text-5xl">{study.title}</h3><p className="mt-3 max-w-xl text-sm leading-relaxed text-[#6D645B]">{study.description}</p></div><div className="project-art">{study.image && <img src={study.image} alt="" className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />}<span className="project-arrow"><ArrowUpRight size={20} /></span></div><span className="project-open font-mono text-[0.62rem] uppercase tracking-[0.14em]">Open case <ArrowUpRight size={14} /></span></Link>)}</div>}
      </div>
    </section>
  );
};

export default Portfolio;
