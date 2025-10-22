/* eslint-disable @next/next/no-img-element */
"use client";

import { Theme, FeaturesConfig } from "@/types/landing";
import { Card, CardContent } from "@/components/ui/card";

interface FeaturesProps {
  config: FeaturesConfig;
  theme?: Theme;
}

export function Features({ config, theme }: FeaturesProps) {
  const {
    title,
    subtitle,
    description,
    features,
    layout = "grid",
    columns = 3,
    background,
    spacing,
  } = config;

  // Use CSS variables for theme colors
  const primaryColor = "var(--color-primary)";
  const textColor = "var(--color-text)";
  const textMuted = "var(--color-text-muted)";
  const surfaceColor = "var(--color-surface)";
  const bgColor = "var(--color-background)";
  const headingFont = "var(--font-heading)";
  const bodyFont = "var(--font-body)";

  // Background styles
  const getBackgroundColor = () => {
    if (background.type === "solid") {
      if (background.color === "background") return bgColor;
      if (background.color === "surface") return surfaceColor;
      return background.color;
    }
    return bgColor;
  };

  // Grid columns class
  const gridColsClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  const paddingClass = spacing?.padding === "xl" ? "py-20" : "py-16";

  return (
    <section className={`${paddingClass} px-4`} style={{ backgroundColor: getBackgroundColor() }}>
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          {subtitle && (
            <div
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: primaryColor }}
            >
              {subtitle}
            </div>
          )}

          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: textColor, fontFamily: headingFont }}
          >
            {title}
          </h2>

          {description && (
            <p className="text-lg" style={{ color: textMuted, fontFamily: bodyFont }}>
              {description}
            </p>
          )}
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-1 ${gridColsClass[columns]} gap-8`}>
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="border-none shadow-sm hover:shadow-md transition-shadow"
              style={{
                backgroundColor:
                  background.type === "solid" && background.color === "surface"
                    ? bgColor
                    : surfaceColor,
              }}
            >
              <CardContent className="p-6">
                {/* Icon */}
                {feature.icon && <div className="text-4xl mb-4">{feature.icon}</div>}

                {/* Feature Image */}
                {feature.image && (
                  <div className="mb-4">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Title */}
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: textColor, fontFamily: headingFont }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-base" style={{ color: textMuted, fontFamily: bodyFont }}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
