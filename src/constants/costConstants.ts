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
