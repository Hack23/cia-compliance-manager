import { useCallback, useEffect, useState } from "react";
import {
  createSecurityMetricsService,
  SecurityMetricsService,
} from "../services/securityMetricsService";
import { useCIADataProvider } from "./useCIADataProvider";

/**
 * Hook for accessing the SecurityMetricsService
 *
 * @returns An object containing the SecurityMetricsService instance, loading state, and error
 */
export const useSecurityMetricsService = () => {
  const [securityMetricsService, setSecurityMetricsService] =
    useState<SecurityMetricsService | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Use the data provider if available
  const { dataProvider } = useCIADataProvider();

  // Initialize the security metrics service
  const initService = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Create a new security metrics service with the data provider
      const service = dataProvider
        ? createSecurityMetricsService(dataProvider)
        : createSecurityMetricsService();

      setSecurityMetricsService(service);
    } catch (err) {
      console.error("Error initializing security metrics service:", err);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to initialize security metrics service")
      );
      setSecurityMetricsService(null);
    } finally {
      setIsLoading(false);
    }
  }, [dataProvider]);

  // Initialize the service when the component using this hook mounts
  useEffect(() => {
    initService();
  }, [initService]);

  return {
    securityMetricsService,
    error,
    isLoading,
    refreshService: initService,
  };
};

export default useSecurityMetricsService;
