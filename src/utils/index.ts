/**
 * # Utility Functions
 *
 * This module provides utility functions used throughout the application.
 *
 * ## Business Perspective
 * Utilities support business logic implementation by providing reusable
 * calculations for security metrics and compliance assessments.
 *
 * ## Architecture Perspective
 * These functions follow functional programming principles to maximize
 * code reuse and testability.
 *
 * ## Security Perspective
 * Utility functions implement security calculations like risk scoring
 * and security level assessments essential for compliance evaluation.
 *
 * @module utils
 */

// Core utilities
export * from "./colorUtils";
// Export levelValuesUtils which has the primary implementation of getSecurityLevelValue
export * from "./levelValuesUtils";
// Export everything from securityDefaults
export * from "./securityDefaults";
// Export specific items from securityLevelUtils to avoid the name collision
export {
  getSecurityLevelValue // Corrected from getSecurityLevelFromValue
  , normalizeSecurityLevel
} from "./securityLevelUtils";
// Export typeGuards which includes isSecurityLevel (removed separate export)
export * from "./typeGuards";
// Export calculateRiskLevel from cia.utility
export { calculateRiskLevel } from "../types/cia.utility";

// Widget registration
export * from "./widgetHelpers";
export { default as widgetRegistry } from "./widgetRegistry";

// Risk utilities
export {
  getRiskBadgeVariant,
  getRiskLevelFromSecurityLevel,
  getRiskScoreFromSecurityLevel,
  parseRiskLevel
} from './riskUtils';

// Re-export constants for convenience
export { BUSINESS_IMPACT_CATEGORIES, RISK_LEVELS } from '../constants/riskConstants';

