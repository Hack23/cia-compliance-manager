import { useState, useEffect, DependencyList } from 'react';

/**
 * Service data state
 * 
 * @template T - Type of data returned by the service
 */
export interface ServiceDataState<T> {
  /** Fetched data, null if not yet loaded or if an error occurred */
  data: T | null;
  /** Loading state - true while data is being fetched */
  loading: boolean;
  /** Error if fetch failed, null otherwise */
  error: Error | null;
  /** Function to manually trigger a refetch of the data */
  refetch: () => void;
}

/**
 * Custom hook for fetching service data with loading and error states
 * 
 * ## Business Perspective
 * 
 * Standardizes data fetching across all widgets, ensuring consistent loading
 * states and error handling. This improves user experience by providing
 * predictable feedback during data operations and simplifies maintenance
 * by centralizing error handling logic. 🔄
 * 
 * ## Technical Perspective
 * 
 * Extracts the common loading/error/data pattern found in 6+ widgets,
 * reducing code duplication and ensuring consistent error handling. Uses
 * React hooks best practices with proper dependency management.
 * 
 * Note: This hook currently supports synchronous fetch functions only.
 * The services in this application return data synchronously, so this
 * design choice simplifies the implementation and testing. For async
 * operations, the hook can be extended in the future if needed.
 * 
 * @template T - Type of data returned by the fetch function
 * @param fetchFn - Synchronous function to fetch data
 * @param deps - Dependency array for useEffect (when to re-fetch)
 * @returns Service data state with loading, error, data, and refetch function
 * 
 * @example
 * ```tsx
 * // Basic usage with service call
 * const { data, loading, error, refetch } = useServiceData(
 *   () => securityMetricsService.getMetrics(level),
 *   [level]
 * );
 * 
 * if (loading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage error={error} retry={refetch} />;
 * if (!data) return <NoDataMessage />;
 * 
 * return <DataDisplay data={data} />;
 * ```
 * 
 * @example
 * ```tsx
 * // Usage with multiple dependencies
 * const { data, loading, error } = useServiceData(
 *   () => getSecurityMetrics(
 *     levels.availability,
 *     levels.integrity,
 *     levels.confidentiality
 *   ),
 *   [levels.availability, levels.integrity, levels.confidentiality]
 * );
 * ```
 * 
 * @example
 * ```tsx
 * // Manual refetch on user action
 * const { data, refetch } = useServiceData(
 *   () => complianceService.getStatus(level),
 *   [level]
 * );
 * 
 * return (
 *   <div>
 *     <DataDisplay data={data} />
 *     <button onClick={refetch}>Refresh</button>
 *   </div>
 * );
 * ```
 */
export function useServiceData<T>(
  fetchFn: () => T,
  deps: DependencyList = []
): ServiceDataState<T> {
  const [state, setState] = useState<Omit<ServiceDataState<T>, 'refetch'>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = (): void => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = fetchFn();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('Unknown error occurred'),
      });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    ...state,
    refetch: fetchData,
  };
}
