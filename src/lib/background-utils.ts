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
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance of a color
 * Formula from WCAG: https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Check if a color is dark (should use white text)
 */
function isColorDark(color: string): boolean {
  // Handle rgba/rgb
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbaMatch) {
    const luminance = getLuminance(
      parseInt(rgbaMatch[1]),
      parseInt(rgbaMatch[2]),
      parseInt(rgbaMatch[3])
    );
    return luminance < 0.5;
  }

  // Handle hex
  const rgb = hexToRgb(color);
  if (rgb) {
    const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
    return luminance < 0.5;
  }

  // Default: assume dark
  return true;
}

/**
 * Check if background should use light text (white) instead of dark text
 * @param background - Background configuration object
 * @returns true if background is dark and should use white text
 */
export function isBackgroundDark(background: BackgroundConfig): boolean {
  if (!background) return false;

  // For gradient backgrounds, check the "from" color
  if (background.type === "gradient" && background.gradient) {
    return isColorDark(background.gradient.from);
  }

  // For image backgrounds with overlay, check the overlay color
  if (background.type === "image" && background.image?.overlay) {
    return isColorDark(background.image.overlay);
  }

  // For image backgrounds without overlay, assume dark
  if (background.type === "image") {
    return true;
  }

  // For solid backgrounds, check the color
  if (background.type === "solid" && background.color) {
    return isColorDark(background.color);
  }

  // Default: use dark text
  return false;
}
