import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Check,
  Clock,
  Users,
  Code,
  Brain,
  Star,
  ArrowRight,
  Award,
  Target,
  Rocket,
  Zap,
  GraduationCap,
  Sparkles,
  Server,
  Briefcase,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import frontendDev from "@/assets/frontend-dev.jpg";
import backendDev from "@/assets/backend-dev.jpg";
import aiMlDev from "@/assets/ai-ml-dev.jpg";
import academicHeroPoster from "@/assets/academic-hero.jpg";

const academyVideoSrc = "/academy-hero-student-success.mp4";

const AcademicPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: ""
  });

  const courses = [
    {
      title: "Frontend Development",
      price: "₦300,000",
      duration: "3 Months",
      icon: Code,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      image: frontendDev,
      features: [
        "HTML5, CSS3, JavaScript ES6+",
        "React.js & Next.js",
        "Responsive Design & Mobile-First",
        "Version Control with Git",
        "API Integration",
        "Deployment & Hosting",
        "Portfolio Projects",
        "Industry Best Practices"
      ]
    },
    {
      title: "Backend Development",
      price: "₦300,000",
      duration: "3 Months",
      icon: Server,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/10",
      image: backendDev,
      features: [
        "Node.js & Express.js",
        "Database Design (SQL & NoSQL)",
        "RESTful APIs & GraphQL",
        "Authentication & Security",
        "Cloud Services (AWS/GCP)",
        "Microservices Architecture",
        "Testing & Documentation",
        "Performance Optimization"
      ]
    },
    {
      title: "AI/ML Development",
      price: "₦450,000",
      duration: "3 Months",
      icon: Brain,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      image: aiMlDev,
      features: [
        "Python Programming",
        "Machine Learning Algorithms",
        "Deep Learning & Neural Networks",
        "Data Analysis & Visualization",
        "Natural Language Processing",
        "Computer Vision",
        "Model Deployment",
        "AI Ethics & Best Practices"
      ]
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          type: 'academic_inquiry',
          ...formData,
          subject: `Academic Course Inquiry: ${formData.course}`
        }
      });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "We'll contact you within 24 hours to discuss your enrollment.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Academy — Frontend, Backend & AI Courses | FuseLabs IO"
        description="Hands-on FuseLabs IO training programs in frontend, backend and AI/ML development, with mentorship and real project work."
        path="/academic"
        jsonLd={courses.map((course) => ({
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.title,
          description: `${course.title} program — ${course.duration} of hands-on training with FuseLabs IO.`,
          timeRequired: course.duration,
          provider: {
            "@type": "Organization",
            name: "FuseLabs IO",
            sameAs: "https://fuselabsio.lovable.app/",
          },
        }))}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070605]">
        {/* Background video */}
        <div className="absolute inset-0 z-0">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-45"
            autoPlay
            muted
            loop
            playsInline
            poster={academicHeroPoster}
            aria-hidden="true"
          >
            <source src={academyVideoSrc} type="video/mp4" />
          </video>

          {/* SVG Pattern Background - WhatsApp Style */}
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="heroPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                {/* Academic symbols pattern */}
                <circle cx="10" cy="10" r="1" fill="currentColor" className="text-emerald-400" opacity="0.3"/>
                <polygon points="5,8 7,12 13,12 15,8" fill="currentColor" className="text-cyan-400" opacity="0.2"/>
                <rect x="8" y="4" width="4" height="4" fill="currentColor" className="text-blue-400" opacity="0.15"/>
                <path d="M3,15 Q10,12 17,15" stroke="currentColor" className="text-purple-400" strokeWidth="0.5" fill="none" opacity="0.2"/>
              </pattern>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="currentColor" className="text-green-400" opacity="0.1"/>
                <circle cx="5" cy="5" r="1.5" fill="currentColor" className="text-yellow-400" opacity="0.08"/>
                <circle cx="35" cy="35" r="1" fill="currentColor" className="text-pink-400" opacity="0.06"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroPattern)"/>
            <rect width="100%" height="100%" fill="url(#dots)"/>
          </svg>
          
          {/* Gradient overlay for legibility over the video */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#070605]/92 via-[#0d0c0b]/80 to-[#070605]/92">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5 animate-pulse"></div>
          </div>
          
          {/* Floating Elements for High School Spirit */}
          <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-green-400/8 to-emerald-400/8 rounded-full blur-2xl animate-float-delay"></div>
          <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-xl animate-float-slow"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Award className="w-4 h-4" />
              Professional Tech Academy
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-tight">
            <span className="inline-flex items-center justify-center gap-3">
              <Rocket className="h-10 w-10 shrink-0 text-primary md:h-14 md:w-14" aria-hidden />
              Launch Your
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
              Tech Journey!
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            Join thousands of ambitious students transforming their lives through code!
            Our <span className="font-bold text-emerald-400">3-month intensive programs</span> turn beginners into job-ready developers.
            <span className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-base text-cyan-400 md:text-lg">
              <span className="inline-flex items-center gap-1.5"><Zap className="h-4 w-4" aria-hidden />100% Online</span>
              <span className="inline-flex items-center gap-1.5"><Target className="h-4 w-4" aria-hidden />Project-Based</span>
              <span className="inline-flex items-center gap-1.5"><Award className="h-4 w-4" aria-hidden />Certificate Included</span>
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold group"
              onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Courses
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary/20 text-foreground hover:bg-primary/10 px-8 py-4 text-lg font-semibold"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started Today
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Zap, label: "100% Online", desc: "Flexible Learning" },
              { icon: Users, label: "Expert Instructors", desc: "Industry Pros" },
              { icon: Target, label: "3 Months", desc: "Intensive Training" },
              { icon: Award, label: "Certification", desc: "Official Certificate" },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center transform hover:scale-105 transition-all duration-300">
                  <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-400 backdrop-blur-sm">
                    <IconComponent className="h-7 w-7" aria-hidden />
                  </div>
                  <div className="text-lg font-semibold text-white">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="reveal py-20 bg-muted relative overflow-hidden">
        {/* More SVG Patterns */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="coursePattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M25,5 L45,25 L25,45 L5,25 Z" fill="currentColor" className="text-emerald-400" opacity="0.1"/>
                <circle cx="25" cy="25" r="3" fill="currentColor" className="text-cyan-400" opacity="0.15"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#coursePattern)"/>
          </svg>
        </div>
        
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
              <Target className="h-4 w-4" aria-hidden />
              Popular Programs
            </div>
            <h2 className="mb-6 font-display text-4xl font-bold text-foreground md:text-5xl">
              <span className="inline-flex items-center justify-center gap-2">
                <Rocket className="h-8 w-8 text-primary" aria-hidden />
                Choose Your
              </span>{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Superpower
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              Transform from zero to hero in just 3 months. Pick your path and build something amazing together.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const IconComponent = course.icon;
              return (
                <Card key={index} className="relative overflow-hidden border-0 shadow-elegant hover:shadow-glow transition-all duration-500 group bg-card">
                  {/* Course Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-80`} />
                    <div className="absolute top-4 left-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${course.bgColor} backdrop-blur-sm text-white`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                        {course.duration}
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                      {course.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-3xl font-bold text-primary">
                        {course.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        3 Month Program
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {course.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group"
                      onClick={() => {
                        setFormData({...formData, course: course.title});
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Enroll Now
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="reveal py-20 bg-background relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-3">
          <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="whyPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" className="text-emerald-400" strokeWidth="1" opacity="0.1"/>
                <polygon points="40,20 50,35 30,35" fill="currentColor" className="text-cyan-400" opacity="0.08"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#whyPattern)"/>
          </svg>
        </div>
        
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400">
              <Star className="h-4 w-4" aria-hidden />
              Why We're Different
            </div>
            <h2 className="mb-6 font-display text-4xl font-bold text-foreground md:text-5xl">
              <span className="inline-flex items-center justify-center gap-2">
                <GraduationCap className="h-8 w-8 text-primary" aria-hidden />
                Why Our Academy
              </span>{" "}
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Rocks
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              Experience practical, career-focused training designed to get you hired.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Expert Instructors",
                description: "Learn from industry professionals with 5+ years experience",
                icon: Users,
                color: "from-blue-500 to-blue-600",
              },
              {
                title: "Hands-on Projects",
                description: "Build real-world applications that showcase your skills",
                icon: Code,
                color: "from-green-500 to-green-600",
              },
              {
                title: "Flexible Schedule",
                description: "100% online classes that fit your lifestyle",
                icon: Clock,
                color: "from-orange-500 to-orange-600",
              },
              {
                title: "Job Support",
                description: "Career guidance and portfolio review included",
                icon: Briefcase,
                color: "from-purple-500 to-purple-600",
              },
            ].map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="text-center p-8 border-0 shadow-elegant hover:shadow-glow transition-all duration-300 group">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} text-foreground mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section id="contact" className="reveal py-20 bg-muted relative overflow-hidden">
        {/* Form Pattern Background */}
        <div className="absolute inset-0 opacity-3">
          <svg className="w-full h-full" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="formPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <rect x="25" y="25" width="10" height="10" fill="currentColor" className="text-emerald-400" opacity="0.1"/>
                <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="1" opacity="0.08"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#formPattern)"/>
          </svg>
        </div>
        
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
              <Sparkles className="h-4 w-4" aria-hidden />
              Let's Get Started
            </div>
            <h2 className="mb-6 font-display text-4xl font-bold text-foreground md:text-5xl">
              <span className="inline-flex items-center justify-center gap-2">
                <Rocket className="h-8 w-8 text-primary" aria-hidden />
                Ready to
              </span>{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Level Up?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Fill out the form below and we'll contact you within 24 hours to get you enrolled.
            </p>
          </div>

          <Card className="p-8 shadow-elegant bg-card/80 backdrop-blur-sm border-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <Input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Preferred Course *
                  </label>
                  <select
                    required
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a course</option>
                    <option value="Frontend Development">Frontend Development</option>
                    <option value="Backend Development">Backend Development</option>
                    <option value="AI/ML Development">AI/ML Development</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Message
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your background and goals..."
                  rows={4}
                />
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AcademicPage;