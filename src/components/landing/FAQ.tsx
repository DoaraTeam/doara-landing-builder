"use client";

import { useState } from "react";
import { Theme } from "@/types/landing";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQConfig {
  title: string;
  subtitle?: string;
  description?: string;
  items: FAQItem[];
  layout?: "single" | "two-column";
  background: {
    type: "solid";
    color?: string;
  };
  spacing?: {
    padding?: "md" | "lg" | "xl";
  };
}

interface FAQProps {
  config: FAQConfig;
  theme?: Theme;
}

export function FAQ({ config, theme }: FAQProps) {
  const { title, subtitle, description, items, layout = "single", background, spacing } = config;

  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const primaryColor = "var(--color-primary)";
  const textColor = "var(--color-text)";
  const textMuted = "var(--color-text-muted)";
  const surfaceColor = "var(--color-surface)";
  const headingFont = "var(--font-heading)";
  const bodyFont = "var(--font-body)";

  const getBackgroundColor = () => {
    if (background.color === "background") return "var(--color-background)";
    if (background.color === "surface") return surfaceColor;
    return background.color || "#ffffff";
  };

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const paddingClass = spacing?.padding === "xl" ? "py-20" : "py-16";

  const columnClass = layout === "two-column" ? "md:grid-cols-2" : "md:grid-cols-1";

  return (
    <section className={`${paddingClass} px-4`} style={{ backgroundColor: getBackgroundColor() }}>
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          {subtitle && (
            <div
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: primaryColor }}
            >
              {subtitle}
            </div>
          )}

          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: textColor, fontFamily: headingFont }}
          >
            {title}
          </h2>

          {description && (
            <p className="text-lg" style={{ color: textMuted, fontFamily: bodyFont }}>
              {description}
            </p>
          )}
        </div>

        {/* FAQ Items */}
        <div className={`grid grid-cols-1 ${columnClass} gap-4`}>
          {items?.map((item) => {
            const isOpen = openItems.has(item.id);
            return (
              <div
                key={item.id}
                className="border rounded-lg overflow-hidden transition-all"
                style={{
                  borderColor: isOpen ? primaryColor : "#e5e7eb",
                  backgroundColor: "var(--color-background)",
                }}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left p-5 flex justify-between items-center hover:bg-opacity-50 transition-colors"
                  style={{
                    backgroundColor: isOpen ? `${primaryColor}10` : "transparent",
                  }}
                >
                  <span
                    className="font-semibold text-lg pr-4"
                    style={{ color: textColor, fontFamily: headingFont }}
                  >
                    {item.question}
                  </span>
                  <svg
                    className="w-5 h-5 flex-shrink-0 transition-transform"
                    style={{
                      color: primaryColor,
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 border-t" style={{ borderColor: "#e5e7eb" }}>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: textMuted, fontFamily: bodyFont }}
                    >
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
