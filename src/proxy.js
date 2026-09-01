import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  isAdminPath,
  isPublicAdminPath,
  isProtectedApiRequest,
  verifyAdminToken,
} from "@/lib/auth";

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const admin = await verifyAdminToken(token);

  // Admin UI routes
  if (isAdminPath(pathname)) {
    if (isPublicAdminPath(pathname)) {
      if (admin) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    if (!admin) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // API protection — only admin can mutate / list protected resources
  if (pathname.startsWith("/api/") && isProtectedApiRequest(pathname, request.method)) {
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized — admin login required" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
