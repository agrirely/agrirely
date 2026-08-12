import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { seedAllPages } from "@/services/pageContent.service";

export async function POST(request) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const body = await request.json().catch(() => ({}));
    const results = await seedAllPages({
      overwrite: Boolean(body.overwrite),
    });
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
