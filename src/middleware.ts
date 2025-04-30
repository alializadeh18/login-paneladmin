import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // مسیرهای عمومی که نیازی به احراز هویت ندارند
  const publicPaths = ["/login", "/api/auth/login"];
  if (publicPaths.includes(pathname)) {
    if (token) {
      try {
        await jwtVerify(
          token,
          new TextEncoder().encode(process.env.JWT_SECRET)
        );
        return NextResponse.redirect(new URL("/", request.url));
      } catch (error) {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // مسیرهای خصوصی که نیاز به احراز هویت دارند
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
