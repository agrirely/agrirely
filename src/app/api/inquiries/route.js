import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createInquiry, listInquiries } from "@/services/inquiry.service";

export async function GET(request) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const data = await listInquiries();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.type || !body.payload) {
      return NextResponse.json(
        { success: false, error: "type and payload are required" },
        { status: 400 }
      );
    }
    const data = await createInquiry({
      type: body.type,
      payload: body.payload,
    });
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
