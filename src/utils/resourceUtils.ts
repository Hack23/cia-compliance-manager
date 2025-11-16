import { SecurityLevel } from "../types/cia";

/**
 * Calculates personnel requirements (FTE) for a given security level
 *
 * @param level - The security level
 * @returns Personnel requirements as a formatted string (e.g., "0.5 FTE")
 */
export function getPersonnelRequirements(level: SecurityLevel): string {
  const levelValues: Record<SecurityLevel, number> = {
    None: 0.1,
    Low: 0.25,
    Moderate: 0.5,
    High: 1,
    "Very High": 2,
  };

  return `${levelValues[level] || 0.5} FTE`;
}
