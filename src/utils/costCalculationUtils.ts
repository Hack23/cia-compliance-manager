/**
 * Cost Calculation Utilities
 *
 * This module provides business-oriented cost calculation functions for
 * security implementations across the CIA triad.
 *
 * ## Business Perspective
 *
 * These utilities help organizations understand the financial implications
 * of different security level choices. They provide consistent cost models
 * that can be used for budgeting and ROI analysis. 💰
 *
 * @packageDocumentation
 */

import { SecurityLevel } from "../types/cia";

// Base implementation costs per security level
const BASE_IMPLEMENTATION_COSTS = {
  None: { capex: 0, opex: 0 },
  Low: { capex: 5000, opex: 2000 },
  Moderate: { capex: 15000, opex: 5000 },
  High: { capex: 50000, opex: 15000 },
  "Very High": { capex: 200000, opex: 50000 },
};

// Organization size multipliers
const ORG_SIZE_MULTIPLIERS = {
  small: 0.5,
  medium: 1.0,
  large: 2.5,
  enterprise: 5.0,
};

// Industry complexity factors
const INDUSTRY_COST_FACTORS = {
  general: 1.0,
  financial: 1.5,
  healthcare: 1.7,
  government: 1.3,
  retail: 1.2,
  technology: 1.4,
  manufacturing: 1.1,
};

/**
 * Normalize security level to ensure it matches expected keys
 * @param level Security level to normalize
 * @returns Normalized security level that matches BASE_IMPLEMENTATION_COSTS keys
 */
function normalizeLevel(
  level: SecurityLevel | string | undefined
): SecurityLevel {
  if (!level) return "None";

  // Handle case-insensitive matching
  const normalizedLevel = typeof level === "string" ? level.trim() : "";

  if (/^none$/i.test(normalizedLevel)) return "None";
  if (/^low$/i.test(normalizedLevel)) return "Low";
  if (/^(moderate|medium)$/i.test(normalizedLevel)) return "Moderate";
  if (/^high$/i.test(normalizedLevel)) return "High";
  if (/^very\s*high$/i.test(normalizedLevel)) return "Very High";

  // Default to "None" if no match
  return "None";
}

/**
 * Calculate implementation costs for a given security level
 *
 * @param level Security level
 * @param orgSize Organization size
 * @param industry Industry type
 * @returns Object containing capex and opex costs
 */
export function calculateImplementationCost(
  level: SecurityLevel,
  orgSize: keyof typeof ORG_SIZE_MULTIPLIERS = "medium",
  industry: keyof typeof INDUSTRY_COST_FACTORS = "general"
): { capex: number; opex: number } {
  // Normalize level to ensure it's a valid key
  const normalizedLevel = normalizeLevel(level);

  // Get base costs with fallback to prevent undefined
  const baseCosts =
    BASE_IMPLEMENTATION_COSTS[normalizedLevel] ||
    BASE_IMPLEMENTATION_COSTS.None;

  // Get multipliers with fallbacks
  const sizeFactor =
    ORG_SIZE_MULTIPLIERS[orgSize] || ORG_SIZE_MULTIPLIERS.medium;
  const industryFactor =
    INDUSTRY_COST_FACTORS[industry] || INDUSTRY_COST_FACTORS.general;

  return {
    capex: Math.round(baseCosts.capex * sizeFactor * industryFactor),
    opex: Math.round(baseCosts.opex * sizeFactor * industryFactor),
  };
}

/**
 * Calculate total cost of implementing multiple security controls
 *
 * ## Business Perspective
 *
 * This function helps organizations understand the combined financial impact
 * of their security choices across the CIA triad. It provides a consolidated
 * view for budget planning and approval processes. 💼
 *
 * @param availabilityLevel Availability security level
 * @param integrityLevel Integrity security level
 * @param confidentialityLevel Confidentiality security level
 * @param orgSize Organization size
 * @param industry Industry type
 * @returns Object containing total costs and breakdown
 */
