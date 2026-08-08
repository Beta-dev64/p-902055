import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminLogin from "@/components/AdminLogin";
import AdminPortfolios from "@/components/admin/AdminPortfolios";
import AdminPartners from "@/components/admin/AdminPartners";
import AdminTestimonials from "@/components/admin/AdminTestimonials";
import AdminReviews from "@/components/admin/AdminReviews";
import AdminProjectInquiries from "@/components/admin/AdminProjectInquiries";
import AdminTeam from "@/components/admin/AdminTeam";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("inquiries");

  const tabs = [
    { id: "inquiries", label: "Project Requests", component: AdminProjectInquiries },
    { id: "reviews", label: "Reviews", component: AdminReviews },
    { id: "testimonials", label: "Testimonials", component: AdminTestimonials },
    { id: "portfolios", label: "Portfolio Cases", component: AdminPortfolios },
    { id: "partners", label: "Trusted Partners", component: AdminPartners },
    { id: "team", label: "Team Members", component: AdminTeam },
  ];

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || AdminProjectInquiries;

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pb-12 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="mb-2 font-display text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage project requests, visitor reviews, testimonials, portfolio, partners, and team
            </p>
          </div>

          <div className="mb-8 rounded-lg border border-border bg-card shadow-sm">
            <div className="border-b border-border">
              <nav className="-mb-px flex flex-wrap gap-x-6 gap-y-1 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card shadow-sm">
            <ActiveComponent />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;
