import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import LeadForm from "@/components/LeadForm";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { PageHero, Reveal, Magnetic } from "@/components/motion";
import type { ServiceRow } from "./ServicesPage";
import { trackCtaClick } from "@/lib/analytics";

const ListBlock = ({ title, items }: { title: string; items?: string[] | null }) => {
  if (!items || items.length === 0) return null;
  return (
    <section>
      <h2 className="mb-4 font-display text-2xl font-semibold">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-muted-foreground">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

const ServiceDetailSkeleton = () => (
  <div className="min-h-screen animate-pulse bg-background">
    <div className="bg-[#070605] px-5 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-44">
      <div className="mx-auto w-full max-w-6xl">
        <div className="h-6 w-24 rounded-full bg-white/10" />
        <div className="mt-6 h-10 w-3/4 rounded-full bg-white/10" />
        <div className="mt-3 h-10 w-1/2 rounded-full bg-white/10" />
        <div className="mt-6 h-4 w-2/3 rounded-full bg-white/[0.06]" />
        <div className="mt-9 h-11 w-44 rounded-md bg-white/10" />
      </div>
    </div>
    <div className="container mx-auto max-w-4xl space-y-4 px-4 py-12 sm:px-6">
      <div className="h-64 w-full rounded-2xl bg-muted" />
      <div className="mt-8 h-7 w-40 rounded-full bg-muted" />
      <div className="h-4 w-full rounded-full bg-muted/70" />
      <div className="h-4 w-5/6 rounded-full bg-muted/70" />
      <div className="h-4 w-4/6 rounded-full bg-muted/50" />
    </div>
  </div>
);

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<ServiceRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!slug) return;
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) console.error("Error fetching service:", error);
      if (active) {
        setService((data as ServiceRow) || null);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return <ServiceDetailSkeleton />;
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container mx-auto px-4 pb-20 pt-32 text-center">
          <h1 className="mb-4 font-display text-3xl font-bold">Service not found</h1>
          <p className="mb-6 text-muted-foreground">
            This service may have been unpublished or renamed.
          </p>
          <Button asChild>
            <Link to="/services">Browse all services</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title={`${service.title} | FuseLabs IO Services`}
        description={
          service.description?.slice(0, 155) ??
          `${service.title} — a FuseLabs IO service engagement built for shipping fast.`
        }
        path={`/services/${service.slug}`}
        image={service.image ?? undefined}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.description ?? undefined,
          provider: {
            "@type": "Organization",
            name: "FuseLabs IO",
            url: "https://fuselabsio.lovable.app/",
          },
        }}
      />
      <Navbar />

      <PageHero
        eyebrow="Service"
        title={service.title}
        description={
          <>
            {service.tagline && <span className="block text-primary">{service.tagline}</span>}
            {service.description}
          </>
        }
      >
        <Magnetic strength={0.2}>
          <Button asChild size="lg">
            <a
              href="#start"
              onClick={() => trackCtaClick("service", service.slug, "hero")}
            >
              Start a project
            </a>
          </Button>
        </Magnetic>
      </PageHero>

      <main className="pb-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          <Button variant="ghost" size="sm" asChild className="mb-8 -ml-2">
            <Link to="/services">
              <ArrowLeft className="mr-1 h-4 w-4" /> All services
            </Link>
          </Button>

          {service.image && (
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              className="mb-12 w-full rounded-2xl border border-border object-cover"
            />
          )}

          <Reveal stagger={80}>
            <div className="space-y-12">
              <ListBlock title="What you get" items={service.highlights} />
              <ListBlock title="Deliverables" items={service.deliverables} />
              <ListBlock title="How we work" items={service.process} />
            </div>
          </Reveal>

          <Reveal>
            <section
              id="start"
              className="mt-16 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
            >
            <h2 className="mb-2 font-display text-2xl font-semibold">
              Start your {service.title.toLowerCase()} project
            </h2>
            <p className="mb-6 text-muted-foreground">
              Share a few details and we'll come back with scope, timeline and next steps.
            </p>
            <LeadForm type="project" serviceSlug={service.slug} submitLabel="Request a proposal" />
            </section>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
