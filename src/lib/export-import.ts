"use client";

import { ComponentConfig } from "@/types/landing";

interface ExportImportData {
  version: string;
  timestamp: string;
  components: ComponentConfig[];
  metadata?: {
    title?: string;
    description?: string;
    author?: string;
  };
}

export class ExportImportManager {
  private static readonly VERSION = "1.0.0";

  static export(components: ComponentConfig[], metadata?: ExportImportData["metadata"]): string {
    const data: ExportImportData = {
      version: this.VERSION,
      timestamp: new Date().toISOString(),
      components,
      metadata,
    };

    return JSON.stringify(data, null, 2);
  }

  static downloadAsFile(
    components: ComponentConfig[],
    filename = "landing-page-template.json",
    metadata?: ExportImportData["metadata"]
  ): void {
    const jsonString = this.export(components, metadata);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static async import(jsonString: string): Promise<{
    components: ComponentConfig[];
    metadata?: ExportImportData["metadata"];
  }> {
    try {
      const data: ExportImportData = JSON.parse(jsonString);

      if (!this.validateImportData(data)) {
        throw new Error("Invalid import data format");
      }

      return {
        components: data.components,
        metadata: data.metadata,
      };
    } catch (error) {
      throw new Error(
        `Failed to import template: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  static async importFromFile(file: File): Promise<{
    components: ComponentConfig[];
    metadata?: ExportImportData["metadata"];
  }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (event) => {
        try {
          const jsonString = event.target?.result as string;
          const result = await this.import(jsonString);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      reader.readAsText(file);
    });
  }

  private static validateImportData(data: unknown): data is ExportImportData {
    if (typeof data !== "object" || data === null) {
      return false;
    }

    const obj = data as Record<string, unknown>;

    return (
      typeof obj.version === "string" &&
      typeof obj.timestamp === "string" &&
      Array.isArray(obj.components) &&
      obj.components.every(this.validateComponent)
    );
  }

  private static validateComponent(component: unknown): component is ComponentConfig {
    if (typeof component !== "object" || component === null) {
      return false;
    }

    const obj = component as Record<string, unknown>;

    return (
      typeof obj.id === "string" &&
      typeof obj.type === "string" &&
      typeof obj.config === "object" &&
      obj.config !== null
    );
  }

  static createTemplate(
    components: ComponentConfig[],
    name: string,
    description = ""
  ): ExportImportData {
    return {
      version: this.VERSION,
      timestamp: new Date().toISOString(),
      components,
      metadata: {
        title: name,
        description,
        author: "Landing Page Builder",
      },
    };
  }

  static getPresetTemplates(): ExportImportData[] {
    return [
      {
        version: this.VERSION,
        timestamp: new Date().toISOString(),
        metadata: {
          title: "Simple Business Template",
          description: "A clean template for business websites",
          author: "Landing Page Builder",
        },
        components: [
          {
            id: "hero-1",
            type: "hero",
            order: 0,
            visible: true,
            config: {
              title: "Welcome to Your Business",
              subtitle: "Transform your ideas into reality",
              description: "Get started with our amazing platform",
              primaryCTA: {
                text: "Get Started",
                link: "#contact",
                style: "primary" as const,
              },
              background: {
                type: "solid" as const,
                color: "blue-600",
              },
              animation: {
                type: "fadeIn" as const,
                duration: 1000,
              },
              spacing: {
                padding: "lg" as const,
                margin: "none" as const,
              },
              alignment: "center" as const,
            },
          },
          {
            id: "features-1",
            type: "features",
            order: 1,
            visible: true,
            config: {
              title: "Our Features",
              subtitle: "What makes us different",
              description: "Discover the amazing features we offer",
              features: [
                {
                  id: "feat-1",
                  icon: "⚡",
                  title: "Fast & Reliable",
                  description: "Lightning fast performance you can count on",
                },
                {
                  id: "feat-2",
                  icon: "🔒",
                  title: "Secure",
                  description: "Your data is protected with enterprise-grade security",
                },
                {
                  id: "feat-3",
                  icon: "📱",
                  title: "Mobile First",
                  description: "Optimized for all devices and screen sizes",
                },
              ],
              layout: "grid" as const,
              columns: 3,
              background: {
                type: "solid" as const,
                color: "white",
              },
              animation: {
                type: "fadeInUp" as const,
                duration: 800,
              },
              spacing: {
                padding: "lg" as const,
                margin: "none" as const,
              },
            },
          },
          {
            id: "cta-1",
            type: "cta",
            order: 2,
            visible: true,
            config: {
              title: "Get In Touch",
              subtitle: "Ready to start your project?",
              description: "Contact us today to get started",
              primaryCTA: {
                text: "Contact Us",
                link: "#contact",
                style: "primary" as const,
              },
              background: {
                type: "gradient" as const,
                gradient: {
                  from: "blue-600",
                  to: "purple-600",
                  direction: "to-r" as const,
                },
              },
              animation: {
                type: "fadeIn" as const,
                duration: 1000,
              },
              spacing: {
                padding: "xl" as const,
                margin: "none" as const,
              },
              alignment: "center" as const,
            },
          },
        ],
      },
    ];
  }
}