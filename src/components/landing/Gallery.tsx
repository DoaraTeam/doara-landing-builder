/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Theme } from "@/types/landing";

interface GalleryItem {
  id: string;
  image: string;
  title?: string;
  description?: string;
  category?: string;
}

interface GalleryConfig {
  title: string;
  subtitle?: string;
  description?: string;
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
  layout?: "grid" | "masonry";
  background: {
    type: "solid";
    color?: string;
  };
  spacing?: {
    padding?: "md" | "lg" | "xl";
  };
}

interface GalleryProps {
  config: GalleryConfig;
  theme?: Theme;
}

export function Gallery({ config, theme }: GalleryProps) {
  const {
    title,
    subtitle,
    description,
    items,
    columns = 3,
    layout = "grid",
    background,
    spacing,
  } = config;

  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

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

  const gridColsClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  const paddingClass = spacing?.padding === "xl" ? "py-20" : "py-16";

  return (
    <>
      <section className={`${paddingClass} px-4`} style={{ backgroundColor: getBackgroundColor() }}>
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
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

          {/* Gallery Grid */}
          <div className={`grid grid-cols-1 ${gridColsClass[columns]} gap-6`}>
            {items.map((item) => (
              <div
                key={item.id}
                className="relative group overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-xl transition-all"
                onClick={() => setSelectedImage(item)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title || "Gallery item"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                {/* Overlay */}
                {(item.title || item.description) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    {item.category && (
                      <div
                        className="text-xs font-semibold uppercase tracking-wider mb-2"
                        style={{ color: primaryColor }}
                      >
                        {item.category}
                      </div>
                    )}
                    {item.title && (
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    )}
                    {item.description && (
                      <p className="text-sm text-white/90">{item.description}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="max-w-6xl max-h-[90vh] overflow-hidden">
            <img
              src={selectedImage.image}
              alt={selectedImage.title || "Gallery item"}
              className="max-w-full max-h-[80vh] object-contain"
            />
            {(selectedImage.title || selectedImage.description) && (
              <div className="text-center mt-4 text-white">
                {selectedImage.title && (
                  <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                )}
                {selectedImage.description && (
                  <p className="text-gray-300">{selectedImage.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
