/**
 * Export all CIA security data from a single entry point
 *
 * This file centralizes all the CIA security data exports to simplify imports
 * elsewhere in the application.
 */

import availabilityData from "./availabilityData";
import confidentialityData from "./confidentialityData";
import integrityData from "./integrityData";
import roiEstimatesData from "./roiEstimatesData";

export {
  availabilityData,
  confidentialityData,
  integrityData,
  roiEstimatesData,
};

export const availabilityOptions = availabilityData;
export const confidentialityOptions = confidentialityData;
export const integrityOptions = integrityData;
export const ROI_ESTIMATES = roiEstimatesData;
