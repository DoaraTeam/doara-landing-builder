/**
 * Layout utilities for landing page components
 * Provides consistent spacing, alignment, and container width handling
 */

export interface SpacingConfig {
  padding?: string;
  margin?: string;
}

/**
 * Get container max-width class based on containerWidth setting
 */
export function getContainerClass(width?: string): string {
  const containerMap: Record<string, string> = {
    xs: "max-w-md mx-auto", // 448px - Extra small, perfect for forms
    sm: "max-w-lg mx-auto", // 512px - Small, good for focused content
    md: "max-w-2xl mx-auto", // 672px - Medium, blog posts
    narrow: "max-w-3xl mx-auto", // 768px - Narrow, single column content
    lg: "max-w-4xl mx-auto", // 896px - Large, articles
    default: "max-w-7xl mx-auto", // 1280px - Default container
    wide: "max-w-[1536px] mx-auto", // 1536px - Wide layouts
    xl: "max-w-[1600px] mx-auto", // 1600px - Extra wide
    "2xl": "max-w-[1800px] mx-auto", // 1800px - Ultra wide
    full: "w-full px-4", // Full width with padding
    fullscreen: "w-screen", // True fullscreen, no padding
  };

  return containerMap[width || "default"] || containerMap.default;
}

/**
 * Get padding class based on spacing configuration
 */
export function getPaddingClass(spacing?: SpacingConfig | string): string {
  if (!spacing) return "py-16 px-4";

  // Handle legacy string format
  if (typeof spacing === "string") {
    return getPaddingFromString(spacing);
  }

  const paddingValue = spacing.padding || "xl";
  return getPaddingFromString(paddingValue);
}

function getPaddingFromString(padding: string): string {
  const paddingMap: Record<string, string> = {
    none: "py-0 px-4",
    sm: "py-8 px-4",
    md: "py-12 px-4",
    lg: "py-16 px-4",
    xl: "py-20 px-4",
    "2xl": "py-24 px-4",
  };

  return paddingMap[padding] || paddingMap.xl;
}

/**
 * Get margin class based on spacing configuration
 */
export function getMarginClass(spacing?: SpacingConfig | string): string {
  if (!spacing) return "";

  // Handle legacy string format
  if (typeof spacing === "string") return "";

  const marginValue = spacing.margin || "none";

  const marginMap: Record<string, string> = {
    none: "",
    sm: "my-4",
    md: "my-8",
    lg: "my-12",
    xl: "my-16",
  };

  return marginMap[marginValue] || "";
}

/**
 * Get full spacing classes (padding + margin)
 */
export function getSpacingClasses(spacing?: SpacingConfig | string): string {
  const padding = getPaddingClass(spacing);
  const margin = getMarginClass(spacing);

  return `${padding} ${margin}`.trim();
}

/**
 * Get text alignment classes
 */
export function getAlignmentClass(alignment?: string): string {
  const alignmentMap: Record<string, string> = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return alignmentMap[alignment || "center"] || alignmentMap.center;
}

/**
 * Get grid columns classes
 */
export function getGridColumnsClass(columns?: number): string {
  const columnsMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 md:grid-cols-4 lg:grid-cols-6",
  };

  return columnsMap[columns || 3] || columnsMap[3];
}

/**
 * Combined layout classes for component sections
 */
export interface LayoutConfig {
  spacing?: SpacingConfig | string;
  containerWidth?: string;
  alignment?: string;
  columns?: number;
}

export function getLayoutClasses(config: LayoutConfig): {
  section: string;
  container: string;
  alignment: string;
  grid: string;
} {
  return {
    section: getSpacingClasses(config.spacing),
    container: getContainerClass(config.containerWidth),
    alignment: getAlignmentClass(config.alignment),
    grid: getGridColumnsClass(config.columns),
  };
}
