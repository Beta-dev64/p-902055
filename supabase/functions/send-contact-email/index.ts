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
      from: "FuseLabs IO <onboarding@resend.dev>",
      to: ["sulaymanibrahim64@gmail.com"],
      subject: "🚀 New Client Inquiry - Immediate Attention Required",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Client Inquiry</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #d4784c 0%, #c86a3d 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">
                FuseLabs IO
              </h1>
              <p style="color: #fef7f0; margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">
                New Client Inquiry Received
              </p>
            </div>

            <!-- Priority Alert -->
            <div style="background-color: #fef3cd; border-left: 4px solid #f59e0b; padding: 16px 20px; margin: 0;">
              <p style="margin: 0; color: #92400e; font-weight: 600; font-size: 14px;">
                ⚡ HIGH PRIORITY: New potential client requires immediate follow-up
              </p>
            </div>

            <!-- Main Content -->
            <div style="padding: 30px 20px;">
              
              <!-- Client Information -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 18px; font-weight: 600; border-bottom: 2px solid #d4784c; padding-bottom: 8px;">
                  👤 Client Information
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 500; width: 30%;">Full Name:</td>
                    <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${formData.firstName} ${formData.lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Email:</td>
                    <td style="padding: 8px 0;">
                      <a href="mailto:${formData.email}" style="color: #d4784c; text-decoration: none; font-weight: 600;">
                        ${formData.email}
                      </a>
                    </td>
                  </tr>
                  ${formData.companyWebsite ? `
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Company:</td>
                    <td style="padding: 8px 0;">
                      <a href="${formData.companyWebsite}" target="_blank" style="color: #d4784c; text-decoration: none; font-weight: 600;">
                        ${formData.companyWebsite}
                      </a>
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <!-- Project Details -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 18px; font-weight: 600; border-bottom: 2px solid #d4784c; padding-bottom: 8px;">
                  💼 Project Requirements
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                  ${formData.services ? `
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 500; width: 30%; vertical-align: top;">Services Needed:</td>
                    <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${formData.services}</td>
                  </tr>
                  ` : ''}
                  ${formData.budget ? `
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 500; vertical-align: top;">Budget Range:</td>
                    <td style="padding: 8px 0; color: #059669; font-weight: 700; font-size: 16px;">${formData.budget}</td>
                  </tr>
                  ` : ''}
                  ${formData.projectDetails ? `
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 500; vertical-align: top;">Project Details:</td>
                    <td style="padding: 8px 0; color: #1e293b; line-height: 1.6;">
                      ${formData.projectDetails.replace(/\n/g, '<br>')}
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <!-- Action Items -->
              <div style="background: linear-gradient(135deg, #fef7f0 0%, #fed7aa 100%); border: 1px solid #fb923c; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <h3 style="color: #ea580c; margin: 0 0 12px 0; font-size: 16px; font-weight: 700;">
                  📋 Immediate Action Required
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #9a3412;">
                  <li style="margin-bottom: 6px;">Respond within 2 hours for optimal conversion</li>
                  <li style="margin-bottom: 6px;">Schedule discovery call within 24 hours</li>
                  <li style="margin-bottom: 6px;">Prepare customized proposal and portfolio examples</li>
                  <li>Follow up with project timeline and next steps</li>
                </ul>
              </div>

              <!-- Quick Actions -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${formData.email}?subject=Re: Your Inquiry - FuseLabs IO&body=Hi ${formData.firstName},%0D%0A%0D%0AThank you for your interest in FuseLabs IO. I'd love to discuss your project in detail.%0D%0A%0D%0AWhen would be a good time for a brief call this week?%0D%0A%0D%0ABest regards,%0D%0AThe FuseLabs IO Team" 
                   style="display: inline-block; background: linear-gradient(135deg, #d4784c 0%, #c86a3d 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: 600; font-size: 16px; margin-right: 12px;">
                  📧 Reply Now
                </a>
                <a href="https://calendly.com/fuselabs" target="_blank"
                   style="display: inline-block; background-color: #ffffff; color: #d4784c; text-decoration: none; padding: 14px 28px; border: 2px solid #d4784c; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  📅 Schedule Call
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #1e293b; padding: 20px; text-align: center;">
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">
                This inquiry was submitted via the FuseLabs IO contact form
              </p>
              <p style="color: #64748b; margin: 8px 0 0 0; font-size: 12px;">
                Time received: ${new Date().toLocaleString('en-US', { 
                  timeZone: 'America/New_York',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })} EST
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Admin email sent successfully:", adminEmailResponse);

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "FuseLabs IO Team <onboarding@resend.dev>",
      to: [formData.email],
      subject: "Welcome to FuseLabs IO - Your Digital Transformation Journey Begins",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to FuseLabs IO</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #d4784c 0%, #c86a3d 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.025em;">
                FuseLabs IO
              </h1>
              <p style="color: #fef7f0; margin: 12px 0 0 0; font-size: 16px; opacity: 0.95; font-weight: 500;">
                Premium Software Development & Digital Innovation
              </p>
            </div>

            <!-- Welcome Message -->
            <div style="padding: 40px 30px 0 30px;">
              <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 24px; font-weight: 700;">
                Hello ${formData.firstName},
              </h2>
              
              <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Thank you for choosing <strong style="color: #d4784c;">FuseLabs IO</strong> for your digital transformation needs. We've successfully received your inquiry and are excited about the possibility of bringing your vision to life.
              </p>

              <div style="background: linear-gradient(135deg, #fef7f0 0%, #fed7aa 100%); border-left: 4px solid #d4784c; padding: 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
                <p style="color: #ea580c; margin: 0; font-weight: 600; font-size: 16px;">
                  🚀 Your inquiry is now our top priority
                </p>
              </div>
            </div>

            <!-- Company Credentials -->
            <div style="padding: 0 30px;">
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <h3 style="color: #1e293b; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
                  Why Leading Companies Choose FuseLabs IO
                </h3>
                <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                  <div style="flex: 1; min-width: 200px;">
                    <div style="color: #d4784c; font-size: 24px; font-weight: 700; margin-bottom: 4px;">500+</div>
                    <div style="color: #64748b; font-size: 14px;">Projects Delivered</div>
                  </div>
                  <div style="flex: 1; min-width: 200px;">
                    <div style="color: #d4784c; font-size: 24px; font-weight: 700; margin-bottom: 4px;">98%</div>
                    <div style="color: #64748b; font-size: 14px;">Client Satisfaction</div>
                  </div>
                  <div style="flex: 1; min-width: 200px;">
                    <div style="color: #d4784c; font-size: 24px; font-weight: 700; margin-bottom: 4px;">24/7</div>
                    <div style="color: #64748b; font-size: 14px;">Premium Support</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Next Steps Timeline -->
            <div style="padding: 0 30px;">
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <h3 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">
                  📋 Your Journey With Us - Next 48 Hours
                </h3>
                
                <div style="position: relative;">
                  <!-- Step 1 -->
                  <div style="display: flex; margin-bottom: 20px;">
                    <div style="background-color: #d4784c; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; margin-right: 16px; flex-shrink: 0;">1</div>
                    <div>
                      <div style="color: #1e293b; font-weight: 600; margin-bottom: 4px;">Initial Review (Within 2 hours)</div>
                      <div style="color: #64748b; font-size: 14px; line-height: 1.4;">Our senior team will analyze your requirements and prepare a preliminary assessment</div>
                    </div>
                  </div>
                  
                  <!-- Step 2 -->
                  <div style="display: flex; margin-bottom: 20px;">
                    <div style="background-color: #d4784c; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; margin-right: 16px; flex-shrink: 0;">2</div>
                    <div>
                      <div style="color: #1e293b; font-weight: 600; margin-bottom: 4px;">Personalized Response (Within 24 hours)</div>
                      <div style="color: #64748b; font-size: 14px; line-height: 1.4;">Detailed project proposal with timeline, technology stack, and investment breakdown</div>
                    </div>
                  </div>
                  
                  <!-- Step 3 -->
                  <div style="display: flex;">
                    <div style="background-color: #d4784c; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; margin-right: 16px; flex-shrink: 0;">3</div>
                    <div>
                      <div style="color: #1e293b; font-weight: 600; margin-bottom: 4px;">Strategy Session (Within 48 hours)</div>
                      <div style="color: #64748b; font-size: 14px; line-height: 1.4;">Complimentary consultation call to discuss your vision and refine the approach</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Call to Action -->
            <div style="padding: 0 30px;">
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #475569; margin: 0 0 20px 0; font-size: 16px;">
                  While you wait, explore our latest innovations and success stories
                </p>
                <a href="https://fuselabs.io/portfolio" target="_blank"
                   style="display: inline-block; background: linear-gradient(135deg, #d4784c 0%, #c86a3d 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 0 8px 12px 8px;">
                  View Our Portfolio
                </a>
                <a href="https://fuselabs.io/case-studies" target="_blank"
                   style="display: inline-block; background-color: #ffffff; color: #d4784c; text-decoration: none; padding: 16px 32px; border: 2px solid #d4784c; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 0 8px 12px 8px;">
                  Read Case Studies
                </a>
              </div>
            </div>

            <!-- Team Signature -->
            <div style="padding: 30px; border-top: 1px solid #e2e8f0; margin-top: 20px;">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #d4784c 0%, #c86a3d 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 24px; margin-right: 16px;">
                  FL
                </div>
                <div>
                  <div style="color: #1e293b; font-weight: 700; font-size: 16px; margin-bottom: 2px;">The FuseLabs IO Team</div>
                  <div style="color: #64748b; font-size: 14px;">Premium Software Development</div>
                  <div style="color: #d4784c; font-size: 14px; margin-top: 4px;">
                    📧 hello@fuselabs.io | 📞 +1 (555) 123-4567
                  </div>
                </div>
              </div>
              
              <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0;">
                Best regards,<br>
                <strong style="color: #1e293b;">The FuseLabs IO Development Team</strong><br>
                <em style="color: #64748b;">Transforming Ideas into Digital Excellence</em>
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #1e293b; padding: 24px 30px; text-align: center;">
              <div style="margin-bottom: 16px;">
                <a href="https://fuselabs.io" style="color: #94a3b8; text-decoration: none; margin: 0 12px; font-size: 14px;">Website</a>
                <a href="https://linkedin.com/company/fuselabs-io" style="color: #94a3b8; text-decoration: none; margin: 0 12px; font-size: 14px;">LinkedIn</a>
                <a href="https://twitter.com/fuselabs_io" style="color: #94a3b8; text-decoration: none; margin: 0 12px; font-size: 14px;">Twitter</a>
                <a href="https://github.com/fuselabs-io" style="color: #94a3b8; text-decoration: none; margin: 0 12px; font-size: 14px;">GitHub</a>
              </div>
              
              <p style="color: #64748b; margin: 0 0 8px 0; font-size: 12px;">
                FuseLabs IO | Premium Software Development & Digital Innovation
              </p>
              <p style="color: #64748b; margin: 0 0 8px 0; font-size: 12px;">
                San Francisco, CA | New York, NY | London, UK
              </p>
              <p style="color: #64748b; margin: 0; font-size: 11px;">
                This email was sent to ${formData.email}. If you no longer wish to receive these emails, 
                <a href="#" style="color: #94a3b8;">unsubscribe here</a>.
              </p>
            </div>
          </div>
        </body>
        </html>
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