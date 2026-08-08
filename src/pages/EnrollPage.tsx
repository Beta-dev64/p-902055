import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import LeadForm from "@/components/LeadForm";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";

const EnrollPage = () => {
  const [params] = useSearchParams();
  const [options, setOptions] = useState<{ slug: string; title: string }[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("academy_programs")
        .select("slug,title")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      setOptions(data || []);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Enroll in FuseLabs Academy"
        description="Apply for the FuseLabs Academy frontend, backend or AI/ML program. Admissions replies within 24 hours."
        path="/enroll"
      />
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="pulse-chip mb-4">
            <span>Academy enrollment</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Apply for your cohort
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Complete the application and an admissions lead will contact you
            within 24 hours with payment options and your start date.
          </p>
          <div className="rounded-3xl border border-gray-200 p-6 sm:p-10">
            <LeadForm
              type="academy"
              options={options}
              defaultSelection={params.get("program") || ""}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EnrollPage;