import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface QuoteData {
  content: string;
  author: string;
  role: string;
}

const FALLBACK_QUOTE: QuoteData = {
  content:
    "I came in knowing barely any JavaScript. Twelve weeks later I shipped a real feature to production before I'd even graduated.",
  author: "A recent graduate",
  role: "Frontend track, Cohort 04",
};

const AcademyQuote = () => {
  const [quote, setQuote] = useState<QuoteData>(FALLBACK_QUOTE);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("content, author, role")
          .eq("status", "approved")
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) throw error;
        if (data && data.length > 0) {
          setQuote({
            content: data[0].content,
            author: data[0].author,
            role: data[0].role,
          });
        }
      } catch (error) {
        console.error("Error fetching academy quote:", error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
          In their words
        </span>
        <p className="mt-6 font-academy text-[clamp(1.6rem,3.4vw,2.5rem)] font-medium italic leading-[1.25] text-foreground">
          &ldquo;{quote.content}&rdquo;
        </p>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-foreground/60">
          {quote.author}
          {quote.role ? ` — ${quote.role}` : ""}
        </p>
      </div>
    </section>
  );
};

export default AcademyQuote;
