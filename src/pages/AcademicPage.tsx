import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Check, Clock, Users, BookOpen, Code, Brain, Star, ArrowRight, Award, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import academicHero from "@/assets/academic-hero.jpg";
import frontendDev from "@/assets/frontend-dev.jpg";
import backendDev from "@/assets/backend-dev.jpg";
import aiMlDev from "@/assets/ai-ml-dev.jpg";

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
      icon: Users,
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
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${academicHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/95" />
        </div>

        {/* Content */}
        <div className="relative z-10 container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Award className="w-4 h-4" />
              Professional Tech Academy
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-8 leading-tight">
            Master the Future of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
              Technology
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            Transform your career with our comprehensive 3-month online programs. 
            Learn from industry experts, build real-world projects, and join the next generation of tech professionals.
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
              { icon: Clock, label: "100% Online", desc: "Flexible Learning" },
              { icon: Users, label: "Expert Instructors", desc: "Industry Professionals" },
              { icon: Target, label: "3 Months", desc: "Intensive Training" },
              { icon: Award, label: "Certification", desc: "Completion Certificate" }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-3">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-lg font-semibold text-foreground">{stat.label}</div>
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
      <section id="courses" className="py-20 bg-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Select from our specialized tracks designed to take you from beginner to professional in just 3 months.
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
      <section className="py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Why Choose Our Academy?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience world-class education designed for the modern tech landscape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Expert Instructors",
                description: "Learn from industry professionals with 5+ years experience",
                icon: Users,
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Hands-on Projects",
                description: "Build real-world applications that showcase your skills",
                icon: Code,
                color: "from-green-500 to-green-600"
              },
              {
                title: "Flexible Schedule",
                description: "100% online classes that fit your lifestyle",
                icon: Clock,
                color: "from-orange-500 to-orange-600"
              },
              {
                title: "Job Support",
                description: "Career guidance and portfolio review included",
                icon: BookOpen,
                color: "from-purple-500 to-purple-600"
              }
            ].map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="text-center p-8 border-0 shadow-elegant hover:shadow-glow transition-all duration-300 group">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
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
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-muted-foreground">
              Fill out the form below and our team will contact you within 24 hours.
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