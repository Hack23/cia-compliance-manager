import { useMemo } from "react";
import {
    availabilityOptions,
    confidentialityOptions,
    integrityOptions,
    ROI_ESTIMATES,
} from "../data/ciaOptionsData";
import { CIADetails, ROIEstimate } from "../types/cia-services";

// Export constants for external use
// These reference the imported data from security modules
export {
    availabilityOptions,
    confidentialityOptions,
    integrityOptions,
    ROI_ESTIMATES
};

/**
 * Custom hook for accessing CIA security options with memoization
 *
 * @returns Memoized references to CIA options data
 */
export function useCIAOptions() {
  // Memoize individual objects to prevent unnecessary re-renders
  const availabilityOpts = useMemo(() => availabilityOptions, []);
  const integrityOpts = useMemo(() => integrityOptions, []);
  const confidentialityOpts = useMemo(() => confidentialityOptions, []);
  const roiEstimates = useMemo(() => ROI_ESTIMATES, []);

  if (!availabilityOpts || !integrityOpts || !confidentialityOpts || !roiEstimates) {
    throw new Error("CIA options data is not loaded");
  }

  return {
    availabilityOptions: availabilityOpts,
    integrityOptions: integrityOpts,
    confidentialityOptions: confidentialityOpts,
    ROI_ESTIMATES: roiEstimates,
  } as {
    availabilityOptions: typeof availabilityOptions;
    integrityOptions: typeof integrityOptions;
    confidentialityOptions: typeof confidentialityOptions;
    ROI_ESTIMATES: typeof ROI_ESTIMATES;
  };
}

// Export types for documentation and clarity
export type { CIADetails, ROIEstimate };
