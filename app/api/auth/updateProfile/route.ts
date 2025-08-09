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

export async function PUT(req: NextRequest) {
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

    const hashedpassword = await bcrypt.compare(password, userExist.password);
    const salt = await bcrypt.genSalt(Number(saltvalue));
    const hashedpasswordnew = await bcrypt.hash(password, salt);
    if (
      userExist.email !== email ||
      userExist.username !== username ||
      !hashedpassword
    ) {
      await prisma.user.update({
        where: {
          email: userExist.email,
        },
        data: {
          username: username,
          email: email,
          password: hashedpasswordnew,
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Updation Successfull",
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
