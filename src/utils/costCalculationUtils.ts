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

// Export the types so they can be imported elsewhere
export type OrganizationSize = "small" | "medium" | "large" | "enterprise";
export type Industry =
  | "general"
  | "financial"
  | "healthcare"
  | "government"
  | "retail"
  | "technology"
  | "manufacturing";

interface CostResult {
  capex: number;
  opex: number;
}

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
function normalizeSecurityLevel(
  level: string | SecurityLevel | undefined
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
 * Calculate implementation cost based on security level
 */
export function calculateImplementationCost(
  securityLevel: SecurityLevel | string, // Allow string for more flexible inputs
  orgSize: OrganizationSize = "medium",
  industry: Industry = "general"
): CostResult {
  // Normalize the security level and handle case variations
  const normalizedLevel = normalizeSecurityLevel(securityLevel);

  // Get base costs for the normalized level
  const baseCosts = BASE_IMPLEMENTATION_COSTS[normalizedLevel] || {
    capex: 0,
    opex: 0,
  };

  // Get scaling factors
  const sizeFactor = getSizeFactor(orgSize);
  const industryFactor = getIndustryFactor(industry);

  // Apply factors to base costs
  return {
    capex: Math.round(baseCosts.capex * sizeFactor * industryFactor),
    opex: Math.round(baseCosts.opex * sizeFactor * industryFactor),
  };
}

/**
 * Calculate total security costs across all CIA components
 */
export function calculateTotalSecurityCost(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel,
  orgSize: OrganizationSize = "medium",
  industry: Industry = "general"
): {
  availabilityCost: CostResult;
  integrityCost: CostResult;
  confidentialityCost: CostResult;
  totalCapex: number;
  totalOpex: number;
  totalCost: number;
} {
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

  const totalCapex =
    availabilityCost.capex + integrityCost.capex + confidentialityCost.capex;
  const totalOpex =
    availabilityCost.opex + integrityCost.opex + confidentialityCost.opex;

  return {
    availabilityCost,
    integrityCost,
    confidentialityCost,
    totalCapex,
    totalOpex,
    totalCost: totalCapex + totalOpex,
  };
}

/**
 * Calculate security ROI
 */
export function calculateSecurityROI(
  securityCost: number,
  riskReductionPercent: number,
  potentialLoss: number,
  timeframeYears: number = 3
): {
  roi: number;
  roiPercentage: string;
  paybackPeriodMonths: number;
  costAvoidance: number;
} {
  // Risk reduction as decimal
  const riskReduction = riskReductionPercent / 100;

  // Annual cost avoidance
  const annualCostAvoidance = potentialLoss * riskReduction;

  // Total cost avoidance over timeframe
  const costAvoidance = annualCostAvoidance * timeframeYears;

  // ROI calculation
  let roi = 0;
  if (securityCost > 0) {
    roi = (costAvoidance - securityCost) / securityCost;
  } else {
    roi = costAvoidance > 0 ? Infinity : 0;
  }

  // ROI as percentage
  const roiPercentage = `${Math.round(roi * 100)}%`;

  // Payback period in months - Fix floating-point precision by rounding to 1 decimal
  let paybackPeriodMonths = 0;
  if (annualCostAvoidance > 0) {
    // Use toFixed(1) and convert back to number to avoid floating-point precision issues
    paybackPeriodMonths = Number(
      ((securityCost / annualCostAvoidance) * 12).toFixed(1)
    );
  } else {
    paybackPeriodMonths = Infinity;
  }

  return {
    roi,
    roiPercentage,
    paybackPeriodMonths,
    costAvoidance,
  };
}

/**
 * Get recommended budget allocation based on security levels
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
  // Convert security levels to numeric values
  const availabilityValue = getSecurityLevelValue(availabilityLevel);
  const integrityValue = getSecurityLevelValue(integrityLevel);
  const confidentialityValue = getSecurityLevelValue(confidentialityLevel);

  const totalValue = availabilityValue + integrityValue + confidentialityValue;

  if (totalValue === 0) {
    // If all None, divide equally
    return {
      availability: Math.round(totalBudget / 3),
      integrity: Math.round(totalBudget / 3),
      confidentiality: Math.round(totalBudget / 3),
    };
  }

  // Allocate proportionally
  const availabilityBudget = Math.round(
    (availabilityValue / totalValue) * totalBudget
  );
  const integrityBudget = Math.round(
    (integrityValue / totalValue) * totalBudget
  );
  const confidentialityBudget = Math.round(
    (confidentialityValue / totalValue) * totalBudget
  );

  return {
    availability: availabilityBudget,
    integrity: integrityBudget,
    confidentiality: confidentialityBudget,
  };
}

// Helper functions

function getSizeFactor(size?: OrganizationSize): number {
  return (
    ORG_SIZE_MULTIPLIERS[size as OrganizationSize] ||
    ORG_SIZE_MULTIPLIERS.medium
  );
}

function getIndustryFactor(industry?: Industry): number {
  return (
    INDUSTRY_COST_FACTORS[industry as Industry] || INDUSTRY_COST_FACTORS.general
  );
}

function getSecurityLevelValue(level: SecurityLevel): number {
  switch (level) {
    case "None":
      return 0;
    case "Low":
      return 1;
    case "Moderate":
      return 2;
    case "High":
      return 3;
    case "Very High":
      return 4;
    default:
      return 0;
  }
}
