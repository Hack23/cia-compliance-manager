import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const TOP_RESOURCES_PERCENTAGE = 0.5; // 50%
const MIN_TOP_RESOURCES = 5;
const WIDE_LAYOUT_BREAKPOINT = 760;

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
  const {
    ciaContentService,
    error: serviceError,
    isLoading,
  } = useCIAContentService();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resourcesPerPage, setResourcesPerPage] = useState(maxItems);
  const widgetContentRef = useRef<HTMLDivElement | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setResourcesPerPage(maxItems);
  }, [maxItems]);

  /**
   * Synchronizes filter panel expansion with the responsive sidebar contract.
   *
   * Dependencies: none; registers one `ResizeObserver` after mount.
   * Behavior: expands filters when the rendered widget body reaches the same
   * wide-layout breakpoint used by the container-query CSS, but does not
   * auto-collapse user-opened filters when the widget becomes narrow again.
   * Cleanup: disconnects the observer and clears any pending 150ms debounce timer.
   */
  useEffect(() => {
    if (
      typeof document === "undefined" ||
      typeof ResizeObserver === "undefined"
    ) {
      return undefined;
    }

    const widgetElement =
      widgetContentRef.current?.closest<HTMLElement>(".widget-body") ??
      widgetContentRef.current;

    if (isNullish(widgetElement)) {
      return undefined;
    }

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const getInlineSize = (entry: ResizeObserverEntry): number => {
      const { contentBoxSize, contentRect } = entry;
      const boxSize = contentBoxSize as
        | ResizeObserverSize
        | readonly ResizeObserverSize[]
        | undefined;

      if (Array.isArray(boxSize)) {
        if (boxSize.length > 0) {
          return boxSize[0].inlineSize;
        }

        return contentRect.width;
      }

      const singleBoxSize = boxSize as ResizeObserverSize | undefined;

      if (!isNullish(singleBoxSize)) {
        return singleBoxSize.inlineSize;
      }

      return contentRect.width;
    };

    const expandFiltersForWideLayout = (getObservedInlineSize: () => number): void => {
      if (resizeTimer !== undefined) {
        clearTimeout(resizeTimer);
      }

      resizeTimer = setTimeout((): void => {
        if (getObservedInlineSize() >= WIDE_LAYOUT_BREAKPOINT) {
          setShowFilters(true);
        }
      }, 150);
    };

    const observer = new ResizeObserver(
      (entries: readonly ResizeObserverEntry[]): void => {
        const [entry] = entries;

        if (isNullish(entry)) {
          return;
        }

        expandFiltersForWideLayout(() => getInlineSize(entry));
      }
    );

    observer.observe(widgetElement);
    expandFiltersForWideLayout(() => widgetElement.getBoundingClientRect().width);

    return (): void => {
      observer.disconnect();

      if (resizeTimer !== undefined) {
        clearTimeout(resizeTimer);
      }
    };
  }, []);
  const securityResources = useMemo((): SecurityResource[] => {
    try {
      if (isNullish(ciaContentService)) {
        return [];
      }

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

      const allResources = [
        ...(availabilityResources || []),
        ...(integrityResources || []),
        ...(confidentialityResources || []),
      ];

      const uniqueResources: SecurityResource[] = [];
      const resourceKeys = new Set();

      allResources.forEach((resource) => {
        const key = isString(resource.url) ? resource.url : resource.title;
        if (!resourceKeys.has(key)) {
          resourceKeys.add(key);
          uniqueResources.push(resource);
        }
      });

      return uniqueResources.sort((a, b) => {
        const aScore = getResourceRelevanceScore(a);
        const bScore = getResourceRelevanceScore(b);

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

  const resourceCategories = useMemo(() => {
    const categories = new Set<string>();
    securityResources.forEach((resource) => {
      if (resource.category) {
        categories.add(resource.category);
      }
    });
    return Array.from(categories).sort();
  }, [securityResources]);

  const filteredResources = useMemo(() => {
    let filtered = securityResources;

    if (showTopResourcesOnly) {
      const sortedByRelevance = [...filtered].sort((a, b) => {
        const aScore = getResourceRelevanceScore(a);
        const bScore = getResourceRelevanceScore(b);
        return bScore - aScore;
      });
      
      const topCount = Math.max(
        Math.ceil(sortedByRelevance.length * TOP_RESOURCES_PERCENTAGE), 
        MIN_TOP_RESOURCES
      );
      filtered = sortedByRelevance.slice(0, topCount);
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (resource) => resource.category === selectedCategory
      );
    }

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

  const currentResources = useMemo(() => {
    const indexOfLastResource = currentPage * resourcesPerPage;
    const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
    return filteredResources.slice(indexOfFirstResource, indexOfLastResource);
  }, [filteredResources, currentPage, resourcesPerPage]);

  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing filters
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1); // Reset to first page when changing search
    },
    []
  );

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);

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
        ref={widgetContentRef}
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

        <div className="security-resources-layout">
          {/* Filters and search - left column on larger screens.
              Sidebar contents can collapse to reduce vertical space; the toggle is hidden
              once the sidebar shares horizontal space with the resource list. */}
          <aside 
            className="security-resources-sidebar"
            aria-label="Resource filters and search"
          >
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              aria-expanded={showFilters}
              aria-controls={`${testId}-filters-panel`}
              className={cn(
                "security-resources-sidebar-toggle",
                "w-full flex items-center justify-between px-sm py-xs mb-sm rounded-md",
                "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200",
                "hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
                WidgetClasses.focusVisible
              )}
              data-testid={`${testId}-toggle-filters`}
            >
              <span className="flex items-center gap-xs text-sm font-medium">
                <span aria-hidden="true">⚙️</span>
                Filters &amp; Guidelines
              </span>
              <span aria-hidden="true" className="text-xs">
                {showFilters ? "▲" : "▼"}
              </span>
            </button>

            <div
              id={`${testId}-filters-panel`}
              className={cn(
                "security-resources-sidebar-panel",
                !showFilters && "hidden"
              )}
              aria-hidden={!showFilters ? "true" : "false"}
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
                  <div className="flex flex-wrap justify-between gap-xs">
                    <dt>Confidentiality:</dt>
                    <dd className="font-medium">{confidentialityLevel}</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-xs mb-xs">
                    <dt>Integrity:</dt>
                    <dd className="font-medium">{integrityLevel}</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-xs mb-xs">
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
            </div>
          </aside>

          {/* Resources grid - right column on larger screens */}
          <div className="security-resources-list">
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
