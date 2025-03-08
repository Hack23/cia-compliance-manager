import { SECURITY_DESCRIPTIONS, COMPLIANCE_FRAMEWORKS } from "./coreConstants";
import { SECURITY_LEVEL_COLORS, CIA_LABELS, WIDGET_ICONS } from "./index";
import { BUSINESS_IMPACT_CATEGORIES, RISK_LEVELS } from "./riskConstants";

// Format constants for consistent display
export const DISPLAY_FORMAT = {
  CURRENCY_PREFIX: "$",
  PERCENTAGE_SUFFIX: "%",
  DECIMAL_PLACES: 2,
};

// Format constants for display in tests
export const TEST_DISPLAY_FORMAT = {
  CURRENCY_PREFIX: "$",
  PERCENTAGE_SUFFIX: "%",
  DECIMAL_PLACES: 2,
};

// Test-specific helpers
export const getPartialTextMatcher = (text: string, length = 15) => {
  return text.substring(0, Math.min(text.length, length));
};

export const createRegexMatcher = (text: string) => {
  // Escape special regex characters and return a case-insensitive regex
  const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(escaped, "i");
};

export const createValuePointMatcher = (point: string) => {
  const words = point.split(" ").slice(0, 3).join("\\s+");
  return new RegExp(words, "i");
};

export const getTextElementMatcher = (text: string, className: string) => {
  return (content: string, element: Element) =>
    element.className.includes(className) &&
    content.includes(getPartialTextMatcher(text));
};

// Test matchers for UI elements
export const TEST_MATCHERS = {
  COMPLIANCE_FRAMEWORKS_REGEX: new RegExp(
    Object.values(COMPLIANCE_FRAMEWORKS).join("|")
  ),
  UPTIME_PATTERN: /\d+\.?\d*%\s+uptime/i,
  DOWNTIME_PATTERN: /downtime/i,
  // Security description matchers
  SECURITY_DESCRIPTIONS_REGEX: {
    NONE: new RegExp(SECURITY_DESCRIPTIONS.NONE),
    LOW: new RegExp(SECURITY_DESCRIPTIONS.LOW),
    MODERATE: new RegExp(SECURITY_DESCRIPTIONS.MODERATE),
    HIGH: new RegExp(SECURITY_DESCRIPTIONS.HIGH),
    VERY_HIGH: new RegExp(SECURITY_DESCRIPTIONS.VERY_HIGH),
  },
  SECURITY_NONE_PATTERN: /Minimal or no security controls/i,
  SECURITY_LOW_PATTERN: /Basic security measures for non-critical systems/i,
  SECURITY_MODERATE_PATTERN:
    /Standard security controls for normal business functions/i,
  SECURITY_HIGH_PATTERN:
    /Strong protection for sensitive information and critical systems/i,
  SECURITY_VERY_HIGH_PATTERN:
    /Maximum security for highly sensitive systems and data/i,
};

// Add test matchers for CI/A levels
export const CIA_TEST_IDS = {
  AVAILABILITY: "availability",
  INTEGRITY: "integrity",
  CONFIDENTIALITY: "confidentiality",
};

// Add test data that matches real data structure
export const TEST_CIA_LEVELS = {
  NONE: "None",
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  VERY_HIGH: "Very High",
  // Add these missing properties
  AVAILABILITY: "Availability",
  INTEGRITY: "Integrity",
  CONFIDENTIALITY: "Confidentiality",
};

// Add test helper to get color from security level
export const getSecurityLevelColor = (level: string): string => {
  const normalizedLevel = level.toUpperCase().replace(/\s+/g, "_");
  // Use type assertion and check if it's a valid key
  return normalizedLevel in SECURITY_LEVEL_COLORS
    ? SECURITY_LEVEL_COLORS[
        normalizedLevel as keyof typeof SECURITY_LEVEL_COLORS
      ]
    : "#666666";
};

// Export test helpers for components
export const TEST_HELPERS = {
  // Helper to check if an element has a specific security level color
  checkSecurityLevelColor: (element: HTMLElement, level: string) => {
    const color = getSecurityLevelColor(level);
    // Check if element has color as background or border
    return (
      element.style.backgroundColor === color ||
      element.style.borderColor === color ||
      element.className.includes(level.toLowerCase())
    );
  },

  // Helper to generate consistent test IDs
  getTestId: (component: string, entity: string, action?: string) => {
    return action
      ? `${component}-${entity}-${action}`
      : `${component}-${entity}`;
  },
};

// Test data
export const TEST_DATA = {
  MOCK_OPTIONS: {
    BASE: { capex: 0, opex: 0 },
    LOW: { capex: 5, opex: 2, description: "Low security option" },
    MODERATE: { capex: 10, opex: 5, description: "Moderate security option" },
    HIGH: { capex: 15, opex: 8, description: "High security option" },
  },
  MOCK_DESCRIPTIONS: {
    AVAILABILITY: "Ensures system uptime meets business requirements",
    INTEGRITY: "Ensures data is protected from unauthorized changes",
    CONFIDENTIALITY: "Ensures sensitive information remains private",
  },
};

// Re-export important constants for tests
export { BUSINESS_IMPACT_CATEGORIES, RISK_LEVELS };
