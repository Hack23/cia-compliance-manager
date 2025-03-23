import { useEffect, useMemo, useState } from "react";
import { CIAContentService } from "../services/ciaContentService";
import { useCIAOptions } from "./useCIAOptions";

/**
 * Hook for accessing CIA content service with error handling and loading state
 *
 * @returns CIA content service and status
 */
export function useCIAContentService() {
  // Status states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const ciaOptions = useCIAOptions();

  // Create CIAContentService instance
  const ciaContentService = useMemo(() => {
    try {
      // Map the ciaOptions to match the CIADataProvider interface
      const dataProvider = {
        availabilityOptions: ciaOptions.availabilityOptions,
        integrityOptions: ciaOptions.integrityOptions,
        confidentialityOptions: ciaOptions.confidentialityOptions,
        roiEstimates: ciaOptions.ROI_ESTIMATES, // Keep using ROI_ESTIMATES for compatibility
      };

      // Only add optional properties if they exist in ciaOptions
      if (typeof ciaOptions === "object") {
        // Optional properties - using safer property access and type casting
        if (
          "getDefaultSecurityIcon" in ciaOptions &&
          typeof ciaOptions.getDefaultSecurityIcon === "function"
        ) {
          (dataProvider as any).getDefaultSecurityIcon =
            ciaOptions.getDefaultSecurityIcon;
        }

        if (
          "getDefaultValuePoints" in ciaOptions &&
          typeof ciaOptions.getDefaultValuePoints === "function"
        ) {
          (dataProvider as any).getDefaultValuePoints =
            ciaOptions.getDefaultValuePoints;
        }
      }

      return new CIAContentService(dataProvider);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to initialize CIA content service")
      );
      return null;
    }
  }, [ciaOptions]);

  // Initialize service
  useEffect(() => {
    const initService = async () => {
      setIsLoading(true);
      try {
        // Initialize any async data needed by the service
        if (ciaContentService) {
          await ciaContentService.initialize?.();
        }
        setError(null);
      } catch (err) {
        console.error("Error initializing CIA content service:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to initialize CIA content service")
        );
      } finally {
        setIsLoading(false);
      }
    };

    initService();
  }, [ciaContentService]);

  return {
    ciaContentService,
    isLoading,
    error,
  };
}

export default useCIAContentService;
