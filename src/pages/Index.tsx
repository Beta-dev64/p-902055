// Style: Molten Systems — asymmetric dark agency narrative with cream interruptions and a singular amber conversion path.
import { useState } from "react";
import { ArrowRight, Code2, Cpu, Database, Globe2, Layers3, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import PartnersScroll from "@/components/PartnersScroll";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";

const services = [
  { index: "01", title: "Startup acceleration", text: "Turn a sharp idea into a focused MVP with the strategy, product design, and engineering needed to learn fast.", icon: Layers3, tone: "service-tall" },
  { index: "02", title: "Product development", text: "Build reliable web and mobile products that feel considered at every layer—from first interaction to backend architecture.", icon: Code2, tone: "service-wide" },
  { index: "03", title: "Growth engineering", text: "Connect product, SEO, funnels, and retention so growth is designed into the system rather than bolted on later.", icon: Globe2, tone: "service-compact" },
  { index: "04", title: "Systems integration", text: "Make payments, messaging, logistics, and internal workflows talk to each other cleanly.", icon: Database, tone: "service-compact" },
  { index: "05", title: "Cloud & DevOps", text: "Ship with confidence through observable, secure infrastructure that can scale with demand.", icon: ShieldCheck, tone: "service-wide" },
  { index: "06", title: "AI solutions", text: "Move past the demo. We design AI systems with useful interfaces, guardrails, and measurable outcomes.", icon: Cpu, tone: "service-tall" },
];

const process = [
  ["01", "Strategy first", "Align on the business problem, the sharpest opportunity, and the evidence that will define a successful release."],
  ["02", "Plan & design", "Translate the opportunity into a product system that is easy to understand, build, and iterate."],
  ["03", "Develop & test", "Build in visible increments with quality checks, clear decisions, and a close eye on the user experience."],
  ["04", "Launch & grow", "Deploy, observe, learn, and keep improving the product after it meets the real world."],
];

const Index = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", companyWebsite: "", services: "", budget: "", projectDetails: "" });
  const [submitting, setSubmitting] = useState(false);
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("project_inquiries").insert([{ first_name: form.firstName.trim(), last_name: form.lastName.trim(), email: form.email.trim(), company_website: form.companyWebsite.trim() || null, services: form.services || null, budget: form.budget || null, project_details: form.projectDetails.trim() || null, status: "new", source: "website" }]);
      if (error) throw error;
      await supabase.functions.invoke("send-contact-email", { body: form });
      toast.success("Your project brief is on its way. We’ll be in touch soon.");
      setForm({ firstName: "", lastName: "", email: "", companyWebsite: "", services: "", budget: "", projectDetails: "" });
    } catch {
      toast.error("We couldn’t send that just yet. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="agency-page min-h-screen bg-[#100e0c] text-[#F7F1E8]">
      <Seo title="FuseLabs — Build the next stage" description="FuseLabs is the technical partner for ambitious teams building, shipping, and growing reliable digital products." path="/" jsonLd={[{ "@context": "https://schema.org", "@type": "Organization", name: "FuseLabs", url: "https://fuselabsio.lovable.app/", description: "Technical product development and growth partner for ambitious teams." }, { "@context": "https://schema.org", "@type": "WebSite", name: "FuseLabs", url: "https://fuselabsio.lovable.app/" }]} />
      <Navbar />
      <main>
        <Hero />
        <section className="border-y border-[#3A2A1E] bg-[#17130F]" aria-label="FuseLabs proof points"><div className="mx-auto grid max-w-[1440px] px-5 sm:grid-cols-3 sm:px-8 lg:px-12">{[["60 days", "to a focused MVP"], ["Pay for results", "no theatre, no shortcuts"], ["One partner", "from strategy to scale"]].map(([value, label], index) => <div key={value} className="flex items-center gap-4 border-b border-[#3A2A1E] py-6 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"><span className="font-display text-2xl tracking-[-0.06em] text-[#F7F1E8]">{value}</span><span className="max-w-[10rem] text-xs uppercase leading-relaxed tracking-[0.12em] text-[#8D8175]">{label}</span><span className="ml-auto font-mono text-[0.62rem] text-[#DE8321]">0{index + 1}</span></div>)}</div></section>
        <PartnersScroll />
        <section id="services" className="bg-[#F3EEE6] py-24 text-[#171311] sm:py-32"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]"><div className="lg:sticky lg:top-28 lg:self-start"><p className="eyebrow text-[#B1691B]">The work, in full</p><h2 className="display-title mt-5 max-w-md text-[#171311]">Hard problems need more than hands.</h2><p className="mt-7 max-w-sm text-base leading-relaxed text-[#655D54]">We combine product thinking, engineering discipline, and growth context to help ambitious teams move with less drag.</p></div><div className="service-mosaic">{services.map((service) => { const Icon = service.icon; return <article key={service.title} className={`service-card ${service.tone}`}><div className="flex items-start justify-between"><span className="font-mono text-xs text-[#B1691B]">{service.index}</span><Icon size={22} strokeWidth={1.5} className="text-[#B1691B]" /></div><div className="mt-auto"><h3 className="font-display text-3xl tracking-[-0.06em]">{service.title}</h3><p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6D645B]">{service.text}</p></div></article>; })}</div></div></div></section>
        <section id="process" className="bg-[#100e0c] py-24 sm:py-32"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="flex flex-col justify-between gap-8 border-b border-[#3A2A1E] pb-10 lg:flex-row lg:items-end"><div><p className="eyebrow text-[#DE8321]">A system for momentum</p><h2 className="display-title mt-5 max-w-xl">Fewer handoffs.<br /><span className="text-[#9E9285]">More forward motion.</span></h2></div><p className="max-w-sm text-sm leading-relaxed text-[#9E9285]">A clear path from first conversation to a product that can hold its own in the real world.</p></div><div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-4">{process.map(([number, title, text]) => <article key={number} className="process-step"><span className="font-mono text-xs text-[#DE8321]">{number}</span><h3 className="mt-12 font-display text-2xl tracking-[-0.05em] text-[#F7F1E8]">{title}</h3><p className="mt-4 text-sm leading-relaxed text-[#9E9285]">{text}</p></article>)}</div></div></section>
        <Portfolio />
        <section className="academy-teaser overflow-hidden bg-[#D8E0E9] py-24 text-[#17202C] sm:py-32"><div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:px-12"><div><p className="eyebrow text-[#375F8B]">For the next generation</p><h2 className="display-title mt-5 max-w-2xl">Learn the craft.<br /><span className="text-[#375F8B]">Ship your own.</span></h2></div><div><p className="max-w-md text-base leading-relaxed text-[#445365]">The FuseLabs Academy is a focused, project-based path into frontend, backend, and AI/ML development—with the work to prove it.</p><Link to="/academy" className="group mt-7 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em] text-[#17202C]">Explore the academy <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></Link></div></div></section>
        <section id="contact" className="bg-[#17130F] py-24 sm:py-32"><div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-12"><div><p className="eyebrow text-[#DE8321]">Start a project</p><h2 className="display-title mt-5 max-w-xl">Bring the hard part.<br /><span className="text-[#9E9285]">We’ll make it shippable.</span></h2><p className="mt-7 max-w-md text-base leading-relaxed text-[#9E9285]">Tell us what you’re building, where it is stuck, and what a useful next stage looks like.</p></div><form onSubmit={submit} className="grid gap-4 sm:grid-cols-2"><input required aria-label="First name" placeholder="First name *" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="field" /><input required aria-label="Last name" placeholder="Last name *" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="field" /><input required type="email" aria-label="Work email" placeholder="Work email *" value={form.email} onChange={(e) => update("email", e.target.value)} className="field" /><input aria-label="Company website" placeholder="Company website" value={form.companyWebsite} onChange={(e) => update("companyWebsite", e.target.value)} className="field" /><select aria-label="Service needed" value={form.services} onChange={(e) => update("services", e.target.value)} className="field"><option value="">What do you need?</option><option>Startup acceleration</option><option>Product development</option><option>Growth engineering</option><option>Systems integration</option><option>Cloud & DevOps</option><option>AI solutions</option></select><select aria-label="Budget range" value={form.budget} onChange={(e) => update("budget", e.target.value)} className="field"><option value="">Budget range</option><option>₦1m — ₦5m</option><option>₦5m — ₦15m</option><option>₦15m+</option><option>Let’s scope it together</option></select><textarea required aria-label="Project details" placeholder="What are you building? *" rows={5} value={form.projectDetails} onChange={(e) => update("projectDetails", e.target.value)} className="field sm:col-span-2" /><button disabled={submitting} className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#DE8321] px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-[#17110b] transition hover:-translate-y-1 hover:bg-[#F2CDA6] disabled:cursor-wait disabled:opacity-60 sm:col-span-2">{submitting ? "Sending brief…" : "Send project brief"}<ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></button></form></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
