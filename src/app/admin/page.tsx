"use client";

import { useState, useEffect } from "react";
import { LandingConfig } from "@/types/landing";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, Trash2, Plus, Copy } from "lucide-react";
import CreatePageModal from "@/components/admin/CreatePageModal";

export default function AdminDashboard() {
  const [config, setConfig] = useState<LandingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch("/api/landing-config");
      const data = await response.json();
      setConfig(data);
    } catch (error) {
      console.error("Error fetching config:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (pageId: string) => {
    if (!confirm("Are you sure you want to delete this page?")) {
      return;
    }

    try {
      const response = await fetch(`/api/landing-config?pageId=${pageId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchConfig();
      } else {
        alert("Failed to delete page");
      }
    } catch (error) {
      console.error("Error deleting page:", error);
      alert("Error deleting page");
    }
  };

  const handleDuplicate = async (pageId: string) => {
    if (!config) return;

    const originalPage = config.pages[pageId];
    if (!originalPage) return;

    const newPage = {
      ...originalPage,
      id: `page-${Date.now()}`,
      title: `${originalPage.title} (Copy)`,
      slug: `${originalPage.slug}-copy-${Date.now()}`,
      status: "draft" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/landing-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPage),
      });

      if (response.ok) {
        fetchConfig();
        alert("Page duplicated successfully!");
      } else {
        alert("Failed to duplicate page");
      }
    } catch (error) {
      console.error("Error duplicating page:", error);
      alert("Error duplicating page");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">Error loading configuration</p>
      </div>
    );
  }

  const pages = Object.values(config.pages);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Landing Page Builder</h1>
          <p className="text-gray-600">Manage all your landing pages in one place</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{pages.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Published</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-600">
                {pages.filter((p) => p.status === "published").length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Themes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{Object.keys(config.themes).length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Pages List */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Pages</h2>
            <Button onClick={() => setCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Page
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <Card key={page.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{page.title}</CardTitle>
                  <Badge variant={page.status === "published" ? "default" : "secondary"}>
                    {page.status || "draft"}
                  </Badge>
                </div>
                <CardDescription>{page.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold">Slug:</span> /{page.slug}
                  </div>
                  <div>
                    <span className="font-semibold">Theme:</span>{" "}
                    {config.themes[page.theme]?.name || page.theme}
                  </div>
                  <div>
                    <span className="font-semibold">Components:</span> {page.components.length}
                  </div>
                  {page.updatedAt && (
                    <div>
                      <span className="font-semibold">Updated:</span>{" "}
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-2">
                <div className="flex gap-2 w-full">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <a href={`/landing/${page.slug}`} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </a>
                  </Button>

                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <a href={`/admin/edit/${page.id}`}>
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </a>
                  </Button>
                </div>

                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDuplicate(page.id)}
                    className="flex-1"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Duplicate
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(page.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {pages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No pages found. Create your first landing page!</p>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-500">
          <p>
            Version: {config.version} | Last Updated:{" "}
            {new Date(config.metadata.lastUpdated).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Create Page Modal */}
      {config && (
        <CreatePageModal
          open={createModalOpen}
          onOpenChange={setCreateModalOpen}
          config={config}
          onSuccess={fetchConfig}
        />
      )}
    </div>
  );
}
