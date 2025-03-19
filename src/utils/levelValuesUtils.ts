import { SecurityLevel } from "../types/cia";

/**
 * Gets a security level based on its numeric value
 * 
 * @param value - The numeric value representation of a security level
 * @returns The corresponding SecurityLevel value
 */
export function getSecurityLevelFromValue(value: number): SecurityLevel {
  switch (value) {
    case 0:
      return "None";
    case 1:
      return "Low";
    case 2:
      return "Moderate";
    case 3:
      return "High";
    case 4:
      return "Very High";
    default:
      // Return "None" for any out-of-range values
      return "None";
  }
}

/**
 * Gets a numeric value for a security level
 * 
 * @param level - The security level
 * @returns A numeric value (0-4)
 */
export function getSecurityLevelValue(level: SecurityLevel | string): number {
  if (!level) return 0;
  
  // Normalize the level to handle case differences
  const normalizedLevel = typeof level === 'string' 
    ? level.trim().toLowerCase() 
    : '';
  
  if (normalizedLevel === 'none') return 0;
  if (normalizedLevel === 'low') return 1;
  if (normalizedLevel === 'moderate') return 2;
  if (normalizedLevel === 'high') return 3;
  if (normalizedLevel === 'very high') return 4;
  
  // Default to 0 for unknown levels
  return 0;
}
