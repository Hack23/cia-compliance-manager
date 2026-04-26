import React from "react";
import { SecurityResource } from "../../types/securityResources";

interface ResourceCardProps {
  resource: SecurityResource;
  onClick?: (resource: SecurityResource) => void;
  className?: string;
  testId?: string;
}

// Helper function to truncate text with ellipsis
const truncateText = (text: string | undefined, maxLength: number): string => {
  if (!text) return "";
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

/**
 * CIA component → accent color classes (purple = confidentiality,
 * green = integrity, blue = availability, gray = general).
 * Aligns with the CIA color coding used across the rest of the app.
 */
const getComponentAccent = (
  component: SecurityResource["component"]
): {
  border: string;
  badge: string;
} => {
  switch (component) {
    case "confidentiality":
      return {
        border: "border-l-4 border-l-purple-500 dark:border-l-purple-400",
        badge:
          "bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200",
      };
    case "integrity":
      return {
        border: "border-l-4 border-l-green-500 dark:border-l-green-400",
        badge:
          "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200",
      };
    case "availability":
      return {
        border: "border-l-4 border-l-blue-500 dark:border-l-blue-400",
        badge:
          "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200",
      };
    default:
      return {
        border: "border-l-4 border-l-gray-300 dark:border-l-gray-600",
        badge:
          "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
      };
  }
};

/**
 * Compact, color-coded resource card.
 *
 * Densely packed dashboards forced us to constrain card content:
 * - Title is clamped to 2 lines (no horizontal overflow on long titles).
 * - Type badge is constrained in width and clipped with ellipsis.
 * - Description is truncated to ≤100 chars (preserved for existing test).
 * - Tags are limited to 3 visible tags with a "+N" indicator for the rest.
 * - A left accent border encodes the CIA component (purple / green / blue).
 */
const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onClick,
  className = "",
  testId,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(resource);
    } else {
      window.open(resource.url, "_blank", "noopener,noreferrer");
    }
  };

  const accent = getComponentAccent(resource.component);
  const visibleTags = (resource.tags ?? []).slice(0, 3);
  const hiddenTagCount = Math.max(0, (resource.tags?.length ?? 0) - visibleTags.length);

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-md shadow-sm p-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark ${accent.border} ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " ") {
          // Space scrolls the page on focusable non-button elements; prevent it to match native button activation.
          e.preventDefault();
        } else if (e.key === "Enter") {
          handleClick();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === " " && !e.repeat) {
          handleClick();
        }
      }}
      data-testid={testId || "resource-item"}
    >
      <div className="flex justify-between items-start gap-sm mb-xs">
        <h3
          className="line-clamp-2 text-body font-semibold text-gray-800 dark:text-gray-100 leading-snug min-w-0 flex-1"
          title={resource.title}
        >
          {resource.title}
        </h3>
        <span
          className={`text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0 max-w-[7rem] truncate ${accent.badge}`}
          title={resource.type || "General"}
        >
          {resource.type || "General"}
        </span>
      </div>

      <p
        className="line-clamp-2 text-xs text-gray-600 dark:text-gray-300 mb-xs leading-snug"
      >
        {truncateText(resource.description || "", 100)}
      </p>

      {(resource.component || resource.source || resource.level) && (
        <div className="flex flex-wrap gap-x-sm gap-y-xs text-[10px] text-gray-500 dark:text-gray-400 mb-xs">
          {resource.component && (
            <span className="truncate max-w-[10rem]" title={`Component: ${resource.component}`}>
              Component: {resource.component}
            </span>
          )}
          {resource.source && (
            <span className="truncate max-w-[10rem]" title={`Source: ${resource.source}`}>
              Source: {resource.source}
            </span>
          )}
          {resource.level && (
            <span className="truncate max-w-[8rem]" title={`Level: ${resource.level}`}>
              Level: {resource.level}
            </span>
          )}
        </div>
      )}

      {visibleTags.length > 0 && (
        <div className="flex flex-wrap gap-xs">
          {visibleTags.map((tag, index) => (
            <span
              key={index}
              className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded max-w-[8rem] truncate"
              title={tag}
            >
              {tag}
            </span>
          ))}
          {hiddenTagCount > 0 && (
            <span className="text-[10px] text-gray-500 dark:text-gray-400 px-1 py-0.5">
              +{hiddenTagCount}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ResourceCard;
