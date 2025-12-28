/**
 * Resource utilities for calculating personnel and training requirements
 * based on security levels.
 * 
 * These utilities help organizations plan security resource allocation
 * by providing standardized calculations for FTE requirements.
 * 
 * @module utils/resourceUtils
 * 
 * @example
 * ```typescript
 * import { getPersonnelRequirements } from './resourceUtils';
 * 
 * // Calculate FTE needed for security implementation
 * const fteHigh = getPersonnelRequirements('High');
 * console.log('High security requires:', fteHigh); // "1 FTE"
 * 
 * const fteVeryHigh = getPersonnelRequirements('Very High');
 * console.log('Very High security requires:', fteVeryHigh); // "2 FTE"
 * ```
 */

import { SecurityLevel } from "../types/cia";

/**
 * Calculates personnel requirements (FTE) for a given security level
 * 
 * Maps security levels to Full-Time Equivalent (FTE) staffing requirements
 * based on industry standards for security operations.
 *
 * @param level - The security level
 * @returns Personnel requirements as a formatted string (e.g., "0.5 FTE")
 * 
 * @example
 * ```typescript
 * // Calculate FTE for different security levels
 * getPersonnelRequirements('None');        // "0.1 FTE" (minimal oversight)
 * getPersonnelRequirements('Low');         // "0.25 FTE" (part-time)
 * getPersonnelRequirements('Moderate');    // "0.5 FTE" (half-time)
 * getPersonnelRequirements('High');        // "1 FTE" (full-time)
 * getPersonnelRequirements('Very High');   // "2 FTE" (dedicated team)
 * 
 * // Use in budget planning
 * const level = 'High';
 * const fte = getPersonnelRequirements(level);
 * const annualCost = parseFloat(fte) * 150000; // Assume $150k per FTE
 * console.log(`Annual staffing cost for ${level}: $${annualCost.toLocaleString()}`);
 * // Output: "Annual staffing cost for High: $150,000"
 * ```
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
