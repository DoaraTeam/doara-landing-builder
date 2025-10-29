/* eslint-disable @next/next/no-img-element */
"use client";

import { Theme } from "@/types/landing";
import { BackgroundConfig, getBackgroundStyle, isBackgroundDark } from "@/lib/background-utils";
import { motion } from "framer-motion";
import { useStaggerAnimation } from "@/hooks/use-scroll-animation";

interface LogoItem {
  name: string;
  url: string;
  link?: string;
}

interface LogoCloudConfig {
  title?: string;
  subtitle?: string;
  description?: string;
  logos: LogoItem[];
  layout?: "grid" | "scroll";
  grayscale?: boolean;
  logoSize?: "small" | "medium" | "large";
  logoSpacing?: "tight" | "normal" | "relaxed";
  gridColumns?: number;
  hoverEffect?: "none" | "scale" | "lift" | "glow";
  logoOpacity?: number;
  logoBg?: "none" | "white" | "light" | "bordered";
  background: BackgroundConfig;
  spacing?: {
    padding?: "sm" | "md" | "lg" | "xl";
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

interface LogoCloudProps {
  config: LogoCloudConfig;
  theme?: Theme;
}

export function LogoCloud({ config }: LogoCloudProps) {
  const {
    title,
    subtitle,
    description,
    logos = [],
    layout = "grid",
    grayscale = true,
    logoSize = "medium",
    logoSpacing = "normal",
    gridColumns = 6,
    hoverEffect = "scale",
    logoOpacity = 70,
    logoBg = "none",
    background,
    spacing,
    animation,
  } = config;

  const stagger = useStaggerAnimation(animation, 0.08);

  const primaryColor = "var(--color-primary)";
  const textColor = "var(--color-text)";
  const textMuted = "var(--color-text-muted)";
  const bgColor = "var(--color-background)";
  const headingFont = "var(--font-heading)";
  const bodyFont = "var(--font-body)";

  const isDarkBg = isBackgroundDark(background);

  const paddingClass =
    spacing?.padding === "xl"
      ? "py-20"
      : spacing?.padding === "lg"
        ? "py-16"
        : spacing?.padding === "sm"
          ? "py-8"
          : "py-12";

  // Logo size classes
  const logoSizeClass =
    logoSize === "small" ? "max-h-10" : logoSize === "large" ? "max-h-20" : "max-h-16";

  // Logo spacing classes
  const spacingClass =
    logoSpacing === "tight" ? "gap-4" : logoSpacing === "relaxed" ? "gap-12" : "gap-8";

  // Grid columns class - using safe classes for Tailwind
  const getGridColsClass = () => {
    const colsMap: Record<number, string> = {
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
      5: "lg:grid-cols-5",
      6: "lg:grid-cols-6",
      8: "lg:grid-cols-8",
    };
    return `grid-cols-2 md:grid-cols-3 ${colsMap[gridColumns] || "lg:grid-cols-6"}`;
  };

  // Hover effect classes
  const getHoverEffectClass = () => {
    switch (hoverEffect) {
      case "lift":
        return "hover:shadow-lg hover:-translate-y-1";
      case "glow":
        return "hover:shadow-xl hover:shadow-blue-200";
      case "scale":
        return "hover:scale-110";
      default:
        return "";
    }
  };

  // Logo background classes
  const logoBgClass =
    logoBg === "white"
      ? "bg-white p-4 rounded-lg"
      : logoBg === "light"
        ? "bg-gray-50 p-4 rounded-lg"
        : logoBg === "bordered"
          ? "border border-gray-200 p-4 rounded-lg"
          : "";

  return (
    <section className={`${paddingClass} px-4`} style={getBackgroundStyle(background, bgColor)}>
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
                className="text-2xl md:text-3xl font-bold mb-4"
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
                className="text-base"
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

        {/* Logos Grid */}
        {logos && logos.length > 0 ? (
          <>
            {layout === "grid" && (
              <motion.div
                className={`grid ${getGridColsClass()} ${spacingClass} items-center`}
                variants={stagger.containerVariants}
                initial="hidden"
                animate={stagger.animate}
                ref={stagger.ref}
              >
                {logos.map((logo, index) => (
                  <motion.div
                    key={`${logo.name}-${index}`}
                    className={`flex items-center justify-center h-20 p-4 transition-all ${getHoverEffectClass()} ${logoBgClass}`}
                    variants={stagger.itemVariants}
                  >
                    {logo.link ? (
                      <a href={logo.link} target="_blank" rel="noopener noreferrer">
                        <img
                          src={logo.url}
                          alt={logo.name}
                          className={`${logoSizeClass} max-w-full w-auto object-contain ${grayscale ? "grayscale hover:grayscale-0" : ""} transition-all`}
                          style={{ opacity: grayscale ? logoOpacity / 100 : 0.9 }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://via.placeholder.com/150x50/cccccc/666666?text=${encodeURIComponent(logo.name)}`;
                          }}
                        />
                      </a>
                    ) : (
                      <img
                        src={logo.url}
                        alt={logo.name}
                        className={`${logoSizeClass} max-w-full w-auto object-contain ${grayscale ? "grayscale" : ""}`}
                        style={{ opacity: grayscale ? logoOpacity / 100 : 0.9 }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/150x50/cccccc/666666?text=${encodeURIComponent(logo.name)}`;
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Scrolling Logos */}
            {layout === "scroll" && (
              <div className="relative overflow-hidden">
                <div className="flex animate-scroll">
                  {[...logos, ...logos].map((logo, index) => (
                    <div
                      key={`${logo.name}-scroll-${index}`}
                      className={`flex-shrink-0 flex items-center justify-center h-20 px-8 ${logoBgClass}`}
                    >
                      <img
                        src={logo.url}
                        alt={logo.name}
                        className={`${logoSizeClass} w-auto object-contain ${grayscale ? "grayscale" : ""}`}
                        style={{ opacity: grayscale ? logoOpacity / 100 : 0.9 }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/150x50/cccccc/666666?text=${encodeURIComponent(logo.name)}`;
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p style={{ color: isDarkBg ? "rgba(255,255,255,0.7)" : textMuted }}>
              No logos to display
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
