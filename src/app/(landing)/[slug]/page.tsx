import { Metadata } from "next";
import { readFile } from "fs/promises";
import { join } from "path";
import { notFound } from "next/navigation";
import { LandingConfig } from "@/types/landing";
import { ComponentRenderer } from "@/components/landing/ComponentRenderer";
import { ThemeProvider } from "@/components/landing/ThemeProvider";
import { LandingPageLoader } from "@/components/landing/LandingPageLoader";
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

    // Get loading configuration
    const loadingConfig = page.loading || {
      enabled: false,
      type: "spin" as const,
      color: "#f97316",
      duration: 1000,
      minDuration: 500,
    };

    return (
      <ThemeProvider theme={theme}>
        <LandingPageLoader
          enabled={loadingConfig.enabled}
          type={loadingConfig.type}
          color={loadingConfig.color || "#f97316"}
          duration={loadingConfig.duration || 1000}
          minDuration={loadingConfig.minDuration || 500}
        >
          <main className="min-h-screen">
            {sortedComponents.map((component) => (
              <ComponentRenderer key={component.id} component={component} theme={theme} />
            ))}
          </main>
        </LandingPageLoader>
      </ThemeProvider>
    );
  } catch (error) {
    console.error("Error rendering landing page:", error);
    notFound();
  }
}
