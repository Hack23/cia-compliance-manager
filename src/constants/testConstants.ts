import { COMPLIANCE_FRAMEWORKS, SECURITY_DESCRIPTIONS } from "./coreConstants";
import { SECURITY_LEVEL_COLORS } from "./index";
import { BUSINESS_IMPACT_CATEGORIES, RISK_LEVELS } from "./riskConstants";

/** Display format constants */
export const DISPLAY_FORMAT = {
  CURRENCY_PREFIX: "$",
  PERCENTAGE_SUFFIX: "%",
  DECIMAL_PLACES: 2,
};

/** Test display format constants */
export const TEST_DISPLAY_FORMAT = {
  CURRENCY_PREFIX: "$",
  PERCENTAGE_SUFFIX: "%",
  DECIMAL_PLACES: 2,
};

/** Returns a partial text matcher for substring matching */
export const getPartialTextMatcher = (text: string, length = 15) => {
  return text.substring(0, Math.min(text.length, length));
};

/** Creates a case-insensitive regex matcher from text */
export const createRegexMatcher = (text: string) => {
  const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(escaped, "i");
};

/** Creates a regex matcher from the first three words of a value point */
export const createValuePointMatcher = (point: string) => {
  const words = point.split(" ").slice(0, 3).join("\\s+");
  return new RegExp(words, "i");
};

/** Creates a matcher for text elements with a specific class */
export const getTextElementMatcher = (text: string, className: string) => {
  return (content: string, element: Element) =>
    element.className.includes(className) &&
    content.includes(getPartialTextMatcher(text));
};

/** Test matchers for UI element verification */
export const TEST_MATCHERS = {
  COMPLIANCE_FRAMEWORKS_REGEX: new RegExp(
    Object.values(COMPLIANCE_FRAMEWORKS).join("|")
  ),
  UPTIME_PATTERN: /\d+\.?\d*%\s+uptime/i,
  DOWNTIME_PATTERN: /downtime/i,
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

/** CIA component test identifiers */
export const CIA_TEST_IDS = {
  AVAILABILITY: "availability",
  INTEGRITY: "integrity",
  CONFIDENTIALITY: "confidentiality",
};

/** Test CIA security levels */
export const TEST_CIA_LEVELS = {
  NONE: "None",
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  VERY_HIGH: "Very High",
  AVAILABILITY: "Availability",
  INTEGRITY: "Integrity",
  CONFIDENTIALITY: "Confidentiality",
};

/** Returns the color associated with a security level */
export const getSecurityLevelColor = (level: string): string => {
  const normalizedLevel = level.toUpperCase().replace(/\s+/g, "_");
  return normalizedLevel in SECURITY_LEVEL_COLORS
    ? SECURITY_LEVEL_COLORS[
        normalizedLevel as keyof typeof SECURITY_LEVEL_COLORS
      ]
    : "#666666";
};

/** Test helper utilities for component testing */
export const TEST_HELPERS = {
  checkSecurityLevelColor: (element: HTMLElement, level: string) => {
    const color = getSecurityLevelColor(level);
    return (
      element.style.backgroundColor === color ||
      element.style.borderColor === color ||
      element.className.includes(level.toLowerCase())
    );
  },

  getTestId: (component: string, entity: string, action?: string) => {
    return action
      ? `${component}-${entity}-${action}`
      : `${component}-${entity}`;
  },
};

/** Mock test data */
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

export { BUSINESS_IMPACT_CATEGORIES, RISK_LEVELS };
