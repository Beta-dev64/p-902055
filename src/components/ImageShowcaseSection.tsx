
import React from "react";

const ImageShowcaseSection = () => {
  const services = [
    {
      title: "Custom Software Development",
      description: "Tailored solutions built from the ground up to meet your specific business requirements and scale with your growth.",
      image: "/lovable-uploads/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png"
    },
    {
      title: "Cloud Architecture & DevOps",
      description: "Modern cloud-native solutions with automated CI/CD pipelines that ensure scalability, reliability, and performance.",
      image: "/lovable-uploads/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png"
    },
    {
      title: "AI & Machine Learning",
      description: "Intelligent solutions that leverage machine learning and AI to automate processes and provide actionable insights.",
      image: "/lovable-uploads/5663820f-6c97-4492-9210-9eaa1a8dc415.png"
    }
  ];

  return (
    <section className="w-full pt-0 pb-8 sm:pb-12 bg-white" id="showcase">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-gray-900 mb-3 sm:mb-4">
            Modern Solutions for Tomorrow
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Our development approach combines cutting-edge technology with proven methodologies 
            to deliver software solutions that scale with your business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll">
          {services.map((service, index) => (
            <div key={index} className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant hover:shadow-elegant-hover transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="bg-white p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-display font-semibold mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageShowcaseSection;
