import { useEffect, useState } from "react";
import securityResourcesData from "../data/securityResources";
import { SecurityLevel } from "../types/cia";
import { CIAComponentType } from "../types/cia-services";
import {
  SecurityResource,
  SecurityResourceFilter,
} from "../types/securityResources";
import { useCIAContent } from "./useCIAContent";

/**
 * Result type for useSecurityResources hook
 */
export interface SecurityResourcesResult {
  /**
   * List of filtered security resources
   */
  resources: SecurityResource[];

  /**
   * Complete list of resources before filtering
   */
  allResources: SecurityResource[];

  /**
   * Loading state
   */
  isLoading: boolean;

  /**
   * Error state
   */
  error: Error | null;

  /**
   * Current filter settings
   */
  filter: SecurityResourceFilter;

  /**
   * Update filter function
   */
  updateFilter: (newFilter: Partial<SecurityResourceFilter>) => void;

  /**
   * Reset filter function
   */
  resetFilter: () => void;
}

/**
 * Hook for accessing and filtering security resources for CIA components
 *
 * @param component - Primary CIA component type
 * @param level - Security level for the primary component
 * @param integrityLevel - Optional integrity level for comparative analysis
 * @param confidentialityLevel - Optional confidentiality level for comparative analysis
 * @returns Security resources, filtering functions, and status
 */
export function useSecurityResources(
  component: CIAComponentType,
  level: SecurityLevel,
  integrityLevel?: SecurityLevel,
  confidentialityLevel?: SecurityLevel
): SecurityResourcesResult {
  // Get CIA content service for resource retrieval
  const { ciaContentService } = useCIAContent();

  // Status states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Data states
  const [resources, setResources] = useState<SecurityResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<
    SecurityResource[]
  >([]);
  const [filter, setFilter] = useState<SecurityResourceFilter>({
    component,
    securityLevel: level,
  });

  // Fetch resources
  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      try {
        // Collect resources from the service based on all security levels
        let allResources: SecurityResource[] = [];

        if (ciaContentService) {
          // Get resources for primary component
          const primaryResources = ciaContentService.getSecurityResources(
            component,
            level
          );
          allResources.push(...primaryResources);

          // Get resources for integrity if provided and different from primary
          if (integrityLevel && component !== "integrity") {
            const integrityResources = ciaContentService.getSecurityResources(
              "integrity",
              integrityLevel
            );
            // Filter out duplicates
            integrityResources.forEach((resource) => {
              if (!allResources.some((r) => r.id === resource.id)) {
                allResources.push(resource);
              }
            });
          }

          // Get resources for confidentiality if provided and different from primary
          if (confidentialityLevel && component !== "confidentiality") {
            const confidentialityResources =
              ciaContentService.getSecurityResources(
                "confidentiality",
                confidentialityLevel
              );
            // Filter out duplicates
            confidentialityResources.forEach((resource) => {
              if (!allResources.some((r) => r.id === resource.id)) {
                allResources.push(resource);
              }
            });
          }
        } else {
          // Fallback to static data if service is not available
          allResources = securityResourcesData;
        }

        // Apply initial filtering based on the component and security level
        let filtered = allResources.filter(
          (resource) =>
            (resource.type === component ||
              (resource.components &&
                resource.components.includes(component))) &&
            resource.securityLevels?.includes(level)
        );

        setResources(allResources);
        setFilteredResources(filtered);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching security resources:", error);
        setError(error instanceof Error ? error : new Error("Unknown error"));
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [
    component,
    level,
    integrityLevel,
    confidentialityLevel,
    ciaContentService,
  ]);

  // Apply filters when resources or filter changes
  useEffect(() => {
    const applyFilters = () => {
      let result = [...resources];

      // Apply component filter
      if (filter.component) {
        result = result.filter(
          (resource) =>
            resource.type === filter.component ||
            (resource.components &&
              resource.components.includes(filter.component as string))
        );
      }

      // Apply security level filter
      if (filter.securityLevel) {
        result = result.filter((resource) =>
          resource.securityLevels?.includes(filter.securityLevel as string)
        );
      }

      // Apply type filter
      if (filter.type) {
        result = result.filter((resource) => resource.type === filter.type);
      }

      // Apply search query
      if (filter.searchQuery) {
        const query = filter.searchQuery.toLowerCase();
        result = result.filter(
          (resource) =>
            resource.title.toLowerCase().includes(query) ||
            resource.description.toLowerCase().includes(query) ||
            resource.tags?.some((tag: string) =>
              tag.toLowerCase().includes(query)
            )
        );
      }

      setFilteredResources(result);
    };

    applyFilters();
  }, [resources, filter]);

  // Update filter
  const updateFilter = (newFilter: Partial<SecurityResourceFilter>) => {
    setFilter((current: SecurityResourceFilter) => ({
      ...current,
      ...newFilter,
    }));
  };

  // Reset filter
  const resetFilter = () => {
    setFilter({
      component,
      securityLevel: level,
    });
  };

  return {
    resources: filteredResources,
    allResources: resources,
    isLoading,
    error,
    filter,
    updateFilter,
    resetFilter,
  };
}

export default useSecurityResources;
