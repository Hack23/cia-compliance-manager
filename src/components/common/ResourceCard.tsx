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

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-md mb-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
      data-testid={testId || "resource-item"}
    >
      <div className="flex justify-between items-start mb-sm">
        <h3 className="text-subheading font-semibold text-gray-800 dark:text-gray-100">
          {resource.title}
        </h3>
        <div className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1.5 rounded">
          {resource.type || "General"}
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        {truncateText(resource.description || "", 100)}
      </p>

      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {resource.component && (
          <span className="mr-2">Component: {resource.component}</span>
        )}
        {resource.source && (
          <span className="mr-2">Source: {resource.source}</span>
        )}
        {resource.level && <span>Level: {resource.level}</span>}
      </div>

      <div className="mt-sm flex flex-wrap gap-sm">
        {resource.tags?.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ResourceCard;
