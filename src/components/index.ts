/**
 * # Component Library
 *
 * This module provides React components for building the CIA Compliance Manager UI.
 *
 * ## Business Perspective
 * These components implement the visual representation of the security compliance
 * dashboard, allowing stakeholders to make informed decisions about security investments.
 *
 * ## Architecture Perspective
 * Components are organized by functional area and follow a layered architecture pattern,
 * with common components at the base and specialized widgets building upon them.
 *
 * ## Security Perspective
 * UI components implement visual security indicators and follow secure coding practices
 * to prevent XSS and ensure proper data validation.
 *
 * @module components
 */

// Re-export from subdirectories
export * from "./charts";
export * from "./common";
export * from "./dashboard";

// Export security level components with SecurityLevelSelector explicitly
// renamed to avoid ambiguity with the old version
export {
  SecurityLevelSelector as EnhancedSecurityLevelSelector,
  Selection,
} from "./securitylevel";

// Export common components with explicit naming to avoid conflicts
export * from "./common/BusinessImpactSection";
export * from "./common/CIAImpactCard";
export { default as SimpleSecurityLevelSelector } from "./common/SecurityLevelSelector";
export * from "./common/SecurityRiskScore";

// Export single canonical SecurityLevelSelector
export { default as SecurityLevelSelector } from "./SecurityLevelSelector";

// Export widgets
export * from "./widgets";

// Export utility functions from the canonical location
export * from "../utils/widgetHelpers";
export { widgetRegistry, widgetRegistryUtils } from "../utils/widgetRegistry";
