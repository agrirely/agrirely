import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import {
  getPageByKey,
  upsertPage,
} from "@/services/pageContent.service";

export async function GET(request, { params }) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { pageKey } = await params;
    const page = await getPageByKey(pageKey);

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { pageKey } = await params;
    const body = await request.json();
    const title = body.title;
    const sections = body.sections;

    if (!sections || typeof sections !== "object") {
      return NextResponse.json(
        { success: false, error: "sections object is required" },
        { status: 400 }
      );
    }

    const existing = await getPageByKey(pageKey);
    const page = await upsertPage({
      pageKey,
      title: title || existing?.title || pageKey,
      sections,
    });

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
