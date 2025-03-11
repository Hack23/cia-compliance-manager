import { SecurityLevel } from '../types/cia';

/**
 * Gets default development effort based on security level
 */
export function getDefaultDevelopmentEffort(level: SecurityLevel): string {
  switch (level) {
    case "None": return "None";
    case "Low": return "Days (1-5)";
    case "Moderate": return "Weeks (2-4)";
    case "High": return "Months (1-3)";
    case "Very High": return "Months (3+)";
    default: return "Not specified";
  }
}

/**
 * Gets default maintenance effort based on security level
 */
export function getDefaultMaintenanceEffort(level: SecurityLevel): string {
  switch (level) {
    case "None": return "None";
    case "Low": return "Minimal (quarterly review)";
    case "Moderate": return "Regular (monthly review)";
    case "High": return "Significant (biweekly monitoring)";
    case "Very High": return "Extensive (continuous monitoring)";
    default: return "Not specified";
  }
}

/**
 * Gets default expertise level based on security level
 */
export function getDefaultExpertiseLevel(level: SecurityLevel): string {
  switch (level) {
    case "None": return "None";
    case "Low": return "Basic security knowledge";
    case "Moderate": return "Security professional";
    case "High": return "Security specialist";
    case "Very High": return "Security expert team";
    default: return "Not specified";
  }
}

/**
 * Gets information sensitivity level based on confidentiality level
 */
export function getInformationSensitivity(level: SecurityLevel): string {
  switch (level) {
    case "None": return "Public Information";
    case "Low": return "Internal Use Only";
    case "Moderate": return "Sensitive Information";
    case "High": return "Confidential Information";
    case "Very High": return "Restricted Information";
    default: return "Not Classified";
  }
}

/**
 * Gets protection level description based on confidentiality level
 */
export function getProtectionLevel(level: SecurityLevel): string {
  switch (level) {
    case "None": return "No Protection";
    case "Low": return "Basic Protection";
    case "Moderate": return "Standard Protection";
    case "High": return "Enhanced Protection";
    case "Very High": return "Maximum Protection";
    default: return "Undefined Protection";
  }
}
