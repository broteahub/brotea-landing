import { NextResponse } from "next/server";
import { validateNewsletterData } from "@/lib/validations/newsletter";
import { emailService } from "@/services/email";

/**
 * POST /api/newsletter
 */
export async function POST(request: Request) {
  try {
    // Get and validate form data
    const formData = await request.formData();
    const validation = validateNewsletterData(formData);
    
    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { 
          error: "Validation failed",
          details: validation.errors 
        },
        { status: 400 }
      );
    }
    
    const { fullname, email, option } = validation.data;

    // Send newsletter emails using the email service
    const result = await emailService.sendNewsletterEmails({
      fullname,
      email,
      option,
    });

    // Check if at least the welcome email was sent successfully
    if (!result.welcome.success) {
      console.error("Failed to send welcome email:", result.welcome.error);
      return NextResponse.json(
        { error: "Failed to process subscription. Please try again later." },
        { status: 500 }
      );
    }

    // Log admin email failure but don't fail the request
    if (!result.admin.success) {
      console.error("Failed to send admin notification:", result.admin.error);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing! You'll soon receive news from Brotea.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing form:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
