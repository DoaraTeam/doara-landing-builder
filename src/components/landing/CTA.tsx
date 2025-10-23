"use client";

import { Theme, CTAConfig } from "@/types/landing";
import { Button } from "@/components/ui/button";
import { getBackgroundStyle, isBackgroundDark } from "@/lib/background-utils";
import { getLayoutClasses } from "@/lib/layout-utils";

interface CTAProps {
  config: CTAConfig;
  theme?: Theme;
}

export function CTA({ config }: CTAProps) {
  const {
    title,
    description,
    primaryCTA,
    secondaryCTA,
    background,
    spacing,
    alignment = "center",
    containerWidth,
  } = config;

  // Use CSS variables for theme colors
  const primaryColor = "var(--color-primary)";
  const textColor = "var(--color-text)";
  const textMuted = "var(--color-text-muted)";
  const bgColor = "var(--color-background)";
  const headingFont = "var(--font-heading)";
  const bodyFont = "var(--font-body)";

  const isDarkBg = isBackgroundDark(background);
  const layout = getLayoutClasses({ spacing, containerWidth, alignment });

  return (
    <section className={`${layout.section}`} style={getBackgroundStyle(background, bgColor)}>
      <div className={`${layout.container} ${layout.alignment} max-w-4xl`}>
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{
            color: isDarkBg ? "#ffffff" : textColor,
            fontFamily: headingFont,
          }}
        >
          {title}
        </h2>

        <p
          className="text-lg md:text-xl mb-8"
          style={{
            color: isDarkBg ? "rgba(255,255,255,0.9)" : textMuted,
            fontFamily: bodyFont,
          }}
        >
          {description}
        </p>

        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-wrap gap-4 justify-center">
            {primaryCTA && (
              <Button
                asChild
                size="lg"
                style={{
                  backgroundColor: isDarkBg ? "#ffffff" : primaryColor,
                  color: isDarkBg ? "#000000" : "#ffffff",
                }}
                className="hover:opacity-90 transition-opacity"
              >
                <a href={primaryCTA.link}>{primaryCTA.text}</a>
              </Button>
            )}
            {secondaryCTA && (
              <Button
                asChild
                size="lg"
                variant="outline"
                style={{
                  borderColor: isDarkBg ? "#ffffff" : primaryColor,
                  color: isDarkBg ? "#ffffff" : primaryColor,
                  backgroundColor: isDarkBg ? "transparent" : "transparent",
                }}
                className="hover:opacity-80 transition-opacity"
              >
                <a href={secondaryCTA.link}>{secondaryCTA.text}</a>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
