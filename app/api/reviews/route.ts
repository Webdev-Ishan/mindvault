import { prisma } from "@/lib/DB";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const contactSchema = z.object({
  content: z.string().min(1),
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

  const { content } = parsedBody.data;

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

    await prisma.review.create({
      data: {
        content: content,
        name: token?.username as string,
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

export async function GET(req: NextRequest) {
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

    const reviews = await prisma.review.findMany({
      where: {},
    });

    return NextResponse.json(
      {
        success: true,
        reviews,
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
