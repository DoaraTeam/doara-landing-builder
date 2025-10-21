"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComponentConfig } from "@/types/landing";
import { Plus } from "lucide-react";

interface ComponentTemplatesPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddComponent: (component: ComponentConfig) => void;
}

const componentTemplates: Array<{
  type: ComponentConfig["type"];
  name: string;
  description: string;
  icon: string;
  template: Omit<ComponentConfig, "id" | "order">;
}> = [
  {
    type: "hero",
    name: "Hero Section",
    description: "Eye-catching header with CTA buttons",
    icon: "🎯",
    template: {
      type: "hero",
      visible: true,
      config: {
        title: "Welcome to Our Platform",
        subtitle: "Innovate • Transform • Succeed",
        description:
          "Transform your business with our cutting-edge solutions. Get started today and see the difference.",
        alignment: "center",
        cta: {
          primary: { text: "Get Started", link: "#", variant: "default" },
          secondary: { text: "Learn More", link: "#", variant: "outline" },
        },
        background: { type: "gradient", gradient: { from: "#3b82f6", to: "#8b5cf6" } },
        spacing: { paddingTop: "80px", paddingBottom: "80px" },
      },
    },
  },
  {
    type: "features",
    name: "Features Grid",
    description: "Showcase your product features",
    icon: "✨",
    template: {
      type: "features",
      visible: true,
      config: {
        title: "Amazing Features",
        subtitle: "Everything you need to succeed",
        description: "Our platform provides all the tools you need to grow your business.",
        layout: { columns: 3, gap: "lg" },
        features: [
          {
            icon: "⚡",
            title: "Lightning Fast",
            description: "Blazing fast performance for the best user experience.",
          },
          {
            icon: "🔒",
            title: "Secure & Reliable",
            description: "Enterprise-grade security to keep your data safe.",
          },
          {
            icon: "🎨",
            title: "Beautiful Design",
            description: "Stunning interfaces that users love to interact with.",
          },
        ],
        spacing: { paddingTop: "64px", paddingBottom: "64px" },
      },
    },
  },
  {
    type: "pricing",
    name: "Pricing Table",
    description: "Display your pricing plans",
    icon: "💰",
    template: {
      type: "pricing",
      visible: true,
      config: {
        title: "Simple, Transparent Pricing",
        subtitle: "Choose the plan that's right for you",
        description: "No hidden fees. Cancel anytime.",
        plans: [
          {
            name: "Starter",
            price: "$29",
            period: "per month",
            description: "Perfect for individuals and small teams",
            features: ["Up to 10 projects", "5GB storage", "Email support", "Basic analytics"],
            cta: { text: "Start Free Trial", link: "#" },
            highlighted: false,
          },
          {
            name: "Professional",
            price: "$99",
            period: "per month",
            description: "Best for growing businesses",
            features: [
              "Unlimited projects",
              "100GB storage",
              "Priority support",
              "Advanced analytics",
              "Custom integrations",
            ],
            cta: { text: "Get Started", link: "#" },
            highlighted: true,
            badge: "Popular",
          },
          {
            name: "Enterprise",
            price: "Custom",
            period: "",
            description: "For large organizations",
            features: [
              "Everything in Pro",
              "Unlimited storage",
              "24/7 phone support",
              "Dedicated account manager",
              "Custom SLA",
            ],
            cta: { text: "Contact Sales", link: "#" },
            highlighted: false,
          },
        ],
        spacing: { paddingTop: "64px", paddingBottom: "64px" },
      },
    },
  },
  {
    type: "testimonials",
    name: "Testimonials",
    description: "Show customer reviews and ratings",
    icon: "💬",
    template: {
      type: "testimonials",
      visible: true,
      config: {
        title: "What Our Customers Say",
        subtitle: "Trusted by thousands of businesses worldwide",
        testimonials: [
          {
            content:
              "This platform has completely transformed how we work. The results speak for themselves - we've seen a 300% increase in productivity!",
            author: "Sarah Johnson",
            role: "CEO",
            company: "TechCorp Inc.",
            rating: 5,
            avatar: "",
          },
          {
            content:
              "Simply amazing! The team is responsive, the product is intuitive, and the support is outstanding. Highly recommended!",
            author: "Michael Chen",
            role: "Product Manager",
            company: "StartupXYZ",
            rating: 5,
            avatar: "",
          },
          {
            content:
              "Best decision we made this year. The ROI has been incredible and our team loves using it every day.",
            author: "Emily Rodriguez",
            role: "Marketing Director",
            company: "GrowthCo",
            rating: 5,
            avatar: "",
          },
        ],
        layout: { columns: 3 },
        spacing: { paddingTop: "64px", paddingBottom: "64px" },
      },
    },
  },
  {
    type: "cta",
    name: "Call to Action",
    description: "Drive conversions with compelling CTAs",
    icon: "🚀",
    template: {
      type: "cta",
      visible: true,
      config: {
        title: "Ready to Get Started?",
        description: "Join thousands of satisfied customers and transform your business today.",
        cta: {
          primary: { text: "Start Free Trial", link: "#", variant: "default" },
          secondary: { text: "Schedule Demo", link: "#", variant: "outline" },
        },
        background: { type: "gradient", gradient: { from: "#3b82f6", to: "#8b5cf6" } },
        spacing: { paddingTop: "64px", paddingBottom: "64px" },
      },
    },
  },
  {
    type: "footer",
    name: "Footer",
    description: "Site footer with links and social media",
    icon: "📄",
    template: {
      type: "footer",
      visible: true,
      config: {
        logo: { text: "YourBrand", image: "" },
        description: "Building the future of technology, one innovation at a time.",
        links: [
          {
            title: "Product",
            items: [
              { text: "Features", link: "#" },
              { text: "Pricing", link: "#" },
              { text: "Integrations", link: "#" },
            ],
          },
          {
            title: "Company",
            items: [
              { text: "About Us", link: "#" },
              { text: "Careers", link: "#" },
              { text: "Contact", link: "#" },
            ],
          },
          {
            title: "Resources",
            items: [
              { text: "Blog", link: "#" },
              { text: "Documentation", link: "#" },
              { text: "Support", link: "#" },
            ],
          },
        ],
        social: [
          { platform: "facebook", link: "#", icon: "facebook" },
          { platform: "twitter", link: "#", icon: "twitter" },
          { platform: "linkedin", link: "#", icon: "linkedin" },
        ],
        copyright: "© 2024 YourBrand. All rights reserved.",
      },
    },
  },
];

