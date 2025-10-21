// ========================
// CORE TYPES
// ========================

/**
 * Component types available in the builder
 */
export type ComponentType =
  | "hero"
  | "features"
  | "pricing"
  | "testimonials"
  | "cta"
  | "footer"
  | "gym-hero"
  | "gym-services"
  | "gym-pricing"
  | "gym-testimonials"
  | "gym-navigation"
  | "gym-about"
  | "gym-contact";

/**
 * Background configuration for components
 */
export interface BackgroundConfig {
  type: "solid" | "gradient" | "image";
  color?: string; // Theme color key or hex
  gradient?: {
    from: string;
    to: string;
    direction?: "to-r" | "to-l" | "to-t" | "to-b" | "to-br" | "to-bl";
  };
  image?: {
    url: string;
    opacity?: number;
    overlay?: string;
  };
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  type: "none" | "fadeIn" | "fadeInUp" | "fadeInDown" | "slideInLeft" | "slideInRight" | "zoomIn";
  duration?: number; // milliseconds
  delay?: number; // milliseconds
}

/**
 * Spacing configuration
 */
export interface SpacingConfig {
  padding?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  margin?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
}

// ========================
// COMPONENT CONFIGS
// ========================

/**
 * Hero section configuration
 */
export interface HeroConfig {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA?: {
    text: string;
    link: string;
    style?: "primary" | "secondary" | "outline";
  };
  secondaryCTA?: {
    text: string;
    link: string;
    style?: "primary" | "secondary" | "outline";
  };
  image?: string;
  alignment?: "left" | "center" | "right";
  background: BackgroundConfig;
  animation: AnimationConfig;
  spacing: SpacingConfig;
}

/**
 * Feature item
 */
export interface FeatureItem {
  id: string;
  icon?: string; // Icon name or emoji
  title: string;
  description: string;
  image?: string;
}

/**
 * Features section configuration
 */
export interface FeaturesConfig {
  title: string;
  subtitle?: string;
  description?: string;
  features: FeatureItem[];
  layout?: "grid" | "list" | "carousel";
  columns?: 2 | 3 | 4;
  background: BackgroundConfig;
  animation: AnimationConfig;
  spacing: SpacingConfig;
}

/**
 * Pricing plan
 */
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  period?: string; // e.g., "/month", "/year"
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

/**
 * Pricing section configuration
 */
export interface PricingConfig {
  title: string;
  subtitle?: string;
  description?: string;
  plans: PricingPlan[];
  background: BackgroundConfig;
  animation: AnimationConfig;
  spacing: SpacingConfig;
}

/**
 * Testimonial item
 */
export interface TestimonialItem {
  id: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: number; // 1-5
  text: string;
}

/**
 * Testimonials section configuration
 */
export interface TestimonialsConfig {
  title: string;
  subtitle?: string;
  description?: string;
  testimonials: TestimonialItem[];
  layout?: "grid" | "carousel" | "masonry";
  background: BackgroundConfig;
  animation: AnimationConfig;
  spacing: SpacingConfig;
}

/**
 * CTA (Call to Action) section configuration
 */
export interface CTAConfig {
  title: string;
  description: string;
  primaryCTA?: {
    text: string;
    link: string;
    style?: "primary" | "secondary" | "outline";
  };
  secondaryCTA?: {
    text: string;
    link: string;
    style?: "primary" | "secondary" | "outline";
  };
  background: BackgroundConfig;
  animation: AnimationConfig;
  spacing: SpacingConfig;
}

/**
 * Footer link
 */
export interface FooterLink {
  text: string;
  link: string;
}

/**
 * Footer column
 */
export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

/**
 * Social link
 */
export interface SocialLink {
  platform: "facebook" | "twitter" | "instagram" | "linkedin" | "youtube" | "github";
  url: string;
}

/**
 * Footer configuration
 */
export interface FooterConfig {
  logo?: string;
  tagline?: string;
  columns: FooterColumn[];
  social?: SocialLink[];
  copyright?: string;
  background: BackgroundConfig;
  spacing: SpacingConfig;
}

// ========================
// THEME SYSTEM
// ========================

/**
 * Color scheme for theme
 */
export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
}

/**
 * Font scheme for theme
 */
export interface FontScheme {
  heading: string;
  body: string;
}

