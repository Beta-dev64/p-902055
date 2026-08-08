import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

export interface LeadFormOption {
  slug: string;
  title: string;
}

const baseSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  selection: z.string().trim().min(1, "Please choose an option"),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  timeline: z.string().trim().max(60).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Please give us at least 20 characters of detail")
    .max(2000, "Please keep it under 2000 characters"),
});

type LeadFormValues = z.infer<typeof baseSchema>;

interface LeadFormProps {
  type: "project" | "academy";
  options: LeadFormOption[];
  defaultSelection?: string;
  variant?: "light" | "dark";
}

const BUDGETS = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

const TIMELINES = ["ASAP", "In 1–2 months", "In 3–6 months", "Just exploring"];

const LeadForm = ({
  type,
  options,
  defaultSelection = "",
  variant = "light",
}: LeadFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const isProject = type === "project";

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      selection: defaultSelection,
      budget: "",
      timeline: "",
      message: "",
    },
  });

  const onSubmit = async (values: LeadFormValues) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert([
        {
          type,
          name: values.name,
          email: values.email,
          phone: values.phone || null,
          company: values.company || null,
          budget: values.budget || null,
          timeline: values.timeline || null,
          service_slug: isProject ? values.selection : null,
          program_slug: isProject ? null : values.selection,
          message: values.message,
        },
      ]);

      if (error) throw error;

      const [firstName, ...rest] = values.name.split(" ");
      await supabase.functions
        .invoke("send-contact-email", {
          body: {
            firstName,
            lastName: rest.join(" ") || "-",
            email: values.email,
            companyWebsite: values.company || "",
            services: values.selection,
            budget: values.budget || "",
            projectDetails: values.message,
          },
        })
        .catch(() => null);

      navigate(`/thank-you?type=${type}`);
    } catch (err) {
      console.error("Lead submission failed:", err);
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const labelClass = variant === "dark" ? "text-gray-200" : "text-gray-700";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Full name *</FormLabel>
                <FormControl>
                  <Input placeholder="Ada Lovelace" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+234 800 000 0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>
                  {isProject ? "Company" : "Current occupation"}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={isProject ? "Acme Inc." : "Student, marketer…"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="selection"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>
                {isProject ? "Which service do you need? *" : "Which program? *"}
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.slug} value={option.slug}>
                      {option.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {isProject && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Budget range</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BUDGETS.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Timeline</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a timeline" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TIMELINES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>
                {isProject
                  ? "Tell us about the project *"
                  : "Why do you want to join? *"}
              </FormLabel>
              <FormControl>
                <Textarea rows={6} placeholder="A few sentences is plenty." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-pulse-500 hover:bg-pulse-600 text-white group"
          size="lg"
        >
          {submitting
            ? "Sending…"
            : isProject
              ? "Send project inquiry"
              : "Submit enrollment application"}
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </Form>
  );
};

export default LeadForm;