export default function ComponentTemplatesPanel({
  open,
  onOpenChange,
  onAddComponent,
}: ComponentTemplatesPanelProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const handleAddComponent = (template: (typeof componentTemplates)[0]) => {
    const newComponent: ComponentConfig = {
      ...template.template,
      id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      order: 0, // Will be set by parent component
    };
    onAddComponent(newComponent);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add Component</SheetTitle>
          <SheetDescription>
            Choose a component template to add to your landing page.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {componentTemplates.map((template, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTemplate === index ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedTemplate(index)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{template.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddComponent(template);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardHeader>

              {selectedTemplate === index && (
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2 font-semibold">Preview:</p>
                    <div className="bg-white p-3 rounded border text-xs space-y-1">
                      {template.type === "hero" && (
                        <>
                          <div className="font-bold">{(template.template.config as any).title}</div>
                          <div className="text-gray-600">
                            {(template.template.config as any).description}
                          </div>
                        </>
                      )}
                      {template.type === "features" && (
                        <>
                          <div className="font-bold">{(template.template.config as any).title}</div>
                          <div className="text-gray-600">
                            {(template.template.config as any).features.length} features
                          </div>
                        </>
                      )}
                      {template.type === "pricing" && (
                        <>
                          <div className="font-bold">{(template.template.config as any).title}</div>
                          <div className="text-gray-600">
                            {(template.template.config as any).plans.length} pricing plans
                          </div>
                        </>
                      )}
                      {template.type === "testimonials" && (
                        <>
                          <div className="font-bold">{(template.template.config as any).title}</div>
                          <div className="text-gray-600">
                            {(template.template.config as any).testimonials.length} testimonials
                          </div>
                        </>
                      )}
                      {template.type === "cta" && (
                        <>
                          <div className="font-bold">{(template.template.config as any).title}</div>
                          <div className="text-gray-600">
                            {(template.template.config as any).description}
                          </div>
                        </>
                      )}
                      {template.type === "footer" && (
                        <>
                          <div className="font-bold">Footer Section</div>
                          <div className="text-gray-600">
                            {(template.template.config as any).links.length} link groups
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
