import { SecurityLevel } from "../types/cia";

/**
 * Cost-related constants for CIA Compliance Management
 *
 * ## Business Perspective
 *
 * These constants help standardize cost calculations across the application,
 * ensuring that security investments can be properly estimated and budgeted. 💰
 */

/**
 * Default cost estimation parameters
 */
export const DEFAULT_COST_PARAMS = {
  // Default organization size for cost calculations
  DEFAULT_ORG_SIZE: "medium",

  // Default industry for cost calculations
  DEFAULT_INDUSTRY: "general",

  // Default currency for displaying costs
  DEFAULT_CURRENCY: "USD",

  // Default implementation timeframe in months
  DEFAULT_TIMEFRAME: 6,
};

/**
 * Cost multipliers based on organization size
 */
export const ORGANIZATION_SIZE_MULTIPLIERS = {
  small: 0.5, // Smaller organizations have lower implementation costs
  medium: 1.0, // Base multiplier
  large: 2.0, // Larger organizations have higher implementation costs
  enterprise: 4.0, // Enterprise-scale implementations are substantially more expensive
};

/**
 * Industry-specific cost factors that adjust implementation costs
 */
export const INDUSTRY_COST_FACTORS = {
  healthcare: 1.5, // Higher regulatory requirements
  finance: 1.7, // Stringent security requirements
  government: 1.3, // Procurement complexity
  retail: 1.1, // PCI DSS considerations
  technology: 1.0, // Baseline
  manufacturing: 0.9, // Lower regulatory burden
  general: 1.0, // Default for unspecified industries
};

/**
 * Base implementation costs (in USD) for each security level
 */
export const BASE_IMPLEMENTATION_COSTS = {
  None: {
    capex: 0,
    opex: 0,
    fte: 0,
  },
  Low: {
    capex: 25000,
    opex: 10000,
    fte: 0.25,
  },
  Moderate: {
    capex: 100000,
    opex: 50000,
    fte: 1,
  },
  High: {
    capex: 250000,
    opex: 125000,
    fte: 2,
  },
  "Very High": {
    capex: 500000,
    opex: 250000,
    fte: 4,
  },
};

/**
 * Cost distribution across CIA components (percentages)
 */
export const COST_DISTRIBUTION = {
  availability: {
    infrastructure: 60,
    software: 20,
    personnel: 20,
  },
  integrity: {
    infrastructure: 30,
    software: 50,
    personnel: 20,
  },
  confidentiality: {
    infrastructure: 35,
    software: 40,
    personnel: 25,
  },
};

/**
 * Currency formatting options
 */
export const CURRENCY_OPTIONS = {
  USD: { symbol: "$", locale: "en-US" },
  EUR: { symbol: "€", locale: "de-DE" },
  GBP: { symbol: "£", locale: "en-GB" },
  JPY: { symbol: "¥", locale: "ja-JP" },
};

/**
 * Time-to-implement estimates (in months) for each security level
 */
export const IMPLEMENTATION_TIMEFRAMES = {
  None: 0,
  Low: 1,
  Moderate: 3,
  High: 6,
  "Very High": 12,
};

/**
 * Return on Investment calculations
 */
export const ROI_CALCULATION_FACTORS = {
  breachProbabilityReduction: {
    None: 0.0,
    Low: 0.3,
    Moderate: 0.6,
    High: 0.85,
    "Very High": 0.95,
  },
  averageBreachCosts: {
    small: 120000,
    medium: 2500000,
    large: 6500000,
    enterprise: 15000000,
  },
};

/**
 * Budget scale for cost calculations
 * Higher numbers mean higher cost multiplier
 */
export const BUDGET_SCALE = {
  SMALL: 1,
  MEDIUM: 5,
  LARGE: 10,
  ENTERPRISE: 25,
};

/**
 * Cost categories
 */
export const COST_CATEGORIES = {
  CAPEX: "Capital Expenditure",
  OPEX: "Operational Expenditure",
  TOTAL: "Total Cost of Ownership",
  ROI: "Return on Investment",
};

/**
 * Typical cost components for security implementations
 */
export const COST_COMPONENTS = {
  HARDWARE: "Hardware",
  SOFTWARE: "Software",
  SERVICES: "Professional Services",
  LICENSING: "Licensing",
  TRAINING: "Training",
  MAINTENANCE: "Maintenance",
  SUPPORT: "Support",
  STAFFING: "Staffing",
  OVERHEAD: "Overhead",
};

/**
 * CAPEX cost ratio for each security level
 * Used for calculating implementation costs
 */
export const SECURITY_LEVEL_CAPEX: Record<SecurityLevel, number> = {
  None: 0,
  Low: 5,
  Moderate: 10,
  High: 15,
  "Very High": 20,
};

/**
 * OPEX cost ratio for each security level
 * Used for calculating ongoing maintenance costs
 */
export const SECURITY_LEVEL_OPEX: Record<SecurityLevel, number> = {
  None: 0,
  Low: 2,
  Moderate: 5,
  High: 8,
  "Very High": 10,
};

/**
 * Implementation time (in months) for each security level
 */
export const IMPLEMENTATION_TIME: Record<SecurityLevel, number> = {
  None: 0,
  Low: 1,
  Moderate: 2.5,
  High: 4,
  "Very High": 6,
};

/**
 * Resource requirement scaling factor for each security level
 */
export const RESOURCE_SCALE: Record<SecurityLevel, number> = {
  None: 0,
  Low: 1,
  Moderate: 2,
  High: 3,
  "Very High": 4,
};

/**
 * Calculation constants
 */
export const CALCULATION_CONSTANTS = {
  MONTHS_PER_YEAR: 12,
  STANDARD_TCO_YEARS: 3,
  BASE_COST_UNIT: 5000, // Base cost unit for calculations in currency units
  ROI_TIMEFRAME_YEARS: 5, // Years to calculate ROI over
};

/**
 * Format currency for display
 *
 * @param amount - Amount to format
 * @param currency - Currency code
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format percentage for display
 *
 * @param value - Value to format
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(0)}%`;
}

/**
 * Calculate total CAPEX for all components
 *
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns Total CAPEX value
 */
export function calculateTotalCapex(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): number {
  return (
    SECURITY_LEVEL_CAPEX[availabilityLevel] +
    SECURITY_LEVEL_CAPEX[integrityLevel] +
    SECURITY_LEVEL_CAPEX[confidentialityLevel]
  );
}

/**
 * Calculate total OPEX for all components
 *
 * @param availabilityLevel - Availability security level
 * @param integrityLevel - Integrity security level
 * @param confidentialityLevel - Confidentiality security level
 * @returns Total OPEX value
 */
export function calculateTotalOpex(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): number {
  return (
    SECURITY_LEVEL_OPEX[availabilityLevel] +
    SECURITY_LEVEL_OPEX[integrityLevel] +
    SECURITY_LEVEL_OPEX[confidentialityLevel]
  );
}
