import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getImageKit } from "@/lib/imagekit";

export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

export async function POST(request) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") || "agrirely").replace(
      /[^a-zA-Z0-9/_-]/g,
      ""
    );

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { success: false, error: "File too large (max 8 MB)" },
        { status: 400 }
      );
    }

    if (file.type && !ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Only JPEG, PNG, WebP, GIF, or AVIF images are allowed",
        },
        { status: 400 }
      );
    }

    const imagekit = getImageKit();
    const result = await imagekit.files.upload({
      file,
      fileName: file.name || `upload-${Date.now()}.jpg`,
      folder: folder ? `/${folder}` : "/agrirely",
      useUniqueFileName: true,
    });

    return NextResponse.json({
      success: true,
      url: result.url,
      fileId: result.fileId,
      name: result.name,
      thumbnailUrl: result.thumbnailUrl || null,
    });
  } catch (err) {
    console.error("ImageKit upload error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Upload failed",
      },
      { status: 500 }
    );
  }
}
