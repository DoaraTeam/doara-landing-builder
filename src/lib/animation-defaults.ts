/**
 * Utility to ensure all component configs have animation property
 */

import { ComponentConfig, AnimationConfig } from "@/types/landing";

/**
 * Default animation configs for different component types
 */
const DEFAULT_ANIMATIONS: Record<string, AnimationConfig> = {
  hero: { type: "fadeInUp", duration: 800, delay: 200 },
  features: { type: "fadeInUp", duration: 600, delay: 0 },
  pricing: { type: "fadeInUp", duration: 700, delay: 100 },
  testimonials: { type: "fadeInUp", duration: 700, delay: 100 },
  cta: { type: "zoomIn", duration: 800, delay: 100 },
  stats: { type: "fadeInUp", duration: 600, delay: 0 },
  team: { type: "fadeInUp", duration: 600, delay: 0 },
  faq: { type: "fadeInUp", duration: 600, delay: 0 },
  gallery: { type: "fadeIn", duration: 700, delay: 0 },
  "logo-cloud": { type: "fadeIn", duration: 600, delay: 0 },
  contact: { type: "fadeInUp", duration: 700, delay: 100 },
  content: { type: "fadeInUp", duration: 600, delay: 0 },
  newsletter: { type: "fadeInUp", duration: 700, delay: 100 },
  video: { type: "fadeIn", duration: 700, delay: 100 },
  footer: { type: "none", duration: 0, delay: 0 }, // Footer usually doesn't need animation
};

/**
 * Ensures a component config has animation property
 * If animation doesn't exist, adds default based on component type
 */
export function ensureAnimation(component: ComponentConfig): ComponentConfig {
  const config = component.config as Record<string, unknown>;

  // If animation already exists, return as is
  if ("animation" in config && config.animation) {
    return component;
  }

  // Get default animation for this component type
  const defaultAnimation = DEFAULT_ANIMATIONS[component.type] || {
    type: "fadeInUp",
    duration: 600,
    delay: 0,
  };

  // Add animation to config
  return {
    ...component,
    config: {
      ...config,
      animation: defaultAnimation,
    },
  };
}

/**
 * Ensures all components in an array have animation
 */
export function ensureAnimations(components: ComponentConfig[]): ComponentConfig[] {
  return components.map(ensureAnimation);
}
