import React, { useCallback, useMemo, useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { RESOURCE_TEST_IDS } from "../../../constants/testIds";
import { useSecurityResources } from "../../../hooks/useSecurityResources";
import { SecurityLevel } from "../../../types/cia";
import { SecurityResource } from "../../../types/securityResources";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Props for SecurityResourcesWidget component
 */
interface SecurityResourcesWidgetProps {
  /**
   * Selected availability level
   */
  availabilityLevel: SecurityLevel;

  /**
   * Selected integrity level
   */
  integrityLevel: SecurityLevel;

  /**
   * Selected confidentiality level
   */
  confidentialityLevel: SecurityLevel;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for automated testing
   */
  testId?: string;
}

/**
 * Security Resources Widget displays relevant tools, documentation, and compliance resources
 *
 * ## Business Perspective
 *
 * This widget assists security practitioners by providing curated resources
 * tailored to the selected security levels. It saves time in research and
 * helps ensure implementation of appropriate security controls by linking
 * to authoritative sources and industry best practices. 📚
 */
const SecurityResourcesWidget: React.FC<SecurityResourcesWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "security-resources-widget",
}) => {
  // Get security resources based on levels
  const { resources, isLoading, error } = useSecurityResources({
    component: "all", // Use a valid component value
    securityLevel: availabilityLevel,
    searchQuery: "",
  });

  // State for active filter
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Get unique resource categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    uniqueCategories.add("all");

    if (resources) {
      resources.forEach((resource: SecurityResource) => {
        if (resource.category) {
          uniqueCategories.add(resource.category);
        }
      });
    }

    return Array.from(uniqueCategories);
  }, [resources]);

  // Filter resources based on active filter
  const filteredResources = useMemo(() => {
    if (!resources) return [];

    if (activeFilter === "all") {
      return resources;
    }

    return resources.filter(
      (resource: SecurityResource) => resource.category === activeFilter
    );
  }, [resources, activeFilter]);

  // Handle filter change
  const handleFilterChange = useCallback((category: string) => {
    setActiveFilter(category);
  }, []);

  // Get category icon based on category name
  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      tools: "🛠️",
      documentation: "📝",
      standards: "📋",
      training: "🎓",
      frameworks: "🏗️",
      libraries: "📚",
      best_practices: "✅",
      vendors: "🏢",
      all: "🔍",
    };

    return icons[category] || "📌";
  };

  // Get the category display name (formatted nicely)
  const getCategoryDisplayName = (category: string): string => {
    if (category === "all") return "All Resources";

    // Convert snake_case to Title Case
    return category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <WidgetContainer
      title={WIDGET_TITLES.SECURITY_RESOURCES}
      icon={WIDGET_ICONS.SECURITY_RESOURCES}
      className={className}
      testId={testId}
      loading={isLoading}
      error={error}
    >
      <div className="p-4">
        {/* Category filters */}
        <div className="mb-4 overflow-x-auto">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeFilter === category
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-50 dark:text-blue-300"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                data-testid={`${RESOURCE_TEST_IDS.CATEGORY_FILTER_PREFIX}-${category}`}
              >
                <span className="mr-1">{getCategoryIcon(category)}</span>
                {getCategoryDisplayName(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Resources grid */}
        {filteredResources.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            data-testid={RESOURCE_TEST_IDS.RESOURCES_CONTAINER}
          >
            {filteredResources.map(
              (resource: SecurityResource, index: number) => (
                <div
                  key={`resource-${index}`}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  data-testid={`${RESOURCE_TEST_IDS.RESOURCE_ITEM_PREFIX}-${index}`}
                >
                  <div className="flex items-start mb-2">
                    <div className="mr-3 text-lg">
                      {getCategoryIcon(resource.category || "default")}
                    </div>
                    <div>
                      <h4 className="font-medium">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline dark:text-blue-400"
                          data-testid={`${RESOURCE_TEST_IDS.RESOURCE_LINK_PREFIX}-${index}`}
                        >
                          {resource.title}
                        </a>
                      </h4>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {resource.source}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {resource.description}
                  </p>
                  {resource.tags && resource.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {resource.tags.map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-0.5 rounded-full text-xs bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                          data-testid={`${RESOURCE_TEST_IDS.RESOURCE_TAG_PREFIX}-${index}-${tagIndex}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        ) : (
          <div
            className="text-center p-8 text-gray-500 dark:text-gray-400"
            data-testid={RESOURCE_TEST_IDS.NO_RESOURCES_MESSAGE}
          >
            No resources found for the current selection.
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};

// Export the component directly without HOC
export default SecurityResourcesWidget;
