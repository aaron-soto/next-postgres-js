import { Resend } from "resend";
import { NextResponse } from "next/server";
import ContactFormResponse from "@/emails/ContactFormResponse";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { name, email, subject, message } = await request.json();

  await resend.emails.send({
    from: "Aaron Soto <onboarding@resend.dev>",
    to: email,
    subject: subject,
    react: ContactFormResponse(name, email),
  });

  return NextResponse.json({
    message: "Email sent successfully",
    status: 200,
  });
}
