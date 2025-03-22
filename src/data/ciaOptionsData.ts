import {
    availabilityData,
    confidentialityData,
    integrityData,
    roiEstimatesData,
} from "./security";

// Import CIADetails from types
import { CIADetails } from "../types/cia-services";

// Use imported data from their respective modules
/**
 * Availability options derived from security module.
 * Ensures system availability and uptime.
 */
export const availabilityOptions = availabilityData;

/**
 * Integrity options derived from security module.
 * Ensures data integrity and accuracy.
 */
export const integrityOptions = integrityData;

/**
 * Confidentiality options derived from security module.
 * Ensures data confidentiality and privacy.
 */
export const confidentialityOptions = confidentialityData;

/**
 * ROI estimates derived from security module.
 * Provides return on investment estimates.
 */
export const ROI_ESTIMATES = roiEstimatesData;

// Export types for documentation
export type { CIADetails };
