/* eslint-disable @next/next/no-img-element */
"use client";

import { Theme, HeroConfig } from "@/types/landing";
import { Button } from "@/components/ui/button";
import { useEditMode } from "@/contexts/EditModeContext";
import { getBackgroundStyle } from "@/lib/background-utils";

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
  } = config;

  // Use CSS variables for theme colors (these are set by applyTheme())
  const primaryColor = "var(--color-primary)";
  const textColor = "var(--color-text)";
  const textMuted = "var(--color-text-muted)";
  const headingFont = "var(--font-heading)";
  const bodyFont = "var(--font-body)";

  // Alignment classes
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  // Spacing classes
  const paddingClass = spacing?.padding ? `py-${spacing.padding === "2xl" ? "24" : "20"}` : "py-20";

  return (
    <section
      className={`relative ${paddingClass} px-4 overflow-hidden`}
      style={getBackgroundStyle(background, theme?.colors.background)}
    >
      {/* Overlay for image backgrounds */}
      {background.type === "image" && background.image?.overlay && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: background.image.overlay,
            opacity: background.image.opacity || 0.5,
          }}
        />
      )}

      <div
        className={`relative z-10 flex flex-col ${alignmentClasses[alignment]} ${
          isEditMode && sidebarOpen ? "px-4 mx-auto max-w-none" : "container mx-auto"
        }`}
      >
        {/* Subtitle */}
        {subtitle && (
          <div
            className="text-sm font-semibold uppercase tracking-wider mb-4"
            style={{
              color: background.type === "gradient" ? "#ffffff" : primaryColor,
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl"
          style={{
            color:
              background.type === "gradient" || background.type === "image" ? "#ffffff" : textColor,
            fontFamily: headingFont,
          }}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          className="text-lg md:text-xl mb-8 max-w-2xl"
          style={{
            color:
              background.type === "gradient" || background.type === "image"
                ? "rgba(255,255,255,0.9)"
                : textMuted,
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
                  backgroundColor: primaryColor,
                  color: "#ffffff",
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
                  borderColor: background.type === "gradient" ? "#ffffff" : primaryColor,
                  color: background.type === "gradient" ? "#ffffff" : primaryColor,
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
