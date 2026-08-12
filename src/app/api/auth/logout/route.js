import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/auth";
import { logoutAdmin } from "@/services/auth.service";

export async function POST() {
  await logoutAdmin();
  const response = NextResponse.json({ success: true });
  clearAdminSessionCookie(response);
  return response;
}
