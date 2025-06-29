
import React from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const caseStudies = [
    {
      id: 1,
      slug: "e-commerce-platform",
      title: "E-Commerce Platform Redesign",
      description: "Complete overhaul of a legacy e-commerce system with modern architecture and improved user experience, resulting in 300% increase in conversion rates.",
      image: "/lovable-uploads/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png",
      tags: ["React", "Node.js", "AWS", "Stripe"]
    },
    {
      id: 2,
      slug: "healthcare-dashboard",
      title: "Healthcare Management Dashboard",
      description: "Real-time analytics dashboard for healthcare providers to monitor patient data and optimize resource allocation across multiple facilities.",
      image: "/lovable-uploads/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png",
      tags: ["Vue.js", "Python", "PostgreSQL", "Docker"]
    },
    {
      id: 3,
      slug: "fintech-mobile-app",
      title: "FinTech Mobile Application",
      description: "Secure mobile banking solution with advanced fraud detection and seamless user experience for next-generation financial services.",
      image: "/lovable-uploads/5663820f-6c97-4492-9210-9eaa1a8dc415.png",
      tags: ["React Native", "Firebase", "Blockchain", "AI/ML"]
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 bg-gray-50" id="portfolio">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="pulse-chip">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">4</span>
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
          {caseStudies.map((study, index) => (
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
                  {study.tags.map((tag) => (
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
