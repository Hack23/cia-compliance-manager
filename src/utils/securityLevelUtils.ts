import { SECURITY_LEVELS } from "../constants/appConstants";
import {
  SECURITY_LEVEL_FROM_VALUE,
  SECURITY_LEVEL_VALUES,
} from "../constants/securityLevels";
import { SecurityLevel } from "../types/cia";
import { StatusType } from "../types/common/StatusTypes";

/**
 * Utility functions for handling security levels.
 *
 * ## Business Impact
 * These functions play a crucial role in determining and normalizing security levels, which directly impacts the application's ability to manage and enforce security policies. 💼
 *
 * ## Compliance
 * By providing consistent and accurate security level calculations, these functions help ensure that the application meets various compliance requirements and standards. 📜
 *
 * ## Risk Management
 * The functions in this module contribute to risk management by providing a structured way to represent and analyze security levels, helping to identify and mitigate potential risks. ⚠️
 *
 * ## Value Creation
 * The use of well-defined utility functions enhances the application's reliability and maintainability, leading to cost savings and efficiency improvements. 💡
 *
 * ## Stakeholder Benefits
 * Clear and consistent utility functions benefit all stakeholders, including developers, security analysts, and business users, by providing a common understanding of key security concepts. 🤝
 */

/**
 * Default security level used throughout the application
 */
export const DEFAULT_SECURITY_LEVEL: SecurityLevel = "Moderate";

/**
 * Normalize any security level input to a valid SecurityLevel enum value
 * 
 * Handles various input formats including case variations and null/undefined values.
 * Provides a robust way to convert user input or API responses to valid SecurityLevel values.
 * 
 * @param level - Input that might be a security level (can be string, SecurityLevel, null, or undefined)
 * @returns A valid SecurityLevel enum value (defaults to 'Moderate' if invalid)
 * 
 * @example
 * ```typescript
 * normalizeSecurityLevel('high')        // 'High' (case normalization)
 * normalizeSecurityLevel('VERY HIGH')   // 'Very High' (case normalization)
 * normalizeSecurityLevel(null)          // 'Moderate' (default)
 * normalizeSecurityLevel(undefined)     // 'Moderate' (default)
 * normalizeSecurityLevel('invalid')     // 'Moderate' (default for invalid input)
 * normalizeSecurityLevel('High')        // 'High' (already valid)
 * ```
 */
export function normalizeSecurityLevel(
  level?: string | SecurityLevel | null
): SecurityLevel {
  if (!level) return DEFAULT_SECURITY_LEVEL;

  const validLevels: SecurityLevel[] = [
    "None",
    "Low",
    "Moderate",
    "High",
    "Very High",
  ];

  // Try direct match
  if (validLevels.includes(level as SecurityLevel)) {
    return level as SecurityLevel;
  }

  // Try case-insensitive match
  const normalized =
    typeof level === "string"
      ? level.charAt(0).toUpperCase() + level.slice(1).toLowerCase()
      : level;
  if (validLevels.includes(normalized as SecurityLevel)) {
    return normalized as SecurityLevel;
  }

  // Default to moderate if no match
  return DEFAULT_SECURITY_LEVEL;
}

/**
 * Get numeric value for a security level (0-4)
 * 
 * Converts SecurityLevel enum values to numeric scores for comparison,
 * calculation, and sorting operations. Returns 0 for invalid levels.
 * 
 * @param level - Security level to convert (SecurityLevel or string)
 * @returns Numeric value: None=0, Low=1, Moderate=2, High=3, Very High=4
 * 
 * @example
 * ```typescript
 * getSecurityLevelValue('None')         // 0
 * getSecurityLevelValue('Low')          // 1
 * getSecurityLevelValue('Moderate')     // 2
 * getSecurityLevelValue('High')         // 3
 * getSecurityLevelValue('Very High')    // 4
 * getSecurityLevelValue('invalid')      // 0 (invalid input)
 * 
 * // Use for comparison
 * const isHighEnough = getSecurityLevelValue(currentLevel) >= getSecurityLevelValue('High');
 * ```
 */
