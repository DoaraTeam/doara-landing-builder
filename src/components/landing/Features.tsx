/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { Theme, FeaturesConfig } from "@/types/landing";
import { getBackgroundStyle, isBackgroundDark } from "@/lib/background-utils";
import { getLayoutClasses } from "@/lib/layout-utils";
import { useStaggerAnimation } from "@/hooks/use-scroll-animation";

interface FeaturesProps {
  config: FeaturesConfig;
  theme?: Theme;
}

export function Features({ config }: FeaturesProps) {
  const {
    title,
    subtitle,
    description,
    features,
    columns = 3,
    background,
    spacing,
    containerWidth,
    animation,
  } = config;

  // Use stagger animation for the features grid
  const stagger = useStaggerAnimation({
    animation: animation || { type: "fadeInUp", duration: 600 },
    staggerDelay: 0.1,
  });

  // Use CSS variables for theme colors
  const primaryColor = "var(--color-primary)";
  const textColor = "var(--color-text)";
  const textMuted = "var(--color-text-muted)";
  const surfaceColor = "var(--color-surface)";
  const bgColor = "var(--color-background)";
  const headingFont = "var(--font-heading)";
  const bodyFont = "var(--font-body)";

  // Check if background is dark
  const isDarkBg = isBackgroundDark(background);

  // Layout classes
  const layout = getLayoutClasses({ spacing, containerWidth, columns });

  return (
    <section
      id="features"
      className={`${layout.section}`}
      style={getBackgroundStyle(background, bgColor)}
    >
      <div className={layout.container}>
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          {subtitle && (
            <div
              className="text-xs font-semibold uppercase tracking-wide mb-3"
              style={{ color: isDarkBg ? "rgba(255,255,255,0.8)" : primaryColor }}
            >
              {subtitle}
            </div>
          )}

          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: isDarkBg ? "#ffffff" : textColor, fontFamily: headingFont }}
          >
            {title}
          </h2>

          {description && (
            <p
              className="text-base md:text-lg"
              style={{
                color: isDarkBg ? "rgba(255,255,255,0.85)" : textMuted,
                fontFamily: bodyFont,
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Features Grid with Stagger Animation */}
        <motion.div
          ref={stagger.ref}
          initial="hidden"
          animate={stagger.animate}
          variants={stagger.containerVariants}
          className={`grid ${layout.grid} gap-6`}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={stagger.itemVariants}
              className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              style={{
                backgroundColor: isDarkBg ? "rgba(255,255,255,0.08)" : surfaceColor,
                border: isDarkBg ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e5e7eb",
              }}
            >
              {/* Feature Image */}
              {feature.image && (
                <div className="mb-5 -mx-6 -mt-6 overflow-hidden rounded-t-xl">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Icon */}
              {feature.icon && <div className="text-4xl mb-4 inline-block">{feature.icon}</div>}

              {/* Title */}
              <h3
                className="text-lg md:text-xl font-semibold mb-2"
                style={{ color: isDarkBg ? "#ffffff" : textColor, fontFamily: headingFont }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{
                  color: isDarkBg ? "rgba(255,255,255,0.75)" : textMuted,
                  fontFamily: bodyFont,
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
