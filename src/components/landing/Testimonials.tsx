"use client";

import { Theme, TestimonialsConfig } from "@/types/landing";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialsProps {
  config: TestimonialsConfig;
  theme?: Theme;
}

export function Testimonials({ config, theme }: TestimonialsProps) {
  const { title, subtitle, description, testimonials, background, spacing } = config;

  const primaryColor = theme?.colors.primary || "#3b82f6";
  const textColor = theme?.colors.text || "#111827";
  const textMuted = theme?.colors.textMuted || "#6b7280";
  const surfaceColor = theme?.colors.surface || "#f9fafb";

  const getBackgroundColor = () => {
    if (background.type === "solid") {
      if (background.color === "background") return theme?.colors.background || "#ffffff";
      if (background.color === "surface") return surfaceColor;
      return background.color;
    }
    return "#ffffff";
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-none shadow-sm"
              style={{ backgroundColor: surfaceColor }}
            >
              <CardContent className="p-6">
                {testimonial.rating && (
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-current"
                        style={{ color: primaryColor }}
                      />
                    ))}
                  </div>
                )}

                <p className="text-base mb-6 italic" style={{ color: textColor }}>
                  &quot;{testimonial.text}&quot;
                </p>

                <div className="flex items-center gap-3">
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}

                  <div>
                    <div className="font-semibold" style={{ color: textColor }}>
                      {testimonial.name}
                    </div>
                    {(testimonial.role || testimonial.company) && (
                      <div className="text-sm" style={{ color: textMuted }}>
                        {testimonial.role}
                        {testimonial.role && testimonial.company && ", "}
                        {testimonial.company}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
