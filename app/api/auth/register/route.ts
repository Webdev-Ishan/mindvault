import { prisma } from "@/lib/DB";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import bcrypt from "bcrypt";

const registerScheam = z.object({
  username: z.string().min(3).max(16),
  email: z.string().nonempty(),
  password: z.string().min(6).max(12),
});

const saltvalue = process.env.SALT!;

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedBody = registerScheam.safeParse(data);

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

  const { username, email, password } = parsedBody.data;
  try {
    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      return NextResponse.json(
        {
          success: false,
          message: "USer already Exist",
        },
        {
          status: 409,
        }
      );
    }

    const salt = await bcrypt.genSalt(Number(saltvalue));
    const hashedpassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedpassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration Successfull",
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
