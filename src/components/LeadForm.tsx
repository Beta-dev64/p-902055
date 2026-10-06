import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { trackLeadSubmit } from "@/lib/analytics";

const SITE_KEY =
  import.meta.env.VITE_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(160).optional(),
  budget: z.string().trim().max(80).optional(),
  timeline: z.string().trim().max(80).optional(),
  message: z.string().trim().max(2000).optional(),
});

export type LeadFormValues = z.infer<typeof schema>;

interface LeadFormProps {
  type: "project" | "enrollment" | "contact";
  serviceSlug?: string;
  programSlug?: string;
  submitLabel?: string;
}

const LeadForm = ({ type, serviceSlug, programSlug, submitLabel }: LeadFormProps) => {
  const navigate = useNavigate();
  const captchaRef = useRef<HCaptcha>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [received, setReceived] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormValues>({ resolver: zodResolver(type === "contact" ? schema.extend({ message: z.string().trim().min(10, "Please enter a message of at least 10 characters").max(2000) }) : schema) });

  const onSubmit = async (values: LeadFormValues) => {
    if (!captchaToken) {
      toast.error("Please complete the captcha first.");
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-lead", {
        body: {
          ...values,
          type,
          service_slug: serviceSlug ?? "",
          program_slug: programSlug ?? "",
          captchaToken,
        },
      });

      if (error || (data && (data as { error?: unknown }).error)) {
        throw error ?? new Error("Submission rejected");
      }

      trackLeadSubmit(type, programSlug ?? serviceSlug);
      if (type === "contact") {
        reset();
        setReceived(true);
        setCaptchaToken("");
        return;
      }
      navigate(type === "enrollment" ? "/thank-you?type=enrollment" : "/thank-you?type=project");
    } catch (err) {
      console.error("Lead submission failed", err);
      toast.error(
        "We couldn't send that. Please complete the captcha again — or email us directly if it keeps failing.",
      );
      captchaRef.current?.resetCaptcha();
      setCaptchaToken("");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldError = (name: keyof LeadFormValues) =>
    errors[name] ? (
      <p className="mt-1 text-sm text-destructive">{errors[name]?.message}</p>
    ) : null;

  if (received) return (
    <div role="status" className="py-8">
      <CheckCircle2 className="mb-4 h-10 w-10 text-primary" aria-hidden="true" />
      <h3 className="font-display text-2xl font-semibold">Enquiry received</h3>
      <p className="mt-3 text-muted-foreground">Thank you for contacting FuseLabs. Your message has been saved for our team.</p>
      <Button variant="outline" className="mt-6" onClick={() => setReceived(false)}>Send another enquiry</Button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${type}-name`} className="mb-2 block text-sm font-medium">Full name *</label>
          <Input id={`${type}-name`} autoComplete="name" placeholder="Full name" maxLength={120} aria-invalid={!!errors.name} {...register("name")} />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor={`${type}-email`} className="mb-2 block text-sm font-medium">Email *</label>
          <Input id={`${type}-email`} autoComplete="email" placeholder="you@example.com" type="email" maxLength={255} aria-invalid={!!errors.email} {...register("email")} />
          {fieldError("email")}
        </div>
        <div>
          <Input placeholder="Phone (optional)" maxLength={40} {...register("phone")} />
          {fieldError("phone")}
        </div>
        <div>
          <Input
            placeholder={type === "enrollment" ? "Current role / school" : "Company"}
            maxLength={160}
            {...register("company")}
          />
          {fieldError("company")}
        </div>
        {type === "project" && (
          <>
            <div>
              <Input placeholder="Budget range" maxLength={80} {...register("budget")} />
              {fieldError("budget")}
            </div>
            <div>
              <Input placeholder="Ideal timeline" maxLength={80} {...register("timeline")} />
              {fieldError("timeline")}
            </div>
          </>
        )}
      </div>

      <div>
        <label htmlFor={`${type}-message`} className="mb-2 block text-sm font-medium">{type === "contact" ? "Your message *" : "Message"}</label>
        <Textarea
          id={`${type}-message`}
          rows={5}
          maxLength={2000}
          placeholder={
            type === "contact" ? "How can we help?" : type === "enrollment"
              ? "Tell us about your experience level and goals"
              : "What are you building? Goals, scope, anything useful."
          }
          {...register("message")}
        />
        {fieldError("message")}
      </div>

      <HCaptcha
        ref={captchaRef}
        sitekey={SITE_KEY}
        onVerify={(token) => setCaptchaToken(token)}
        onExpire={() => setCaptchaToken("")}
        onError={() => setCaptchaToken("")}
      />

      <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
        {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {submitLabel ?? (type === "enrollment" ? "Apply for this program" : "Start my project")}
      </Button>

    </form>
  );
};

export default LeadForm;