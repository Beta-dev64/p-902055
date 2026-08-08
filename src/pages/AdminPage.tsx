
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminLogin from "@/components/AdminLogin";
import AdminPortfolios from "@/components/admin/AdminPortfolios";
import AdminPartners from "@/components/admin/AdminPartners";
import AdminTestimonials from "@/components/admin/AdminTestimonials";
import AdminTeam from "@/components/admin/AdminTeam";
import AdminServices from "@/components/admin/AdminServices";
import AdminPrograms from "@/components/admin/AdminPrograms";
import AdminLeads from "@/components/admin/AdminLeads";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [activeTab, setActiveTab] = useState("portfolios");

  const tabs = [
    { id: "portfolios", label: "Portfolio Cases", render: () => <AdminPortfolios /> },
    { id: "services", label: "Services", render: () => <AdminServices /> },
    { id: "programs", label: "Academy Programs", render: () => <AdminPrograms /> },
    { id: "leads", label: "Leads", render: () => <AdminLeads adminPassword={adminPassword} /> },
    { id: "partners", label: "Trusted Partners", render: () => <AdminPartners /> },
    { id: "testimonials", label: "Testimonials", render: () => <AdminTestimonials /> },
    { id: "team", label: "Team Members", render: () => <AdminTeam /> },
  ];

  const activeRender =
    tabs.find((tab) => tab.id === activeTab)?.render ?? tabs[0].render;

  if (!isLoggedIn) {
    return (
      <AdminLogin
        onLogin={(password) => {
          setAdminPassword(password);
          setIsLoggedIn(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage case studies, services, academy programs, leads, partner logos, testimonials and team members
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-pulse-500 text-pulse-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm">
            {activeRender()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;