/**
 * Theme configuration
 */
export interface Theme {
  name: string;
  colors: ColorScheme;
  fonts: FontScheme;
  borderRadius: string;
  shadows: "none" | "sm" | "md" | "lg" | "xl" | "modern";
}

// ========================
// PAGE & CONFIG SYSTEM
// ========================

/**
 * SEO configuration for landing page
 */
export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

/**
 * Component configuration (generic wrapper)
 */
export interface ComponentConfig {
  id: string;
  type: ComponentType;
  order: number;
  visible: boolean;
  config:
    | HeroConfig
    | FeaturesConfig
    | PricingConfig
    | TestimonialsConfig
    | CTAConfig
    | FooterConfig
    | Record<string, unknown>; // Allow custom component configs
}

/**
 * Navigation link
 */
export interface NavigationLink {
  text: string;
  link: string;
}

/**
 * Navigation configuration
 */
export interface Navigation {
  logo?: string;
  links: NavigationLink[];
}

/**
 * Landing page configuration
 */
export interface LandingPage {
  id: string;
  title: string;
  description: string;
  slug: string;
  theme: string; // Reference to theme ID
  seo: SEOConfig;
  components: ComponentConfig[];
  createdAt?: string;
  updatedAt?: string;
  status?: "draft" | "published" | "archived";
}

/**
 * Metadata for landing config
 */
export interface Metadata {
  lastUpdated: string;
  totalPages: number;
  version: string;
}

/**
 * Complete landing configuration (root of landing-config.json)
 */
export interface LandingConfig {
  version: string;
  metadata: Metadata;
  themes: Record<string, Theme>;
  pages: Record<string, LandingPage>;
  navigation?: Navigation;
}

// ========================
// TYPE GUARDS
// ========================

export function isHeroConfig(config: unknown): config is HeroConfig {
  return (
    typeof config === "object" &&
    config !== null &&
    "title" in config &&
    "subtitle" in config &&
    "description" in config &&
    typeof config.title === "string" &&
    typeof config.subtitle === "string" &&
    typeof config.description === "string"
  );
}

export function isFeaturesConfig(config: unknown): config is FeaturesConfig {
  return (
    typeof config === "object" &&
    config !== null &&
    "title" in config &&
    "features" in config &&
    typeof config.title === "string" &&
    Array.isArray(config.features)
  );
}

export function isPricingConfig(config: unknown): config is PricingConfig {
  return (
    typeof config === "object" &&
    config !== null &&
    "title" in config &&
    "plans" in config &&
    typeof config.title === "string" &&
    Array.isArray(config.plans)
  );
}

export function isTestimonialsConfig(config: unknown): config is TestimonialsConfig {
  return (
    typeof config === "object" &&
    config !== null &&
    "title" in config &&
    "testimonials" in config &&
    typeof config.title === "string" &&
    Array.isArray(config.testimonials)
  );
}

export function isCTAConfig(config: unknown): config is CTAConfig {
  return (
    typeof config === "object" &&
    config !== null &&
    "title" in config &&
    "description" in config &&
    typeof config.title === "string" &&
    typeof config.description === "string"
  );
}

export function isFooterConfig(config: unknown): config is FooterConfig {
  return (
    typeof config === "object" &&
    config !== null &&
    "columns" in config &&
    Array.isArray(config.columns)
  );
}

export function isValidComponentType(type: string): type is ComponentType {
  const validTypes: ComponentType[] = [
    "hero",
    "features",
    "pricing",
    "testimonials",
    "cta",
    "footer",
    "gym-hero",
    "gym-services",
    "gym-pricing",
    "gym-testimonials",
    "gym-navigation",
    "gym-about",
    "gym-contact",
  ];
  return validTypes.includes(type as ComponentType);
}

// ========================
// UTILITY TYPES
// ========================

/**
 * Props for component renderer
 */
export interface ComponentRendererProps {
  component: ComponentConfig;
  theme?: Theme;
}

/**
 * Props for editable components (admin mode)
 */
export interface EditableComponentProps {
  component: ComponentConfig;
  theme?: Theme;
  onUpdate: (updated: ComponentConfig) => void;
  onDelete: (id: string) => void;
  isSelected?: boolean;
  onSelect?: () => void;
}
