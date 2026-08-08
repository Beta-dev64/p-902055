import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import LeadForm from "@/components/LeadForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Service } from "@/lib/cms";

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [{ data: one }, { data: all }] = await Promise.all([
        supabase.from("services").select("*").eq("slug", slug).maybeSingle(),
        supabase
          .from("services")
          .select("*")
          .eq("published", true)
          .order("sort_order", { ascending: true }),
      ]);
      setService((one as Service) || null);
      setAllServices((all as Service[]) || []);
      setLoading(false);
    };
    if (slug) load();
  }, [slug]);

  const options = useMemo(
    () => allServices.map((s) => ({ slug: s.slug, title: s.title })),
    [allServices],
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading service…</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Service not found</h1>
        <Link to="/services" className="text-pulse-600 hover:underline">
          Back to all services
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={`${service.title} — FuseLabs IO Services`}
        description={
          service.tagline ||
          service.description?.slice(0, 155) ||
          `${service.title} services from FuseLabs IO.`
        }
        path={`/services/${service.slug}`}
        image={service.image || undefined}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: { "@type": "Organization", name: "FuseLabs IO" },
        }}
      />
      <Navbar />

      <main className="pt-28 pb-20">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center text-sm text-gray-500 hover:text-pulse-600 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            All services
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              {service.title}
            </h1>
            {service.tagline && (
              <p className="text-xl text-pulse-600 mb-6">{service.tagline}</p>
            )}
            <p className="text-lg text-gray-600 mb-8">{service.description}</p>
            <Button asChild size="lg" className="bg-pulse-500 hover:bg-pulse-600 text-white">
              <a href="#inquiry">
                Start a project
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </section>

        {service.image && (
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              className="w-full rounded-3xl object-cover max-h-[420px]"
            />
          </section>
        )}

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {service.highlights && service.highlights.length > 0 && (
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">
                What you get
              </h2>
              <ul className="space-y-3">
                {service.highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-pulse-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {service.deliverables && service.deliverables.length > 0 && (
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">
                Deliverables
              </h2>
              <ul className="space-y-3">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-pulse-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {service.process && service.process.length > 0 && (
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <h2 className="text-2xl font-display font-bold mb-8">How we work</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.process.map((step, index) => (
                <div key={step} className="rounded-2xl bg-gray-50 p-6">
                  <div className="w-9 h-9 rounded-full bg-pulse-500 text-white flex items-center justify-center font-semibold mb-4">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section id="inquiry" className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-3xl mx-auto rounded-3xl border border-gray-200 p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">
              Start a {service.title.toLowerCase()} project
            </h2>
            <p className="text-gray-600 mb-8">
              Tell us what you're building. We reply within one business day.
            </p>
            <LeadForm type="project" options={options} defaultSelection={service.slug} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetailPage;