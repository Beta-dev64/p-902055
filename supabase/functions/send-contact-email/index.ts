import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  companyWebsite?: string;
  services?: string;
  budget?: string;
  projectDetails?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["sulaymanibrahim64@gmail.com"],
      subject: "New Contact Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4784c; margin-bottom: 20px;">New Contact Form Submission</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            ${formData.companyWebsite ? `<p><strong>Company Website:</strong> ${formData.companyWebsite}</p>` : ''}
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #333;">Project Details</h3>
            ${formData.services ? `<p><strong>Services:</strong> ${formData.services}</p>` : ''}
            ${formData.budget ? `<p><strong>Budget:</strong> ${formData.budget}</p>` : ''}
            ${formData.projectDetails ? `<p><strong>Project Details:</strong><br>${formData.projectDetails.replace(/\n/g, '<br>')}</p>` : ''}
          </div>

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            This email was sent from your website's contact form.
          </p>
        </div>
      `,
    });

    console.log("Admin email sent successfully:", adminEmailResponse);

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "Your Team <onboarding@resend.dev>",
      to: [formData.email],
      subject: "Thank you for your inquiry!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4784c; margin-bottom: 20px;">Thank You for Your Inquiry!</h2>
          
          <p>Hi ${formData.firstName},</p>
          
          <p>Thank you for reaching out to us! We've received your message and will get back to you within 24 hours.</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">What happens next?</h3>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Our team will review your requirements</li>
              <li>We'll prepare a customized proposal for your project</li>
              <li>You'll receive a detailed response within 24 hours</li>
              <li>We'll schedule a call to discuss your project in detail</li>
            </ul>
          </div>

          <p>In the meantime, feel free to check out our portfolio and case studies on our website.</p>
          
          <p style="margin-top: 30px;">
            Best regards,<br>
            <strong>The Team</strong>
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #666; font-size: 14px;">
            This is an automated confirmation email. Please don't reply to this email.
          </p>
        </div>
      `,
    });

    console.log("User confirmation email sent successfully:", userEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails sent successfully" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);