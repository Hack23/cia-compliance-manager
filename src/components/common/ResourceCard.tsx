import React from "react";
import { SecurityResource } from "../../types/securityResources";

interface ResourceCardProps {
  /**
   * Security resource to display
   */
  resource: SecurityResource;

  /**
   * Optional color theme for the card
   */
  color?: string;

  /**
   * Optional test ID for automated testing
   */
  testId?: string;
}

/**
 * Component for displaying a security resource card
 */
const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  color = "blue",
  testId,
}) => {
  /**
   * Truncate text to specified length and add ellipsis
   */
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div
      className={`p-3 bg-white dark:bg-gray-900 rounded-lg border border-${color}-200 dark:border-${color}-800 shadow-sm hover:shadow-md transition-shadow`}
      data-testid={testId}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 dark:text-gray-100">
          {truncateText(resource.title, 40)}
        </h4>
        {resource.type && (
          <span
            className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-${color}-100 text-${color}-800 dark:bg-${color}-900 dark:bg-opacity-50 dark:text-${color}-300`}
          >
            {resource.type}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {truncateText(resource.description, 100)}
      </p>

      <div className="flex justify-between items-center">
        {/* Resource source */}
        {resource.source && (
          <span className="text-xs text-gray-500 dark:text-gray-500">
            Source: {resource.source}
          </span>
        )}

        {/* Resource link */}
        {resource.url && (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-medium text-${color}-600 hover:text-${color}-700 dark:text-${color}-400 dark:hover:text-${color}-300`}
          >
            View Resource →
          </a>
        )}
      </div>

      {/* Tags */}
      {resource.tags && resource.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {resource.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-0.5 text-xs rounded-full bg-${color}-50 text-${color}-700 dark:bg-${color}-900 dark:bg-opacity-20 dark:text-${color}-300`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceCard;
