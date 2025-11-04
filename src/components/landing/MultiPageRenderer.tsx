"use client";

import { useState, useEffect } from "react";
import { LandingPage } from "@/types/landing";
import { ComponentRenderer } from "./ComponentRenderer";
import MultiPageNavigation from "./MultiPageNavigation";
import { getTheme } from "@/lib/themes";

interface MultiPageRendererProps {
  page: LandingPage;
}

export default function MultiPageRenderer({ page }: MultiPageRendererProps) {
  const [activePageId, setActivePageId] = useState<string>("main");
  const theme = getTheme(page.theme || "modern");

  const subPages = page.subPages || [];
  const visibleSubPages = subPages.filter((sp) => sp.visible);

  // Set initial active page (main or first sub-page)
  useEffect(() => {
    if (visibleSubPages.length > 0) {
      setActivePageId(visibleSubPages[0].id);
    }
  }, []);

  const navigation = page.navigation || {
    enabled: true,
    style: "tabs" as const,
    showIcons: true,
    sticky: true,
  };

  // Get components for active page
  let componentsToRender = page.components;

  if (activePageId !== "main") {
    const activePage = subPages.find((sp) => sp.id === activePageId);
    if (activePage) {
      componentsToRender = activePage.components;
    }
  }

  // Sort and filter components
  const sortedComponents = [...componentsToRender]
    .filter((c) => c.visible !== false)
    .sort((a, b) => a.order - b.order);

  const handleNavigate = (pageId: string) => {
    setActivePageId(pageId);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Adjust layout based on navigation style
  const hasSidebar = navigation.enabled && navigation.style === "sidebar";
  const sidebarPosition = navigation.position || "left";

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      {navigation.enabled && visibleSubPages.length > 0 && (
        <MultiPageNavigation
          subPages={visibleSubPages}
          activePageId={activePageId}
          onNavigate={handleNavigate}
          style={navigation.style}
          position={navigation.position}
          showIcons={navigation.showIcons}
          sticky={navigation.sticky}
          theme={theme}
        />
      )}

      {/* Content */}
      <main className={hasSidebar ? (sidebarPosition === "left" ? "ml-64" : "mr-64") : undefined}>
        <div className="min-h-screen">
          {sortedComponents.map((component) => (
            <ComponentRenderer key={component.id} component={component} theme={theme} />
          ))}
        </div>
      </main>
    </div>
  );
}
