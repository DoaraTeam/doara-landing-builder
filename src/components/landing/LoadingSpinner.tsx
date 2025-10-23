"use client";

import React from "react";

export type LoadingSpinnerType =
  | "spin"
  | "pulse"
  | "dots"
  | "bounce"
  | "square-corners"
  | "dual-ring"
  | "bars"
  | "ripple";

interface LoadingSpinnerProps {
  type?: LoadingSpinnerType;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  type = "spin",
  color = "#f97316", // orange-600
  size = "md",
}) => {
  const sizeClass = sizeClasses[size];

  const renderSpinner = () => {
    switch (type) {
      case "spin":
        return (
          <svg
            className={`animate-spin ${sizeClass}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            style={{ color }}
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        );

      case "pulse":
        return (
          <div
            className={`${sizeClass} rounded-full animate-pulse`}
            style={{ backgroundColor: color }}
          />
        );

      case "dots":
        return (
          <div className="flex items-center justify-center space-x-2">
            <div
              className="w-2.5 h-2.5 rounded-full animate-bounce"
              style={{ backgroundColor: color, animationDelay: "0ms" }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full animate-bounce"
              style={{ backgroundColor: color, animationDelay: "150ms" }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full animate-bounce"
              style={{ backgroundColor: color, animationDelay: "300ms" }}
            />
          </div>
        );

      case "bounce":
        return (
          <div className="flex items-end justify-center space-x-1">
            <div
              className="w-2 h-8 rounded animate-bounce"
              style={{ backgroundColor: color, animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-10 rounded animate-bounce"
              style={{ backgroundColor: color, animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-8 rounded animate-bounce"
              style={{ backgroundColor: color, animationDelay: "300ms" }}
            />
          </div>
        );

      case "square-corners":
        return (
          <div className={`${sizeClass} relative transform rotate-45`}>
            <div
              className="absolute w-3.5 h-3.5 animate-ping"
              style={{
                backgroundColor: color,
                top: 0,
                left: 0,
                animationDuration: "1.2s",
              }}
            />
            <div
              className="absolute w-3.5 h-3.5 animate-ping"
              style={{
                backgroundColor: color,
                top: 0,
                right: 0,
                animationDuration: "1.2s",
                animationDelay: "0.15s",
              }}
            />
            <div
              className="absolute w-3.5 h-3.5 animate-ping"
              style={{
                backgroundColor: color,
                bottom: 0,
                right: 0,
                animationDuration: "1.2s",
                animationDelay: "0.3s",
              }}
            />
            <div
              className="absolute w-3.5 h-3.5 animate-ping"
              style={{
                backgroundColor: color,
                bottom: 0,
                left: 0,
                animationDuration: "1.2s",
                animationDelay: "0.45s",
              }}
            />
          </div>
        );

      case "dual-ring":
        return (
          <div className={`${sizeClass} relative`}>
            <div
              className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: `${color} transparent transparent transparent` }}
            />
            <div
              className="absolute inset-2 rounded-full border-4 border-b-transparent animate-spin"
              style={{
                borderColor: `transparent transparent ${color} transparent`,
                animationDirection: "reverse",
                animationDuration: "0.8s",
              }}
            />
          </div>
        );

      case "bars":
        return (
          <div className="flex items-center justify-center space-x-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-1.5 h-8 rounded-full animate-pulse"
                style={{
                  backgroundColor: color,
                  animationDelay: `${i * 150}ms`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </div>
        );

      case "ripple":
        return (
          <div className={`${sizeClass} relative`}>
            <div
              className="absolute inset-0 rounded-full border-4 animate-ping opacity-75"
              style={{
                borderColor: color,
                animationDuration: "1.5s",
              }}
            />
            <div
              className="absolute inset-0 rounded-full border-4 animate-ping opacity-50"
              style={{
                borderColor: color,
                animationDuration: "1.5s",
                animationDelay: "0.5s",
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center" role="status" aria-label="Loading">
      {renderSpinner()}
    </div>
  );
};

// Preview component for admin
export const LoadingSpinnerPreview: React.FC<{
  type: LoadingSpinnerType;
  color?: string;
  onSelect?: () => void;
  selected?: boolean;
}> = ({ type, color = "#f97316", onSelect, selected }) => {
  return (
    <button
      onClick={onSelect}
      className={`
        flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all
        hover:shadow-md
        ${selected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}
      `}
    >
      <div className="h-20 flex items-center justify-center">
        <LoadingSpinner type={type} color={color} size="md" />
      </div>
      <span className="mt-2 text-xs font-medium capitalize">{type.replace("-", " ")}</span>
    </button>
  );
};
