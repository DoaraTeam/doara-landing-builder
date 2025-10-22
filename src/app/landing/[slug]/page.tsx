import { Metadata } from "next";
import { readFile } from "fs/promises";
import { join } from "path";
import { notFound } from "next/navigation";
import { LandingConfig } from "@/types/landing";
import { ComponentRenderer } from "@/components/landing/ComponentRenderer";
import { ThemeProvider } from "@/components/landing/ThemeProvider";
import { getTheme } from "@/lib/themes";

interface PageProps {
  params: {
    slug: string;
  };
}

/**
 * Generate static params for all pages at build time
 */
export async function generateStaticParams() {
  try {
    const configPath = join(process.cwd(), "public/data/landing-config.json");
    const data = await readFile(configPath, "utf-8");
    const config: LandingConfig = JSON.parse(data);

    return Object.values(config.pages).map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const configPath = join(process.cwd(), "public/data/landing-config.json");
    const data = await readFile(configPath, "utf-8");
    const config: LandingConfig = JSON.parse(data);

    const page = Object.values(config.pages).find((p) => p.slug === params.slug);

    if (!page) {
      return {
        title: "Page Not Found",
      };
    }

    return {
      title: page.seo.metaTitle || page.title,
      description: page.seo.metaDescription || page.description,
      keywords: page.seo.keywords,
      openGraph: {
        title: page.seo.metaTitle || page.title,
        description: page.seo.metaDescription || page.description,
        images: page.seo.ogImage ? [page.seo.ogImage] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: page.seo.metaTitle || page.title,
        description: page.seo.metaDescription || page.description,
        images: page.seo.ogImage ? [page.seo.ogImage] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
    };
  }
}

/**
 * Landing page component (Server-side rendered)
 */
export default async function LandingPage({ params }: PageProps) {
  try {
    // Read configuration
    const configPath = join(process.cwd(), "public/data/landing-config.json");
    const data = await readFile(configPath, "utf-8");
    const config: LandingConfig = JSON.parse(data);

    // Find page by slug
    const page = Object.values(config.pages).find((p) => p.slug === params.slug);

    if (!page) {
      notFound();
    }

    // Get theme from themes.ts (not from config.themes)
    const theme = getTheme(page.theme || "modern");

    // Sort components by order and filter visible ones
    const sortedComponents = [...page.components]
      .filter((c) => c.visible !== false)
      .sort((a, b) => a.order - b.order);

    return (
      <ThemeProvider theme={theme}>
        <main className="min-h-screen">
          {sortedComponents.map((component) => (
            <ComponentRenderer key={component.id} component={component} theme={theme} />
          ))}
        </main>
      </ThemeProvider>
    );
  } catch (error) {
    console.error("Error rendering landing page:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">Failed to load landing page</p>
        </div>
      </div>
    );
  }
}