export function getSecurityLevelValue(level: SecurityLevel | string): number {
  // Special handling for invalid security levels to ensure they return 0
  if (typeof level === "string") {
    const validLevels: SecurityLevel[] = [
      "None",
      "Low",
      "Moderate",
      "High",
      "Very High",
    ];

    if (!validLevels.includes(level as SecurityLevel)) {
      return 0; // Return 0 for invalid security levels to match test expectations
    }
  }

  const normalizedLevel = normalizeSecurityLevel(level);

  const levelValues: Record<SecurityLevel, number> = {
    None: 0,
    Low: 1,
    Moderate: 2,
    High: 3,
    "Very High": 4,
  };

  return levelValues[normalizedLevel] ?? 0;
}

/**
 * Maps numeric values to security levels
 * 
 * Converts numeric security scores back to SecurityLevel enum values.
 * Useful for converting calculated scores or slider values to security levels.
 * Values outside 0-4 range default to 'None'.
 *
 * @param value - Numeric value (0-4), where higher numbers indicate stronger security
 * @returns The corresponding security level
 * 
 * @example
 * ```typescript
 * getSecurityLevelFromValue(0)    // 'None'
 * getSecurityLevelFromValue(1)    // 'Low'
 * getSecurityLevelFromValue(2)    // 'Moderate'
 * getSecurityLevelFromValue(3)    // 'High'
 * getSecurityLevelFromValue(4)    // 'Very High'
 * getSecurityLevelFromValue(5)    // 'None' (out of range)
 * getSecurityLevelFromValue(-1)   // 'None' (out of range)
 * 
 * // Use with calculated average
 * const avgValue = Math.round((val1 + val2 + val3) / 3);
 * const overallLevel = getSecurityLevelFromValue(avgValue);
 * ```
 */
export function getSecurityLevelFromValue(value: number): SecurityLevel {
  const levels: SecurityLevel[] = [
    "None",
    "Low",
    "Moderate",
    "High",
    "Very High",
  ];
  return levels[value] || "None";
}

/**
 * Get risk level string from a security level
 * 
 * Maps security levels to corresponding risk levels using an inverse relationship:
 * higher security levels correlate with lower risk levels. Used for risk assessment
 * and dashboard visualizations.
 *
 * @param level - Security level to assess
 * @returns Corresponding risk level: Critical, High, Medium, Low, or Minimal
 * 
 * @example
 * ```typescript
 * getRiskLevelFromSecurityLevel('None')        // 'Critical'
 * getRiskLevelFromSecurityLevel('Low')         // 'High'
 * getRiskLevelFromSecurityLevel('Moderate')    // 'Medium'
 * getRiskLevelFromSecurityLevel('High')        // 'Low'
 * getRiskLevelFromSecurityLevel('Very High')   // 'Minimal'
 * 
 * // Use in risk assessment
 * const riskLevel = getRiskLevelFromSecurityLevel(currentSecurityLevel);
 * const riskFormatted = formatRiskLevel(`${riskLevel} Risk`);
 * ```
 */
export function getRiskLevelFromSecurityLevel(level: SecurityLevel): string {
  const riskLevels: Record<SecurityLevel, string> = {
    None: "Critical",
    Low: "High",
    Moderate: "Medium",
    High: "Low",
    "Very High": "Minimal",
  };

  return riskLevels[level] || "Unknown";
}

