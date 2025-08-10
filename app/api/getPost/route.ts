// app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/DB"; // your Prisma client instance
import { getToken } from "next-auth/jwt"; // if using next-auth
import z from "zod";

const postidschema = z.object({
  postId: z.string(),
});
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
    const userId = token?.id as string | undefined;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Login first please" },
        { status: 401 }
      );
    }

    const data = await req.json();
    const parsedbody = postidschema.safeParse(data);

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

    const { postId } = parsedbody.data;

    // Find user and include related contents
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 403 }
      );
    }

    const postinfo = await prisma.content.findUnique({
      where: {
        userId: userId,
        id: postId,
      },
    });

    return NextResponse.json({ success: true, postinfo }, { status: 200 });
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
