"use client";

import { ComponentConfig } from "@/types/landing";
import { Eye, EyeOff, Trash2, GripVertical, Edit, Copy, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";

interface EditableBlockProps {
  component: ComponentConfig;
  isSelected: boolean;
  onSelect: () => void;
  onToggleVisibility: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  children: React.ReactNode;
}

/**
 * EditableBlock - Wrapper for components in edit mode
 * Provides selection, visibility toggle, delete, duplicate, move functionality
 */
export function EditableBlock({
  component,
  isSelected,
  onSelect,
  onToggleVisibility,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  canMoveUp = true,
  canMoveDown = true,
  children,
}: EditableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: component.id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    zIndex: isDragging ? 50 : undefined,
  };
  const getComponentName = (type: string) => {
    const names: Record<string, string> = {
      hero: "Hero Section",
      features: "Features",
      pricing: "Pricing",
      testimonials: "Testimonials",
      cta: "Call to Action",
      footer: "Footer",
      "gym-hero": "Gym Hero",
      "gym-services": "Gym Services",
      "gym-pricing": "Gym Pricing",
      "gym-testimonials": "Gym Testimonials",
      "gym-navigation": "Gym Navigation",
      "gym-about": "Gym About",
      "gym-contact": "Gym Contact",
    };
    return names[type] || type;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group transition-all ${
        isSelected ? "ring-2 ring-blue-500 ring-offset-2" : "hover:ring-2 hover:ring-gray-300"
      } ${!component.visible ? "opacity-50" : ""} ${isDragging ? "opacity-50 ring-2 ring-blue-400" : ""}`}
      onClick={onSelect}
    >
      {/* Component Content */}
      <div className="pointer-events-none">{children}</div>

      {/* Edit Overlay - Shows on hover or when selected */}
      <div
        className={`absolute inset-0 bg-blue-500 bg-opacity-0 transition-opacity pointer-events-none ${
          isSelected ? "bg-opacity-5" : "group-hover:bg-opacity-5"
        }`}
      />

      {/* Toolbar - Shows on hover or when selected */}
      <div
        className={`absolute top-0 right-0 m-2 flex gap-1 transition-opacity ${
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex items-center gap-1 p-1">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="px-1 cursor-grab active:cursor-grabbing hover:bg-gray-100 rounded"
            title="Drag to reorder"
          >
            <GripVertical className="h-4 w-4 text-gray-500" />
          </div>

          {/* Component Label */}
          <div className="px-2 text-xs font-medium text-gray-700">
            {getComponentName(component.type)}
          </div>

          <div className="w-px h-4 bg-gray-300" />

          {/* Move Up/Down Buttons */}
          {onMoveUp && (
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 hover:bg-blue-50"
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
              disabled={!canMoveUp}
              title="Move Up"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </Button>
          )}
          {onMoveDown && (
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 hover:bg-blue-50"
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
              disabled={!canMoveDown}
              title="Move Down"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </Button>
          )}

          <div className="w-px h-4 bg-gray-300" />

          {/* Edit Button */}
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0 hover:bg-blue-50"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            title="Edit"
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>

          {/* Visibility Toggle */}
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0 hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisibility();
            }}
            title={component.visible ? "Hide" : "Show"}
          >
            {component.visible ? (
              <Eye className="h-3.5 w-3.5" />
            ) : (
              <EyeOff className="h-3.5 w-3.5 text-gray-400" />
            )}
          </Button>

          {/* Duplicate Button */}
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0 hover:bg-green-50 hover:text-green-600"
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            title="Duplicate"
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>

          {/* Delete Button */}
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0 hover:bg-red-50 hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Delete ${getComponentName(component.type)}?`)) {
                onDelete();
              }
            }}
            title="Delete"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Order Badge - Bottom Left */}
      <div
        className={`absolute bottom-2 left-2 transition-opacity ${
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <div className="bg-white rounded px-2 py-1 text-xs font-medium text-gray-600 shadow-sm border border-gray-200">
          Order: {component.order}
        </div>
      </div>

      {/* Hidden Badge - Shows when component is hidden */}
      {!component.visible && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-gray-900 bg-opacity-80 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Hidden Component
          </div>
        </div>
      )}
    </div>
  );
}
