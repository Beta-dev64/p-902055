
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Linkedin, Twitter, ExternalLink } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  portfolio?: string;
}

const Team = () => {
  // Sample team members - in production this would come from admin
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Lead Developer",
      image: "/lovable-uploads/22d31f51-c174-40a7-bd95-00e4ad00eaf3.png",
      linkedin: "https://linkedin.com/in/sarah-johnson",
      twitter: "https://twitter.com/sarah_codes",
      portfolio: "https://sarahjohnson.dev"
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "UI/UX Designer",
      image: "/lovable-uploads/af412c03-21e4-4856-82ff-d1a975dc84a9.png",
      linkedin: "https://linkedin.com/in/michael-chen",
      twitter: "https://twitter.com/mike_designs",
      portfolio: "https://michaelchen.design"
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Product Manager",
      image: "/lovable-uploads/5663820f-6c97-4492-9210-9eaa1a8dc415.png",
      linkedin: "https://linkedin.com/in/emily-rodriguez",
      twitter: "https://twitter.com/emily_pm",
      portfolio: "https://emilyrodriguez.com"
    },
    {
      id: "4",
      name: "David Kim",
      role: "DevOps Engineer",
      image: "/lovable-uploads/c3d5522b-6886-4b75-8ffc-d020016bb9c2.png",
      linkedin: "https://linkedin.com/in/david-kim",
      twitter: "https://twitter.com/david_devops",
      portfolio: "https://davidkim.tech"
    },
    {
      id: "5",
      name: "Lisa Thompson",
      role: "Frontend Developer",
      image: "/lovable-uploads/dc13e94f-beeb-4671-8a22-0968498cdb4c.png",
      linkedin: "https://linkedin.com/in/lisa-thompson",
      twitter: "https://twitter.com/lisa_codes",
      portfolio: "https://lisathompson.dev"
    }
  ];

  return (
    <section className="w-full py-12 md:py-16 bg-gray-50" id="team">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Talented professionals dedicated to bringing your vision to life
          </p>
        </div>

        {/* Team Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {teamMembers.map((member) => (
                <CarouselItem key={member.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Social Icons Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-4">
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-white rounded-full text-gray-900 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                            >
                              <Linkedin size={20} />
                            </a>
                          )}
                          {member.twitter && (
                            <a
                              href={member.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-white rounded-full text-gray-900 hover:bg-blue-400 hover:text-white transition-colors duration-200"
                            >
                              <Twitter size={20} />
                            </a>
                          )}
                          {member.portfolio && (
                            <a
                              href={member.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-white rounded-full text-gray-900 hover:bg-pulse-500 hover:text-white transition-colors duration-200"
                            >
                              <ExternalLink size={20} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pulse-600 transition-colors duration-200">
                        {member.name}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Team;
