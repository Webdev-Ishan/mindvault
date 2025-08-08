// app/api/contact/request/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/DB"; // your prisma client instance
import { z } from "zod";

// Zod validation schema (to replace mongoose's validation)
const contactSchema = z.object({
  Fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  Subject: z.string().min(1, "Subject is required"),
  Message: z.string().min(1, "Message is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.message },
        { status: 400 }
      );
    }

    // Save to Prisma
    const contact = await prisma.contact.create({
      data: {
        Fullname: parsed.data.Fullname,
        email: parsed.data.email,
        Subject: parsed.data.Subject,
        Message: parsed.data.Message,
      },
    });

    return NextResponse.json(
      { success: true, message: "Contact request saved", token: "dummy-token" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
