"use client";

import { useState, useEffect } from "react";
import { ComponentConfig } from "@/types/landing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import { FeaturesArrayEditor } from "./FeaturesArrayEditor";
import { PricingArrayEditor } from "./PricingArrayEditor";
import { TestimonialsArrayEditor } from "./TestimonialsArrayEditor";
import { FooterLinksEditor } from "./FooterLinksEditor";
import { LogoArrayEditor } from "./LogoArrayEditor";

interface ComponentEditorProps {
  component: ComponentConfig;
  onUpdate: (config: ComponentConfig) => void;
  onClose: () => void;
}

/**
 * ComponentEditor - Side panel for editing component configuration
 * Shows 3 tabs: Content, Layout, Style
 */
export function ComponentEditor({ component, onUpdate, onClose }: ComponentEditorProps) {
  const [config, setConfig] = useState(component.config);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  // Sync local state when component changes (when user clicks different section)
  useEffect(() => {
    setIsLoading(true);
    setConfig(component.config);
    setActiveTab("content"); // Reset to content tab when switching components
    // Brief loading state to show component switch
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, [component.id, component.type, component.config]);

  const handleChange = (path: string, value: unknown) => {
    const keys = path.split(".");
    const newConfig = JSON.parse(JSON.stringify(config));
    let current = newConfig;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setConfig(newConfig);
  };

  const handleSave = () => {
    onUpdate({ ...component, config });
  };

  const getComponentIcon = (type: string) => {
    const icons: Record<string, string> = {
      hero: "🦸",
      features: "✨",
      pricing: "💰",
      testimonials: "💬",
      cta: "📣",
      footer: "🔗",
    };
    return icons[type] || "📦";
  };

  return (
    <div className="fixed left-0 top-0 h-full w-full md:w-96 bg-white border-r border-gray-200 shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getComponentIcon(component.type)}</span>
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              Edit Component
              {isLoading && (
                <div className="w-3 h-3 border border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
              )}
            </h3>
            <p className="text-sm text-gray-600">{component.type}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <TabsList className="mx-4 mt-4">
          <TabsTrigger value="content" className="flex-1">
            Content
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex-1">
            Layout
          </TabsTrigger>
          <TabsTrigger value="style" className="flex-1">
            Style
          </TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent
          value="content"
          className={`flex-1 overflow-y-auto p-4 space-y-4 transition-opacity duration-200 ${
            isLoading ? "opacity-50" : "opacity-100"
          }`}
        >
          {/* Common fields for most components */}
          {"title" in config && (
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={config.title as string}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter title"
              />
            </div>
          )}

          {"subtitle" in config && (
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input
                value={(config.subtitle as string) || ""}
                onChange={(e) => handleChange("subtitle", e.target.value)}
                placeholder="Enter subtitle"
              />
            </div>
          )}

          {"description" in config && (
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={(config.description as string) || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter description"
              />
            </div>
          )}

          {"image" in config && (
            <ImageUpload
              label="Image"
              value={(config.image as string) || ""}
              onChange={(url) => handleChange("image", url)}
            />
          )}

          {"primaryCTA" in config && (
            <div className="space-y-3 p-3 border border-gray-200 rounded-lg">
              <Label className="text-sm font-semibold">Primary CTA</Label>
              <div className="space-y-2">
                <Input
                  value={(config.primaryCTA as { text?: string })?.text || ""}
                  onChange={(e) => handleChange("primaryCTA.text", e.target.value)}
                  placeholder="Button text"
                />
                <Input
                  value={(config.primaryCTA as { link?: string })?.link || ""}
                  onChange={(e) => handleChange("primaryCTA.link", e.target.value)}
                  placeholder="Button link"
                />
              </div>
            </div>
          )}

          {"secondaryCTA" in config && (
            <div className="space-y-3 p-3 border border-gray-200 rounded-lg">
              <Label className="text-sm font-semibold">Secondary CTA</Label>
              <div className="space-y-2">
                <Input
                  value={(config.secondaryCTA as { text?: string })?.text || ""}
                  onChange={(e) => handleChange("secondaryCTA.text", e.target.value)}
                  placeholder="Button text"
                />
                <Input
                  value={(config.secondaryCTA as { link?: string })?.link || ""}
                  onChange={(e) => handleChange("secondaryCTA.link", e.target.value)}
                  placeholder="Button link"
                />
              </div>
            </div>
          )}

          {"features" in config && Array.isArray(config.features) && (
            <div className="space-y-2">
              <FeaturesArrayEditor
                features={
                  config.features as Array<{
                    icon?: string;
                    title: string;
                    description: string;
                    image?: string;
                  }>
                }
                onChange={(features) => handleChange("features", features)}
              />
            </div>
          )}

          {"logos" in config && Array.isArray(config.logos) && (
            <div className="space-y-2">
              <LogoArrayEditor
                logos={
                  config.logos as Array<{
                    name: string;
                    url: string;
                    link?: string;
                  }>
                }
                onChange={(logos) => handleChange("logos", logos)}
              />
            </div>
          )}

          {"plans" in config && Array.isArray(config.plans) && (
            <div className="space-y-2">
              <PricingArrayEditor
                plans={
                  config.plans as Array<{
                    name: string;
                    price: string;
                    period: string;
                    description: string;
                    features: string[];
                    cta: { text: string; link: string };
                    highlighted: boolean;
                    badge?: string;
                  }>
                }
                onChange={(plans) => handleChange("plans", plans)}
              />
            </div>
          )}

          {"testimonials" in config && Array.isArray(config.testimonials) && (
            <div className="space-y-2">
              <TestimonialsArrayEditor
                testimonials={
                  config.testimonials as Array<{
                    content: string;
                    author: string;
                    role: string;
                    company: string;
                    rating: number;
                    avatar?: string;
                  }>
                }
                onChange={(testimonials) => handleChange("testimonials", testimonials)}
              />
            </div>
          )}

          {component.type === "footer" && (
            <div className="space-y-2">
              <FooterLinksEditor
                footerConfig={
                  config as {
                    logo: { text: string; image: string };
                    description: string;
                    links: Array<{
                      title: string;
                      items: Array<{ text: string; link: string }>;
                    }>;
                    social: Array<{
                      platform: string;
                      link: string;
                      icon: string;
                    }>;
                    copyright: string;
                  }
                }
                onChange={(footerConfig) => setConfig(footerConfig as never)}
              />
            </div>
          )}
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent
          value="layout"
          className={`flex-1 overflow-y-auto p-4 space-y-4 transition-opacity duration-200 ${
            isLoading ? "opacity-50" : "opacity-100"
          }`}
        >
          {/* Alignment - for hero, cta, content, testimonials, etc. */}
          {(component.type === "hero" ||
            component.type === "cta" ||
            component.type === "content" ||
            component.type === "testimonials" ||
            component.type === "newsletter") && (
            <div className="space-y-2">
              <Label>Text Alignment</Label>
              <Select
                value={(config.alignment as string) || "center"}
                onValueChange={(value) => handleChange("alignment", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Columns - for features, stats, testimonials, gallery, team */}
          {(component.type === "features" ||
            component.type === "stats" ||
            component.type === "testimonials" ||
            component.type === "gallery" ||
            component.type === "team" ||
            component.type === "faq") && (
            <div className="space-y-2">
              <Label>Columns</Label>
              <Select
                value={String((config.columns as number) || 3)}
                onValueChange={(value) => handleChange("columns", Number(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {component.type === "faq" && <SelectItem value="1">1 Column</SelectItem>}
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                  {(component.type === "gallery" || component.type === "team") && (
                    <>
                      <SelectItem value="5">5 Columns</SelectItem>
                      <SelectItem value="6">6 Columns</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Layout type - for stats, testimonials, pricing */}
          {(component.type === "stats" ||
            component.type === "testimonials" ||
            component.type === "pricing") && (
            <div className="space-y-2">
              <Label>Layout Style</Label>
              <Select
                value={
                  (config.layout as string) ||
                  ((config as { layout?: { type?: string } }).layout?.type as string) ||
                  "grid"
                }
                onValueChange={(value) => {
                  // Handle both flat layout and nested layout.type
                  if ("layout" in config && typeof config.layout === "object") {
                    handleChange("layout.type", value);
                  } else {
                    handleChange("layout", value);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                  {component.type === "stats" && (
                    <SelectItem value="horizontal">Horizontal</SelectItem>
                  )}
                  {component.type === "testimonials" && (
                    <SelectItem value="carousel">Carousel</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Image Position - for content sections */}
          {component.type === "content" && (
            <div className="space-y-2">
              <Label>Image Position</Label>
              <Select
                value={(config.imagePosition as string) || "right"}
                onValueChange={(value) => handleChange("imagePosition", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Contact Form Layout */}
          {component.type === "contact" && (
            <div className="space-y-2">
              <Label>Form Layout</Label>
              <Select
                value={(config.layout as string) || "centered"}
                onValueChange={(value) => handleChange("layout", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="centered">Centered</SelectItem>
                  <SelectItem value="split">Split with Info</SelectItem>
                  <SelectItem value="wide">Wide Form</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Logo Cloud specific layout options */}
          {component.type === "logo-cloud" && (
            <>
              <div className="space-y-2">
                <Label>Display Layout</Label>
                <Select
                  value={(config.layout as string) || "grid"}
                  onValueChange={(value) => handleChange("layout", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="scroll">Scrolling</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Logo Size</Label>
                <Select
                  value={String((config as { logoSize?: string }).logoSize || "medium")}
                  onValueChange={(value) => handleChange("logoSize", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Logo Spacing</Label>
                <Select
                  value={String((config as { logoSpacing?: string }).logoSpacing || "normal")}
                  onValueChange={(value) => handleChange("logoSpacing", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tight">Tight</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="relaxed">Relaxed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Columns (Desktop)</Label>
                <Select
                  value={String((config as { gridColumns?: number }).gridColumns || 6)}
                  onValueChange={(value) => handleChange("gridColumns", Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Columns</SelectItem>
                    <SelectItem value="4">4 Columns</SelectItem>
                    <SelectItem value="5">5 Columns</SelectItem>
                    <SelectItem value="6">6 Columns</SelectItem>
                    <SelectItem value="8">8 Columns</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Gallery specific options */}
          {component.type === "gallery" && (
            <div className="space-y-2">
              <Label>Image Aspect Ratio</Label>
              <Select
                value={(config.aspectRatio as string) || "landscape"}
                onValueChange={(value) => handleChange("aspectRatio", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="square">Square (1:1)</SelectItem>
                  <SelectItem value="landscape">Landscape (16:9)</SelectItem>
                  <SelectItem value="portrait">Portrait (3:4)</SelectItem>
                  <SelectItem value="auto">Auto (original size)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Video Aspect Ratio */}
          {component.type === "video" && (
            <div className="space-y-2">
              <Label>Video Aspect Ratio</Label>
              <Select
                value={(config.aspectRatio as string) || "16:9"}
                onValueChange={(value) => handleChange("aspectRatio", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16:9">16:9 (Widescreen)</SelectItem>
                  <SelectItem value="4:3">4:3 (Standard)</SelectItem>
                  <SelectItem value="21:9">21:9 (Ultrawide)</SelectItem>
                  <SelectItem value="1:1">1:1 (Square)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Spacing - Available for all components */}
          <div className="space-y-3 p-3 border border-gray-200 rounded-lg">
            <Label className="text-sm font-semibold">Section Spacing</Label>

            <div className="space-y-2">
              <Label className="text-xs">Padding (Vertical)</Label>
              <Select
                value={
                  (config.spacing as { padding?: string })?.padding ||
                  ((config as { spacing?: string }).spacing as string) ||
                  "xl"
                }
                onValueChange={(value) => {
                  if (config.spacing && typeof config.spacing === "object") {
                    handleChange("spacing.padding", value);
                  } else {
                    handleChange("spacing", { padding: value, margin: "none" });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (0)</SelectItem>
                  <SelectItem value="sm">Small (2rem)</SelectItem>
                  <SelectItem value="md">Medium (3rem)</SelectItem>
                  <SelectItem value="lg">Large (4rem)</SelectItem>
                  <SelectItem value="xl">Extra Large (5rem)</SelectItem>
                  <SelectItem value="2xl">2X Large (6rem)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Margin (Vertical)</Label>
              <Select
                value={(config.spacing as { margin?: string })?.margin || "none"}
                onValueChange={(value) => {
                  if (config.spacing && typeof config.spacing === "object") {
                    handleChange("spacing.margin", value);
                  } else {
                    handleChange("spacing", { padding: "xl", margin: value });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="md">Medium</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                  <SelectItem value="xl">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Container Width */}
          <div className="space-y-3 p-3 border border-gray-200 rounded-lg">
            <Label className="text-sm font-semibold">Container Width</Label>

            <div className="space-y-2">
              <Label className="text-xs">Max Width</Label>
              <Select
                value={(config.containerWidth as string) || "default"}
                onValueChange={(value) => handleChange("containerWidth", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">Extra Small - 448px</SelectItem>
                  <SelectItem value="sm">Small - 512px</SelectItem>
                  <SelectItem value="md">Medium - 672px</SelectItem>
                  <SelectItem value="narrow">Narrow - 768px</SelectItem>
                  <SelectItem value="lg">Large - 896px</SelectItem>
                  <SelectItem value="default">Default - 1280px</SelectItem>
                  <SelectItem value="wide">Wide - 1536px</SelectItem>
                  <SelectItem value="xl">Extra Wide - 1600px</SelectItem>
                  <SelectItem value="2xl">Ultra Wide - 1800px</SelectItem>
                  <SelectItem value="full">Full Width (with padding)</SelectItem>
                  <SelectItem value="fullscreen">Fullscreen (no padding)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Controls the maximum width of the content container
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Style Tab */}
        <TabsContent
          value="style"
          className={`flex-1 overflow-y-auto p-4 space-y-4 transition-opacity duration-200 ${
            isLoading ? "opacity-50" : "opacity-100"
          }`}
        >
          {/* Background */}
          {"background" in config && (
            <div className="space-y-3 p-3 border border-gray-200 rounded-lg">
              <Label className="text-sm font-semibold">Background</Label>

              <div className="space-y-2">
                <Label className="text-xs">Type</Label>
                <Select
                  value={(config.background as { type?: string })?.type || "solid"}
                  onValueChange={(value) => handleChange("background.type", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solid">Solid Color</SelectItem>
                    <SelectItem value="gradient">Gradient</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(config.background as { type?: string })?.type === "solid" && (
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Background Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={(config.background as { color?: string })?.color || "#ffffff"}
                      onChange={(e) => handleChange("background.color", e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={(config.background as { color?: string })?.color || "#ffffff"}
                      onChange={(e) => handleChange("background.color", e.target.value)}
                      className="flex-1"
                      placeholder="#ffffff or color name"
                    />
                  </div>
                  {/* Color Preview */}
                  <div
                    className="w-full h-12 rounded border border-gray-300"
                    style={{
                      backgroundColor:
                        (config.background as { color?: string })?.color || "#ffffff",
                    }}
                  />
                </div>
              )}

              {(config.background as { type?: string })?.type === "gradient" && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold">From Color</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={
                          (config.background as { gradient?: { from?: string } })?.gradient?.from ||
                          "#3b82f6"
                        }
                        onChange={(e) => handleChange("background.gradient.from", e.target.value)}
                        className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={
                          (config.background as { gradient?: { from?: string } })?.gradient?.from ||
                          "#3b82f6"
                        }
                        onChange={(e) => handleChange("background.gradient.from", e.target.value)}
                        className="flex-1"
                        placeholder="#3b82f6"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold">To Color</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={
                          (config.background as { gradient?: { to?: string } })?.gradient?.to ||
                          "#8b5cf6"
                        }
                        onChange={(e) => handleChange("background.gradient.to", e.target.value)}
                        className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={
                          (config.background as { gradient?: { to?: string } })?.gradient?.to ||
                          "#8b5cf6"
                        }
                        onChange={(e) => handleChange("background.gradient.to", e.target.value)}
                        className="flex-1"
                        placeholder="#8b5cf6"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold">Direction</Label>
                    <Select
                      value={
                        (config.background as { gradient?: { direction?: string } })?.gradient
                          ?.direction || "to-br"
                      }
                      onValueChange={(value) =>
                        handleChange("background.gradient.direction", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="to-r">→ To Right</SelectItem>
                        <SelectItem value="to-l">← To Left</SelectItem>
                        <SelectItem value="to-t">↑ To Top</SelectItem>
                        <SelectItem value="to-b">↓ To Bottom</SelectItem>
                        <SelectItem value="to-br">↘ To Bottom Right</SelectItem>
                        <SelectItem value="to-bl">↙ To Bottom Left</SelectItem>
                        <SelectItem value="to-tr">↗ To Top Right</SelectItem>
                        <SelectItem value="to-tl">↖ To Top Left</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Gradient Preview */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold">Preview</Label>
                    <div
                      className="w-full h-16 rounded border border-gray-300"
                      style={{
                        background: `linear-gradient(${
                          (config.background as { gradient?: { direction?: string } })?.gradient
                            ?.direction || "to-br"
                        }, ${
                          (config.background as { gradient?: { from?: string } })?.gradient?.from ||
                          "#3b82f6"
                        }, ${
                          (config.background as { gradient?: { to?: string } })?.gradient?.to ||
                          "#8b5cf6"
                        })`,
                      }}
                    />
                  </div>
                </div>
              )}

              {(config.background as { type?: string })?.type === "image" && (
                <div className="space-y-3">
                  <ImageUpload
                    label="Background Image"
                    value={(config.background as { image?: { url?: string } })?.image?.url || ""}
                    onChange={(url) => handleChange("background.image.url", url)}
                  />

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold">Overlay Color (Optional)</Label>
                    <Input
                      type="text"
                      value={
                        (config.background as { image?: { overlay?: string } })?.image?.overlay ||
                        ""
                      }
                      onChange={(e) => handleChange("background.image.overlay", e.target.value)}
                      placeholder="rgba(0,0,0,0.5) or #000000"
                    />
                    <p className="text-xs text-gray-500">
                      Để trống = không có lớp phủ. Ví dụ: rgba(0,0,0,0.5) cho lớp phủ đen 50%
                    </p>
                    {(config.background as { image?: { overlay?: string } })?.image?.overlay && (
                      <div
                        className="w-full h-12 rounded border border-gray-300"
                        style={{
                          backgroundColor:
                            (config.background as { image?: { overlay?: string } })?.image
                              ?.overlay || "transparent",
                        }}
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Position</Label>
                    <Select
                      value={
                        (config.background as { image?: { position?: string } })?.image?.position ||
                        "center"
                      }
                      onValueChange={(value) => handleChange("background.image.position", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="bottom">Bottom</SelectItem>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                        <SelectItem value="top left">Top Left</SelectItem>
                        <SelectItem value="top right">Top Right</SelectItem>
                        <SelectItem value="bottom left">Bottom Left</SelectItem>
                        <SelectItem value="bottom right">Bottom Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Size</Label>
                    <Select
                      value={
                        (config.background as { image?: { size?: string } })?.image?.size || "cover"
                      }
                      onValueChange={(value) => handleChange("background.image.size", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cover">Cover (Phủ kín)</SelectItem>
                        <SelectItem value="contain">Contain (Vừa khung)</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Logo Cloud specific style options */}
          {component.type === "logo-cloud" && (
            <div className="space-y-3 p-3 border border-gray-200 rounded-lg">
              <Label className="text-sm font-semibold">Logo Style</Label>

              <div className="space-y-2">
                <Label className="text-xs">Color Mode</Label>
                <Select
                  value={String((config as { grayscale?: boolean }).grayscale ?? true)}
                  onValueChange={(value) => handleChange("grayscale", value === "true")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Grayscale (hover to show color)</SelectItem>
                    <SelectItem value="false">Full Color</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Hover Effect</Label>
                <Select
                  value={(config as { hoverEffect?: string }).hoverEffect || "scale"}
                  onValueChange={(value) => handleChange("hoverEffect", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="scale">Scale Up</SelectItem>
                    <SelectItem value="lift">Lift (Shadow)</SelectItem>
                    <SelectItem value="glow">Glow</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Logo Opacity</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={(config as { logoOpacity?: number }).logoOpacity || 70}
                    onChange={(e) => handleChange("logoOpacity", Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12 text-right">
                    {(config as { logoOpacity?: number }).logoOpacity || 70}%
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Logo Background</Label>
                <Select
                  value={(config as { logoBg?: string }).logoBg || "none"}
                  onValueChange={(value) => handleChange("logoBg", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="light">Light Gray</SelectItem>
                    <SelectItem value="bordered">Bordered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Animation */}
          {"animation" in config && (
            <div className="space-y-3 p-3 border border-gray-200 rounded-lg">
              <Label className="text-sm font-semibold">Animation</Label>

              <div className="space-y-2">
                <Label className="text-xs">Type</Label>
                <Select
                  value={(config.animation as { type?: string })?.type || "fadeInUp"}
                  onValueChange={(value) => handleChange("animation.type", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="fadeIn">Fade In</SelectItem>
                    <SelectItem value="fadeInUp">Fade In Up</SelectItem>
                    <SelectItem value="fadeInDown">Fade In Down</SelectItem>
                    <SelectItem value="slideInLeft">Slide In Left</SelectItem>
                    <SelectItem value="slideInRight">Slide In Right</SelectItem>
                    <SelectItem value="zoomIn">Zoom In</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Duration (ms)</Label>
                <Input
                  type="number"
                  value={(config.animation as { duration?: number })?.duration || 600}
                  onChange={(e) => handleChange("animation.duration", Number(e.target.value))}
                  min={0}
                  max={2000}
                  step={100}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Delay (ms)</Label>
                <Input
                  type="number"
                  value={(config.animation as { delay?: number })?.delay || 0}
                  onChange={(e) => handleChange("animation.delay", Number(e.target.value))}
                  min={0}
                  max={2000}
                  step={100}
                />
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Footer with Save Button */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-2">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleSave} className="flex-1">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
