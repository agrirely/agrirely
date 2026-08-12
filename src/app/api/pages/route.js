import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getAllPages, seedAllPages } from "@/services/pageContent.service";

export async function GET(request) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const pages = await getAllPages();
    return NextResponse.json({ success: true, data: pages });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/** One-time / admin seed — upsert all static page content into MongoDB */
export async function POST(request) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const body = await request.json().catch(() => ({}));
    const overwrite = Boolean(body.overwrite);
    const results = await seedAllPages({ overwrite });
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
