
import React, { useState } from "react";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DetailsSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyWebsite: "",
    services: "",
    budget: "",
    projectDetails: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Demo form submission
    toast.success("Request submitted successfully!");

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      companyWebsite: "",
      services: "",
      budget: "",
      projectDetails: ""
    });
  };

  const processSteps = [
    {
      id: "step1",
      number: "01",
      title: "Discovery & Strategy",
      description: "We begin by understanding your vision, goals, and requirements through comprehensive consultation. Our team analyzes your business needs, target audience, and technical requirements to create a strategic roadmap for your project."
    },
    {
      id: "step2", 
      number: "02",
      title: "Planning & Design",
      description: "We translate your requirements into detailed project specifications, wireframes, and designs. Our planning phase includes technical architecture, user experience design, and project timeline development to ensure smooth execution."
    },
    {
      id: "step3",
      number: "03", 
      title: "Development & Testing",
      description: "Our expert developers bring your vision to life using cutting-edge technologies and best practices. We follow agile development methodologies with continuous testing, code reviews, and regular progress updates throughout the build process."
    },
    {
      id: "step4",
      number: "04",
      title: "Launch & Growth",
      description: "We ensure a seamless launch with comprehensive deployment, monitoring, and support. Our ongoing partnership includes maintenance, updates, performance optimization, and scaling solutions as your business grows."
    }
  ];

  return (
    <section id="details" className="w-full bg-white py-0">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {/* Left Card - The Details with Process Steps */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant">
            {/* Card Header with background image */}
            <div className="relative h-48 sm:h-64 p-6 sm:p-8 flex items-end" style={{
              backgroundImage: "url('/background-section3.png')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}>
              <h2 className="text-2xl sm:text-3xl font-display text-white font-bold">
                Our Process
              </h2>
            </div>
            
            {/* Card Content with Process Steps */}
            <div className="bg-white p-4 sm:p-8" style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #ECECEC"
            }}>
              <h3 className="text-lg sm:text-xl font-display mb-6 sm:mb-8">
                Four steps to transform your vision into reality
              </h3>

              <Accordion type="single" collapsible className="w-full">
                {processSteps.map((step) => (
                  <AccordionItem key={step.id} value={step.id} className="border-b border-gray-200">
                    <AccordionTrigger className="flex items-center gap-4 py-4 hover:no-underline">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-8 h-8 rounded-full bg-pulse-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          {step.number}
                        </div>
                        <span className="font-semibold text-left">{step.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pl-12">
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Right Card - Enhanced Contact Form */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant">
            {/* Card Header with background image */}
            <div className="relative h-48 sm:h-64 p-6 sm:p-8 flex flex-col items-start" style={{
              backgroundImage: "url('/background-section1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}>
              <div className="inline-block px-4 sm:px-6 py-2 border border-white text-white rounded-full text-xs mb-4">
                Start Your Project
              </div>
              <h2 className="text-2xl sm:text-3xl font-display text-white font-bold mt-auto">
                Let's Build Together
              </h2>
            </div>
            
            {/* Card Content - Enhanced Form */}
            <div className="bg-white p-4 sm:p-8" style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #ECECEC"
            }}>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleChange} 
                      placeholder="First name *" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent" 
                      required 
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleChange} 
                      placeholder="Last name *" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent" 
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Email address *" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent" 
                    required 
                  />
                </div>
                
                <div>
                  <input 
                    type="url" 
                    name="companyWebsite" 
                    value={formData.companyWebsite} 
                    onChange={handleChange} 
                    placeholder="Company website (optional)" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent" 
                  />
                </div>

                <div>
                  <Select onValueChange={(value) => handleSelectChange('services', value)}>
                    <SelectTrigger className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent h-auto">
                      <SelectValue placeholder="Services you're interested in" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg">
                      <SelectItem value="team-as-service">Team as a Service</SelectItem>
                      <SelectItem value="mvp-development">MVP Development</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="upscaling">Upscaling My Organization</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select onValueChange={(value) => handleSelectChange('budget', value)}>
                    <SelectTrigger className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent h-auto">
                      <SelectValue placeholder="Budget range" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg">
                      <SelectItem value="500-2000">$500 - $2,000</SelectItem>
                      <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                      <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10000-30000">$10,000 - $30,000</SelectItem>
                      <SelectItem value="30000+">$30,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <textarea 
                    name="projectDetails" 
                    value={formData.projectDetails} 
                    onChange={handleChange} 
                    placeholder="Tell us more about what you're looking to achieve..." 
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent resize-none" 
                  />
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="w-full px-6 py-3 bg-pulse-500 hover:bg-pulse-600 text-white font-medium rounded-full transition-colors duration-300"
                  >
                    Start My Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
