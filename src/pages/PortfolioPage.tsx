import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { supabase } from "@/integrations/supabase/client";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
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
        
        // Get total count
        const { count } = await supabase
          .from('portfolios')
          .select('*', { count: 'exact', head: true });

        // Get paginated data
        const { data, error } = await supabase
          .from('portfolios')
          .select('id, slug, title, description, image, tags')
          .range(startIndex, startIndex + itemsPerPage - 1)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching case studies:', error);
          return;
        }

        setCaseStudies(data || []);
        setTotalCount(count || 0);
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Portfolio — Software Case Studies | FuseLabs IO"
        description="Explore FuseLabs IO case studies: MVPs, web platforms, cloud and AI projects we built for growing software businesses."
        path="/portfolio"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-gray-900 mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our complete collection of successful software projects and digital solutions.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pulse-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading portfolio...</p>
            </div>
          ) : (
            <div className="flex flex-col space-y-6 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
              {caseStudies.map((study) => (
              <Link
                key={study.id}
                to={`/case-study/${study.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-elegant hover:shadow-elegant-hover transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {study.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-pulse-100 text-pulse-600 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-pulse-500 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {study.description}
                  </p>
                  <div className="mt-4 flex items-center text-pulse-500 font-medium text-sm">
                    View Case Study
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          )}

          {/* Pagination */}
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
