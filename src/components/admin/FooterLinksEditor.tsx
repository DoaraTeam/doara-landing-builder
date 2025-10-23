"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, GripVertical, Facebook, Twitter, Linkedin, Github } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FooterLink {
  text: string;
  link: string;
}

interface FooterLinkGroup {
  title: string;
  items: FooterLink[];
}

interface SocialLink {
  platform: string;
  link: string;
  icon: string;
}

interface FooterConfig {
  logo: { text: string; image: string };
  description: string;
  links?: FooterLinkGroup[];
  social?: SocialLink[];
  copyright: string;
}

interface FooterLinksEditorProps {
  footerConfig: FooterConfig;
  onChange: (config: FooterConfig) => void;
}

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
};

export function FooterLinksEditor({ footerConfig, onChange }: FooterLinksEditorProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleUpdateLinkGroup = (index: number, updates: Partial<FooterLinkGroup>) => {
    const updatedLinks = (footerConfig.links || []).map((group, i) =>
      i === index ? { ...group, ...updates } : group
    );
    onChange({ ...footerConfig, links: updatedLinks });
  };

  const handleAddLinkGroup = () => {
    onChange({
      ...footerConfig,
      links: [
        ...(footerConfig.links || []),
        { title: "New Section", items: [{ text: "Link 1", link: "#" }] },
      ],
    });
  };

  const handleDeleteLinkGroup = (index: number) => {
    if (confirm("Delete this link group?")) {
      onChange({
        ...footerConfig,
        links: (footerConfig.links || []).filter((_, i) => i !== index),
      });
    }
  };

  const handleUpdateLink = (
    groupIndex: number,
    linkIndex: number,
    updates: Partial<FooterLink>
  ) => {
    const group = (footerConfig.links || [])[groupIndex];
    if (!group) return;
    const updatedItems = group.items?.map((item, i) =>
      i === linkIndex ? { ...item, ...updates } : item
    );
    handleUpdateLinkGroup(groupIndex, { items: updatedItems });
  };

  const handleAddLink = (groupIndex: number) => {
    const group = (footerConfig.links || [])[groupIndex];
    if (!group) return;
    handleUpdateLinkGroup(groupIndex, {
      items: [...group.items, { text: "New Link", link: "#" }],
    });
  };

  const handleDeleteLink = (groupIndex: number, linkIndex: number) => {
    const group = (footerConfig.links || [])[groupIndex];
    if (!group) return;
    const updatedItems = group.items.filter((_, i) => i !== linkIndex);
    handleUpdateLinkGroup(groupIndex, { items: updatedItems });
  };

  const handleUpdateSocial = (index: number, updates: Partial<SocialLink>) => {
    const updatedSocial = (footerConfig.social || []).map((item, i) =>
      i === index ? { ...item, ...updates } : item
    );
    onChange({ ...footerConfig, social: updatedSocial });
  };

  const handleAddSocial = () => {
    onChange({
      ...footerConfig,
      social: [
        ...(footerConfig.social || []),
        { platform: "facebook", link: "#", icon: "facebook" },
      ],
    });
  };

  const handleDeleteSocial = (index: number) => {
    onChange({
      ...footerConfig,
      social: (footerConfig.social || []).filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      {/* Logo & Description */}
      <Card className="border border-gray-200">
        <CardHeader
          className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
          onClick={() => setExpandedSection(expandedSection === "logo" ? null : "logo")}
        >
          <CardTitle className="text-sm font-medium">Logo & Description</CardTitle>
        </CardHeader>
        {expandedSection === "logo" && (
          <CardContent className="p-3 space-y-3 border-t">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Logo Text</Label>
                <Input
                  value={footerConfig.logo.text}
                  onChange={(e) =>
                    onChange({
                      ...footerConfig,
                      logo: { ...footerConfig.logo, text: e.target.value },
                    })
                  }
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Logo Image URL</Label>
                <Input
                  value={footerConfig.logo.image}
                  onChange={(e) =>
                    onChange({
                      ...footerConfig,
                      logo: { ...footerConfig.logo, image: e.target.value },
                    })
                  }
                  placeholder="https://..."
                  className="h-8 text-sm"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Description</Label>
              <textarea
                value={footerConfig.description}
                onChange={(e) => onChange({ ...footerConfig, description: e.target.value })}
                className="w-full min-h-[60px] px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
              />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Link Groups */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold">
            Link Groups ({footerConfig.links?.length || 0})
          </Label>
          <Button size="sm" variant="outline" onClick={handleAddLinkGroup} className="h-8">
            <Plus className="h-3 w-3 mr-1" />
            Add Group
          </Button>
        </div>

        {(footerConfig.links || []).map((group, groupIndex) => (
          <Card key={groupIndex} className="border border-gray-200">
            <CardHeader className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100">
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-2 flex-1"
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === `group-${groupIndex}` ? null : `group-${groupIndex}`
                    )
                  }
                >
                  <GripVertical className="h-4 w-4 text-gray-400" />
                  <CardTitle className="text-sm font-medium">{group.title}</CardTitle>
                  <span className="text-xs text-gray-500">({group.items.length} links)</span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteLinkGroup(groupIndex);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>

            {expandedSection === `group-${groupIndex}` && (
              <CardContent className="p-3 space-y-3 border-t">
                <div className="space-y-1.5">
                  <Label className="text-xs">Group Title</Label>
                  <Input
                    value={group.title}
                    onChange={(e) => handleUpdateLinkGroup(groupIndex, { title: e.target.value })}
                    className="h-8 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Links ({group.items.length})</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddLink(groupIndex)}
                      className="h-6 text-xs"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Link
                    </Button>
                  </div>
                  {group.items?.map((link, linkIndex) => (
                    <div key={linkIndex} className="grid grid-cols-2 gap-2">
                      <Input
                        value={link.text}
                        onChange={(e) =>
                          handleUpdateLink(groupIndex, linkIndex, { text: e.target.value })
                        }
                        placeholder="Link text"
                        className="h-7 text-xs"
                      />
                      <div className="flex gap-1">
                        <Input
                          value={link.link}
                          onChange={(e) =>
                            handleUpdateLink(groupIndex, linkIndex, { link: e.target.value })
                          }
                          placeholder="Link URL"
                          className="h-7 text-xs flex-1"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteLink(groupIndex, linkIndex)}
                          className="h-7 w-7 p-0 hover:text-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Social Links */}
      <Card className="border border-gray-200">
        <CardHeader
          className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
          onClick={() => setExpandedSection(expandedSection === "social" ? null : "social")}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Social Links ({footerConfig.social?.length || 0})
            </CardTitle>
            <Button size="sm" variant="outline" onClick={handleAddSocial} className="h-6 text-xs">
              <Plus className="h-3 w-3 mr-1" />
              Add Social
            </Button>
          </div>
        </CardHeader>
        {expandedSection === "social" && (
          <CardContent className="p-3 space-y-2 border-t">
            {(footerConfig.social || []).map((social, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 items-center">
                <select
                  value={social.platform}
                  onChange={(e) =>
                    handleUpdateSocial(index, { platform: e.target.value, icon: e.target.value })
                  }
                  className="h-7 text-xs border border-gray-300 rounded px-2"
                >
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="github">GitHub</option>
                </select>
                <Input
                  value={social.link}
                  onChange={(e) => handleUpdateSocial(index, { link: e.target.value })}
                  placeholder="https://..."
                  className="h-7 text-xs"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteSocial(index)}
                  className="h-7 w-7 p-0 hover:text-red-600 justify-self-end"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </CardContent>
        )}
      </Card>

      {/* Copyright */}
      <Card className="border border-gray-200">
        <CardHeader
          className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
          onClick={() => setExpandedSection(expandedSection === "copyright" ? null : "copyright")}
        >
          <CardTitle className="text-sm font-medium">Copyright</CardTitle>
        </CardHeader>
        {expandedSection === "copyright" && (
          <CardContent className="p-3 border-t">
            <Input
              value={footerConfig.copyright}
              onChange={(e) => onChange({ ...footerConfig, copyright: e.target.value })}
              placeholder="© 2024 Your Company. All rights reserved."
              className="h-8 text-sm"
            />
          </CardContent>
        )}
      </Card>
    </div>
  );
}
