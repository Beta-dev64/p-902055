// Style: Signal in Motion proof archive — every case file exposes its role, artifact, and next action before the visitor has to guess.
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { supabase } from "@/integrations/supabase/client";
import { ArrowUpRight, Brackets, ScanLine } from "lucide-react";

interface CaseStudy { id: string; slug: string; title: string; description: string | null; image: string | null; tags: string[] | null; }

const PortfolioPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const { count } = await supabase.from("portfolios").select("*", { count: "exact", head: true });
        const { data, error } = await supabase.from("portfolios").select("id, slug, title, description, image, tags").range(startIndex, startIndex + itemsPerPage - 1).order("created_at", { ascending: false });
        if (error) { console.error("Error fetching case studies:", error); return; }
        setCaseStudies((data || []).filter((study) => { const haystack = `${study.title || ""} ${study.description || ""}`.toLowerCase(); return study.title.trim().length > 8 && (study.description || "").trim().length > 30 && !/hjjk|best design|placeholder/.test(haystack); }));
        setTotalCount(count || 0);
      } catch (error) { console.error("Error fetching case studies:", error); } finally { setLoading(false); }
    };
    fetchCaseStudies();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="min-h-screen bg-[#100e0c] text-[#F7F1E8]"><Seo title="Selected work — FuseLabs" description="Explore shipped FuseLabs systems across product development, cloud, AI, and growth engineering." path="/portfolio" /><Navbar />
      <section className="border-b border-[#3A2A1E] bg-[#100e0c] pb-20 pt-32"><div className="mx-auto grid max-w-[1540px] gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:px-12"><div><p className="eyebrow text-[#DE8321]">Selected work / shipped systems</p><h1 className="mt-6 max-w-4xl font-display text-[clamp(3.8rem,8vw,8.5rem)] font-medium leading-[0.84] tracking-[-0.09em]">What shipped,<br /><span className="text-[#9E9285]">and why it mattered.</span></h1></div><div className="portfolio-hero-note"><span className="eyebrow text-[#DE8321]">Evidence index / 01</span><p className="mt-5 max-w-md text-base leading-relaxed text-[#B9ADA0]">A field guide to the systems we’ve helped teams put into the world—product, cloud, AI, and the work that makes growth repeatable.</p><div className="mt-8 flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.13em] text-[#8F8174]"><ScanLine size={15} className="text-[#DE8321]" />role / artifact / outcome</div></div></div></section>
      <section className="bg-[#F3EEE6] py-20 text-[#171311] sm:py-28"><div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12"><div className="portfolio-archive-heading"><span className="eyebrow text-[#B1691B]">Archive / live records</span><span className="font-mono text-[0.62rem] uppercase tracking-[0.13em] text-[#877B70]">Hover or focus an artifact to inspect</span></div>{loading ? <div className="py-20 text-sm text-[#6D645B]">Loading shipped work…</div> : caseStudies.length === 0 ? <div className="border-t border-[#D7CFC4] py-20 text-sm text-[#6D645B]">The next case file is being prepared.</div> : <div className="grid gap-14">{caseStudies.map((study, i) => { const tags = (study.tags || []).filter(Boolean); const artifactLabel = study.image ? "Interface artifact attached" : "Artifact pending"; return <article key={study.id} className="work-archive-entry group border-t border-[#D7CFC4] pt-8"><div className="grid gap-8 lg:grid-cols-[0.18fr_0.82fr]"><div className="work-archive-rail flex items-start justify-between lg:block"><span className="font-mono text-xs text-[#B1691B]">0{String(i + 1).padStart(2, "0")}</span><span className="eyebrow text-[#6D645B] lg:mt-8 lg:block">Shipped system</span><span className="mt-8 hidden border-l border-[#B1691B] pl-3 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[#877B70] lg:block">signal<br />captured</span></div><div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-end"><div className="proof-frame overflow-hidden bg-[#D9D1C7]"><div className="proof-frame-label"><span>artifact / {String(i + 1).padStart(2, "0")}</span><Brackets size={13} /></div><div className="aspect-[1.45] overflow-hidden"><img src={study.image || undefined} alt={`${study.title} interface artifact`} className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" /></div><div className="proof-frame-footer"><span>{artifactLabel}</span><span className="text-[#B1691B]">↗</span></div></div><div><div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#B1691B]">{tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div><h2 className="mt-5 font-display text-4xl tracking-[-0.07em] lg:text-5xl">{study.title}</h2><p className="mt-5 max-w-md text-base leading-relaxed text-[#625A52]">{study.description}</p><div className="proof-readout mt-6 grid gap-3 border-y border-[#D7CFC4] py-4 sm:grid-cols-2"><div><span className="proof-readout-label">Role</span><span className="proof-readout-value">{tags[0] || "Product engineering"}</span></div><div><span className="proof-readout-label">Evidence</span><span className="proof-readout-value">{artifactLabel}</span></div></div><Link to={`/case-study/${study.slug}`} className="group mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em] text-[#171311]">Open case file <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link></div></div></div></article>; })}</div>}{totalPages > 1 && <div className="mt-12"><Pagination><PaginationContent><PaginationItem><PaginationPrevious onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} className={currentPage === 1 ? "pointer-events-none opacity-50" : "btn-motion cursor-pointer"} /></PaginationItem>{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => <PaginationItem key={page}><PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page} className="btn-motion cursor-pointer">{page}</PaginationLink></PaginationItem>)}<PaginationItem><PaginationNext onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} className={currentPage === totalPages ? "pointer-events-none opacity-50" : "btn-motion cursor-pointer"} /></PaginationItem></PaginationContent></Pagination></div>}</div></section>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
