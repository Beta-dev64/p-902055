import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
  tags: string[];
  challenge: string;
  solution: string;
  results: string;
  live_url: string;
  project_images: string[];
  technologies: string[];
}

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!slug) return;

      try {
        const { data, error } = await supabase
          .from('portfolios')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          console.error('Error fetching case study:', error);
          return;
        }

        setCaseStudy(data);
      } catch (error) {
        console.error('Error fetching case study:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pulse-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Study Not Found</h1>
          <Link to="/" className="text-pulse-500 hover:underline">Return to Homepage</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={caseStudy.image}
          alt={caseStudy.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto pt-16 md:pt-0">
            <Link
              to="/portfolio"
              className="inline-flex items-center text-white mb-6 hover:text-pulse-300 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white flex-1">
                {caseStudy.title}
              </h1>
              <div className="text-sm text-white/70 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                Slug: {caseStudy.slug}
              </div>
            </div>
            <p className="text-white/90 text-lg max-w-2xl">
              {caseStudy.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge */}
              <div>
                <h2 className="text-2xl font-display font-bold mb-4">The Challenge</h2>
                <div className="text-gray-600 leading-relaxed prose max-w-none" 
                     dangerouslySetInnerHTML={{ __html: caseStudy.challenge || '' }} />
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-2xl font-display font-bold mb-4">Our Solution</h2>
                <div className="text-gray-600 leading-relaxed prose max-w-none" 
                     dangerouslySetInnerHTML={{ __html: caseStudy.solution || '' }} />
              </div>

              {/* Project Gallery */}
              {caseStudy.project_images && caseStudy.project_images.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-bold mb-6">Project Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {caseStudy.project_images.map((image, index) => (
                      <div key={index} className="group relative rounded-lg overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300">
                        <img
                          src={image}
                          alt={`${caseStudy.title} image ${index + 1}`}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                            Image {index + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Results */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-display font-bold mb-4">Key Results</h3>
                <div className="text-gray-700 prose max-w-none" 
                     dangerouslySetInnerHTML={{ __html: caseStudy.results || '' }} />
              </div>

              {/* Technologies */}
              {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                <div>
                  <h3 className="text-xl font-display font-bold mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-pulse-100 text-pulse-600 text-sm font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* View Project */}
              {caseStudy.live_url && (
                <div>
                  <a
                    href={caseStudy.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-pulse-500 hover:bg-pulse-600 text-white font-medium py-3 px-6 rounded-full transition-colors"
                  >
                    View Live Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyDetail;