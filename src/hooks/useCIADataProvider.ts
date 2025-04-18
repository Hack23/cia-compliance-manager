import { useCallback, useEffect, useState } from "react";
import { CIADataProvider } from "../types/cia-services";

/**
 * Hook that provides access to the CIA data provider
 *
 * @returns An object containing the data provider, loading state, and error
 */
export const useCIADataProvider = () => {
  const [dataProvider, setDataProvider] = useState<CIADataProvider | null>(
    null
  );
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize the data provider
  const initDataProvider = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Import the createDefaultDataProvider dynamically to avoid circular dependencies
      const { createDefaultDataProvider } = await import(
        "../services/dataProviders"
      );

      // Create a default data provider
      const provider = createDefaultDataProvider();
      setDataProvider(provider);
    } catch (err) {
      console.error("Error initializing CIA data provider:", err);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to initialize data provider")
      );
      setDataProvider(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize the data provider when the component using this hook mounts
  useEffect(() => {
    initDataProvider();
  }, [initDataProvider]);

  return {
    dataProvider,
    error,
    isLoading,
    refreshDataProvider: initDataProvider,
  };
};
