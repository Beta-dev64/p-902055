import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { PageHero, Reveal } from "@/components/motion";
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

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const PortfolioCardSkeleton = () => (
  <div className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
    <div className="aspect-video w-full bg-muted" />
    <div className="p-6">
      <div className="mb-3 flex gap-2">
        <div className="h-5 w-16 rounded-full bg-muted" />
        <div className="h-5 w-20 rounded-full bg-muted/70" />
      </div>
      <div className="mb-3 h-6 w-2/3 rounded-full bg-muted" />
      <div className="mb-2 h-4 w-full rounded-full bg-muted/60" />
      <div className="h-4 w-4/5 rounded-full bg-muted/50" />
    </div>
  </div>
);

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
          .select("*", { count: "exact", head: true })
          .eq('published', true);

        const { data, error } = await supabase
          .from("portfolios")
          .select("id, slug, title, description, image, tags")
          .eq('published', true)
          .range(startIndex, startIndex + itemsPerPage - 1)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching case studies:", error);
          return;
        }

        setCaseStudies(data || []);
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
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Portfolio — Software Case Studies | FuseLabs IO"
        description="Explore FuseLabs IO case studies: MVPs, web platforms, cloud and AI projects we built for growing software businesses."
        path="/portfolio"
      />
      <Navbar />

      <PageHero
        eyebrow="Work"
        title="Our Portfolio"
        description="Explore our complete collection of successful software projects and digital solutions."
      />

      <section className="bg-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <PortfolioCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <Reveal stagger={80}>
              <div className="flex flex-col space-y-6 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
                {caseStudies.map((study) => (
                  <Link
                    key={study.id}
                    to={`/case-study/${study.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elegant transition-all duration-300 hover:-translate-y-2 hover:shadow-elegant-hover"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {study.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-primary/15 px-2 py-1 text-xs font-medium text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="mb-3 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                        {study.title}
                      </h3>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        {study.description}
                      </p>
                      <div className="mt-4 flex items-center text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
                        View Case Study
                        <svg
                          className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
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
