import { useEffect, useState } from "react";
import {
  CIAContentService,
  createCIAContentService,
} from "../services/ciaContentService";
import { toErrorObject } from "../utils";

/**
 * Return type for useCIAContentService hook
 * 
 * Provides access to the CIA content service along with loading
 * and error states for proper UI handling.
 * 
 * @example
 * ```tsx
 * const { ciaContentService, isLoading, error, refresh } = useCIAContentService();
 * 
 * if (isLoading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage error={error} onRetry={refresh} />;
 * if (!ciaContentService) return null;
 * 
 * // Use the service
 * const details = ciaContentService.getCIADetails('availability', 'High');
 * ```
 */
export interface UseCIAContentServiceReturn {
  /**
   * CIA content service instance
   * 
   * Null while loading or if initialization failed. Check isLoading
   * and error states before using.
   */
  ciaContentService: CIAContentService | null;
  
  /**
   * Loading state indicator
   * 
   * True during initial service initialization or when refresh() is called.
   * Use to show loading UI.
   */
  isLoading: boolean;
  
  /**
   * Error object if initialization failed
   * 
   * Null if no error occurred. When present, ciaContentService will be null.
   * Use to show error UI and provide retry option.
   */
  error: Error | null;
  
  /**
   * Function to retry service initialization
   * 
   * Call this to re-attempt service creation after an error,
   * or to refresh the service instance.
   * 
   * @example
   * ```tsx
   * {error && (
   *   <button onClick={refresh}>
   *     Retry Loading
   *   </button>
   * )}
   * ```
   */
  refresh: () => void;
}

/**
 * Custom hook to access the CIA content service with loading and error states
 * 
 * Provides a convenient way to access the CIAContentService in React components
 * with automatic initialization, loading states, and error handling. The service
 * is initialized once when the component mounts and can be refreshed on demand.
 * 
 * ## Features
 * - Automatic service initialization on mount
 * - Loading state management
 * - Error handling with retry capability
 * - Async initialization support
 * - Type-safe return values
 * 
 * ## Usage Guidelines
 * - Always check `isLoading` before rendering content
 * - Handle `error` state to provide user feedback
 * - Verify `ciaContentService` is not null before use
 * - Use `refresh()` to retry after errors
 * 
 * @returns Object containing the CIA content service, loading state, error state, and refresh function
 * 
 * @example
 * ```tsx
 * // Basic usage with loading and error handling
 * function MyComponent() {
 *   const { ciaContentService, isLoading, error, refresh } = useCIAContentService();
 * 
 *   if (isLoading) {
 *     return <div>Loading CIA content service...</div>;
 *   }
 * 
 *   if (error) {
 *     return (
 *       <div>
 *         <p>Error: {error.message}</p>
 *         <button onClick={refresh}>Retry</button>
 *       </div>
 *     );
 *   }
 * 
 *   if (!ciaContentService) {
 *     return <div>Service not available</div>;
 *   }
 * 
 *   // Safe to use the service here
 *   const availabilityDetails = ciaContentService.getCIADetails('availability', 'High');
 * 
 *   return <div>{availabilityDetails.description}</div>;
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Advanced usage with multiple service calls
 * function SecurityDashboard() {
 *   const { ciaContentService, isLoading, error } = useCIAContentService();
 *   const [selectedLevel, setSelectedLevel] = useState<SecurityLevel>('Moderate');
 * 
 *   if (isLoading || !ciaContentService) {
 *     return <LoadingSpinner />;
 *   }
 * 
 *   if (error) {
 *     return <ErrorBoundary error={error} />;
 *   }
 * 
 *   const availDetails = ciaContentService.getCIADetails('availability', selectedLevel);
 *   const integrityDetails = ciaContentService.getCIADetails('integrity', selectedLevel);
 *   const confDetails = ciaContentService.getCIADetails('confidentiality', selectedLevel);
 * 
 *   return (
 *     <div>
 *       <h2>Security Level: {selectedLevel}</h2>
 *       <ComponentCard title="Availability" details={availDetails} />
 *       <ComponentCard title="Integrity" details={integrityDetails} />
 *       <ComponentCard title="Confidentiality" details={confDetails} />
 *     </div>
 *   );
 * }
 * ```
 */
export const useCIAContentService = (): UseCIAContentServiceReturn => {
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
