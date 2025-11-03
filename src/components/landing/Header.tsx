"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { AnimatedSection } from "./AnimatedSection";
import { getBackgroundStyle } from "@/lib/background-utils";
import { getSpacingClasses } from "@/lib/layout-utils";
import { BackgroundConfig, SpacingConfig, AnimationConfig, Theme } from "@/types/landing";
import { useEditMode } from "@/contexts/EditModeContext";

export interface HeaderTab {
  id: string;
  text: string;
  link: string;
}

export interface HeaderConfig {
  logo?: {
    type: "text" | "image";
    text?: string;
    image?: string;
    link?: string;
  };
  tabs: HeaderTab[];
  ctaButton?: {
    text: string;
    link: string;
    style?: "primary" | "secondary" | "outline";
  };
  position?: "fixed" | "sticky" | "static";
  transparent?: boolean; // Transparent on scroll top
  background: BackgroundConfig;
  spacing?: SpacingConfig;
  animation?: AnimationConfig;
}

interface HeaderProps {
  config: HeaderConfig;
  theme?: Theme;
}

export function Header({ config, theme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isEditMode } = useEditMode();

  // Smooth scroll to component
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    // Only handle hash links for smooth scrolling
    if (!link.startsWith("#")) return;

    e.preventDefault();
    const targetId = link.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Calculate offset for fixed/sticky headers
      const headerHeight = position === "fixed" || position === "sticky" ? 80 : 0;
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      setMobileMenuOpen(false);
    }
  };

  const {
    logo,
    tabs = [],
    ctaButton,
    position = "sticky",
    transparent = false,
    background,
    spacing,
    animation,
  } = config;

  // Handle scroll effect
  useEffect(() => {
    // Only handle scroll in public view (not edit mode)
    if (isEditMode) {
      return;
    }

    // Only handle scroll for transparent mode or shadow effect
    if (!transparent && position === "static") {
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparent, position, isEditMode]);

  const bgStyle = getBackgroundStyle(background, theme?.colors.background || "#ffffff");
  const spacingClasses = spacing ? getSpacingClasses(spacing) : "py-4";

  // In edit mode, force static position to prevent overlapping
  const effectivePosition = isEditMode ? "static" : position;

  const positionClasses = {
    fixed: "fixed top-0 left-0 right-0 w-full z-40",
    sticky: "sticky top-0 w-full z-40",
    static: "static w-full",
  };

  const headerClasses = `
    ${positionClasses[effectivePosition]}
    ${scrolled ? "shadow-md" : ""}
    transition-all duration-300
  `.trim();

  const headerStyle =
    transparent && !scrolled && effectivePosition !== "static"
      ? { backgroundColor: "transparent" }
      : bgStyle;

  const getButtonStyles = (style?: "primary" | "secondary" | "outline") => {
    const primaryColor = theme?.colors.primary || "#3b82f6";

    switch (style) {
      case "secondary":
        return {
          backgroundColor: theme?.colors.secondary || "#6b7280",
          color: "#ffffff",
        };
      case "outline":
        return {
          border: `2px solid ${primaryColor}`,
          color: primaryColor,
          backgroundColor: "transparent",
        };
      case "primary":
      default:
        return {
          backgroundColor: primaryColor,
          color: "#ffffff",
        };
    }
  };

  const renderLogo = () => {
    const logoLink = logo?.link || "/";

    if (logo?.type === "image" && logo.image) {
      return (
        <a href={logoLink} className="flex items-center">
          <Image
            src={logo.image}
            alt="Logo"
            width={160}
            height={8}
            className="h-10 md:h-12 w-auto max-w-[200px]"
          />
        </a>
      );
    }

    if (logo?.text) {
      return (
        <a
          href={logoLink}
          className="text-2xl font-bold"
          style={{ color: theme?.colors.text || "#1f2937" }}
        >
          {logo.text}
        </a>
      );
    }

    return (
      <a
        href={logoLink}
        className="text-2xl font-bold"
        style={{ color: theme?.colors.text || "#1f2937" }}
      >
        Your Brand
      </a>
    );
  };

  const headerContent = (
    <header className={headerClasses} style={headerStyle}>
      <nav className={`container mx-auto px-4 ${spacingClasses}`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">{renderLogo()}</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                href={tab.link}
                onClick={(e) => handleNavClick(e, tab.link)}
                className="text-base font-medium hover:opacity-80 transition-opacity cursor-pointer"
                style={{ color: theme?.colors.text || "#1f2937" }}
              >
                {tab.text}
              </a>
            ))}

            {/* CTA Button */}
            {ctaButton && (
              <a
                href={ctaButton.link}
                onClick={(e) => handleNavClick(e, ctaButton.link)}
                className="px-6 py-2 rounded-lg font-medium transition-all hover:opacity-90 cursor-pointer"
                style={getButtonStyles(ctaButton.style)}
              >
                {ctaButton.text}
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={24} style={{ color: theme?.colors.text || "#1f2937" }} />
              ) : (
                <Menu size={24} style={{ color: theme?.colors.text || "#1f2937" }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {tabs.map((tab) => (
                <a
                  key={tab.id}
                  href={tab.link}
                  onClick={(e) => handleNavClick(e, tab.link)}
                  className="text-base font-medium hover:opacity-80 transition-opacity cursor-pointer"
                  style={{ color: theme?.colors.text || "#1f2937" }}
                >
                  {tab.text}
                </a>
              ))}

              {ctaButton && (
                <a
                  href={ctaButton.link}
                  onClick={(e) => handleNavClick(e, ctaButton.link)}
                  className="px-6 py-2 rounded-lg font-medium text-center transition-all hover:opacity-90 cursor-pointer"
                  style={getButtonStyles(ctaButton.style)}
                >
                  {ctaButton.text}
                </a>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );

  // Create a wrapper that includes a spacer for fixed/sticky headers
  const content = (
    <>
      {headerContent}
      {/* Spacer to prevent content from being hidden under fixed header */}
      {position === "fixed" && (
        <div className={`w-full ${spacingClasses}`} style={{ height: "auto" }} />
      )}
    </>
  );

  // Wrap with animation if configured
  if (animation && animation.type !== "none") {
    return <AnimatedSection animation={animation}>{content}</AnimatedSection>;
  }

  return content;
}
