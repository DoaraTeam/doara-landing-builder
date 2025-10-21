"use client";

import { Theme, CTAConfig } from "@/types/landing";
import { Button } from "@/components/ui/button";

interface CTAProps {
  config: CTAConfig;
  theme?: Theme;
}

export function CTA({ config, theme }: CTAProps) {
  const { title, description, primaryCTA, secondaryCTA, background, spacing } = config;

  const primaryColor = theme?.colors.primary || "#3b82f6";
  const textColor = theme?.colors.text || "#111827";

  const getBackgroundStyle = () => {
    if (background.type === "gradient" && background.gradient) {
      const { from, to, direction = "to-r" } = background.gradient;
      return {
        background: `linear-gradient(${direction}, ${from}, ${to})`,
      };
    }
    if (background.type === "solid") {
      const color = background.color === "background" ? theme?.colors.background : background.color;
      return { backgroundColor: color };
    }
    return {};
  };

  const paddingClass = spacing?.padding === "xl" ? "py-20" : "py-16";
  const isGradient = background.type === "gradient";

  return (
    <section className={`${paddingClass} px-4`} style={getBackgroundStyle()}>
      <div className="container mx-auto text-center max-w-4xl">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{
            color: isGradient ? "#ffffff" : textColor,
            fontFamily: theme?.fonts.heading,
          }}
        >
          {title}
        </h2>

        <p
          className="text-lg md:text-xl mb-8"
          style={{
            color: isGradient ? "rgba(255,255,255,0.9)" : theme?.colors.textMuted,
            fontFamily: theme?.fonts.body,
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
                  backgroundColor: isGradient ? "#ffffff" : primaryColor,
                  color: isGradient ? primaryColor : "#ffffff",
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
                  borderColor: "#ffffff",
                  color: "#ffffff",
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
