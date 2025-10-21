"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LandingConfig } from "@/types/landing";

interface CreatePageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: LandingConfig;
  onSuccess: () => void;
}

export default function CreatePageModal({
  open,
  onOpenChange,
  config,
  onSuccess,
}: CreatePageModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    theme: "modern",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (value: string) => {
    setFormData({
      ...formData,
      title: value,
      slug: generateSlug(value),
    });
    setError("");
  };

  const handleSlugChange = (value: string) => {
    const cleanSlug = value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setFormData({ ...formData, slug: cleanSlug });
    setError("");
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!formData.slug.trim()) {
      setError("Slug is required");
      return false;
    }
    if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      setError("Slug can only contain lowercase letters, numbers, and hyphens");
      return false;
    }
    if (Object.values(config.pages).some((p) => p.slug === formData.slug)) {
      setError("A page with this slug already exists");
      return false;
    }
    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const newPage = {
        id: `page-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        slug: formData.slug,
        theme: formData.theme,
        status: "draft" as const,
        seo: {
          title: formData.title,
          description: formData.description,
          keywords: [],
          ogImage: "",
        },
        components: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/landing-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPage),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create page");
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        slug: "",
        theme: "modern",
      });

      onSuccess();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create page");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Landing Page</DialogTitle>
          <DialogDescription>
            Create a new landing page with a unique title and slug.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Page Title *</Label>
            <Input
              id="title"
              placeholder="e.g., AI Startup Landing Page"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Brief description of this page"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={loading}
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug *</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">/landing/</span>
              <Input
                id="slug"
                placeholder="ai-startup"
                value={formData.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                disabled={loading}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-gray-500">
              Only lowercase letters, numbers, and hyphens allowed
            </p>
          </div>

          {/* Theme */}
          <div className="space-y-2">
            <Label htmlFor="theme">Theme *</Label>
            <Select
              value={formData.theme}
              onValueChange={(value) => setFormData({ ...formData, theme: value })}
              disabled={loading}
            >
              <SelectTrigger id="theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(config.themes).map(([key, theme]) => (
                  <SelectItem key={key} value={key}>
                    {theme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create Page"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
