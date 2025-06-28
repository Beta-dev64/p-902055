
import React, { useRef } from "react";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  gradient: string;
  backgroundImage?: string;
  avatar?: string;
}

const testimonials: TestimonialProps[] = [{
  content: "The team delivered our e-commerce platform ahead of schedule. The custom features they built have increased our conversion rate by 45% and the scalable architecture handles our growing traffic effortlessly.",
  author: "Sarah Chen",
  role: "CEO, TechFlow Commerce",
  gradient: "from-blue-700 via-indigo-800 to-purple-900",
  backgroundImage: "/background-section1.png",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
}, {
  content: "Their full-stack development expertise transformed our legacy system into a modern, cloud-native application. The performance improvements and user experience are remarkable.",
  author: "Michael Rodriguez",
  role: "CTO, DataStream Solutions",
  gradient: "from-indigo-900 via-purple-800 to-orange-500",
  backgroundImage: "/background-section2.png",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
}, {
  content: "From concept to deployment, they guided us through every step. The custom CRM they built has streamlined our operations and improved our customer relationships significantly.",
  author: "Dr. Amara Patel",
  role: "Founder, MedTech Innovations",
  gradient: "from-purple-800 via-pink-700 to-red-500",
  backgroundImage: "/background-section3.png",
  avatar: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=400&fit=crop&crop=face"
}, {
  content: "Working with this agency was a game-changer for our startup. They built a robust MVP that helped us secure Series A funding, and their ongoing support has been invaluable.",
  author: "Jason Lee",
  role: "Founder, NextGen Analytics",
  gradient: "from-orange-600 via-red-500 to-purple-600",
  backgroundImage: "/background-section1.png",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
}];

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

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-12 bg-white relative" id="testimonials" ref={sectionRef}>
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-6">
          <div className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-pulse-100 text-pulse-600 border border-pulse-200">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">04</span>
            <span>Client Success</span>
          </div>
        </div>
        
        <h2 className="text-5xl font-display font-bold mb-12 text-left">What clients say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              content={testimonial.content} 
              author={testimonial.author} 
              role={testimonial.role} 
              gradient={testimonial.gradient} 
              backgroundImage={testimonial.backgroundImage}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
