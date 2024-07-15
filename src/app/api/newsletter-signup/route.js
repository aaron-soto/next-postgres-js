import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

const prisma = new PrismaClient();

export async function POST(request) {
  const session = await getServerSession(authOptions);
  const { email, honeypot } = await request.json();

  if (honeypot) {
    return new Response(JSON.stringify({ error: "Invalid submission" }), {
      status: 400,
    });
  }

  if (!email || !email.includes("@")) {
    return new Response(JSON.stringify({ error: "Invalid email address" }), {
      status: 400,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    await prisma.newsletterSignup.create({
      data: {
        email,
        userId: user ? user.id : null,
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
