import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

/**
 * POST /api/save-images
 * Convert base64 images to permanent files
 * Body: { images: Array<{ url: string, filename?: string }> }
 */
export async function POST(request: NextRequest) {
  try {
    const { images } = await request.json();

    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ error: "No images provided" }, { status: 400 });
    }

    const uploadDir = join(process.cwd(), "public/assets/images");

    // Ensure upload directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Process all images in parallel for better performance
    const imageProcessingPromises = images.map(
      async (image: { url: string; filename?: string }) => {
        const { url, filename } = image;

        // Skip if not a base64 data URL
        if (!url || !url.startsWith("data:")) {
          return null;
        }

        try {
          // Extract base64 data
          const matches = url.match(/^data:(.+?);base64,(.+)$/);
          if (!matches) {
            console.warn("Invalid data URL format:", url.substring(0, 50));
            return null;
          }

          const base64Data = matches[2];
          const buffer = Buffer.from(base64Data, "base64");

          // Generate filename if not provided
          const timestamp = Date.now();
          const random = Math.random().toString(36).substring(2, 9);
          const finalFilename = filename || `image-${timestamp}-${random}.jpg`;

          // Write file
          const filepath = join(uploadDir, finalFilename);
          await writeFile(filepath, buffer);

          // Generate public URL
          const publicUrl = `/assets/images/${finalFilename}`;

          return {
            originalUrl: url,
            newUrl: publicUrl,
          };
        } catch (error) {
          console.error("Error saving individual image:", error);
          return null;
        }
      }
    );

    // Wait for all images to be processed
    const results = await Promise.all(imageProcessingPromises);

    // Filter out null results (failed processing)
    const savedImages = results.filter(
      (result): result is { originalUrl: string; newUrl: string } =>
        result !== null
    );

    return NextResponse.json({
      success: true,
      message: `Successfully saved ${savedImages.length} images`,
      savedImages,
    });
  } catch (error) {
    console.error("Error in save-images API:", error);
    return NextResponse.json({ error: "Failed to save images" }, { status: 500 });
  }
}