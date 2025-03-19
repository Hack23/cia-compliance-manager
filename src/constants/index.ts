// Central export file for all constants

// Named imports to avoid ambiguity
import * as AppConstants from "./appConstants";
import * as BusinessConstants from "./businessConstants";
import * as RiskConstants from "./riskConstants";
import * as UIConstants from "./uiConstants";

// Export namespaced constants to prevent conflicts
export {
  AppConstants,
  BusinessConstants,
  RiskConstants,
  UIConstants
};

// Export test IDs directly as they don't have conflicts
  export * from "./testIds";

// Export business impact types
export type {
  BusinessConsideration,
  BusinessConsiderations
} from "../types/businessImpact";

// Export specific constants that are frequently used
export {
  BUSINESS_CONSIDERATIONS,
  BusinessKeyBenefits
} from "../types/businessImpact";

// Export these specific constants directly as they are frequently used
export { BUSINESS_IMPACT_CATEGORIES, RISK_LEVELS } from "./riskConstants";
export { BUSINESS_IMPACT_ICONS } from "./uiConstants";

// Re-export additional constants needed by components
export { CIA_COMPONENT_ICONS, WIDGET_ICONS, WIDGET_TITLES } from "./appConstants";
export { SECURITY_LEVEL_COLORS } from "./uiConstants";

