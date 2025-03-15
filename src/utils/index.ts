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

export * from "./colorUtils";
export * from "./securityDefaults";
export * from "./securityLevelUtils";
export * from "./typeGuards";
export * from "./widgetHelpers";
export { default as widgetRegistry } from "./widgetRegistry";
