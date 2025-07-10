
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
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const formattedTestimonials = data?.map((item, index) => ({
        content: item.content,
        author: item.author,
        role: item.role,
        gradient: ["from-blue-700 via-indigo-800 to-purple-900", "from-indigo-900 via-purple-800 to-orange-500", "from-purple-800 via-pink-700 to-red-500", "from-orange-600 via-red-500 to-purple-600"][index % 4],
        backgroundImage: item.background_image || "/background-section1.png",
        avatar: item.avatar
      })) || [];
      
      setTestimonials(formattedTestimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
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
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={avatar}
              alt={author}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-xl">{author}</h4>
            <p className="text-white/80">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
    <section className="py-12 bg-white relative" id="testimonials" ref={sectionRef}>
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-6">
          <div className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-pulse-100 text-pulse-600 border border-pulse-200">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">03</span>
            <span>Client Success</span>
          </div>
        </div>
        
        <h2 className="text-5xl font-display font-bold mb-12 text-left">What clients say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            <div className="col-span-2 text-center py-8">
              <p className="text-gray-600">Loading testimonials...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="col-span-2 text-center py-8">
              <p className="text-gray-600">No testimonials available yet.</p>
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