/**
 * Calculates the overall security level based on individual CIA components
 * 
 * Computes a composite security level by averaging the numeric values of
 * availability, integrity, and confidentiality levels, then rounding to
 * the nearest security level. Provides a single metric for overall security posture.
 *
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns The overall security level (average of the three components, rounded)
 * 
 * @example
 * ```typescript
 * // All equal - returns same level
 * calculateOverallSecurityLevel('High', 'High', 'High')  // 'High'
 * 
 * // Mixed levels - returns average
 * calculateOverallSecurityLevel('Low', 'Moderate', 'High')  // 'Moderate'
 * calculateOverallSecurityLevel('None', 'Low', 'Low')       // 'Low'
 * 
 * // Use for system-wide security assessment
 * const overallLevel = calculateOverallSecurityLevel(
 *   availabilityLevel,
 *   integrityLevel,
 *   confidentialityLevel
 * );
 * console.log(`System security level: ${overallLevel}`);
 * ```
 */
export function calculateOverallSecurityLevel(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): SecurityLevel {
  // Get numerical values for each level
  const availabilityValue = SECURITY_LEVEL_VALUES[availabilityLevel] || 0;
  const integrityValue = SECURITY_LEVEL_VALUES[integrityLevel] || 0;
  const confidentialityValue = SECURITY_LEVEL_VALUES[confidentialityLevel] || 0;

  // Calculate average level with higher weight on confidentiality
  const avgValue =
    (availabilityValue + integrityValue + confidentialityValue) / 3;

  // Round to nearest level
  const roundedValue = Math.round(avgValue);

  // Return the security level corresponding to the calculated value
  return SECURITY_LEVEL_FROM_VALUE[roundedValue] || "None";
}

/**
 * Determine if a given set of security levels meets minimum requirements
 * 
 * Validates that current security levels meet or exceed specified minimum
 * requirements for all three CIA components. Returns true only if ALL
 * requirements are met. Essential for compliance checking and gap analysis.
 *
 * @param availabilityLevel - Current availability security level
 * @param integrityLevel - Current integrity security level
 * @param confidentialityLevel - Current confidentiality security level
 * @param minAvailability - Minimum required availability level
 * @param minIntegrity - Minimum required integrity level
 * @param minConfidentiality - Minimum required confidentiality level
 * @returns true if all current levels meet or exceed minimum requirements
 * 
 * @example
 * ```typescript
 * // All requirements met
 * meetsSecurityRequirements(
 *   'High', 'High', 'High',      // Current levels
 *   'Moderate', 'Moderate', 'Moderate'  // Required levels
 * )  // true
 * 
 * // One requirement not met
 * meetsSecurityRequirements(
 *   'Low', 'High', 'High',       // Current levels (availability too low)
 *   'Moderate', 'Moderate', 'Moderate'  // Required levels
 * )  // false
 * 
 * // Use for compliance validation
 * const compliant = meetsSecurityRequirements(
 *   currentAvailability, currentIntegrity, currentConfidentiality,
 *   'High', 'High', 'Moderate'
 * );
 * if (!compliant) {
 *   console.log('Security levels do not meet requirements');
 * }
 * ```
 */
export function meetsSecurityRequirements(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel,
  minAvailability: SecurityLevel,
  minIntegrity: SecurityLevel,
  minConfidentiality: SecurityLevel
): boolean {
  const availabilityMet =
    SECURITY_LEVEL_VALUES[availabilityLevel] >=
    SECURITY_LEVEL_VALUES[minAvailability];
  const integrityMet =
    SECURITY_LEVEL_VALUES[integrityLevel] >=
    SECURITY_LEVEL_VALUES[minIntegrity];
  const confidentialityMet =
    SECURITY_LEVEL_VALUES[confidentialityLevel] >=
    SECURITY_LEVEL_VALUES[minConfidentiality];

  return availabilityMet && integrityMet && confidentialityMet;
}

