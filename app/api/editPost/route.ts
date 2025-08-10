import { prisma } from "@/lib/DB";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const postSchema = z.object({
  link: z.string(),
  type: z.enum(["linkedin", "facebook", "Instagram", "Youtube"]),
  title: z.string(),
  postId:z.string(),
});

export async function PUT(req: NextRequest) {
  const data = await req.json();

  const parsedbody = postSchema.safeParse(data);
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
  const { link, type, title,postId } = parsedbody.data;

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

    const existPost = await prisma.content.findFirst({
      where: {
        id:postId
      },
    });

    if (!existPost) {
      return NextResponse.json(
        {
          success: false,
          message: "Post does not Exist",
        },
        {
          status: 409,
        }
      );
    }

    await prisma.content.update({
      where: {
        id: postId,
      },
      data: {
        link: link,
        type: type,
        title: title,
        userId: userid,
        sharable: existPost.sharable,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "post Updated",
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
