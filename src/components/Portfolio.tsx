
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
  tags: string[] | null;
}

const Portfolio = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-12 sm:py-16 bg-gray-50" id="portfolio">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="pulse-chip">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2"></span>
              <span>Portfolio</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">
            Our Success Stories
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore how we've helped businesses transform their digital presence with cutting-edge software solutions.
          </p>
        </div>

        <div className="flex flex-col space-y-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-y-0 animate-on-scroll mb-12">
          {loading ? (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-600">Loading portfolios...</p>
            </div>
          ) : caseStudies.length === 0 ? (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-600">No portfolios available yet.</p>
            </div>
          ) : (
            caseStudies.map((study) => (
              <Link
                key={study.id}
                to={`/case-study/${study.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-elegant hover:shadow-elegant-hover transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
                <div className="aspect-video overflow-hidden">
                  {study.image && (
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
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
                    )) || []}
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-pulse-500 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {study.description || "No description available"}
                  </p>
                  <div className="mt-4 flex items-center text-pulse-500 font-medium text-sm">
                    View Case Study
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center justify-center bg-pulse-500 hover:bg-pulse-600 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300 group"
          >
            See All Projects
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