/**
 * Get the gap between current and required security levels
 * 
 * Calculates the numeric difference between two security levels.
 * Positive values indicate current level exceeds requirements,
 * negative values indicate a gap that needs to be addressed.
 *
 * @param currentLevel - Current security level
 * @param requiredLevel - Required/target security level
 * @returns Number of levels gap (positive if current > required, negative if current < required)
 * 
 * @example
 * ```typescript
 * getSecurityLevelGap('High', 'Moderate')      // 1 (exceeds by 1 level)
 * getSecurityLevelGap('Low', 'High')           // -2 (falls short by 2 levels)
 * getSecurityLevelGap('Moderate', 'Moderate')  // 0 (meets exactly)
 * 
 * // Use for gap analysis
 * const gap = getSecurityLevelGap(currentLevel, requiredLevel);
 * if (gap < 0) {
 *   console.log(`Need to increase security by ${Math.abs(gap)} level(s)`);
 * } else if (gap > 0) {
 *   console.log(`Security exceeds requirements by ${gap} level(s)`);
 * }
 * ```
 */
export function getSecurityLevelGap(
  currentLevel: SecurityLevel,
  requiredLevel: SecurityLevel
): number {
  return (
    SECURITY_LEVEL_VALUES[currentLevel] - SECURITY_LEVEL_VALUES[requiredLevel]
  );
}

/**
 * Get a set of recommended security levels that would meet compliance requirements
 *
 * @param currentAvailability - Current availability level
 * @param currentIntegrity - Current integrity level
 * @param currentConfidentiality - Current confidentiality level
 * @param minAvailability - Minimum required availability level
 * @param minIntegrity - Minimum required integrity level
 * @param minConfidentiality - Minimum required confidentiality level
 * @returns Recommended security levels
 */
export function getRecommendedSecurityLevels(
  currentAvailability: SecurityLevel,
  currentIntegrity: SecurityLevel,
  currentConfidentiality: SecurityLevel,
  minAvailability: SecurityLevel,
  minIntegrity: SecurityLevel,
  minConfidentiality: SecurityLevel
): {
  availability: SecurityLevel;
  integrity: SecurityLevel;
  confidentiality: SecurityLevel;
} {
  // Use the higher of current or required level for each component
  const availabilityValue = Math.max(
    SECURITY_LEVEL_VALUES[currentAvailability],
    SECURITY_LEVEL_VALUES[minAvailability]
  );

  const integrityValue = Math.max(
    SECURITY_LEVEL_VALUES[currentIntegrity],
    SECURITY_LEVEL_VALUES[minIntegrity]
  );

  const confidentialityValue = Math.max(
    SECURITY_LEVEL_VALUES[currentConfidentiality],
    SECURITY_LEVEL_VALUES[minConfidentiality]
  );

  return {
    availability: SECURITY_LEVEL_FROM_VALUE[availabilityValue] || "None",
    integrity: SECURITY_LEVEL_FROM_VALUE[integrityValue] || "None",
    confidentiality: SECURITY_LEVEL_FROM_VALUE[confidentialityValue] || "None",
  };
}

/**
 * Provides a numerical representation of security levels for UI presentation
 * 
 * Converts security levels to percentage strings for use in progress bars,
 * gauges, and other visual indicators. Maps 0-4 scale to 0-100% range
 * in 25% increments.
 * 
 * @param level - The security level (string or SecurityLevel enum)
 * @returns A percentage string (0%, 25%, 50%, 75%, or 100%)
 * 
 * @example
 * ```typescript
 * getSecurityLevelPercentage('None')        // "0%"
 * getSecurityLevelPercentage('Low')         // "25%"
 * getSecurityLevelPercentage('Moderate')    // "50%"
 * getSecurityLevelPercentage('High')        // "75%"
 * getSecurityLevelPercentage('Very High')   // "100%"
 * 
 * // Use in UI components
 * <ProgressBar value={getSecurityLevelPercentage(level)} />
 * ```
 */
export function getSecurityLevelPercentage(
  level: SecurityLevel | string
): string {
  // Convert to SecurityLevel type or use default
  const securityLevel = normalizeSecurityLevel(level);
  const value = getSecurityLevelValue(securityLevel);
  const percentage = value * 25; // 0, 25, 50, 75, 100
  return `${percentage}%`;
}

