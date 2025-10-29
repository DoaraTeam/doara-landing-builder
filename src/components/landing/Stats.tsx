/* eslint-disable @next/next/no-img-element */
"use client";

import { Theme } from "@/types/landing";
import { BackgroundConfig, getBackgroundStyle, isBackgroundDark } from "@/lib/background-utils";
import { motion } from "framer-motion";
import { useStaggerAnimation } from "@/hooks/use-scroll-animation";
import { ensureAnimation } from "@/lib/animation-defaults";

interface Stat {
  id: string;
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
}

interface StatsConfig {
  title?: string;
  subtitle?: string;
  description?: string;
  stats: Stat[];
  layout?: "horizontal" | "grid";
  columns?: 2 | 3 | 4;
  background: BackgroundConfig;
  spacing?: {
    padding?: "md" | "lg" | "xl" | "2xl";
  };
  animation?: {
    type?:
      | "fadeIn"
      | "fadeInUp"
      | "fadeInDown"
      | "slideInLeft"
      | "slideInRight"
      | "zoomIn"
      | "none";
    duration?: number;
    delay?: number;
  };
}

interface StatsProps {
  config: StatsConfig;
  theme?: Theme;
}

export function Stats({ config, theme }: StatsProps) {
  const configWithAnimation = ensureAnimation(config, "stats");
  const {
    title,
    subtitle,
    description,
    stats,
    layout = "grid",
    columns = 4,
    background,
    spacing,
  } = configWithAnimation;

  const stagger = useStaggerAnimation(configWithAnimation.animation, 0.1);

  const primaryColor = "var(--color-primary)";
  const textColor = "var(--color-text)";
  const textMuted = "var(--color-text-muted)";
  const headingFont = "var(--font-heading)";
  const bodyFont = "var(--font-body)";

  const isDarkBg = isBackgroundDark(background);

  const gridColsClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  const paddingClass =
    spacing?.padding === "2xl" ? "py-24" : spacing?.padding === "xl" ? "py-20" : "py-16";

  return (
    <section className={`${paddingClass} px-4`} style={getBackgroundStyle(background)}>
      <div className="container mx-auto">
        {/* Header */}
        {(title || subtitle || description) && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            {subtitle && (
              <div
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: isDarkBg ? "#ffffff" : primaryColor }}
              >
                {subtitle}
              </div>
            )}

            {title && (
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{
                  color: isDarkBg ? "#ffffff" : textColor,
                  fontFamily: headingFont,
                }}
              >
                {title}
              </h2>
            )}

            {description && (
              <p
                className="text-lg"
                style={{
                  color: isDarkBg ? "rgba(255,255,255,0.9)" : textMuted,
                  fontFamily: bodyFont,
                }}
              >
                {description}
              </p>
            )}
          </div>
        )}

        {/* Stats */}
        <motion.div
          className={`grid grid-cols-1 ${
            layout === "horizontal" ? "md:grid-cols-" + stats.length : gridColsClass[columns]
          } gap-8`}
          variants={stagger.containerVariants}
          initial="hidden"
          animate={stagger.controls}
          ref={stagger.ref}
        >
          {stats.map((stat) => (
            <motion.div key={stat.id} className="text-center" variants={stagger.itemVariants}>
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{
                  color: isDarkBg ? "#ffffff" : primaryColor,
                  fontFamily: headingFont,
                }}
              >
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </div>
              <div
                className="text-base md:text-lg font-medium"
                style={{
                  color: isDarkBg ? "rgba(255,255,255,0.9)" : textMuted,
                  fontFamily: bodyFont,
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
