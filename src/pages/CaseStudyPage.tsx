
import React from "react";
import Navbar from "@/components/Navbar";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import Footer from "@/components/Footer";

const CaseStudyPage = () => {
  return (
    <div className="min-h-screen">
      <div 
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(212, 120, 76, 0.1) 0%, rgba(139, 69, 19, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
          height: '100px'
        }}
      />
      <Navbar />
      <CaseStudyDetail />
      <Footer />
    </div>
  );
};

export default CaseStudyPage;
