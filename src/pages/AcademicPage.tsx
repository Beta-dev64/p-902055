// Style: Editorial Learning House — warm paper, ink, cobalt notes, and a human learning story distinct from the agency.
import { useState } from "react";
import { ArrowRight, Check, Code2, Database, BrainCircuit, Play, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import AcademyFooter from "@/components/AcademyFooter";
import Seo from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";
import frontendDev from "@/assets/frontend-dev.jpg";
import backendDev from "@/assets/backend-dev.jpg";
import aiMlDev from "@/assets/ai-ml-dev.jpg";

const videoSrc = "/academy-hero-student-success.mp4";

const tracks = [
  { title: "Frontend Development", price: "₦300,000", image: frontendDev, icon: Code2, accent: "#416C9A", features: ["HTML5, CSS3, JavaScript ES6+", "React.js & Next.js", "Responsive design & mobile-first", "Version control with Git", "API integration", "Deployment & hosting"] },
  { title: "Backend Development", price: "₦300,000", image: backendDev, icon: Database, accent: "#9C5D43", features: ["Node.js & Express.js", "SQL & NoSQL database design", "RESTful APIs & GraphQL", "Authentication & security", "Cloud services", "Testing & documentation"] },
  { title: "AI/ML Development", price: "₦450,000", image: aiMlDev, icon: BrainCircuit, accent: "#5E638F", features: ["Python programming", "Machine learning algorithms", "Deep learning & neural networks", "Data analysis & visualization", "NLP & computer vision", "Model deployment"] },
];

const AcademicPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", { body: { type: "academic_inquiry", ...form, subject: `Academic Course Inquiry: ${form.course}` } });
      if (error) throw error;
      toast.success("Application received. We’ll be in touch within 24 hours.");
      setForm({ name: "", email: "", phone: "", course: "", message: "" });
    } catch {
      toast.error("We couldn’t submit that application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="academy-page min-h-screen bg-[#F5F1EA] text-[#1B2430]">
      <Seo title="FuseLabs Academy — Learn to ship" description="Project-based online programs in frontend, backend, and AI/ML development from FuseLabs Academy." path="/academy" jsonLd={tracks.map((track) => ({ "@context": "https://schema.org", "@type": "Course", name: track.title, description: `${track.title} — a three-month project-based program from FuseLabs Academy.`, timeRequired: "P3M", provider: { "@type": "Organization", name: "FuseLabs" } }))} />
      <Navbar />
      <main>
        <section className="relative isolate min-h-[min(780px,100svh)] overflow-hidden bg-[#14202C] pt-32 text-[#F8F4EE]"><video className="absolute inset-0 -z-20 h-full w-full object-cover opacity-55" autoPlay muted loop playsInline poster="/hero-image.jpg"><source src={videoSrc} type="video/mp4" /></video><div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,24,34,0.94)_8%,rgba(15,24,34,0.62)_52%,rgba(15,24,34,0.38)_100%)]" /><div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#14202C_2%,transparent_42%)]" /><div className="mx-auto flex min-h-[min(650px,calc(100svh-8rem))] max-w-[1440px] flex-col justify-end px-5 pb-16 sm:px-8 lg:px-12 lg:pb-20"><div className="max-w-3xl"><span className="eyebrow text-[#AFC8E3]">FuseLabs Academy / 2026</span><h1 className="mt-6 font-display text-[clamp(4rem,9vw,9rem)] font-medium leading-[0.84] tracking-[-0.09em]">Learn the work<br /><span className="text-[#AFC8E3]">that ships.</span></h1><p className="mt-8 max-w-xl text-lg leading-relaxed text-[#D3DCE5] sm:text-xl">Three months. Real projects. A sharper way into frontend, backend, and AI/ML development.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#tracks" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#F5F1EA] px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-[#1B2430] transition hover:-translate-y-1 hover:bg-[#AFC8E3]">Explore tracks <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></a><a href="#apply" className="inline-flex items-center justify-center gap-3 rounded-full border border-[#F5F1EA]/40 px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-[#F5F1EA] transition hover:border-[#AFC8E3] hover:text-[#AFC8E3]">Join the next cohort</a></div></div><div className="mt-14 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-[#D3DCE5]"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F5F1EA]/30"><Play size={13} fill="currentColor" /></span>See what progress looks like</div></div></section>

        <section className="border-b border-[#D8D0C5] bg-[#F5F1EA] py-10"><div className="mx-auto grid max-w-[1440px] gap-6 px-5 sm:grid-cols-3 sm:px-8 lg:px-12"><div><span className="font-mono text-xs text-[#416C9A]">01</span><p className="mt-3 font-display text-2xl tracking-[-0.05em]">100% online</p></div><div><span className="font-mono text-xs text-[#416C9A]">02</span><p className="mt-3 font-display text-2xl tracking-[-0.05em]">Project-based</p></div><div><span className="font-mono text-xs text-[#416C9A]">03</span><p className="mt-3 font-display text-2xl tracking-[-0.05em]">Certificate included</p></div></div></section>

        <section id="tracks" className="bg-[#F5F1EA] py-24 sm:py-32"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]"><div><p className="eyebrow text-[#416C9A]">Choose your track</p><h2 className="display-title mt-5 max-w-md">Your entry point into the work.</h2><p className="mt-6 max-w-sm leading-relaxed text-[#5F6872]">Each track is built around the kind of repetition, feedback, and finished work that makes new skills stick.</p></div><div className="grid gap-5">{tracks.map((track, index) => { const Icon = track.icon; return <article key={track.title} className="group grid overflow-hidden border border-[#D8D0C5] bg-[#FBF8F3] transition hover:-translate-y-1 hover:border-[#416C9A]/50 md:grid-cols-[0.85fr_1.15fr]"><div className="relative min-h-56 overflow-hidden"><img src={track.image} alt="" className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" /><div className="absolute inset-0 bg-[#1B2430]/20" /><span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F1EA]/90" style={{ color: track.accent }}><Icon size={18} /></span></div><div className="flex flex-col justify-between p-6 sm:p-8"><div><div className="flex items-center justify-between gap-4"><span className="font-mono text-xs text-[#416C9A]">0{index + 1} / 3 months</span><span className="font-display text-xl tracking-[-0.04em]">{track.price}</span></div><h3 className="mt-8 font-display text-3xl tracking-[-0.06em]">{track.title}</h3><ul className="mt-6 grid gap-2 sm:grid-cols-2">{track.features.map((feature) => <li key={feature} className="flex items-start gap-2 text-sm text-[#5F6872]"><Check size={15} className="mt-0.5 shrink-0 text-[#416C9A]" />{feature}</li>)}</ul></div><a href="#apply" onClick={() => setForm((current) => ({ ...current, course: track.title }))} className="group mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em]" style={{ color: track.accent }}>Apply for this track <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></a></div></article>; })}</div></div></div></section>

        <section className="bg-[#D8E0E9] py-24 sm:py-32"><div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12"><div><p className="eyebrow text-[#416C9A]">What changes in 12 weeks</p><h2 className="display-title mt-5 max-w-2xl">You leave with more than a certificate.</h2></div><div className="grid gap-5"><div className="border-t border-[#7D9ABB] pt-5"><span className="font-mono text-xs text-[#416C9A]">01</span><h3 className="mt-4 font-display text-2xl tracking-[-0.05em]">A portfolio you can explain</h3><p className="mt-3 text-sm leading-relaxed text-[#445365]">Build real projects and learn to talk through the decisions behind them.</p></div><div className="border-t border-[#7D9ABB] pt-5"><span className="font-mono text-xs text-[#416C9A]">02</span><h3 className="mt-4 font-display text-2xl tracking-[-0.05em]">Feedback that compounds</h3><p className="mt-3 text-sm leading-relaxed text-[#445365]">Learn with industry instructors and a structure that makes iteration normal.</p></div><div className="border-t border-[#7D9ABB] pt-5"><span className="font-mono text-xs text-[#416C9A]">03</span><h3 className="mt-4 font-display text-2xl tracking-[-0.05em]">A clearer next move</h3><p className="mt-3 text-sm leading-relaxed text-[#445365]">Leave with a stronger sense of what to build next and why it matters.</p></div></div></div></section>

        <section id="apply" className="bg-[#1B2430] py-24 text-[#F8F4EE] sm:py-32"><div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12"><div><p className="eyebrow text-[#AFC8E3]">Join the next cohort</p><h2 className="display-title mt-5 max-w-lg">Make your next move a real one.</h2><p className="mt-7 max-w-md leading-relaxed text-[#D3DCE5]">Tell us where you’re starting from and which track you want to explore. We’ll help you choose a useful path.</p><div className="mt-8 flex items-center gap-3 text-sm text-[#D3DCE5]"><Users size={17} className="text-[#AFC8E3]" /> Small enough to be seen. Serious enough to ship.</div></div><form onSubmit={submit} className="grid gap-4 sm:grid-cols-2"><input required aria-label="Full name" placeholder="Full name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="academy-field" /><input required type="email" aria-label="Email address" placeholder="Email address *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="academy-field" /><input required aria-label="Phone number" placeholder="Phone number *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="academy-field" /><select required aria-label="Preferred track" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className="academy-field"><option value="">Preferred track *</option>{tracks.map((track) => <option key={track.title}>{track.title}</option>)}</select><textarea aria-label="Your goals" placeholder="What do you want to build?" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="academy-field sm:col-span-2" /><button disabled={submitting} className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#F5F1EA] px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-[#1B2430] transition hover:-translate-y-1 hover:bg-[#AFC8E3] disabled:opacity-60 sm:col-span-2">{submitting ? "Sending application…" : "Apply for a track"}<ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></button></form></div></section>
      </main>
      <AcademyFooter />
    </div>
  );
};

export default AcademicPage;
