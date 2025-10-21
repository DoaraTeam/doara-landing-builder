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
  }, [component.id, component.config]);

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
          {"alignment" in config && (
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

          {"columns" in config && (
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
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {"layout" in config && (
            <div className="space-y-2">
              <Label>Layout</Label>
              <Select
                value={(config.layout as string) || "grid"}
                onValueChange={(value) => handleChange("layout", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                  <SelectItem value="carousel">Carousel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Spacing */}
          {"spacing" in config && (
            <div className="space-y-3 p-3 border border-gray-200 rounded-lg">
              <Label className="text-sm font-semibold">Spacing</Label>

              <div className="space-y-2">
                <Label className="text-xs">Padding</Label>
                <Select
                  value={(config.spacing as { padding?: string })?.padding || "xl"}
                  onValueChange={(value) => handleChange("spacing.padding", value)}
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
                    <SelectItem value="2xl">2X Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Margin</Label>
                <Select
                  value={(config.spacing as { margin?: string })?.margin || "none"}
                  onValueChange={(value) => handleChange("spacing.margin", value)}
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
          )}
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
                  <Label className="text-xs">Color</Label>
                  <Input
                    type="text"
                    value={(config.background as { color?: string })?.color || "#ffffff"}
                    onChange={(e) => handleChange("background.color", e.target.value)}
                    placeholder="#ffffff or color name"
                  />
                </div>
              )}

              {(config.background as { type?: string })?.type === "gradient" && (
                <div className="space-y-2">
                  <Label className="text-xs">From Color</Label>
                  <Input
                    type="text"
                    value={
                      (config.background as { gradient?: { from?: string } })?.gradient?.from ||
                      "#3b82f6"
                    }
                    onChange={(e) => handleChange("background.gradient.from", e.target.value)}
                  />
                  <Label className="text-xs">To Color</Label>
                  <Input
                    type="text"
                    value={
                      (config.background as { gradient?: { to?: string } })?.gradient?.to ||
                      "#8b5cf6"
                    }
                    onChange={(e) => handleChange("background.gradient.to", e.target.value)}
                  />
                  <Label className="text-xs">Direction</Label>
                  <Select
                    value={
                      (config.background as { gradient?: { direction?: string } })?.gradient
                        ?.direction || "to-br"
                    }
                    onValueChange={(value) => handleChange("background.gradient.direction", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="to-r">To Right</SelectItem>
                      <SelectItem value="to-l">To Left</SelectItem>
                      <SelectItem value="to-t">To Top</SelectItem>
                      <SelectItem value="to-b">To Bottom</SelectItem>
                      <SelectItem value="to-br">To Bottom Right</SelectItem>
                      <SelectItem value="to-bl">To Bottom Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
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
