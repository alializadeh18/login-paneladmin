import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SignJWT } from "jose";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "ایمیل و رمز عبور الزامی است" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "ایمیل یا رمز عبور اشتباه است" },
        { status: 401 }
      );
    }

    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const response = NextResponse.json(
      { message: "ورود موفقیت‌آمیز" },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400, // 1 day
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "خطا در پردازش درخواست" },
      { status: 500 }
    );
  }
}
