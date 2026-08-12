// Style: Molten Systems proof surface — dark technical framing, warm paper evidence rail, and no placeholder case cards.
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { supabase } from "@/integrations/supabase/client";
import { ArrowUpRight } from "lucide-react";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
  tags: string[] | null;
}

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

        const { count } = await supabase
          .from("portfolios")
          .select("*", { count: "exact", head: true });

        const { data, error } = await supabase
          .from("portfolios")
          .select("id, slug, title, description, image, tags")
          .range(startIndex, startIndex + itemsPerPage - 1)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching case studies:", error);
          return;
        }

        setCaseStudies((data || []).filter((study) => {
          const haystack = `${study.title || ""} ${study.description || ""}`.toLowerCase();
          return study.title.trim().length > 8 && (study.description || "").trim().length > 30 && !/hjjk|best design|placeholder/.test(haystack);
        }));
        setTotalCount(count || 0);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="min-h-screen bg-[#100e0c] text-[#F7F1E8]">
      <Seo
        title="Selected work — FuseLabs"
        description="Explore shipped FuseLabs systems across product development, cloud, AI, and growth engineering."
        path="/portfolio"
      />
      <Navbar />

      <section className="border-b border-[#3A2A1E] bg-[#100e0c] pb-20 pt-32">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:px-12">
          <div><p className="eyebrow text-[#DE8321]">Selected work / shipped systems</p><h1 className="mt-6 max-w-4xl font-display text-[clamp(3.8rem,8vw,8.5rem)] font-medium leading-[0.84] tracking-[-0.09em]">What shipped,<br /><span className="text-[#9E9285]">and why it mattered.</span></h1></div>
          <p className="max-w-md text-base leading-relaxed text-[#B9ADA0]">A field guide to the systems we’ve helped teams put into the world—product, cloud, AI, and the work that makes growth repeatable.</p>
        </div>
      </section>

      <section className="bg-[#F3EEE6] py-20 text-[#171311] sm:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          {loading ? (
            <div className="py-20 text-sm text-[#6D645B]">Loading shipped work…</div>
          ) : caseStudies.length === 0 ? (
            <div className="border-t border-[#D7CFC4] py-20 text-sm text-[#6D645B]">The next case file is being prepared.</div>
          ) : (
            <div className="grid gap-14">
              {caseStudies.map((study, i) => (
                <article key={study.id} className="grid gap-8 border-t border-[#D7CFC4] pt-8 lg:grid-cols-[0.18fr_0.82fr]">
                  <div className="flex items-start justify-between lg:block"><span className="font-mono text-xs text-[#B1691B]">0{i + 1}</span><span className="eyebrow text-[#6D645B] lg:mt-8 lg:block">Shipped system</span></div>
                  <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-end"><div className="overflow-hidden bg-[#D9D1C7]"><div className="aspect-[1.45] overflow-hidden"><img src={study.image || undefined} alt="" className="h-full w-full object-cover grayscale transition duration-700 hover:scale-105 hover:grayscale-0" /></div></div><div><div className="flex flex-wrap gap-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#B1691B]">{(study.tags || []).slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div><h2 className="mt-5 font-display text-4xl tracking-[-0.07em] lg:text-5xl">{study.title}</h2><p className="mt-5 max-w-md text-base leading-relaxed text-[#625A52]">{study.description}</p><Link to={`/case-study/${study.slug}`} className="group mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em] text-[#171311]">Open case file <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link></div></div>
                </article>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "btn-motion cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="btn-motion cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "btn-motion cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
