// route.js
import WelcomeEmail from "@/emails/WelcomeEmail";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { email, honeypot } = await request.json();

  await resend.emails.send({
    from: "Aaron Soto <onboarding@resend.dev>",
    to: email,
    subject: "Newsletter Submission Confirmation",
    react: WelcomeEmail(),
  });

  return NextResponse.json({
    message: "Email sent successfully",
    status: 200,
  });
}
