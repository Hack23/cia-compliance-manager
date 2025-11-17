import { useEffect, useState } from "react";
import {
  CIAContentService,
  createCIAContentService,
} from "../services/ciaContentService";
import { toErrorObject } from "../utils";

/**
 * Hook to access the CIA content service with loading and error states
 * @returns Object containing the CIA content service, loading state, and error state
 */
export const useCIAContentService = () => {
  const [ciaContentService, setCIAContentService] =
    useState<CIAContentService | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const initService = async () => {
    try {
      setIsLoading(true);
      // Create the service using the createCIAContentService factory function
      const service = createCIAContentService();
      // Wait for any async initialization to complete
      await service.initialize();
      setCIAContentService(service);
      setError(null);
    } catch (err) {
      setCIAContentService(null);
      setError(toErrorObject(err));
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh function to retry initialization if needed
  const refresh = () => {
    // Make sure we set isLoading immediately, not after the async part
    setIsLoading(true);
    initService();
  };

  useEffect(() => {
    initService();
  }, []);

  return {
    ciaContentService,
    isLoading,
    error,
    refresh,
  };
};
