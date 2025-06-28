
import React from "react";
import Navbar from "@/components/Navbar";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import Footer from "@/components/Footer";

const CaseStudyPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <CaseStudyDetail />
      <Footer />
    </div>
  );
};

export default CaseStudyPage;
