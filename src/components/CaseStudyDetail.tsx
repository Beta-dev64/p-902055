
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";

const CaseStudyDetail = () => {
  const { slug } = useParams();

  const caseStudyData = {
    "e-commerce-platform": {
      title: "E-Commerce Platform Redesign",
      client: "RetailCorp",
      duration: "6 months",
      team: "8 developers",
      deployedUrl: "https://retailcorp-demo.com",
      hero: "/lovable-uploads/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png",
      challenge: "RetailCorp's legacy e-commerce platform was struggling with poor user experience, slow performance, and outdated technology stack. The conversion rate was declining, and maintenance costs were increasing exponentially.",
      solution: "We completely rebuilt the platform using modern React architecture, implemented advanced caching strategies, and created an intuitive user interface. The new system features real-time inventory management, personalized recommendations, and seamless checkout process.",
      results: [
        "300% increase in conversion rates",
        "75% reduction in page load times",
        "50% decrease in bounce rate",
        "99.9% uptime achieved"
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "Redis", "AWS", "Stripe", "Docker"],
      images: [
        "/lovable-uploads/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png",
        "/lovable-uploads/5663820f-6c97-4492-9210-9eaa1a8dc415.png"
      ]
    },
    "healthcare-dashboard": {
      title: "Healthcare Management Dashboard",
      client: "MedHealth Systems",
      duration: "8 months",
      team: "12 developers",
      deployedUrl: "https://medhealth-dashboard.com",
      hero: "/lovable-uploads/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png",
      challenge: "MedHealth Systems needed a comprehensive dashboard to monitor patient data across multiple facilities, but their existing system lacked real-time capabilities and proper data visualization.",
      solution: "We developed a comprehensive healthcare management dashboard with real-time data synchronization, advanced analytics, and intuitive data visualization. The system includes patient monitoring, resource allocation optimization, and predictive analytics for better decision making.",
      results: [
        "40% improvement in patient care efficiency",
        "60% reduction in administrative overhead",
        "Real-time monitoring of 10,000+ patients",
        "25% cost reduction in resource allocation"
      ],
      technologies: ["Vue.js", "Python", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AI/ML"],
      images: [
        "/lovable-uploads/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png",
        "/lovable-uploads/5663820f-6c97-4492-9210-9eaa1a8dc415.png"
      ]
    },
    "fintech-mobile-app": {
      title: "FinTech Mobile Application",
      client: "NextGen Finance",
      duration: "10 months",
      team: "15 developers",
      deployedUrl: "https://nextgenfinance-app.com",
      hero: "/lovable-uploads/5663820f-6c97-4492-9210-9eaa1a8dc415.png",
      challenge: "NextGen Finance wanted to disrupt the traditional banking sector with a mobile-first approach, requiring advanced security, seamless UX, and innovative features like AI-powered fraud detection.",
      solution: "We built a comprehensive mobile banking solution with biometric authentication, blockchain integration for enhanced security, AI-powered fraud detection, and intuitive user experience. The app includes features like instant transfers, investment tracking, and financial analytics.",
      results: [
        "1M+ active users within 6 months",
        "99.99% security compliance achieved",
        "80% reduction in fraudulent transactions",
        "4.8/5 app store rating"
      ],
      technologies: ["React Native", "Node.js", "MongoDB", "Blockchain", "AI/ML", "Firebase", "AWS"],
      images: [
        "/lovable-uploads/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png",
        "/lovable-uploads/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png"
      ]
    }
  };

  const caseStudy = caseStudyData[slug as keyof typeof caseStudyData];

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
          src={caseStudy.hero}
          alt={caseStudy.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <Link
              to="/"
              className="inline-flex items-center text-white mb-6 hover:text-pulse-300 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-4">
              {caseStudy.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <span>Client: {caseStudy.client}</span>
              <span>Duration: {caseStudy.duration}</span>
              <span>Team: {caseStudy.team}</span>
            </div>
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
                <p className="text-gray-600 leading-relaxed">{caseStudy.challenge}</p>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-2xl font-display font-bold mb-4">Our Solution</h2>
                <p className="text-gray-600 leading-relaxed">{caseStudy.solution}</p>
              </div>

              {/* Images */}
              <div>
                <h2 className="text-2xl font-display font-bold mb-6">Project Screenshots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {caseStudy.images.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-elegant">
                      <img
                        src={image}
                        alt={`${caseStudy.title} screenshot ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Results */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-display font-bold mb-4">Key Results</h3>
                <ul className="space-y-3">
                  {caseStudy.results.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-pulse-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
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

              {/* View Project */}
              <div>
                <a
                  href={caseStudy.deployedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-pulse-500 hover:bg-pulse-600 text-white font-medium py-3 px-6 rounded-full transition-colors"
                >
                  View Live Project
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyDetail;
