import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";

export const ADMIN_COOKIE = "agrirely_admin_session";
const SESSION_DAYS = 7;

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("Missing AUTH_SECRET in environment variables");
  }
  return new TextEncoder().encode(secret);
}

export function isAdminPath(pathname) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function isPublicAdminPath(pathname) {
  return pathname === "/admin/login";
}

export async function signAdminToken(payload) {
  return new SignJWT({
    sub: payload.sub,
    email: payload.email,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getSecretKey());
}

export async function verifyAdminToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (payload.role !== "admin") return null;
    return {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export function getTokenFromRequest(request) {
  return request.cookies.get(ADMIN_COOKIE)?.value || null;
}

export async function getAdminFromRequest(request) {
  return verifyAdminToken(getTokenFromRequest(request));
}

/** API guard — returns 401 JSON response if not admin, else session payload */
export async function requireAdmin(request) {
  const admin = await getAdminFromRequest(request);
  if (!admin) {
    return {
      admin: null,
      error: NextResponse.json(
        { success: false, error: "Unauthorized — admin login required" },
        { status: 401 }
      ),
    };
  }
  return { admin, error: null };
}

export function setAdminSessionCookie(response, token) {
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export function clearAdminSessionCookie(response) {
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

/** True if this API request must be admin-authenticated */
export function isProtectedApiRequest(pathname, method) {
  const m = method.toUpperCase();

  if (pathname === "/api/auth/login" || pathname === "/api/auth/logout") {
    return false;
  }

  // Public contact / inquiry submissions
  if (pathname === "/api/inquiries" && m === "POST") {
    return false;
  }

  if (pathname.startsWith("/api/pages") || pathname.startsWith("/api/seed")) {
    return true;
  }

  if (pathname === "/api/upload") {
    return true;
  }

  if (pathname === "/api/inquiries" && m === "GET") {
    return true;
  }

  return false;
}
