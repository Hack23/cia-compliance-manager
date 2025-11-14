/**
 * Re-exports all constants for easier imports
 *
 * ## Business Perspective
 *
 * This file centralizes access to all business constants,
 * ensuring consistency across the application. 💼
 */

// Re-export app constants
export * from "./appConstants";

// Selectively re-export business constants to avoid conflicts
export {
  BUSINESS_CONSIDERATIONS,
  BUSINESS_KEY_BENEFITS,
  BUSINESS_VALUE_METRICS,
} from "./businessConstants";

// Selectively re-export compliance constants to avoid conflicts
// Remove missing exports that are causing errors
export {} from "./complianceConstants";

// Re-export risk constants
export * from "./riskConstants";

// Re-export cost constants
export * from "./costConstants";

// Export test IDs directly as they don't have conflicts
export * from "./testIds";

// Export business impact types properly
export type {
  BusinessConsideration,
  BusinessConsiderations,
  BusinessKeyBenefit,
  BusinessKeyBenefits,
} from "../types/businessImpact";

// Re-export these specific constants directly as they are frequently used
export { BUSINESS_IMPACT_CATEGORIES, RISK_LEVELS } from "./riskConstants";

// Re-export UI constants from their correct location
export {
  BUSINESS_IMPACT_ICONS,
  CIA_COMPONENT_ICONS,
  SECURITY_ICONS,
  SECURITY_LEVEL_COLORS,
} from "./uiConstants";

// Re-export specific constants from app constants that should remain there
export { WIDGET_ICONS, WIDGET_TITLES } from "./appConstants";

// Re-export security constants
export * from "./securityConstants";
