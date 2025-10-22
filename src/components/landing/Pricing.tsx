"use client";

import { Theme, PricingConfig } from "@/types/landing";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface PricingProps {
  config: PricingConfig;
  theme?: Theme;
}

export function Pricing({ config, theme }: PricingProps) {
  const { title, subtitle, description, plans, background, spacing } = config;

  // Use CSS variables for theme colors
  const primaryColor = "var(--color-primary)";
  const textColor = "var(--color-text)";
  const textMuted = "var(--color-text-muted)";
  const surfaceColor = "var(--color-surface)";
  const bgColor = "var(--color-background)";

  const getBackgroundColor = () => {
    if (background.type === "solid") {
      if (background.color === "background") return bgColor;
      if (background.color === "surface") return surfaceColor;
      return background.color;
    }
    return bgColor;
  };

  const paddingClass = spacing?.padding === "xl" ? "py-20" : "py-16";

  return (
    <section className={`${paddingClass} px-4`} style={{ backgroundColor: getBackgroundColor() }}>
      <div className="container mx-auto">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          {subtitle && (
            <div
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: primaryColor }}
            >
              {subtitle}
            </div>
          )}

          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: textColor }}>
            {title}
          </h2>

          {description && (
            <p className="text-lg" style={{ color: textMuted }}>
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${plan.highlighted ? "border-2 shadow-lg scale-105" : "border shadow-sm"}`}
              style={{
                borderColor: plan.highlighted ? primaryColor : undefined,
                backgroundColor: bgColor,
              }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge style={{ backgroundColor: primaryColor, color: "#ffffff" }}>
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                <h3 className="text-2xl font-bold mb-2" style={{ color: textColor }}>
                  {plan.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: textMuted }}>
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold" style={{ color: textColor }}>
                    {plan.price}
                  </span>
                  {plan.period && <span style={{ color: textMuted }}>{plan.period}</span>}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 shrink-0 mt-0.5" style={{ color: primaryColor }} />
                      <span style={{ color: textColor }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  asChild
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  style={
                    plan.highlighted
                      ? { backgroundColor: primaryColor, color: "#ffffff" }
                      : { borderColor: primaryColor, color: primaryColor }
                  }
                >
                  <a href={plan.ctaLink || "#"}>{plan.ctaText || "Get Started"}</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
