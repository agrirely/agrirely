import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import {
  updateSection,
  deleteSection,
} from "@/services/pageContent.service";

export async function PUT(request, { params }) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { pageKey, sectionKey } = await params;
    const body = await request.json();

    if (body === undefined) {
      return NextResponse.json(
        { success: false, error: "section body is required" },
        { status: 400 }
      );
    }

    const page = await updateSection(pageKey, sectionKey, body);
    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    const status = error.message?.includes("not found") ? 404 : 500;
    return NextResponse.json(
      { success: false, error: error.message },
      { status }
    );
  }
}

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { pageKey, sectionKey } = await params;
    const page = await deleteSection(pageKey, sectionKey);
    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    const status = error.message?.includes("not found") ? 404 : 500;
    return NextResponse.json(
      { success: false, error: error.message },
      { status }
    );
  }
}
