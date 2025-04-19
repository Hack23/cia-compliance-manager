import React, { useCallback, useMemo, useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { SECURITY_RESOURCES_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import { SecurityResource } from "../../../types/securityResources";
import {
  isArray,
  isNullish,
  isObject,
  isString,
} from "../../../utils/typeGuards";
import ResourceCard from "../../common/ResourceCard";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Props for SecurityResourcesWidget component
 */
export interface SecurityResourcesWidgetProps {
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
   * Optional test ID for testing
   */
  testId?: string;

  /**
   * Optional limit for the number of resources to display
   */
  limit?: number;

  /**
   * Optional flag to show only top resources
   */
  showTopResourcesOnly?: boolean;
}

/**
 * Widget that displays security resources and implementation guides
 *
 * ## Business Perspective
 *
 * This widget provides security practitioners with relevant resources,
 * implementation guides, and best practices to help implement appropriate
 * security controls for the selected security levels. It bridges the gap
 * between security requirements and practical implementation. 📚
 */
const SecurityResourcesWidget: React.FC<SecurityResourcesWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = SECURITY_RESOURCES_TEST_IDS.WIDGET,
  limit = 8,
  showTopResourcesOnly = false,
}) => {
  // Use the CIA content service
  const {
    ciaContentService,
    error: serviceError,
    isLoading,
  } = useCIAContentService();

  // State for resource filtering and pagination
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resourcesPerPage, setResourcesPerPage] = useState(limit);

  // Calculate security resources with proper error handling and type safety
  const securityResources = useMemo((): SecurityResource[] => {
    try {
      if (isNullish(ciaContentService)) {
        return [];
      }

      // Get resources for each security level
      const availabilityResources = isArray(
        ciaContentService.getSecurityResources?.(
          "availability",
          availabilityLevel
        )
      )
        ? ciaContentService.getSecurityResources?.(
            "availability",
            availabilityLevel
          )
        : [];

      const integrityResources = isArray(
        ciaContentService.getSecurityResources?.("integrity", integrityLevel)
      )
        ? ciaContentService.getSecurityResources?.("integrity", integrityLevel)
        : [];

      const confidentialityResources = isArray(
        ciaContentService.getSecurityResources?.(
          "confidentiality",
          confidentialityLevel
        )
      )
        ? ciaContentService.getSecurityResources?.(
            "confidentiality",
            confidentialityLevel
          )
        : [];

      // Combine all resources
      const allResources = [
        ...(availabilityResources || []),
        ...(integrityResources || []),
        ...(confidentialityResources || []),
      ];

      // Deduplicate resources by URL (or title if URL is not available)
      const uniqueResources: SecurityResource[] = [];
      const resourceKeys = new Set();

      allResources.forEach((resource) => {
        const key = isString(resource.url) ? resource.url : resource.title;
        if (!resourceKeys.has(key)) {
          resourceKeys.add(key);
          uniqueResources.push(resource);
        }
      });

      // Sort by relevance score if available, otherwise by title
      return uniqueResources.sort((a, b) => {
        // Use type safe approach to access properties
        const aScore =
          isObject(a) && "relevanceScore" in a
            ? (a.relevanceScore as number)
            : 0;
        const bScore =
          isObject(b) && "relevanceScore" in b
            ? (b.relevanceScore as number)
            : 0;

        if (aScore !== undefined && bScore !== undefined) {
          return bScore - aScore;
        }
        return a.title.localeCompare(b.title);
      });
    } catch (err) {
      console.error("Error getting security resources:", err);
      return [];
    }
  }, [
    ciaContentService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Get unique resource categories for filtering
  const resourceCategories = useMemo(() => {
    const categories = new Set<string>();
    securityResources.forEach((resource) => {
      if (resource.category) {
        categories.add(resource.category);
      }
    });
    return Array.from(categories).sort();
  }, [securityResources]);

  // Filter resources based on category and search term
  const filteredResources = useMemo(() => {
    let filtered = securityResources;

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (resource) => resource.category === selectedCategory
      );
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const normalizedSearch = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(normalizedSearch) ||
          resource.description?.toLowerCase().includes(normalizedSearch) ||
          (resource.tags &&
            resource.tags.some((tag) =>
              tag.toLowerCase().includes(normalizedSearch)
            ))
      );
    }

    return filtered;
  }, [securityResources, selectedCategory, searchTerm]);

  // Paginate resources
  const currentResources = useMemo(() => {
    const indexOfLastResource = currentPage * resourcesPerPage;
    const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
    return filteredResources.slice(indexOfFirstResource, indexOfLastResource);
  }, [filteredResources, currentPage, resourcesPerPage]);

  // Handle category selection
  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing filters
  }, []);

  // Handle search input change
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1); // Reset to first page when changing search
    },
    []
  );

  // Handle page change
  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  // Determine total pages
  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);

  // Get implementation guides - component-specific guidance
  const implementationGuides = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return [];
      }

      return [
        ciaContentService.getTechnicalImplementation?.(
          "availability",
          availabilityLevel
        ),
        ciaContentService.getTechnicalImplementation?.(
          "integrity",
          integrityLevel
        ),
        ciaContentService.getTechnicalImplementation?.(
          "confidentiality",
          confidentialityLevel
        ),
      ].filter((guide) => guide !== undefined);
    } catch (err) {
      console.error("Error getting implementation guides:", err);
      return [];
    }
  }, [
    ciaContentService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  return (
    <WidgetContainer
      title={WIDGET_TITLES.SECURITY_RESOURCES || "Security Resources"}
      icon={WIDGET_ICONS.SECURITY_RESOURCES || "📚"}
      className={className}
      testId={testId}
      isLoading={isLoading}
      error={serviceError}
    >
      <div className="p-4">
        {/* Widget introduction */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
          <p className="text-sm">
            This widget provides curated security resources to help implement
            controls that align with your selected security levels across the
            CIA triad.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Filters and search - left column on larger screens */}
          <div className="md:w-1/4">
            <div className="mb-4">
              <label
                htmlFor="resource-search"
                className="block text-sm font-medium mb-1"
              >
                Search Resources
              </label>
              <div className="relative">
                <input
                  id="resource-search"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by title, description..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  data-testid={`${testId}-search`}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400">
                  🔍
                </span>
              </div>
            </div>

            {resourceCategories.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  <div
                    className={`px-3 py-2 rounded-md cursor-pointer text-sm ${
                      selectedCategory === null
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => handleCategorySelect(null)}
                    data-testid={`${testId}-category-all`}
                  >
                    All Resources
                  </div>

                  {resourceCategories.map((category, index) => (
                    <div
                      key={category}
                      className={`px-3 py-2 rounded-md cursor-pointer text-sm ${
                        selectedCategory === category
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => handleCategorySelect(category)}
                      data-testid={`${testId}-category-${index}`}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Implementation Guidelines */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">
                Implementation Guidelines
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm">
                <p className="mb-2 font-medium">Selected Security Levels:</p>
                <div className="mb-2 text-xs">
                  <div className="flex justify-between">
                    <span>Confidentiality:</span>
                    <span className="font-medium">{confidentialityLevel}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Integrity:</span>
                    <span className="font-medium">{integrityLevel}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Availability:</span>
                    <span className="font-medium">{availabilityLevel}</span>
                  </div>
                </div>

                <p className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                  Focus on implementing controls that satisfy all three
                  components for a balanced security posture.
                </p>
              </div>
            </div>
          </div>

          {/* Resources grid - right column on larger screens */}
          <div className="md:w-3/4">
            {/* Resources list */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Security Resources</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredResources.length}{" "}
                  {filteredResources.length === 1 ? "resource" : "resources"}{" "}
                  found
                </div>
              </div>

              {/* Empty state */}
              {filteredResources.length === 0 && (
                <div
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center text-gray-500 dark:text-gray-400"
                  data-testid={`${testId}-no-resources`}
                >
                  <p className="mb-2">No resources found.</p>
                  <p className="text-sm">
                    {searchTerm
                      ? "Try adjusting your search terms or clearing filters."
                      : "Resources will appear here when available."}
                  </p>
                </div>
              )}

              {/* Resources grid */}
              {filteredResources.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentResources.map((resource, index) => (
                    <ResourceCard
                      key={`${resource.url || ""}-${index}`}
                      resource={resource}
                      testId={`${testId}-resource-${index}`}
                    />
                  ))}
                </div>
              )}

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="mt-4 flex justify-center">
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed"
                          : "bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      } text-sm font-medium`}
                    >
                      Previous
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === index + 1
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300"
                            : "bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed"
                          : "bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      } text-sm font-medium`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </div>

            {/* Implementation Tips Section */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Implementation Tips</h3>

              <div className="space-y-4">
                {/* General implementation tips */}
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="text-md font-medium mb-2">
                    Getting Started with Implementation
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400 pl-2">
                    <li>
                      Begin with a thorough assessment of your current security
                      controls
                    </li>
                    <li>
                      Prioritize implementations based on risk exposure and
                      business impact
                    </li>
                    <li>
                      Implement controls gradually, starting with foundational
                      elements
                    </li>
                    <li>
                      Document your implementation process and security
                      configurations
                    </li>
                    <li>Test and validate controls after implementation</li>
                  </ol>
                </div>

                {/* Component-specific tips */}
                {implementationGuides.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Confidentiality Implementation */}
                    {implementationGuides[2] && (
                      <div className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg border border-purple-100 dark:border-purple-800">
                        <h4 className="text-md font-medium mb-2 text-purple-700 dark:text-purple-300 flex items-center">
                          <span className="mr-2">🔒</span>Confidentiality (
                          {confidentialityLevel})
                        </h4>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <p className="mb-2">
                            {implementationGuides[2].description ||
                              "Focus on data protection and access controls."}
                          </p>
                          <div className="text-xs">
                            <span className="font-medium">Expertise:</span>{" "}
                            {implementationGuides[2].expertiseLevel ||
                              "Standard"}
                          </div>
                          <div className="text-xs">
                            <span className="font-medium">Effort:</span>{" "}
                            {implementationGuides[2].developmentEffort ||
                              "Medium"}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Integrity Implementation */}
                    {implementationGuides[1] && (
                      <div className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg border border-green-100 dark:border-green-800">
                        <h4 className="text-md font-medium mb-2 text-green-700 dark:text-green-300 flex items-center">
                          <span className="mr-2">✓</span>Integrity (
                          {integrityLevel})
                        </h4>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <p className="mb-2">
                            {implementationGuides[1].description ||
                              "Focus on data accuracy and validation mechanisms."}
                          </p>
                          <div className="text-xs">
                            <span className="font-medium">Expertise:</span>{" "}
                            {implementationGuides[1].expertiseLevel ||
                              "Standard"}
                          </div>
                          <div className="text-xs">
                            <span className="font-medium">Effort:</span>{" "}
                            {implementationGuides[1].developmentEffort ||
                              "Medium"}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Availability Implementation */}
                    {implementationGuides[0] && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
                        <h4 className="text-md font-medium mb-2 text-blue-700 dark:text-blue-300 flex items-center">
                          <span className="mr-2">⏱️</span>Availability (
                          {availabilityLevel})
                        </h4>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <p className="mb-2">
                            {implementationGuides[0].description ||
                              "Focus on systems uptime and recovery capabilities."}
                          </p>
                          <div className="text-xs">
                            <span className="font-medium">Expertise:</span>{" "}
                            {implementationGuides[0].expertiseLevel ||
                              "Standard"}
                          </div>
                          <div className="text-xs">
                            <span className="font-medium">Effort:</span>{" "}
                            {implementationGuides[0].developmentEffort ||
                              "Medium"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Common Implementation Challenges */}
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg border border-yellow-100 dark:border-yellow-800">
                  <h4 className="text-md font-medium mb-2 text-yellow-700 dark:text-yellow-300 flex items-center">
                    <span className="mr-2">⚠️</span>Common Implementation
                    Challenges
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 pl-2">
                    <li>Balancing security with usability and performance</li>
                    <li>
                      Maintaining consistent controls across different
                      environments
                    </li>
                    <li>Integration with legacy systems and applications</li>
                    <li>
                      Building security expertise and awareness across teams
                    </li>
                    <li>
                      Allocating sufficient resources for ongoing maintenance
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default SecurityResourcesWidget;
