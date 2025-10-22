/* eslint-disable @next/next/no-img-element */
"use client";

import { Theme } from "@/types/landing";

interface LogoItem {
  id: string;
  name: string;
  image: string;
  url?: string;
}

interface LogoCloudConfig {
  title?: string;
  subtitle?: string;
  description?: string;
  logos: LogoItem[];
  layout?: "grid" | "scroll";
  grayscale?: boolean;
  background: {
    type: "solid";
    color?: string;
  };
  spacing?: {
    padding?: "sm" | "md" | "lg";
  };
}

interface LogoCloudProps {
  config: LogoCloudConfig;
  theme?: Theme;
}

export function LogoCloud({ config, theme }: LogoCloudProps) {
  const {
    title,
    subtitle,
    description,
    logos,
    layout = "grid",
    grayscale = true,
    background,
    spacing,
  } = config;

  const primaryColor = "var(--color-primary)";
  const textColor = "var(--color-text)";
  const textMuted = "var(--color-text-muted)";
  const surfaceColor = "var(--color-surface)";
  const headingFont = "var(--font-heading)";
  const bodyFont = "var(--font-body)";

  const getBackgroundColor = () => {
    if (background.color === "background") return "var(--color-background)";
    if (background.color === "surface") return surfaceColor;
    return background.color || "#ffffff";
  };

  const paddingClass =
    spacing?.padding === "lg" ? "py-16" : spacing?.padding === "sm" ? "py-8" : "py-12";

  return (
    <section className={`${paddingClass} px-4`} style={{ backgroundColor: getBackgroundColor() }}>
      <div className="container mx-auto">
        {/* Header */}
        {(title || subtitle || description) && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            {subtitle && (
              <div
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: primaryColor }}
              >
                {subtitle}
              </div>
            )}

            {title && (
              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: textColor, fontFamily: headingFont }}
              >
                {title}
              </h2>
            )}

            {description && (
              <p className="text-base" style={{ color: textMuted, fontFamily: bodyFont }}>
                {description}
              </p>
            )}
          </div>
        )}

        {/* Logos Grid */}
        {layout === "grid" && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="flex items-center justify-center h-16 transition-all hover:scale-110"
              >
                {logo.url ? (
                  <a href={logo.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={logo.image}
                      alt={logo.name}
                      className={`max-h-12 w-auto object-contain ${grayscale ? "grayscale hover:grayscale-0 opacity-70 hover:opacity-100" : "opacity-90 hover:opacity-100"} transition-all`}
                    />
                  </a>
                ) : (
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className={`max-h-12 w-auto object-contain ${grayscale ? "grayscale opacity-70" : "opacity-90"}`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Scrolling Logos */}
        {layout === "scroll" && (
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center h-16 px-8"
                >
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className={`max-h-12 w-auto object-contain ${grayscale ? "grayscale opacity-70" : "opacity-90"}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
