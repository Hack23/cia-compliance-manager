import React, { useCallback, useMemo, useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { SECURITY_RESOURCES_TEST_IDS } from "../../../constants/testIds";
import { SECURITY_ICONS } from "../../../constants/uiConstants";
import { useCIAContent } from "../../../hooks/useCIAContent";
import { useSecurityResources } from "../../../hooks/useSecurityResources";
import { SecurityLevel } from "../../../types/cia";
import { CIAComponentType } from "../../../types/cia-services";
import LinkButton from "../../common/LinkButton";
import ResourceCard from "../../common/ResourceCard";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Props for SecurityResourcesWidget component
 */
export interface SecurityResourcesWidgetProps {
  /**
   * Component type (availability, integrity, confidentiality)
   */
  component: CIAComponentType;

  /**
   * Security level for the component
   */
  securityLevel: SecurityLevel;

  /**
   * Integrity level for comparative resource inclusion
   */
  integrityLevel?: SecurityLevel;

  /**
   * Confidentiality level for comparative resource inclusion
   */
  confidentialityLevel?: SecurityLevel;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional title for the widget
   */
  title?: string;

  /**
   * Optional test ID for automated testing
   */
  testId?: string;
}

/**
 * Widget that displays security resources relevant to the selected security level
 *
 * ## Implementation Perspective
 *
 * This widget provides curated security resources including documentation,
 * tools, templates, and guides to help implementation teams successfully
 * deploy security controls for the selected security level. 📚
 */
const SecurityResourcesWidget: React.FC<SecurityResourcesWidgetProps> = ({
  component,
  securityLevel,
  integrityLevel,
  confidentialityLevel,
  className,
  title,
  testId = SECURITY_RESOURCES_TEST_IDS.WIDGET,
}) => {
  // State for category filter
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Get resources using the hook
  const { resources, isLoading, error } = useSecurityResources(
    component,
    securityLevel,
    integrityLevel,
    confidentialityLevel
  );

  // Get CIA content service for implementation tips
  const { ciaContentService } = useCIAContent();

  // Change filter handler
  const handleFilterChange = useCallback((category: string) => {
    setActiveFilter(category);
  }, []);

  // Get component color based on component type
  const componentColor = useMemo(() => {
    switch (component) {
      case "availability":
        return "blue";
      case "integrity":
        return "green";
      case "confidentiality":
        return "purple";
      default:
        return "blue";
    }
  }, [component]);

  // Get category icon
  const getCategoryIcon = (category: string): string => {
    switch (category.toLowerCase()) {
      case "documentation":
        return "📄";
      case "tool":
        return "🔧";
      case "template":
        return "📋";
      case "guide":
        return "📚";
      case "training":
        return "🎓";
      case "all":
        return "🔍";
      default:
        return "📌";
    }
  };

  // Get display name for category
  const getCategoryDisplayName = (category: string): string => {
    if (category === "all") return "All Resources";

    // Capitalize first letter
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Get unique resource categories for filtering
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    uniqueCategories.add("all");

    resources.forEach((resource) => {
      if (resource.type) {
        uniqueCategories.add(resource.type.toLowerCase());
      } else if (resource.tags && resource.tags.length > 0) {
        // Use first tag as fallback category
        uniqueCategories.add(resource.tags[0].toLowerCase());
      }
    });

    return Array.from(uniqueCategories);
  }, [resources]);

  // Filter resources based on active filter
  const filteredResources = useMemo(() => {
    if (!resources) return [];

    if (activeFilter === "all") {
      return resources;
    }

    return resources.filter(
      (resource) =>
        (resource.type && resource.type.toLowerCase() === activeFilter) ||
        (resource.tags &&
          resource.tags.some((tag) => tag.toLowerCase() === activeFilter))
    );
  }, [resources, activeFilter]);

  return (
    <WidgetContainer
      title={title || WIDGET_TITLES.SECURITY_RESOURCES || "Security Resources"}
      icon={
        WIDGET_ICONS.SECURITY_RESOURCES || SECURITY_ICONS.implementation || "📚"
      }
      className={className}
      testId={testId}
    >
      <div className="p-4">
        {/* Loading state */}
        {isLoading && (
          <div
            className="p-4 text-center"
            data-testid={SECURITY_RESOURCES_TEST_IDS.LOADING}
          >
            <span className="inline-block animate-spin mr-2">⏳</span>
            Loading security resources...
          </div>
        )}

        {/* Error state */}
        {error && (
          <div
            className="p-4 text-center text-red-500 dark:text-red-400"
            data-testid={SECURITY_RESOURCES_TEST_IDS.ERROR}
          >
            <p>Error loading security resources: {error.message}</p>
          </div>
        )}

        {/* Overview */}
        <div
          className="mb-4"
          data-testid={SECURITY_RESOURCES_TEST_IDS.OVERVIEW}
        >
          <h3 className="text-lg font-medium mb-2">
            Security Resources for {securityLevel} {component}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            These resources will help you implement {securityLevel} level{" "}
            {component} security controls.
          </p>
        </div>

        {/* Category filters */}
        {categories.length > 1 && (
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
                  data-testid={`resource-category-filter-${category}`}
                >
                  <span className="mr-1">{getCategoryIcon(category)}</span>
                  {getCategoryDisplayName(category)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Resources Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Recommended Resources</h3>

          {/* No resources message */}
          {filteredResources.length === 0 && !isLoading && (
            <div
              className="p-4 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              data-testid={SECURITY_RESOURCES_TEST_IDS.NO_RESOURCES}
            >
              <p>
                No security resources available for {securityLevel} {component}.
              </p>
            </div>
          )}

          {/* Resources grid */}
          {filteredResources.length > 0 && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              data-testid={SECURITY_RESOURCES_TEST_IDS.RESOURCE_GROUP}
            >
              {filteredResources.map((resource, index) => (
                <ResourceCard
                  key={resource.id || index}
                  resource={resource}
                  color={componentColor}
                  testId={`${SECURITY_RESOURCES_TEST_IDS.RESOURCE_ITEM}-${index}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Implementation Tips */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Implementation Tips</h3>
          <div
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            data-testid={SECURITY_RESOURCES_TEST_IDS.IMPLEMENTATION_STEPS}
          >
            {ciaContentService?.getImplementationTime && (
              <div className="mb-4">
                <p className="font-medium mb-1">Implementation Time Estimate</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {ciaContentService.getImplementationTime(securityLevel)}
                </p>
              </div>
            )}

            <div className="mb-4">
              <p className="font-medium mb-1">
                Key Implementation Considerations
              </p>
              <ul className="list-disc list-inside mt-1 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {/* Use hardcoded value points for now since getDefaultValuePoints is private */}
                <li
                  data-testid={`${SECURITY_RESOURCES_TEST_IDS.VALUE_POINT}-0`}
                >
                  Start with a thorough security assessment
                </li>
                <li
                  data-testid={`${SECURITY_RESOURCES_TEST_IDS.VALUE_POINT}-1`}
                >
                  Implement controls progressively based on risk
                </li>
                <li
                  data-testid={`${SECURITY_RESOURCES_TEST_IDS.VALUE_POINT}-2`}
                >
                  Monitor and evaluate effectiveness regularly
                </li>
              </ul>
            </div>

            <div className="mt-3">
              <p className="font-medium mb-1">Required Expertise</p>
              <p
                className="text-sm text-gray-600 dark:text-gray-400"
                data-testid={SECURITY_RESOURCES_TEST_IDS.REQUIRED_EXPERTISE}
              >
                {ciaContentService?.getImplementationTime &&
                  `${
                    securityLevel === "None" ? "Basic" : securityLevel
                  } level security expertise required`}
              </p>
            </div>
          </div>
        </div>

        {/* View all resources button */}
        <div className="mt-4 text-center">
          <LinkButton
            href="#"
            variant="outline"
            testId={SECURITY_RESOURCES_TEST_IDS.VIEW_ALL_BUTTON}
          >
            View All {component} Resources
          </LinkButton>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default SecurityResourcesWidget;
