import { useEffect, useMemo, useState } from "react";
import { ComplianceServiceAdapter } from "../services/ComplianceServiceAdapter";
import { createEmptyCIADetails } from "../utils/serviceUtils";

/**
 * Hook to access compliance service functionality
 */
export function useComplianceService() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const complianceService = useMemo(() => {
    // Create default empty options that satisfy the type requirements
    const emptySecurityLevelRecord = {
      None: createEmptyCIADetails(),
      Low: createEmptyCIADetails(),
      Moderate: createEmptyCIADetails(),
      High: createEmptyCIADetails(),
      "Very High": createEmptyCIADetails(),
    };

    // Create minimal valid data provider for the service
    return new ComplianceServiceAdapter({
      availabilityOptions: emptySecurityLevelRecord,
      integrityOptions: emptySecurityLevelRecord,
      confidentialityOptions: emptySecurityLevelRecord,
      roiEstimates: {
        NONE: { returnRate: "0%", description: "No ROI" },
        LOW: { returnRate: "50%", description: "Low ROI" },
        MODERATE: { returnRate: "150%", description: "Moderate ROI" },
        HIGH: { returnRate: "300%", description: "High ROI" },
        VERY_HIGH: { returnRate: "500%", description: "Very high ROI" },
      },
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initializeService = async () => {
      try {
        // Check if service exists first
        if (complianceService) {
          // No need to call initialize as it doesn't exist
          if (isMounted) {
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.error("Failed to initialize compliance service:", err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("An error occurred"));
          setIsLoading(false);
        }
      }
    };

    initializeService();

    return () => {
      isMounted = false;
    };
  }, [complianceService]);

  return {
    isLoading,
    complianceService,
    error,
  };
}

export default useComplianceService;
