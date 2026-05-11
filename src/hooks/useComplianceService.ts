import { useEffect, useMemo, useState } from "react";
import { ComplianceServiceAdapter } from "../services/ComplianceServiceAdapter";
import { createEmptyCIADetails } from "../utils/serviceUtils";

/**
 * Hook to access compliance service functionality
 *
 * ## Business Perspective
 *
 * Provides compliance status and framework validation capabilities for CIA security levels.
 * Enables widgets to determine which compliance frameworks are satisfied based on
 * selected security configurations. 📋
 *
 * @returns Object containing complianceService, isLoading state, and error state
 *
 * @example
 * ```typescript
 * const { complianceService, isLoading, error } = useComplianceService();
 *
 * if (!isLoading && complianceService) {
 *   const status = complianceService.getComplianceStatus('High', 'High', 'High');
 *   console.log(status?.compliantFrameworks);
 * }
 * ```
 */
export function useComplianceService() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const complianceService = useMemo(() => {
    const emptySecurityLevelRecord = {
      None: createEmptyCIADetails(),
      Low: createEmptyCIADetails(),
      Moderate: createEmptyCIADetails(),
      High: createEmptyCIADetails(),
      "Very High": createEmptyCIADetails(),
    };

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
        if (complianceService) {
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
