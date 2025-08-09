import { prisma } from "@/lib/DB";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const contactSchema = z.object({
  Subject: z.string().min(1),
  Message: z.string().min(10).max(200),
});

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedBody = contactSchema.safeParse(data);
  if (!parsedBody.success) {
    return NextResponse.json(
      {
        success: false,
        message: parsedBody.error,
      },
      {
        status: 400,
      }
    );
  }
  const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
  if (!token || !token.id) {
    return NextResponse.json(
      {
        success: false,
        message: "Please Login First",
      },
      {
        status: 401,
      }
    );
  }
  const userid = token?.id as string | undefined;

  const { Subject, Message } = parsedBody.data;

  try {
    const userExist = await prisma.user.findFirst({
      where: {
        id: userid,
      },
    });

    if (!userExist) {
      return NextResponse.json(
        {
          success: false,
          message: "User not Exist",
        },
        {
          status: 409,
        }
      );
    }

    const existRequest = await prisma.contact.findFirst({
      where: {
        userId: userid,
      },
    });

    if (existRequest) {
      return NextResponse.json(
        {
          success: false,
          message: "Request already Exist",
        },
        {
          status: 409,
        }
      );
    }

    await prisma.contact.create({
      data: {
        Subject: Subject,
        Message: Message,
        Fullname: token?.username as string,
        email: token.email as string,
        userId: userExist?.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Request Submitted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
