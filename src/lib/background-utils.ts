/**
 * Background utilities for landing page components
 * Supports: solid colors, gradients, and background images with overlays
 */

export interface BackgroundConfig {
  type: "solid" | "gradient" | "image";
  color?: string;
  gradient?: {
    from: string;
    to: string;
    direction?: string;
  };
  image?: {
    url: string;
    overlay?: string; // Overlay color with opacity (e.g., "rgba(0,0,0,0.5)")
    position?: string; // CSS background-position (e.g., "center", "top left")
    size?: string; // CSS background-size (e.g., "cover", "contain")
  };
}

/**
 * Get CSS styles for background configuration
 * @param background - Background configuration object
 * @param fallbackColor - Fallback color if type is "solid" but no color specified
 * @returns CSS style object for background
 */
export function getBackgroundStyle(
  background: BackgroundConfig,
  fallbackColor: string = "var(--color-surface)"
): React.CSSProperties {
  // Gradient background
  if (background?.type === "gradient" && background?.gradient) {
    const { from, to, direction = "to-br" } = background?.gradient;
    return {
      background: `linear-gradient(${direction}, ${from}, ${to})`,
    };
  }

  // Image background
  if (background?.type === "image" && background?.image) {
    const { url, overlay, position = "center", size = "cover" } = background?.image;
    return {
      backgroundImage: overlay
        ? `linear-gradient(${overlay}, ${overlay}), url(${url})`
        : `url(${url})`,
      backgroundPosition: position,
      backgroundSize: size,
      backgroundRepeat: "no-repeat",
    };
  }

  // Solid color background (fallback)
  return {
    backgroundColor: background?.color || fallbackColor,
  };
}

/**
 * Check if background is using gradient or image (for text color adjustments)
 * @param background - Background configuration object
 * @returns true if background is gradient or image
 */
export function isBackgroundDark(background: BackgroundConfig): boolean {
  return background?.type === "gradient" || background?.type === "image";
}
