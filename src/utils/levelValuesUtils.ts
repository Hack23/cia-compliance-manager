import { SecurityLevel } from "../types/cia";

/**
 * Utility functions for security level calculations and conversions
 * 
 * ## Business Perspective
 * 
 * These utilities provide a single source of truth for converting between 
 * different security level representations (string, numeric, enum) and calculating
 * values derived from security levels. 🔒
 * 
 * Centralizing these calculations ensures consistent security level interpretation
 * across business impact analysis, compliance mapping, and risk assessment.
 */

/**
 * Map security levels to numeric values for calculations
 */
export const SECURITY_LEVEL_VALUES: Record<SecurityLevel, number> = {
  "None": 0,
  "Low": 1,
  "Moderate": 2,
  "High": 3,
  "Very High": 4
};

/**
 * Get numeric value for a security level
 * 
 * @param level - Security level or string representation
 * @returns Numeric value (0-4)
 */
export function getSecurityLevelValue(level: SecurityLevel | string): number {
  if (typeof level === 'string') {
    // Normalize the level to handle case-insensitive matching
    const normalizedLevel = level.trim();

    if (/^none$/i.test(normalizedLevel)) return 0;
    if (/^low$/i.test(normalizedLevel)) return 1;
    if (/^(moderate|medium)$/i.test(normalizedLevel)) return 2;
    if (/^high$/i.test(normalizedLevel)) return 3;
    if (/^very\s*high$/i.test(normalizedLevel)) return 4;
  }

  // For SecurityLevel type or unknown strings
  return SECURITY_LEVEL_VALUES[level as SecurityLevel] ?? 0;
}

/**
 * Get security level from numeric value
 * 
 * @param value - Numeric value (0-4)
 * @returns Corresponding security level
 */
export function getSecurityLevelFromValue(value: number): SecurityLevel {
  const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
  return levels[value] || "None";
}

/**
 * Calculate overall security level from individual CIA components
 * 
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @param strategy - Calculation strategy ('min', 'max', 'avg', 'weighted')
 * @returns Calculated overall security level
 */
export function calculateOverallSecurityLevel(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel,
  strategy: 'min' | 'max' | 'avg' | 'weighted' = 'min'
): SecurityLevel {
  const availValue = getSecurityLevelValue(availabilityLevel);
  const integValue = getSecurityLevelValue(integrityLevel);
  const confValue = getSecurityLevelValue(confidentialityLevel);

  let result: number;

  switch (strategy) {
    case 'min':
      // Security is only as strong as the weakest link
      result = Math.min(availValue, integValue, confValue);
      break;
    case 'max':
      // For maximum level calculation
      result = Math.max(availValue, integValue, confValue);
      break;
    case 'avg':
      // Average security level
      result = Math.round((availValue + integValue + confValue) / 3);
      break;
    case 'weighted':
      // Weighted calculation based on business priorities
      // This example uses 30% availability, 30% integrity, 40% confidentiality
      result = Math.round((availValue * 0.3) + (integValue * 0.3) + (confValue * 0.4));
      break;
    default:
      result = Math.min(availValue, integValue, confValue);
  }

  return getSecurityLevelFromValue(result);
}

/**
 * Get normalized value (0-100) for a security level
 * Used for visualization and progress indicators
 * 
 * @param level - Security level
 * @returns Normalized value between 0-100
 */
export function getNormalizedSecurityValue(level: SecurityLevel): number {
  const value = getSecurityLevelValue(level);
  // Convert 0-4 scale to 0-100 scale
  return (value / 4) * 100;
}

/**
 * Compare two security levels
 * 
 * @param levelA - First security level
 * @param levelB - Second security level
 * @returns -1 if A < B, 0 if A = B, 1 if A > B
 */
export function compareSecurityLevels(levelA: SecurityLevel, levelB: SecurityLevel): number {
  const valueA = getSecurityLevelValue(levelA);
  const valueB = getSecurityLevelValue(levelB);

  if (valueA < valueB) return -1;
  if (valueA > valueB) return 1;
  return 0;
}
