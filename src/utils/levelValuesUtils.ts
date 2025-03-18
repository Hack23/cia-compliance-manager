import { SecurityLevel } from "../types/cia";

/**
 * Convert security level to numeric value
 * 
 * @param level - Security level
 * @returns Numeric value (0-4)
 */
export function getSecurityLevelValue(level: SecurityLevel): number {
  switch(level) {
    case "None": return 0;
    case "Low": return 1;
    case "Moderate": return 2;
    case "High": return 3;
    case "Very High": return 4;
    default: return 0;
  }
}

/**
 * Convert numeric value to security level
 * 
 * @param value - Numeric value (0-4)
 * @returns Security level
 */
export function getSecurityLevelFromValue(value: number): SecurityLevel {
  switch(value) {
    case 0: return "None";
    case 1: return "Low";
    case 2: return "Moderate";
    case 3: return "High";
    case 4: return "Very High";
    default: return "None";
  }
}
