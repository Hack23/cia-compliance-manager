import { useEffect, useMemo, useState } from "react";
import securityResourcesData from "../data/securityResources";
import { SecurityResourceService } from "../services/securityResourceService";
import { CIADataProvider } from "../types/cia-services";
import {
  SecurityResource,
  SecurityResourceFilter,
} from "../types/securityResources";
import { createEmptyCIADetails } from "../utils/serviceUtils";

// Define a function to create default provider with all required fields
function createDefaultDataProvider(): CIADataProvider {
  return {
    availabilityOptions: {
      None: createEmptyCIADetails(),
      Low: createEmptyCIADetails(),
      Moderate: createEmptyCIADetails(),
      High: createEmptyCIADetails(),
      "Very High": createEmptyCIADetails(),
    },
    integrityOptions: {
      None: createEmptyCIADetails(),
      Low: createEmptyCIADetails(),
      Moderate: createEmptyCIADetails(),
      High: createEmptyCIADetails(),
      "Very High": createEmptyCIADetails(),
    },
    confidentialityOptions: {
      None: createEmptyCIADetails(),
      Low: createEmptyCIADetails(),
      Moderate: createEmptyCIADetails(),
      High: createEmptyCIADetails(),
      "Very High": createEmptyCIADetails(),
    },
    roiEstimates: {
      NONE: { returnRate: "0%", description: "No ROI" },
      LOW: { returnRate: "50%", description: "Low ROI" },
      MODERATE: { returnRate: "150%", description: "Moderate ROI" },
      HIGH: { returnRate: "300%", description: "High ROI" },
      VERY_HIGH: { returnRate: "500%", description: "Very high ROI" },
    },
  };
}

/**
 * Hook for accessing and filtering security resources
 *
 * @param initialFilter - Optional initial filter
 * @returns Security resources, filtering functions, and status
 */
export function useSecurityResources(initialFilter?: SecurityResourceFilter) {
  // Status states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Data states
  const [resources, setResources] = useState<SecurityResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<
    SecurityResource[]
  >([]);
  const [filter, setFilter] = useState<SecurityResourceFilter>(
    initialFilter || {}
  );

  // Create service instance with default provider
  const resourceService = useMemo(() => {
    try {
      // Create with default provider
      return new SecurityResourceService(createDefaultDataProvider());
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to initialize security resource service")
      );
      return null;
    }
  }, []);

  // Fetch resources
  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      try {
        // Use local data instead of calling a non-existent method
        const data = securityResourcesData;
        let filtered = [...data];

        // Apply filters
        if (filter) {
          // Apply component filter with null check
          if (filter.component && filter.component !== "all") {
            filtered = filtered.filter(
              (resource) =>
                resource.type === filter.component ||
                (resource.components &&
                  resource.components.includes(filter.component as string))
            );
          }

          // Apply security level filter
          if (filter.securityLevel) {
            filtered = filtered.filter((resource) =>
              resource.securityLevels?.includes(filter.securityLevel as string)
            );
          }

          // Apply type filter
          if (filter.type) {
            filtered = filtered.filter(
              (resource) => resource.type === filter.type
            );
          }

          // Apply search query
          if (filter.searchQuery) {
            const query = filter.searchQuery.toLowerCase();
            filtered = filtered.filter(
              (resource) =>
                resource.title.toLowerCase().includes(query) ||
                resource.description.toLowerCase().includes(query) ||
                resource.tags?.some((tag: string) =>
                  tag.toLowerCase().includes(query)
                )
            );
          }
        }

        setResources(filtered);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching security resources:", error);
        // Fix error type
        setError(error instanceof Error ? error : new Error("Unknown error"));
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [filter]);

  // Apply filters when resources or filter changes
  useEffect(() => {
    const applyFilters = () => {
      let result = [...resources];

      // Apply component filter
      if (filter.component) {
        result = result.filter((resource) =>
          resource.components?.includes(filter.component as string)
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
    setFilter({});
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
