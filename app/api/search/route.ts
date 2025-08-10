import { prisma } from "@/lib/DB";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const querySchema = z.object({
  query: z.string(),
});

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedbody = querySchema.safeParse(data);

  if (!parsedbody.success) {
    return NextResponse.json(
      {
        success: false,
        message: parsedbody.error,
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
  const { query } = parsedbody.data;

  try {
    const existUser = await prisma.user.findFirst({
      where: {
        id: userid,
      },
    });

    if (!existUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not Exist",
        },
        {
          status: 404,
        }
      );
    }

    const searchresult = await prisma.content.findMany({
      where: {
        userId: userid,
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        searchresult,
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
