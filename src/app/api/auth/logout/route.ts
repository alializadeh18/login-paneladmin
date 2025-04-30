import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // حذف توکن از کوکی
  cookies().delete("token");

  return NextResponse.json({ success: true });
}
