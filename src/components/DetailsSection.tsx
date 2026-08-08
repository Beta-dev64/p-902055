import React, { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  companyWebsite: "",
  services: "",
  budget: "",
  projectDetails: "",
};

const DetailsSection = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Persist to backend first so the lead is never lost if email fails
      const { error: dbError } = await supabase.from("project_inquiries").insert([
        {
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim(),
          company_website: formData.companyWebsite.trim() || null,
          services: formData.services || null,
          budget: formData.budget || null,
          project_details: formData.projectDetails.trim() || null,
          status: "new",
          source: "website",
        },
      ]);

      if (dbError) throw dbError;

      // Best-effort email notification (does not block success)
      const { error: emailError } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });
      if (emailError) {
        console.warn("Inquiry saved, but email notification failed:", emailError);
      }

      setFormData(emptyForm);
      setIsSuccess(true);
      toast.success("Request submitted successfully! We'll get back to you soon.");

      window.setTimeout(() => setIsSuccess(false), 6000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const processSteps = [
    {
      id: "step1",
      number: "01",
      title: "Strategy First",
      description:
        "We begin by understanding your vision, goals, and requirements through comprehensive consultation. Our team analyzes your business needs, target audience, and technical requirements to create a strategic roadmap for your project.",
    },
    {
      id: "step2",
      number: "02",
      title: "Planning & Design",
      description:
        "We translate your requirements into detailed project specifications, wireframes, and designs. Our planning phase includes technical architecture, user experience design, and project timeline development to ensure smooth execution.",
    },
    {
      id: "step3",
      number: "03",
      title: "Development & Testing",
      description:
        "Our expert developers bring your vision to life using cutting-edge technologies and best practices. We follow agile development methodologies with continuous testing, code reviews, and regular progress updates throughout the build process.",
    },
    {
      id: "step4",
      number: "04",
      title: "Launch & Growth",
      description:
        "We ensure a seamless launch with comprehensive deployment, monitoring, and support. Our ongoing partnership includes maintenance, updates, performance optimization, and scaling solutions as your business grows.",
    },
  ];

  return (
    <section id="details" className="w-full bg-background py-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4 sm:mb-16">
          <div className="pulse-chip">
            <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-pulse-500 text-white">
              04
            </span>
            <span>Approach</span>
          </div>
          <div className="h-[1px] flex-1 bg-border" />
        </div>

        <div className="mb-8 max-w-5xl pl-4 sm:mb-12 sm:pl-8">
          <h2 className="font-display text-2xl leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            <span className="block bg-[url('/text-mask-image.jpg')] bg-cover bg-center bg-clip-text text-transparent">
              We work alongside your team. By automating complex processes, streamlining workflows,
              and building scalable solutions, we help you focus on what matters most: growing your
              business and serving your customers.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border shadow-elegant sm:rounded-3xl">
            <div
              className="relative flex h-48 items-end p-6 sm:h-64 sm:p-8"
              style={{
                backgroundImage: "url('/background-section3.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Our Process</h2>
            </div>

            <div className="bg-card p-4 sm:p-8">
              <h3 className="mb-6 font-display text-lg sm:mb-8 sm:text-xl">
                Four steps to transform your vision into reality
              </h3>

              <Accordion type="single" collapsible className="w-full">
                {processSteps.map((step) => (
                  <AccordionItem key={step.id} value={step.id} className="border-b border-border">
                    <AccordionTrigger className="flex items-center gap-4 py-4 hover:no-underline">
                      <div className="flex flex-1 items-center gap-4">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pulse-500 text-sm font-semibold text-white">
                          {step.number}
                        </div>
                        <span className="text-left font-semibold">{step.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pl-12">
                      <p className="leading-relaxed text-muted-foreground">{step.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border shadow-elegant sm:rounded-3xl">
            <div
              className="relative flex h-48 flex-col items-start p-6 sm:h-64 sm:p-8"
              style={{
                backgroundImage: "url('/background-section1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="mb-4 inline-block rounded-full border border-white px-4 py-2 text-xs text-white sm:px-6">
                Start Your Project
              </div>
              <h2 className="mt-auto font-display text-2xl font-bold text-white sm:text-3xl">
                Let's Build Together
              </h2>
            </div>

            <div className="relative min-h-[28rem] bg-card p-4 sm:p-8">
              {isSuccess ? (
                <div
                  className="flex h-full min-h-[24rem] flex-col items-center justify-center px-4 text-center animate-in fade-in zoom-in-95 duration-500"
                  role="status"
                  aria-live="polite"
                >
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary animate-in zoom-in duration-700">
                    <CheckCircle2 className="h-12 w-12" strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-semibold text-foreground">
                    Request received
                  </h3>
                  <p className="max-w-sm text-muted-foreground">
                    Thanks for reaching out. Your project request is in — we'll review it and get
                    back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="btn-motion mt-8 rounded-full border border-border px-6 py-2 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name *"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pulse-500"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name *"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pulse-500"
                      required
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address *"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pulse-500"
                    required
                  />

                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    placeholder="Company website (optional)"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pulse-500"
                  />

                  <Select
                    value={formData.services || undefined}
                    onValueChange={(value) => handleSelectChange("services", value)}
                  >
                    <SelectTrigger className="h-auto w-full rounded-xl border border-border bg-background px-4 py-3">
                      <SelectValue placeholder="Services you're interested in" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border border-border bg-background shadow-lg">
                      <SelectItem value="team-as-service">Team as a Service</SelectItem>
                      <SelectItem value="mvp-development">MVP Development</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="upscaling">Upscaling My Organization</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={formData.budget || undefined}
                    onValueChange={(value) => handleSelectChange("budget", value)}
                  >
                    <SelectTrigger className="h-auto w-full rounded-xl border border-border bg-background px-4 py-3">
                      <SelectValue placeholder="Budget range" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border border-border bg-background shadow-lg">
                      <SelectItem value="500-2000">$500 - $2,000</SelectItem>
                      <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                      <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10000-30000">$10,000 - $30,000</SelectItem>
                      <SelectItem value="30000+">$30,000+</SelectItem>
                    </SelectContent>
                  </Select>

                  <textarea
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    placeholder="Tell us more about what you're looking to achieve..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pulse-500"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-motion w-full rounded-full bg-pulse-500 px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-pulse-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Start My Project"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
