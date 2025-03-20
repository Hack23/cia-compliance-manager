import React, { useCallback, useEffect, useMemo, useState } from "react";
// Replace the react-error-boundary import
import { WIDGET_ICONS, WIDGET_TITLES } from "../../constants/coreConstants";
import {
    SECURITY_RESOURCES_TEST_IDS,
    WIDGET_TEST_IDS,
} from "../../constants/testIds";
import { createCIAContentService } from "../../services/ciaContentService";
import {
    SecurityResource,
    SecurityResourceService,
} from "../../services/securityResourceService";
import { SecurityLevel } from "../../types/cia";
import { calculateOverallSecurityLevel } from "../../utils/securityLevelUtils";
import WidgetContainer from "../common/WidgetContainer";

// If ErrorBoundary is not available, create a local implementation:
const useErrorBoundary = () => {
  return {
    showBoundary: (error: Error) => {
      console.error("Error caught:", error);
    }
  };
};

export interface SecurityResourcesWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * Widget that displays relevant security resources based on selected security levels
 *
 * ## Educational Perspective
 *
 * This widget helps security teams find relevant educational resources,
 * implementation guides, and best practices based on their selected security levels.
 * It provides a learning path to improve knowledge and skills for implementing
 * appropriate security controls. 📚
 */
const SecurityResourcesWidget: React.FC<SecurityResourcesWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = WIDGET_TEST_IDS.SECURITY_RESOURCES_WIDGET,
}) => {
  const [resources, setResources] = useState<SecurityResource[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Use the service with the data provider
  const resourceService = useMemo(() => {
    const contentService = createCIAContentService();
    
    // Create a data provider with the required options
    const dataProvider = {
      availabilityOptions: contentService.getCIAOptions("availability"),
      integrityOptions: contentService.getCIAOptions("integrity"),
      confidentialityOptions: contentService.getCIAOptions("confidentiality"),
      // Use getROIEstimates instead of getAllROIEstimates
      roiEstimates: {
        NONE: { returnRate: "0%", description: "No ROI" },
        LOW: { returnRate: "50%", description: "Low ROI" },
        MODERATE: { returnRate: "200%", description: "Moderate ROI" },
        HIGH: { returnRate: "350%", description: "High ROI" },
        VERY_HIGH: { returnRate: "500%", description: "Very High ROI" }
      }
    };
    return new SecurityResourceService(dataProvider);
  }, []);

  // Calculate overall security level from individual components
  const securityLevel = useMemo(() => {
    return calculateOverallSecurityLevel(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Load resources based on security levels
  useEffect(() => {
    setLoading(true);
    try {
      // Get resources for each component
      const availabilityResources = resourceService.getSecurityResources(
        "availability",
        availabilityLevel
      );

      const integrityResources = resourceService.getSecurityResources(
        "integrity",
        integrityLevel
      );

      const confidentialityResources = resourceService.getSecurityResources(
        "confidentiality",
        confidentialityLevel
      );

      // Combine all resources, avoiding duplicates by ID
      const allResources = [
        ...availabilityResources,
        ...integrityResources,
        ...confidentialityResources,
      ];

      // Remove duplicates
      const uniqueResources = allResources.filter(
        (resource, index, self) =>
          index === self.findIndex((r) => r.id === resource.id)
      );

      // Sort by relevance
      const sortedResources = uniqueResources.sort(
        (a, b) => b.relevance - a.relevance
      );

      setResources(sortedResources);
      setError(null);
    } catch (err) {
      console.error("Error loading security resources:", err);
      setError(err instanceof Error ? err : new Error("Failed to load resources"));
    } finally {
      setLoading(false);
    }
  }, [
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    resourceService,
  ]);

  // Filter resources based on type and search query
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      // Apply type filter
      const typeMatch =
        activeFilter === "all" || resource.type === activeFilter;

      // Apply search query
      const query = searchQuery.toLowerCase();
      const searchMatch =
        query === "" ||
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.tags?.some((tag) => tag.toLowerCase().includes(query));

      return typeMatch && searchMatch;
    });
  }, [resources, activeFilter, searchQuery]);

  // Handle filter change
  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setActiveFilter(event.target.value);
    },
    []
  );

  // Handle search change
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    []
  );

  return (
    <WidgetContainer
      title={WIDGET_TITLES.SECURITY_RESOURCES}
      icon={WIDGET_ICONS.SECURITY_RESOURCES}
      testId={testId}
      className={className}
      loading={loading}
      error={error}
    >
      <div className="mb-4 flex flex-wrap gap-4">
        <div className="w-full md:w-auto flex-grow">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full p-2 border rounded-md"
            value={searchQuery}
            onChange={handleSearchChange}
            data-testid={SECURITY_RESOURCES_TEST_IDS.RESOURCE_SEARCH}
          />
        </div>
        <div>
          <select
            value={activeFilter}
            onChange={handleFilterChange}
            className="p-2 border rounded-md"
            data-testid={SECURITY_RESOURCES_TEST_IDS.RESOURCE_CATEGORY_FILTER}
          >
            <option value="all">All Resources</option>
            <option value="general">General</option>
            <option value="availability">Availability</option>
            <option value="integrity">Integrity</option>
            <option value="confidentiality">Confidentiality</option>
          </select>
        </div>
      </div>

      <div
        className="space-y-4"
        data-testid={SECURITY_RESOURCES_TEST_IDS.RESOURCE_LIST}
      >
        {filteredResources.length === 0 ? (
          <p className="text-gray-500 italic">
            No resources found matching your criteria.
          </p>
        ) : (
          filteredResources.map((resource, index) => (
            <div
              key={resource.id}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border"
              data-testid={`${SECURITY_RESOURCES_TEST_IDS.RESOURCE_ITEM}-${index}`}
            >
              <h4 className="font-semibold mb-1">{resource.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {resource.description}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  {resource.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                  data-testid={SECURITY_RESOURCES_TEST_IDS.RESOURCE_LINK}
                >
                  View Resource →
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Display the current security levels for context */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="font-medium mb-2">Current Security Levels</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="text-sm">
            <span className="font-medium">Availability:</span>{" "}
            {availabilityLevel}
          </div>
          <div className="text-sm">
            <span className="font-medium">Integrity:</span> {integrityLevel}
          </div>
          <div className="text-sm">
            <span className="font-medium">Confidentiality:</span>{" "}
            {confidentialityLevel}
          </div>
          <div className="text-sm">
            <span className="font-medium">Overall:</span> {securityLevel}
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default SecurityResourcesWidget;
