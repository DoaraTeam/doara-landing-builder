import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { LandingConfig, LandingPage } from "@/types/landing";

const CONFIG_PATH = join(process.cwd(), "public/data/landing-config.json");

/**
 * GET /api/landing-config
 * Fetch the complete landing configuration
 */
export async function GET() {
  try {
    const data = await readFile(CONFIG_PATH, "utf-8");
    const config: LandingConfig = JSON.parse(data);

    return NextResponse.json(config);
  } catch (error) {
    console.error("Error reading landing config:", error);
    return NextResponse.json({ error: "Failed to read configuration" }, { status: 500 });
  }
}

/**
 * POST /api/landing-config
 * Save the complete landing configuration
 * Body: LandingConfig
 */
export async function POST(request: NextRequest) {
  try {
    const config: LandingConfig = await request.json();

    // Validate config
    if (!config.version || !config.metadata || !config.themes || !config.pages) {
      return NextResponse.json({ error: "Invalid configuration structure" }, { status: 400 });
    }

    // Update metadata
    config.metadata.lastUpdated = new Date().toISOString();
    config.metadata.totalPages = Object.keys(config.pages).length;

    // Write to file with pretty formatting
    await writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Configuration saved successfully",
      metadata: config.metadata,
    });
  } catch (error) {
    console.error("Error saving landing config:", error);
    return NextResponse.json({ error: "Failed to save configuration" }, { status: 500 });
  }
}

/**
 * PUT /api/landing-config
 * Update a single page in the configuration
 * Body: { pageId: string, pageData: LandingPage }
 */
export async function PUT(request: NextRequest) {
  try {
    const { pageId, pageData } = await request.json();

    if (!pageId || !pageData) {
      return NextResponse.json({ error: "Missing pageId or pageData" }, { status: 400 });
    }

    // Read current config
    const data = await readFile(CONFIG_PATH, "utf-8");
    const config: LandingConfig = JSON.parse(data);

    // Validate page data
    if (!pageData.id || !pageData.title || !pageData.slug) {
      return NextResponse.json({ error: "Invalid page data structure" }, { status: 400 });
    }

    // Check for slug conflicts (except same page)
    const slugConflict = Object.entries(config.pages).find(
      ([id, page]) => id !== pageId && page.slug === pageData.slug
    );

    if (slugConflict) {
      return NextResponse.json(
        { error: `Slug "${pageData.slug}" is already used by another page` },
        { status: 409 }
      );
    }

    // Update page
    const updatedPage: LandingPage = {
      ...pageData,
      updatedAt: new Date().toISOString(),
    };

    config.pages[pageId] = updatedPage;

    // Update metadata
    config.metadata.lastUpdated = new Date().toISOString();
    config.metadata.totalPages = Object.keys(config.pages).length;

    // Save config
    await writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Page updated successfully",
      page: updatedPage,
    });
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
  }
}

/**
 * DELETE /api/landing-config
 * Delete a page from the configuration
 * Query: ?pageId=xxx
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get("pageId");

    if (!pageId) {
      return NextResponse.json({ error: "Missing pageId parameter" }, { status: 400 });
    }

    // Read current config
    const data = await readFile(CONFIG_PATH, "utf-8");
    const config: LandingConfig = JSON.parse(data);

    // Check if page exists
    if (!config.pages[pageId]) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Delete page
    delete config.pages[pageId];

    // Update metadata
    config.metadata.lastUpdated = new Date().toISOString();
    config.metadata.totalPages = Object.keys(config.pages).length;

    // Save config
    await writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Page deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 });
  }
}
