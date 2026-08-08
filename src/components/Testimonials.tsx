
import React, { useRef, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  gradient: string;
  backgroundImage?: string;
  avatar?: string;
}

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<TestimonialProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      let query = supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      // Prefer approved-only once moderation columns exist
      const { data, error } = await query.eq("status", "approved");

      if (error) {
        // Fallback for databases that have not applied the moderation migration yet
        const fallback = await supabase
          .from("testimonials")
          .select("*")
          .order("created_at", { ascending: false });
        if (fallback.error) throw fallback.error;

        const formatted =
          fallback.data?.map((item, index) => ({
            content: item.content,
            author: item.author,
            role: item.role,
            gradient: [
              "from-blue-700 via-indigo-800 to-purple-900",
              "from-indigo-900 via-purple-800 to-orange-500",
              "from-purple-800 via-pink-700 to-red-500",
              "from-orange-600 via-red-500 to-purple-600",
            ][index % 4],
            backgroundImage: item.background_image || "/background-section1.png",
            avatar: item.avatar || undefined,
          })) || [];
        setTestimonials(formatted);
        return;
      }

      const formattedTestimonials =
        data?.map((item, index) => ({
          content: item.content,
          author: item.author,
          role: item.role,
          gradient: [
            "from-blue-700 via-indigo-800 to-purple-900",
            "from-indigo-900 via-purple-800 to-orange-500",
            "from-purple-800 via-pink-700 to-red-500",
            "from-orange-600 via-red-500 to-purple-600",
          ][index % 4],
          backgroundImage: item.background_image || "/background-section1.png",
          avatar: item.avatar || undefined,
        })) || [];

      setTestimonials(formattedTestimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

const TestimonialCard = ({
  content,
  author,
  role,
  backgroundImage = "/background-section1.png",
  avatar
}: TestimonialProps) => {
  return (
    <div className="bg-cover bg-center rounded-lg p-8 h-full flex flex-col justify-between text-white transform transition-transform duration-300 hover:-translate-y-2 relative overflow-hidden" style={{
      backgroundImage: `url('${backgroundImage}')`
    }}>
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10">
        <p className="text-xl mb-8 font-medium leading-relaxed">{`"${content}"`}</p>
        <div className="flex items-center space-x-4">
          {avatar ? (
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
              <img src={avatar} alt={author} className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-white/20 text-lg font-semibold">
              {author?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
          <div>
            <h4 className="text-xl font-semibold">{author}</h4>
            <p className="text-white/80">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
    <section className="py-12 bg-background relative" id="testimonials" ref={sectionRef}>
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-6">
          <div className="inline-flex items-center rounded-xl border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">03</span>
            <span>Client Success</span>
          </div>
        </div>
        
        <h2 className="text-5xl font-display font-bold mb-12 text-left">What clients say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            <div className="col-span-2 text-center py-8">
              <p className="text-muted-foreground">Loading testimonials...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="col-span-2 text-center py-8">
              <p className="text-muted-foreground">No testimonials available yet.</p>
            </div>
          ) : (
            testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index} 
                content={testimonial.content} 
                author={testimonial.author} 
                role={testimonial.role} 
                gradient={testimonial.gradient} 
                backgroundImage={testimonial.backgroundImage}
                avatar={testimonial.avatar}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
