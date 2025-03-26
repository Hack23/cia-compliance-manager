import { SecurityLevel } from "../../types/cia";

/**
 * Standard mock security levels to use across tests
 */
export const TEST_SECURITY_LEVELS: SecurityLevel[] = [
  "None",
  "Low",
  "Moderate",
  "High",
  "Very High",
];

/**
 * Default mock options for security level testing
 *
 * ## Business Perspective
 *
 * This provides consistent security options across tests, ensuring
 * predictable testing of security level classifications and
 * maintaining alignment with business requirements. 🔒
 */
export const DEFAULT_MOCK_OPTIONS = {
  None: {
    description: "No security controls",
    technical: "No technical controls implemented",
    businessImpact: "Critical business impact",
    capex: 0,
    opex: 0,
    bg: "#ffffff",
    text: "#000000",
    recommendations: [],
  },
  Low: {
    description: "Basic security controls",
    technical: "Basic technical controls",
    businessImpact: "High business impact",
    capex: 5,
    opex: 2,
    bg: "#f8d7da",
    text: "#721c24",
    recommendations: ["Basic recommendation"],
  },
  Moderate: {
    description: "Standard security controls",
    technical: "Standard technical controls",
    businessImpact: "Medium business impact",
    capex: 10,
    opex: 5,
    bg: "#fff3cd",
    text: "#856404",
    recommendations: ["Standard recommendation"],
  },
  High: {
    description: "Advanced security controls",
    technical: "Advanced technical controls",
    businessImpact: "Low business impact",
    capex: 15,
    opex: 8,
    bg: "#d4edda",
    text: "#155724",
    recommendations: ["Advanced recommendation"],
  },
  "Very High": {
    description: "Maximum security controls",
    technical: "Maximum technical controls",
    businessImpact: "Minimal business impact",
    capex: 20,
    opex: 10,
    bg: "#cce5ff",
    text: "#004085",
    recommendations: ["Maximum recommendation"],
  },
};

/**
 * Default mock ROI estimates
 */
export const DEFAULT_ROI_ESTIMATES = {
  NONE: { returnRate: "0%", description: "No ROI", value: "0%" },
  LOW: { returnRate: "50%", description: "Low ROI", value: "50%" },
  MODERATE: {
    returnRate: "150%",
    description: "Moderate ROI",
    value: "150%",
  },
  HIGH: { returnRate: "300%", description: "High ROI", value: "300%" },
  VERY_HIGH: {
    returnRate: "500%",
    description: "Very high ROI",
    value: "500%",
  },
};

/**
 * Default security icons mapping
 */
export const DEFAULT_SECURITY_ICONS: Record<SecurityLevel, string> = {
  None: "⚠️",
  Low: "🔑",
  Moderate: "🔓",
  High: "🔒",
  "Very High": "🔐",
};

/**
 * Default mock data provider that can be used in tests
 */
export function createMockDataProvider() {
  return {
    availabilityOptions: DEFAULT_MOCK_OPTIONS,
    integrityOptions: DEFAULT_MOCK_OPTIONS,
    confidentialityOptions: DEFAULT_MOCK_OPTIONS,
    roiEstimates: DEFAULT_ROI_ESTIMATES,
    getDefaultSecurityIcon: (level: SecurityLevel) =>
      DEFAULT_SECURITY_ICONS[level] || "❓",
    getDefaultValuePoints: (level: SecurityLevel) => {
      return level === "None" ? [] : [`Test value point for ${level}`];
    },
  };
}
