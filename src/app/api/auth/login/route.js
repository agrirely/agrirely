import { NextResponse } from "next/server";
import {
  setAdminSessionCookie,
  signAdminToken,
} from "@/lib/auth";
import { loginAdmin } from "@/services/auth.service";
import { assertEmail, assertPassword } from "@/validations/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const emailError = assertEmail(body.email);
    const passwordError = assertPassword(body.password);

    if (emailError || passwordError) {
      return NextResponse.json(
        { success: false, error: emailError || passwordError },
        { status: 400 }
      );
    }

    const user = await loginAdmin(body.email, body.password);
    const token = await signAdminToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      data: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    setAdminSessionCookie(response, token);
    return response;
  } catch (error) {
    const message = error.message || "Login failed";
    const status = message.includes("Invalid") ? 401 : 500;
    return NextResponse.json({ success: false, error: message }, { status });
  }
}
