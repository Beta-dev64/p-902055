
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const PortfolioPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const allCaseStudies = [
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
    },
    // Additional case studies for pagination demonstration
    {
      id: 4,
      slug: "social-media-platform",
      title: "Social Media Platform",
      description: "Modern social networking platform with real-time messaging, content sharing, and advanced privacy controls.",
      image: "/lovable-uploads/af412c03-21e4-4856-82ff-d1a975dc84a9.png",
      tags: ["React", "GraphQL", "MongoDB", "WebSocket"]
    },
    {
      id: 5,
      slug: "inventory-management",
      title: "Inventory Management System",
      description: "Comprehensive inventory tracking system with automated reordering, supplier management, and detailed analytics.",
      image: "/lovable-uploads/dc13e94f-beeb-4671-8a22-0968498cdb4c.png",
      tags: ["Angular", "Spring Boot", "MySQL", "Apache Kafka"]
    },
    {
      id: 6,
      slug: "learning-platform",
      title: "Online Learning Platform",
      description: "Interactive e-learning platform with video streaming, progress tracking, and collaborative features.",
      image: "/lovable-uploads/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png",
      tags: ["React", "Node.js", "MongoDB", "WebRTC"]
    },
    {
      id: 7,
      slug: "logistics-tracker",
      title: "Logistics Tracking System",
      description: "Real-time package tracking and delivery management system with GPS integration and customer notifications.",
      image: "/lovable-uploads/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png",
      tags: ["Vue.js", "Python", "PostgreSQL", "Google Maps API"]
    },
    {
      id: 8,
      slug: "restaurant-pos",
      title: "Restaurant POS System",
      description: "Complete point-of-sale solution for restaurants with order management, inventory tracking, and analytics.",
      image: "/lovable-uploads/5663820f-6c97-4492-9210-9eaa1a8dc415.png",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"]
    },
    {
      id: 9,
      slug: "crm-solution",
      title: "Customer Relationship Management",
      description: "Comprehensive CRM solution with lead tracking, sales pipeline management, and automated marketing campaigns.",
      image: "/lovable-uploads/af412c03-21e4-4856-82ff-d1a975dc84a9.png",
      tags: ["React", "Node.js", "MongoDB", "SendGrid"]
    },
    {
      id: 10,
      slug: "booking-platform",
      title: "Appointment Booking Platform",
      description: "Multi-service booking platform with calendar integration, payment processing, and automated reminders.",
      image: "/lovable-uploads/dc13e94f-beeb-4671-8a22-0968498cdb4c.png",
      tags: ["Next.js", "Prisma", "PostgreSQL", "Stripe"]
    }
  ];

  const totalPages = Math.ceil(allCaseStudies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCaseStudies = allCaseStudies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentCaseStudies.map((study) => (
              <Link
                key={study.id}
                to={`/case-study/${study.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-elegant hover:shadow-elegant-hover transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
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
                  <p className="text-gray-600 text-sm leading-relaxed">
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
