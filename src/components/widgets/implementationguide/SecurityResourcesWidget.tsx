import React, { useCallback, useMemo, useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { SECURITY_RESOURCES_WIDGET_IDS } from "../../../constants/testIds";
import { SECURITY_RESOURCES_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import { SecurityResource } from "../../../types/securityResources";
import { SecurityResourcesWidgetProps } from "../../../types/widget-props";
import {
  isArray,
  isNullish,
  isObject,
  isString,
} from "../../../utils/typeGuards";
import { getWidgetAriaDescription } from "../../../utils/accessibility";
import { WidgetClasses, cn } from "../../../utils/tailwindClassHelpers";
import ResourceCard from "../../common/ResourceCard";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";
import ImplementationGuidancePanel from "./ImplementationGuidancePanel";

// Constants for top resources filtering
const TOP_RESOURCES_PERCENTAGE = 0.5; // 50%
const MIN_TOP_RESOURCES = 5;

/**
 * Helper function to extract relevance score from a security resource
 * @param resource - The security resource to extract score from
 * @returns The relevance score, defaulting to 0 if not available
 */
const getResourceRelevanceScore = (resource: SecurityResource): number => {
  return isObject(resource) && "relevance" in resource && typeof resource.relevance === "number"
    ? resource.relevance
    : 0;
};

/**
 * Widget that displays security resources and implementation guides
 * 
 * This component provides security practitioners with relevant resources,
 * implementation guides, and best practices to help implement appropriate
 * security controls for the selected security levels. It bridges the gap
 * between security requirements and practical implementation.
 * 
 * ## Features
 * - Dynamic resource filtering based on security levels
 * - Categorized display of resources by CIA component
 * - Support for limiting displayed resources
 * - Top resources filtering for focused guidance
 * - Loading and error states
 * - Accessible and responsive design
 * 
 * ## Business Perspective
 * 
 * This widget accelerates security implementation by providing practitioners
 * with immediately actionable guidance, reducing research time and ensuring
 * best practices are followed. It improves security ROI by helping teams
 * implement controls correctly the first time. 📚
 * 
 * @component
 * 
 * @example
 * ```tsx
 * // Basic usage with uniform security levels
 * <SecurityResourcesWidget
 *   availabilityLevel="Moderate"
 *   integrityLevel="Moderate"
 *   confidentialityLevel="Moderate"
 * />
 * 
 * // Advanced usage with custom configuration
 * <SecurityResourcesWidget
 *   availabilityLevel="High"
 *   integrityLevel="Very High"
 *   confidentialityLevel="Moderate"
 *   maxItems={12}
 *   showTopResourcesOnly={true}
 *   className="border-2 border-gray-200 p-md"
 *   testId="main-security-resources"
 * />
 * ```
 */
const SecurityResourcesWidget: React.FC<SecurityResourcesWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = SECURITY_RESOURCES_TEST_IDS.WIDGET,
  maxItems = 8,
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
  const [resourcesPerPage, setResourcesPerPage] = useState(maxItems);

  // Update resourcesPerPage when maxItems changes
  React.useEffect(() => {
    setResourcesPerPage(maxItems);
  }, [maxItems]);

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
        // Extract scores using helper (0 is default for missing scores)
        const aScore = getResourceRelevanceScore(a);
        const bScore = getResourceRelevanceScore(b);

        // Sort by score (higher first), then by title
        if (aScore !== bScore) {
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

  // Filter resources based on category, search term, and top resources flag
  const filteredResources = useMemo(() => {
    let filtered = securityResources;

    // Filter to show only top priority resources if requested
    if (showTopResourcesOnly) {
      // Filter resources with high relevance scores
      // Shows top 50% with a minimum of 5 resources (or all if less than 10 total)
      const sortedByRelevance = [...filtered].sort((a, b) => {
        const aScore = getResourceRelevanceScore(a);
        const bScore = getResourceRelevanceScore(b);
        return bScore - aScore;
      });
      
      // Take top percentage of resources with a minimum to ensure meaningful results
      const topCount = Math.max(
        Math.ceil(sortedByRelevance.length * TOP_RESOURCES_PERCENTAGE), 
        MIN_TOP_RESOURCES
      );
      filtered = sortedByRelevance.slice(0, topCount);
    }

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
  }, [securityResources, selectedCategory, searchTerm, showTopResourcesOnly]);

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
    <WidgetErrorBoundary widgetName="Security Resources">
      <WidgetContainer
        title={WIDGET_TITLES.SECURITY_RESOURCES || "Security Resources"}
        icon={WIDGET_ICONS.SECURITY_RESOURCES || "📚"}
        className={className}
        testId={testId}
        isLoading={isLoading}
        error={serviceError}
      >
      <div 
        className="p-sm sm:p-md"
        role="region"
        aria-label={getWidgetAriaDescription(
          "Security Resources",
          "Curated security resources and implementation guides for selected CIA security levels"
        )}
      >
        {/* Widget introduction */}
        <section 
          className={cn(
            WidgetClasses.section,
            "p-sm rounded-lg",
            "bg-blue-50 dark:bg-blue-900/20"
          )}
          aria-labelledby="resources-intro-heading"
        >
          <h2 id="resources-intro-heading" className="sr-only">Security Resources Introduction</h2>
          <p className={WidgetClasses.body}>
            This widget provides curated security resources to help implement
            controls that align with your selected security levels across the
            CIA triad.
          </p>
        </section>

        <div className={WidgetClasses.flexRow}>
          {/* Filters and search - left column on larger screens */}
          <aside 
            className="md:w-1/4"
            aria-label="Resource filters and search"
          >
            <div className="mb-md">
              <label
                htmlFor="resource-search"
                className={cn(WidgetClasses.body, "block font-medium mb-xs")}
              >
                Search Resources
              </label>
              <div className="relative">
                <input
                  id="resource-search"
                  type="text"
                  className={cn(
                    "w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800",
                    WidgetClasses.focusVisible
                  )}
                  placeholder="Search by title, description..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  data-testid={SECURITY_RESOURCES_WIDGET_IDS.input('search')}
                  aria-label="Search security resources by title or description"
                />
                <span 
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                >
                  🔍
                </span>
              </div>
            </div>

            {resourceCategories.length > 0 && (
              <nav 
                className="mb-md"
                aria-label="Resource categories"
              >
                <h3 className={cn(WidgetClasses.body, "font-medium mb-sm")}>Categories</h3>
                <ul 
                  className="space-y-xs"
                  role="list"
                >
                  <li>
                    <button
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md",
                        WidgetClasses.textResponsive,
                        selectedCategory === null
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      )}
                      onClick={() => handleCategorySelect(null)}
                      data-testid={SECURITY_RESOURCES_WIDGET_IDS.button('category-all')}
                      aria-pressed={selectedCategory === null}
                    >
                    All Resources
                  </button>
                  </li>

                  {resourceCategories.map((category, index) => (
                    <li key={category}>
                      <button
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md",
                          WidgetClasses.textResponsive,
                          selectedCategory === category
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        )}
                        onClick={() => handleCategorySelect(category)}
                        data-testid={SECURITY_RESOURCES_WIDGET_IDS.button(`category-${index}`)}
                        aria-pressed={selectedCategory === category}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Implementation Guidelines */}
            <section className="mb-md" aria-labelledby="implementation-guidelines-heading">
              <h3 id="implementation-guidelines-heading" className={cn(WidgetClasses.body, "font-medium mb-sm")}>
                Implementation Guidelines
              </h3>
              <div className={cn(WidgetClasses.card, "bg-gray-50 dark:bg-gray-800 shadow-none")}>
                <p className={cn(WidgetClasses.body, "mb-sm font-medium")}>Selected Security Levels:</p>
                <dl className={cn(WidgetClasses.labelNormal, "mb-sm")}>
                  <div className="flex justify-between">
                    <dt>Confidentiality:</dt>
                    <dd className="font-medium">{confidentialityLevel}</dd>
                  </div>
                  <div className="flex justify-between mb-xs">
                    <dt>Integrity:</dt>
                    <dd className="font-medium">{integrityLevel}</dd>
                  </div>
                  <div className="flex justify-between mb-xs">
                    <dt>Availability:</dt>
                    <dd className="font-medium">{availabilityLevel}</dd>
                  </div>
                </dl>

                <p className="mb-sm text-caption text-gray-600 dark:text-gray-400">
                  Focus on implementing controls that satisfy all three
                  components for a balanced security posture.
                </p>
              </div>
            </section>
          </aside>

          {/* Resources grid - right column on larger screens */}
          <div className="md:w-3/4">
            {/* Resources list */}
            <div className="mb-md">
              <div className="flex justify-between items-center mb-sm">
                <h3 className="text-subheading font-medium">Security Resources</h3>
                <div className="text-body text-gray-600 dark:text-gray-400">
                  {filteredResources.length}{" "}
                  {filteredResources.length === 1 ? "resource" : "resources"}{" "}
                  found
                </div>
              </div>

              {/* Empty state */}
              {filteredResources.length === 0 && (
                <div
                  className="p-md bg-gray-50 dark:bg-gray-800 rounded-lg text-center text-gray-500 dark:text-gray-400"
                  data-testid={SECURITY_RESOURCES_WIDGET_IDS.label('no-resources')}
                >
                  <p className="mb-sm">No resources found.</p>
                  <p className="text-sm">
                    {searchTerm
                      ? "Try adjusting your search terms or clearing filters."
                      : "Resources will appear here when available."}
                  </p>
                </div>
              )}

              {/* Resources grid */}
              {filteredResources.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-sm">
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
                <div className="mt-md flex justify-center">
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
                      } text-body font-medium`}
                    >
                      Previous
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-body font-medium ${
                          currentPage === index + 1
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
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
                      } text-body font-medium`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </div>

            {/* Implementation Guidance Panel */}
            <ImplementationGuidancePanel
              implementationGuides={implementationGuides}
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          </div>
        </div>
      </div>
    </WidgetContainer>
    </WidgetErrorBoundary>
  );
};

export default SecurityResourcesWidget;
