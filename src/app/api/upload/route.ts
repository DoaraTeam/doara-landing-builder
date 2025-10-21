import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/upload
 * Upload an image and return base64 data URL (temporary)
 * This allows immediate preview without saving to disk
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 });
    }

    // Convert to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const mimeType = file.type;
    const dataUrl = `data:${mimeType};base64,${base64}`;

    // Generate a unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `upload-${timestamp}-${random}.${ext}`;

    return NextResponse.json({
      success: true,
      url: dataUrl, // Base64 data URL for immediate preview
      filename: filename,
      size: file.size,
      type: file.type,
      isTemporary: true, // Flag to indicate this needs to be saved permanently
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
