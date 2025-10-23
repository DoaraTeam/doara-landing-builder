"use client";

import { useState, useEffect } from "react";
import { LandingConfig } from "@/types/landing";
import { themes } from "@/lib/themes";
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
import { Input } from "@/components/ui/input";
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  Copy,
  Search,
  Filter,
  LayoutDashboard,
  FileText,
  Palette,
  Settings,
  Home,
} from "lucide-react";
import CreatePageModal from "@/components/admin/CreatePageModal";

export default function AdminDashboard() {
  const [config, setConfig] = useState<LandingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");

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

    const newPageId = `page-${Date.now()}`;
    const newPage = {
      ...originalPage,
      id: newPageId,
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
        body: JSON.stringify({
          pageId: newPageId,
          pageData: newPage,
        }),
      });

      if (response.ok) {
        fetchConfig();
        alert("Page duplicated successfully!");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to duplicate page");
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

  // Filter pages based on search and status
  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || page.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-10">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <img src="assets/images/admin-logo.png" alt="logo" className="w-10" />
            <div>
              <h1 className="font-bold text-lg">Page Builder</h1>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>

          <nav className="space-y-2">
            <a
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </a>
            <button className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg w-full">
              <FileText className="h-5 w-5" />
              <span className="font-medium">Pages</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors w-full">
              <Palette className="h-5 w-5" />
              <span>Themes</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors w-full">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-500">
            <p>Version: {config.version}</p>
            <p className="mt-1">
              Updated: {new Date(config.metadata.lastUpdated).toLocaleDateString()}
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Landing Pages
              </h1>
              <p className="text-gray-600">Create and manage your landing pages</p>
            </div>
            <Button
              onClick={() => setCreateModalOpen(true)}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Page
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="pb-3">
                <CardDescription className="text-blue-600 font-medium">Total Pages</CardDescription>
                <CardTitle className="text-3xl text-blue-700">{pages.length}</CardTitle>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="pb-3">
                <CardDescription className="text-green-600 font-medium">Published</CardDescription>
                <CardTitle className="text-3xl text-green-700">
                  {pages.filter((p) => p.status === "published").length}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-br from-yellow-50 to-white">
              <CardHeader className="pb-3">
                <CardDescription className="text-yellow-600 font-medium">Drafts</CardDescription>
                <CardTitle className="text-3xl text-yellow-700">
                  {pages.filter((p) => p.status === "draft" || !p.status).length}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
              <CardHeader className="pb-3">
                <CardDescription className="text-purple-600 font-medium">Themes</CardDescription>
                <CardTitle className="text-3xl text-purple-700">
                  {Object.keys(themes).length}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search pages by title, description, or slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === "published" ? "default" : "outline"}
                onClick={() => setFilterStatus("published")}
                size="sm"
              >
                <Filter className="h-4 w-4 mr-1" />
                Published
              </Button>
              <Button
                variant={filterStatus === "draft" ? "default" : "outline"}
                onClick={() => setFilterStatus("draft")}
                size="sm"
              >
                <Filter className="h-4 w-4 mr-1" />
                Drafts
              </Button>
            </div>
          </div>
        </div>

        {/* Pages Grid */}
        <div
          className={
            activeView === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredPages.map((page) => (
            <Card
              key={page.id}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl line-clamp-1">{page.title}</CardTitle>
                  <Badge
                    variant={page.status === "published" ? "default" : "secondary"}
                    className={
                      page.status === "published"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {page.status || "draft"}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">{page.description}</CardDescription>
              </CardHeader>

              <CardContent className="pb-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Slug:</span>
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      /{page.slug}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Theme:</span>
                    <span className="font-medium">
                      {config.themes[page.theme]?.name || page.theme}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Components:</span>
                    <Badge variant="outline" className="text-xs">
                      {page.components.length}
                    </Badge>
                  </div>
                  {page.updatedAt && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Updated:</span>
                      <span>{new Date(page.updatedAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-2 pt-3 border-t">
                <div className="flex gap-2 w-full">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <a href={`/landing/${page.slug}`} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </a>
                  </Button>

                  <Button
                    size="sm"
                    asChild
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
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
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredPages.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg mb-2">
              {searchQuery || filterStatus !== "all"
                ? "No pages found matching your criteria"
                : "No pages yet"}
            </p>
            <p className="text-gray-400 text-sm mb-4">
              {searchQuery || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first landing page to get started"}
            </p>
            {!searchQuery && filterStatus === "all" && (
              <Button onClick={() => setCreateModalOpen(true)} className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Page
              </Button>
            )}
          </div>
        )}
      </main>

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
