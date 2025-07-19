import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Check, Clock, Users, BookOpen, Code, Brain, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
      color: "bg-blue-500",
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
      color: "bg-green-500",
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
      color: "bg-purple-500",
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
    <div className="min-h-screen">
      <div 
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(212, 120, 76, 0.1) 0%, rgba(139, 69, 19, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
          height: '100px'
        }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
              Transform Your Career with 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Professional Tech Training
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Master in-demand skills with our comprehensive 3-month online programs. 
              Learn from industry experts and build real-world projects.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>100% Online Training</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Expert Instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>Hands-on Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                <span>Certificate of Completion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select from our specialized tracks designed to take you from beginner to professional in just 3 months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const IconComponent = course.icon;
              return (
                <Card key={index} className="relative overflow-hidden border-0 shadow-elegant hover:shadow-glow transition-all duration-300 group">
                  <div className={`h-2 ${course.color}`} />
                  <div className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${course.color} text-white mb-6`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                      {course.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-3xl font-bold text-primary">
                        {course.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {course.duration}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {course.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => setFormData({...formData, course: course.title})}
                    >
                      Enroll Now
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Why Choose Our Academy?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Expert Instructors",
                description: "Learn from industry professionals with 5+ years experience",
                icon: Users
              },
              {
                title: "Hands-on Projects",
                description: "Build real-world applications that showcase your skills",
                icon: Code
              },
              {
                title: "Flexible Schedule",
                description: "100% online classes that fit your lifestyle",
                icon: Clock
              },
              {
                title: "Job Support",
                description: "Career guidance and portfolio review included",
                icon: BookOpen
              }
            ].map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="py-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and our team will contact you within 24 hours.
            </p>
          </div>

          <Card className="p-8 shadow-elegant">
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