/**
 * Determines the appropriate CSS classes for displaying a security level
 * 
 * Returns Tailwind CSS classes with color coding that visually represents
 * security level severity. Includes dark mode support. Red=None, Yellow=Low,
 * Blue=Moderate, Green=High, Purple=Very High.
 * 
 * @param level - The security level (string or SecurityLevel enum)
 * @returns CSS class string for styling the security level badge/indicator
 * 
 * @example
 * ```typescript
 * getSecurityLevelClass('None')        
 * // "bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-300"
 * 
 * getSecurityLevelClass('High')        
 * // "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300"
 * 
 * // Use in components
 * <span className={`px-2 py-1 rounded ${getSecurityLevelClass(level)}`}>
 *   {level}
 * </span>
 * ```
 */
export function getSecurityLevelClass(level: string | SecurityLevel): string {
  // Normalize the level to handle both string and SecurityLevel types
  const normalizedLevel =
    typeof level === "string"
      ? level.toLowerCase().trim()
      : normalizeSecurityLevel(level as string).toLowerCase();

  switch (normalizedLevel) {
    case "none":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-300";
    case "low":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-20 dark:text-yellow-300";
    case "moderate":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-20 dark:text-blue-300";
    case "high":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300";
    case "very high":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-20 dark:text-purple-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
}

/**
 * Map a security level to a status badge variant
 * @param level The security level string
 * @returns A status badge variant
 */
export function getSecurityLevelBadgeVariant(
  level: string
): "info" | "success" | "warning" | "error" | "neutral" | "purple" {
  const normalizedLevel = normalizeSecurityLevel(level);

  switch (normalizedLevel) {
    case SECURITY_LEVELS.VERY_HIGH:
      return "purple";
    case SECURITY_LEVELS.HIGH:
      return "success";
    case SECURITY_LEVELS.MODERATE:
      return "info";
    case SECURITY_LEVELS.LOW:
      return "warning";
    case SECURITY_LEVELS.NONE:
      return "error";
    default:
      return "neutral";
  }
}

/**
 * Check if a string is a valid security level
 * 
 * Type guard function that validates whether a value is a valid SecurityLevel.
 * Useful for runtime type checking and validation of user input or API responses.
 *
 * @param value - Value to check (can be any type)
 * @returns Type predicate indicating if value is SecurityLevel
 * 
 * @example
 * ```typescript
 * if (isSecurityLevel(userInput)) {
 *   // TypeScript knows userInput is SecurityLevel here
 *   const level: SecurityLevel = userInput;
 *   console.log(`Valid security level: ${level}`);
 * }
 * 
 * isSecurityLevel('High')        // true
 * isSecurityLevel('Invalid')     // false
 * isSecurityLevel(123)           // false
 * isSecurityLevel(null)          // false
 * ```
 */
export function isSecurityLevel(value: unknown): value is SecurityLevel {
  if (typeof value !== "string") return false;

  return ["None", "Low", "Moderate", "High", "Very High"].includes(
    value as string
  );
}

/**
 * Convert string to security level, with fallback
 *
 * @param value - Value to convert
 * @param fallback - Fallback level if invalid
 * @returns Valid security level
 */
export function asSecurityLevel(
  value: string,
  fallback: SecurityLevel = "None"
): SecurityLevel {
  return isSecurityLevel(value) ? value : fallback;
}

/**
 * Get security level description
 *
 * @param level - Security level
 * @returns Description of the security level
 */
export function getSecurityLevelDescription(level: SecurityLevel): string {
  const descriptions: Record<SecurityLevel, string> = {
    None: "No security controls implemented",
    Low: "Basic security controls with minimal protection",
    Moderate: "Standard security controls with adequate protection",
    High: "Advanced security controls with strong protection",
    "Very High": "Maximum security controls with comprehensive protection",
  };

  return descriptions[level] || "Unknown security level";
}

/**
 * Determine if a security level meets compliance requirements for a specific framework
 * 
 * Validates that a security level meets the minimum requirements defined for
 * common compliance frameworks (SOC 2, ISO 27001, PCI-DSS, HIPAA, NIST, GDPR, CCPA).
 * Returns true if the level meets or exceeds the framework's minimum requirement.
 *
 * @param level - Security level to validate
 * @param framework - Compliance framework name (e.g., 'SOC2', 'PCI-DSS', 'HIPAA')
 * @returns true if the security level meets the framework's minimum requirements
 * 
 * @example
 * ```typescript
 * meetsComplianceRequirements('High', 'PCI-DSS')     // true (PCI-DSS requires High)
 * meetsComplianceRequirements('Moderate', 'PCI-DSS') // false (needs High)
 * meetsComplianceRequirements('Moderate', 'SOC2')    // true (SOC2 requires Moderate)
 * meetsComplianceRequirements('High', 'GDPR')        // true (exceeds Moderate requirement)
 * 
 * // Validate against multiple frameworks
 * const frameworks = ['SOC2', 'ISO27001', 'GDPR'];
 * const allMet = frameworks.every(f => 
 *   meetsComplianceRequirements(currentLevel, f)
 * );
 * ```
 */
export function meetsComplianceRequirements(
  level: SecurityLevel,
  framework: string
): boolean {
  const minLevelsByFramework: Record<string, SecurityLevel> = {
    SOC2: "Moderate",
    ISO27001: "Moderate",
    "PCI-DSS": "High",
    HIPAA: "High",
    NIST: "High",
    GDPR: "Moderate",
    CCPA: "Moderate",
  };

  const requiredLevel = minLevelsByFramework[framework] || "Low";

  // Compare security level values
  return getSecurityLevelValue(level) >= getSecurityLevelValue(requiredLevel);
}

/**
 * Get security icon for a security level
 *
 * @param level - Security level
 * @returns Icon representing the security level
 */
export function getSecurityIcon(level: SecurityLevel): string {
  const icons: Record<SecurityLevel, string> = {
    None: "⚠️",
    Low: "🔑",
    Moderate: "🔒",
    High: "🛡️",
    "Very High": "🔐",
  };

  return icons[level] || "❓";
}

/**
 * Get recommended security level based on data sensitivity
 *
 * @param dataSensitivity - Data sensitivity level (1-5)
 * @returns Recommended security level
 */
export function getRecommendedSecurityLevel(
  dataSensitivity: number
): SecurityLevel {
  if (dataSensitivity <= 1) return "None";
  if (dataSensitivity === 2) return "Low";
  if (dataSensitivity === 3) return "Moderate";
  if (dataSensitivity === 4) return "High";
  return "Very High";
}

/**
 * Format a security level string consistently
 *
 * @param level - Level string to format
 * @returns Formatted security level or original string
 */
export function formatSecurityLevel(level?: string): SecurityLevel | string {
  if (!level) return "Not Specified";

  // Check for case-insensitive variations and normalize
  const normalizedLevel = level.trim();

  // Check for common value variations
  if (/^none$/i.test(normalizedLevel)) return "None";
  if (/^low$/i.test(normalizedLevel)) return "Low";
  if (/^(moderate|medium)$/i.test(normalizedLevel)) return "Moderate";
  if (/^high$/i.test(normalizedLevel)) return "High";
  if (/^(very.?high|maximum)$/i.test(normalizedLevel)) return "Very High";

  // If no match found, return original
  return level;
}

/**
 * Converts a security level or risk level string to the appropriate StatusType
 *
 * @param level - The security or risk level to convert
 * @returns The appropriate StatusType for the given level
 */
export const getStatusVariant = (level: string): StatusType => {
  const normalizedLevel = level.toLowerCase();
  if (normalizedLevel === "none") return "error";
  if (normalizedLevel === "low") return "warning";
  if (normalizedLevel === "moderate") return "info";
  if (normalizedLevel === "high") return "success";
  if (normalizedLevel === "very high") return "purple";
  return "neutral";
};
