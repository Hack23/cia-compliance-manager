import { useEffect, useState } from "react";
import { createSecurityResourceService } from "../services/securityResourceService";
import { SecurityLevel } from "../types/cia";

/**
 * Security resource interface
 */
export interface SecurityResource {
  title: string;
  description: string;
  url: string;
  category?: string;
  source?: string;
  tags?: string[];
  securityLevels?: {
    availability?: SecurityLevel[];
    integrity?: SecurityLevel[];
    confidentiality?: SecurityLevel[];
  };
}

/**
 * Parameters for useSecurityResources hook
 */
interface SecurityResourcesParams {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
}

/**
 * Result of useSecurityResources hook
 */
interface SecurityResourcesResult {
  resources: SecurityResource[] | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch security resources based on security levels
 *
 * ## Business Perspective
 *
 * This hook provides curated security resources tailored to the organization's
 * security posture, helping security teams implement appropriate controls and
 * follow best practices for their specific needs. 📚
 *
 * @param params - Security level parameters
 * @returns Security resources and loading state
 */
export const useSecurityResources = (
  params: SecurityResourcesParams
): SecurityResourcesResult => {
  const [resources, setResources] = useState<SecurityResource[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);

        // Create service instance
        const resourceService = createSecurityResourceService();

        // Get resources filtered by security levels
        const filteredResources = resourceService.getResourcesForSecurityLevels(
          params.availabilityLevel,
          params.integrityLevel,
          params.confidentialityLevel
        );

        setResources(filteredResources);
        setError(null);
      } catch (err) {
        console.error("Error fetching security resources:", err);
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred")
        );
        setResources([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [
    params.availabilityLevel,
    params.integrityLevel,
    params.confidentialityLevel,
  ]);

  return { resources, isLoading, error };
};
