import { useCallback, useEffect, useState } from "react";
import { SecurityLevel } from "../types/cia";
import { CIAData } from "../types/cia-services";
import { fetchCIAData } from "../utils/api"; // Import from API utils
import logger from "../utils/logger";

/**
 * Hook for providing CIA data to components
 *
 * @returns CIA data and methods to interact with it
 */
export function useCIADataProvider() {
  const [ciaData, setCIAData] = useState<CIAData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null); // Clear any previous errors
        // Use the imported fetchCIAData function
        const data = await fetchCIAData();
        setCIAData(data);
      } catch (err) {
        logger.error("Failed to load CIA data", err);
        setCIAData(null); // Explicitly set to null on error
        setError(
          err instanceof Error
            ? err
            : new Error("Unknown error loading CIA data")
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Function to update security levels
  const updateSecurityLevels = useCallback(
    (
      availability: SecurityLevel,
      integrity: SecurityLevel,
      confidentiality: SecurityLevel
    ) => {
      if (!ciaData) return;

      try {
        const updatedData = {
          ...ciaData,
          securityLevels: {
            availability,
            integrity,
            confidentiality,
          },
        };

        setCIAData(updatedData);
        logger.info("Security levels updated", {
          availability,
          integrity,
          confidentiality,
        });
      } catch (err) {
        logger.error("Failed to update security levels", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to update security levels")
        );
      }
    },
    [ciaData]
  );

  return {
    ciaData,
    isLoading,
    error,
    updateSecurityLevels,
  };
}

export default useCIADataProvider;
