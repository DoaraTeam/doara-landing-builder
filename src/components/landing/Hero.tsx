/* eslint-disable @next/next/no-img-element */
"use client";

import { Theme, HeroConfig } from "@/types/landing";
import { Button } from "@/components/ui/button";
import { useEditMode } from "@/contexts/EditModeContext";
import { getBackgroundStyle, isBackgroundDark } from "@/lib/background-utils";
import { getLayoutClasses } from "@/lib/layout-utils";

interface HeroProps {
  config: HeroConfig;
  theme?: Theme;
}

export function Hero({ config, theme }: HeroProps) {
  const { isEditMode, sidebarOpen } = useEditMode();
  const {
    title,
    subtitle,
    description,
    primaryCTA,
    secondaryCTA,
    image,
    alignment = "center",
    background,
    spacing,
    containerWidth,
  } = config;

  // Use CSS variables for theme colors (these are set by applyTheme())
  const primaryColor = "var(--color-primary)";
  const textColor = "var(--color-text)";
  const textMuted = "var(--color-text-muted)";
  const headingFont = "var(--font-heading)";
  const bodyFont = "var(--font-body)";

  // Check if background is dark
  const isDarkBg = isBackgroundDark(background);

  // Layout classes
  const layout = getLayoutClasses({ spacing, containerWidth, alignment });

  return (
    <section
      className={`relative ${layout.section} overflow-hidden`}
      style={getBackgroundStyle(background, theme?.colors.background)}
    >
      {/* Overlay for image backgrounds - handled in getBackgroundStyle */}

      <div
        className={`relative z-10 flex flex-col ${layout.alignment} ${
          isEditMode && sidebarOpen ? "px-4 mx-auto max-w-none" : layout.container
        }`}
      >
        {/* Subtitle */}
        {subtitle && (
          <div
            className="text-sm font-semibold uppercase tracking-wider mb-4"
            style={{
              color: isDarkBg ? "#ffffff" : primaryColor,
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl"
          style={{
            color: isDarkBg ? "#ffffff" : textColor,
            fontFamily: headingFont,
          }}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          className="text-lg md:text-xl mb-8 max-w-2xl"
          style={{
            color: isDarkBg ? "rgba(255,255,255,0.9)" : textMuted,
            fontFamily: bodyFont,
          }}
        >
          {description}
        </p>

        {/* CTAs */}
        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-wrap gap-4">
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
                  backgroundColor: "transparent",
                }}
                className="hover:opacity-80 transition-opacity"
              >
                <a href={secondaryCTA.link}>{secondaryCTA.text}</a>
              </Button>
            )}
          </div>
        )}

        {/* Hero Image */}
        {image && (
          <div className="mt-12 w-full max-w-5xl">
            <img src={image} alt={title} className="w-full h-auto rounded-lg shadow-2xl" />
          </div>
        )}
      </div>
    </section>
  );
}
