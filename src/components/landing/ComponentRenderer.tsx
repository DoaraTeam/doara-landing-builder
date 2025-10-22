"use client";

import { ComponentConfig, Theme } from "@/types/landing";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { Pricing } from "./Pricing";
import { Testimonials } from "./Testimonials";
import { CTA } from "./CTA";
import { Footer } from "./Footer";
import { Stats } from "./Stats";
import { Team } from "./Team";
import { FAQ } from "./FAQ";
import { Gallery } from "./Gallery";
import { LogoCloud } from "./LogoCloud";
import { Contact } from "./Contact";
import { Content } from "./Content";
import { Newsletter } from "./Newsletter";
import { Video } from "./Video";

interface ComponentRendererProps {
  component: ComponentConfig;
  theme?: Theme;
}

/**
 * ComponentRenderer - Routes component types to their implementations
 * This is the main router for rendering landing page components
 */
export function ComponentRenderer({ component, theme }: ComponentRendererProps) {
  const { type, config, visible } = component;

  // Don't render invisible components in public view
  if (visible === false) {
    return null;
  }

  switch (type) {
    case "hero":
      return <Hero config={config as never} theme={theme} />;

    case "features":
      return <Features config={config as never} theme={theme} />;

    case "pricing":
      return <Pricing config={config as never} theme={theme} />;

    case "testimonials":
      return <Testimonials config={config as never} theme={theme} />;

    case "cta":
      return <CTA config={config as never} theme={theme} />;

    case "footer":
      return <Footer config={config as never} theme={theme} />;

    case "stats":
      return <Stats config={config as never} theme={theme} />;

    case "team":
      return <Team config={config as never} theme={theme} />;

    case "faq":
      return <FAQ config={config as never} theme={theme} />;

    case "gallery":
      return <Gallery config={config as never} theme={theme} />;

    case "logo-cloud":
      return <LogoCloud config={config as never} theme={theme} />;

    case "contact":
      return <Contact config={config as never} theme={theme} />;

    case "content":
      return <Content config={config as never} theme={theme} />;

    case "newsletter":
      return <Newsletter config={config as never} theme={theme} />;

    case "video":
      return <Video config={config as never} theme={theme} />;

    // Add more component types here as needed
    case "gym-hero":
    case "gym-services":
    case "gym-pricing":
    case "gym-testimonials":
    case "gym-navigation":
    case "gym-about":
    case "gym-contact":
      // TODO: Implement gym-specific components
      return (
        <div className="py-20 px-4 text-center bg-gray-100">
          <p className="text-gray-500">Component type &quot;{type}&quot; not yet implemented</p>
        </div>
      );

    default:
      console.warn(`Unknown component type: ${type}`);
      return (
        <div className="py-20 px-4 text-center bg-red-50">
          <p className="text-red-500">Unknown component type: {type}</p>
        </div>
      );
  }
}
