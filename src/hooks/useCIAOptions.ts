import { useMemo } from "react";
import defaultCIADataProvider from "../data/ciaOptionsData";
import { SecurityLevel } from "../types/cia";
import { CIADataProvider } from "../types/cia-services";

// Import the options from the data source
import {
  availabilityOptions as defaultAvailabilityOptions,
  confidentialityOptions as defaultConfidentialityOptions,
  integrityOptions as defaultIntegrityOptions,
  ROI_ESTIMATES as defaultRoiEstimates,
} from "../data/security";

// Re-export the options for direct usage
export {
  defaultAvailabilityOptions as availabilityOptions,
  defaultConfidentialityOptions as confidentialityOptions,
  defaultIntegrityOptions as integrityOptions,
  defaultRoiEstimates as ROI_ESTIMATES,
};

/**
 * Custom hook to access CIA options throughout the application
 *
 * @param customProvider - Optional custom data provider
 * @returns CIA options for all components
 */
export function useCIAOptions(customProvider?: Partial<CIADataProvider>) {
  const dataProvider = useMemo(() => {
    return { ...defaultCIADataProvider, ...customProvider };
  }, [customProvider]);

  // Enhanced API with helper methods
  const enhancedAPI = useMemo(() => {
    return {
      // Base options
      availabilityOptions: dataProvider.availabilityOptions,
      integrityOptions: dataProvider.integrityOptions,
      confidentialityOptions: dataProvider.confidentialityOptions,
      ROI_ESTIMATES: dataProvider.roiEstimates, // Fixed: ROI_ESTIMATES -> roiEstimates

      // Helper methods
      getROIEstimate: (level: SecurityLevel) => {
        const key = level.toUpperCase().replace(" ", "_");
        return (
          dataProvider.roiEstimates[
            key as keyof typeof dataProvider.roiEstimates
          ] || dataProvider.roiEstimates.NONE
        );
      },

      // Get value points
      getValuePoints: (level: SecurityLevel) => {
        // Use getDefaultValuePoints or fall back to getValuePoints for backward compatibility
        if (dataProvider) {
          return typeof dataProvider.getDefaultValuePoints === "function"
            ? dataProvider.getDefaultValuePoints(level)
            : typeof dataProvider.getValuePoints === "function"
            ? dataProvider.getValuePoints(level)
            : [];
        }
        return [];
      },

      // Get component details including properties
      getComponentDetails: (
        component: "availability" | "integrity" | "confidentiality",
        level: SecurityLevel
      ) => {
        const options =
          component === "availability"
            ? dataProvider.availabilityOptions
            : component === "integrity"
            ? dataProvider.integrityOptions
            : dataProvider.confidentialityOptions;

        return options[level];
      },

      // Formats description for a component level
      getComponentDescription: (
        component: "availability" | "integrity" | "confidentiality",
        level: SecurityLevel
      ) => {
        return (
          enhancedAPI.getComponentDetails(component, level)?.description ||
          `No description available for ${component} at ${level} level`
        );
      },

      // Get implementation details
      getImplementationDetails: (
        component: "availability" | "integrity" | "confidentiality",
        level: SecurityLevel
      ) => {
        const details = enhancedAPI.getComponentDetails(component, level);
        return {
          effort: details?.effort || "Unknown",
          expertise: details?.expertise || "Unknown",
          timeframe: details?.timeframe || "Unknown",
          recommendations: details?.recommendations || [],
        };
      },
    };
  }, [dataProvider]);

  return enhancedAPI;
}

export default useCIAOptions;
