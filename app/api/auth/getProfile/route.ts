// app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/DB"; // your Prisma client instance
import { getToken } from "next-auth/jwt"; // if using next-auth

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const userId = token?.id as string | undefined;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Login first please" },
        { status: 403 }
      );
    }

    // Find user and include related contents
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        contents: {
          select: {
            link: true,
            title: true,
            type: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
