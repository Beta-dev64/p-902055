import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface QuoteData {
  content: string;
  author: string;
  role: string;
}

const AcademyQuote = () => {
  const [quotes, setQuotes] = useState<QuoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchQuote = async () => {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("content, author, role")
          .eq("status", "approved")
          .or("role.ilike.%student%,role.ilike.%graduate%,role.ilike.%cohort%,role.ilike.%learner%,role.ilike.%academy%")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (active) setQuotes(data || []);
      } catch (error) {
        console.error("Error fetching academy quote:", error);
        if (active) setFailed(true);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchQuote();
    return () => { active = false; };
  }, []);

  return (
    <section id="student-stories" className="scroll-mt-24 bg-muted py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
          Student testimonials
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">In our students’ words.</h2>
        {loading ? <p role="status" className="mt-6 text-muted-foreground">Loading student stories…</p> : failed ? <p className="mt-6 text-muted-foreground">Student stories are temporarily unavailable.</p> : quotes.length === 0 ? <p className="mt-6 text-muted-foreground">Student stories will be shared here when available.</p> : (
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {quotes.map((quote, index) => (
              <figure key={`${quote.author}-${index}`} className="border-t border-border pt-6">
                <blockquote className="text-xl leading-relaxed">&ldquo;{quote.content}&rdquo;</blockquote>
                <figcaption className="mt-6 text-sm"><span className="font-semibold">{quote.author}</span><span className="mt-1 block text-muted-foreground">{quote.role}</span></figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AcademyQuote;
