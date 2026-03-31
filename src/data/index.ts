/**
 * # Data Module
 *
 * Aggregates all public data modules for the CIA Compliance Manager.
 * Includes security data, CIA options, risk impact data, security resources,
 * and value creation data.
 *
 * @packageDocumentation
 */

// Re-export security data (primary source for CIA security level details)
export {
  availabilityData,
  confidentialityData,
  integrityData,
  roiEstimatesData,
  availabilityOptions,
  confidentialityOptions,
  integrityOptions,
  ROI_ESTIMATES,
} from "./security";

// Re-export CIA options data (excludes aliases already exported from security)
export {
  defaultCIADataProvider,
  getCIAOptionsForComponent,
  getImplementationDetails,
  getDefaultSLAMetrics,
  getDefaultPrivacyImpact,
  getDefaultValidationLevel,
  getDefaultErrorRate,
} from "./ciaOptionsData";
export type { CIADetails } from "./ciaOptionsData";

// Re-export risk impact data
export {
  financialImpactByLevel,
  operationalImpactByLevel,
  reputationalImpactByLevel,
  AVAILABILITY_RISK_IMPACTS,
  INTEGRITY_RISK_IMPACTS,
  CONFIDENTIALITY_RISK_IMPACTS,
  getRiskLevelFromSecurityLevel,
  getBusinessImpact,
  calculateBusinessImpactLevel,
  getRiskImpactLabel,
  createDefaultBusinessImpact,
  isRiskImpactLevel,
  isRiskImpact,
  isValidCIAComponent,
} from "./riskImpactData";
export type { RiskImpactLevel, RiskImpact } from "./riskImpactData";

// Re-export security resources
export { default as securityResources } from "./securityResources";
export { securityResourcesData } from "./securityResources";

// Re-export value creation data (excludes ROI_ESTIMATES alias already from security)
export {
  valueCreationPoints,
  valueCreationTitles,
  valueCreationImpact,
  VALUE_CREATION_POINTS,
  BUSINESS_CONSIDERATIONS,
  BUSINESS_BENEFITS,
  getROIEstimateForLevel,
  getROIEstimate,
  getValuePoints,
  getBusinessConsiderations,
  getBusinessBenefits,
  industryValueInsights,
} from "./valueCreationData";
