"use client";

import { Theme, CTAConfig } from "@/types/landing";
import { Button } from "@/components/ui/button";
import { getBackgroundStyle, isBackgroundDark } from "@/lib/background-utils";

interface CTAProps {
  config: CTAConfig;
  theme?: Theme;
}

export function CTA({ config, theme }: CTAProps) {
  const { title, description, primaryCTA, secondaryCTA, background, spacing } = config;

  // Use CSS variables for theme colors
  const primaryColor = "var(--color-primary)";
  const textColor = "var(--color-text)";
  const textMuted = "var(--color-text-muted)";
  const bgColor = "var(--color-background)";
  const headingFont = "var(--font-heading)";
  const bodyFont = "var(--font-body)";

  const paddingClass = spacing?.padding === "xl" ? "py-20" : "py-16";
  const isDarkBg = isBackgroundDark(background);

  return (
    <section className={`${paddingClass} px-4`} style={getBackgroundStyle(background, bgColor)}>
      <div className="container mx-auto text-center max-w-4xl">
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
                  color: isDarkBg ? primaryColor : "#ffffff",
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
                  borderColor: isDarkBg ? "#ffffff" : textColor,
                  color: isDarkBg ? "#ffffff" : textColor,
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