export function calculateTotalSecurityCost(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel,
  orgSize: keyof typeof ORG_SIZE_MULTIPLIERS = "medium",
  industry: keyof typeof INDUSTRY_COST_FACTORS = "general"
): {
  totalCapex: number;
  totalOpex: number;
  totalCost: number;
  availabilityCost: { capex: number; opex: number };
  integrityCost: { capex: number; opex: number };
  confidentialityCost: { capex: number; opex: number };
} {
  // Calculate individual component costs
  const availabilityCost = calculateImplementationCost(
    availabilityLevel,
    orgSize,
    industry
  );
  const integrityCost = calculateImplementationCost(
    integrityLevel,
    orgSize,
    industry
  );
  const confidentialityCost = calculateImplementationCost(
    confidentialityLevel,
    orgSize,
    industry
  );

  // Calculate totals
  const totalCapex =
    availabilityCost.capex + integrityCost.capex + confidentialityCost.capex;
  const totalOpex =
    availabilityCost.opex + integrityCost.opex + confidentialityCost.opex;

  return {
    totalCapex,
    totalOpex,
    totalCost: totalCapex + totalOpex,
    availabilityCost,
    integrityCost,
    confidentialityCost,
  };
}

/**
 * Calculate return on investment for security implementation
 *
 * ## Business Perspective
 *
 * This function helps security officers demonstrate the business value of
 * security investments, which is critical for getting executive buy-in. It
 * translates security controls into financial terms that business leaders
 * understand. 📊
 *
 * @param securityCost Total security implementation cost
 * @param riskReduction Risk reduction percentage (0-100)
 * @param potentialLoss Potential loss from security incidents
 * @param timeframeYears Timeframe for ROI calculation in years
 * @returns Object containing ROI metrics
 */
export function calculateSecurityROI(
  securityCost: number,
  riskReduction: number,
  potentialLoss: number,
  timeframeYears: number = 3
): {
  roi: number;
  roiPercentage: string;
  paybackPeriodMonths: number;
  costAvoidance: number;
} {
  // Calculate cost avoidance based on risk reduction
  const annualCostAvoidance = potentialLoss * (riskReduction / 100);
  const totalCostAvoidance = annualCostAvoidance * timeframeYears;

  // Calculate ROI
  const roi = (totalCostAvoidance - securityCost) / securityCost;
  const roiPercentage = `${Math.round(roi * 100)}%`;

  // Calculate payback period in months
  const paybackPeriodMonths = (securityCost / annualCostAvoidance) * 12;

  return {
    roi,
    roiPercentage,
    paybackPeriodMonths: Math.round(paybackPeriodMonths * 10) / 10, // Round to 1 decimal
    costAvoidance: totalCostAvoidance,
  };
}

/**
 * Get recommended budget allocation for security implementation
 *
 * @param totalBudget Total security budget
 * @param availabilityLevel Availability security level
 * @param integrityLevel Integrity security level
 * @param confidentialityLevel Confidentiality security level
 * @returns Object containing budget allocations
 */
export function getRecommendedBudgetAllocation(
  totalBudget: number,
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): {
  availability: number;
  integrity: number;
  confidentiality: number;
} {
  // Get security level values (0-4)
  const levelValues = {
    None: 0,
    Low: 1,
    Moderate: 2,
    High: 3,
    "Very High": 4,
  };

  // Calculate proportional allocation based on security level values
  const availabilityValue = levelValues[availabilityLevel];
  const integrityValue = levelValues[integrityLevel];
  const confidentialityValue = levelValues[confidentialityLevel];
  const totalValue = availabilityValue + integrityValue + confidentialityValue;

  // Prevent division by zero
  if (totalValue === 0) {
    return {
      availability: totalBudget / 3,
      integrity: totalBudget / 3,
      confidentiality: totalBudget / 3,
    };
  }

  // Allocate budget proportionally
  return {
    availability: Math.round((availabilityValue / totalValue) * totalBudget),
    integrity: Math.round((integrityValue / totalValue) * totalBudget),
    confidentiality: Math.round(
      (confidentialityValue / totalValue) * totalBudget
    ),
  };
}
