import { CIADetails } from "../types/cia-services";

/**
 * Creates an empty CIADetails object with default values for all required fields
 * This helps satisfy type requirements when creating mock/empty objects
 *
 * @returns An empty CIADetails object
 * 
 * @example
 * ```typescript
 * // Create empty placeholder
 * const empty = createEmptyCIADetails();
 * 
 * // Use as fallback in service
 * const details = data?.details ?? createEmptyCIADetails();
 * 
 * // Initialize with partial data
 * const details = {
 *   ...createEmptyCIADetails(),
 *   description: 'Custom description',
 *   capex: 50000
 * };
 * ```
 */
export function createEmptyCIADetails(): CIADetails {
  return {
    description: "",
    technical: "",
    businessImpact: "",
    capex: 0,
    opex: 0,
    bg: "#ffffff",
    text: "#000000",
    recommendations: [],
    uptime: "N/A",
    rto: "N/A",
    rpo: "N/A",
    mttr: "N/A",
  };
}
