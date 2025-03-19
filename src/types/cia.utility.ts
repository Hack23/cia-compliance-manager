import { SecurityLevel } from "./cia";

/**
 * Format security level string for display
 * 
 * @param level - Security level to format
 * @returns Formatted security level string
 */
export function formatSecurityLevel(level?: string): string {
  if (!level) return "None";
  
  // Handle special case for "Very High"
  if (level.toUpperCase() === "VERY HIGH") return "Very High";
  
  // First character uppercase, rest lowercase
  return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
}

/**
 * Convert security level to numeric value
 * 
 * @param level - Security level to convert
 * @returns Numeric value (0-4)
 */
export function getSecurityLevelValue(level: SecurityLevel): number {
  switch (level) {
    case "None": return 0;
    case "Low": return 1;
    case "Moderate": return 2;
    case "High": return 3;
    case "Very High": return 4;
    default: return 0;
  }
}

/**
 * Get security level based on numeric value
 * 
 * @param value - Numeric value to convert
 * @returns Corresponding security level
 */
export function getSecurityLevelFromValue(value: number): SecurityLevel {
  switch (value) {
    case 0: return "None";
    case 1: return "Low";
    case 2: return "Moderate";
    case 3: return "High";
    case 4: return "Very High";
    default: return "None";
  }
}

/**
 * Calculate overall security level based on component levels
 * 
 * ## Business Perspective
 * 
 * This function provides organizations with a consolidated view of their 
 * security posture across all three components of the CIA triad.
 * It helps in strategic decision-making and resource allocation. 💼
 * 
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns Overall security level
 */
export function calculateOverallSecurityLevel(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): SecurityLevel {
  // Convert levels to numeric values
  const availValue = getSecurityLevelValue(availabilityLevel);
  const integValue = getSecurityLevelValue(integrityLevel);
  const confidValue = getSecurityLevelValue(confidentialityLevel);
  
  // Special case: All levels are the same
  if (availabilityLevel === integrityLevel && integrityLevel === confidentialityLevel) {
    return availabilityLevel;
  }
  
  // Special case for mixed security levels that include "None"
  const hasNone = availabilityLevel === "None" || integrityLevel === "None" || confidentialityLevel === "None";
  
  if (hasNone) {
    // Count how many "None" values we have
    const noneCount = [availabilityLevel, integrityLevel, confidentialityLevel]
      .filter(level => level === "None").length;
    
    // If all are "None", return "None"
    if (noneCount === 3) {
      return "None";
    }
    
    // If majority are "None", return "None"
    if (noneCount >= 2) {
      return "None";
    }
    
    // If only one is "None", check the other two
    // If both remaining levels are High or above, return Low (cap at Low)
    // Otherwise, calculate the average of non-None values
    const nonNoneValues = [availValue, integValue, confidValue].filter(val => val > 0);
    const avgNonNoneValue = nonNoneValues.reduce((sum, val) => sum + val, 0) / nonNoneValues.length;
    
    // Cap at Low if the average would be higher
    if (avgNonNoneValue > 1) {
      return "Low";
    }
    
    return "None";
  }
  
  // Calculate average and round it to nearest integer
  const avgValue = Math.round((availValue + integValue + confidValue) / 3);
  
  // Convert back to SecurityLevel
  return getSecurityLevelFromValue(avgValue);
}

/**
 * Calculate risk level based on security levels
 * 
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns Risk level (Critical, High, Medium, Low, Minimal)
 */
export function calculateRiskLevel(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): string {
  // Calculate overall security level first
  const overallLevel = calculateOverallSecurityLevel(
    availabilityLevel,
    integrityLevel,
    confidentialityLevel
  );
  
  // Map security levels to risk levels
  switch (overallLevel) {
    case "None": return "Critical";
    case "Low": return "High";
    case "Moderate": return "Medium";
    case "High": return "Low";
    case "Very High": return "Minimal";
    default: return "Unknown";
  }
}
