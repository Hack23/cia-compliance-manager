import { SecurityLevel } from "../../types/cia";

/**
 * Standard test data for security levels
 */
export const TEST_SECURITY_LEVELS: SecurityLevel[] = [
  "None",
  "Low",
  "Moderate",
  "High",
  "Very High",
];

/**
 * Test data for CIA options
 */
export const TEST_CIA_OPTIONS = {
  availabilityOptions: {
    None: {
      description: "Test None description",
      technical: "Test None technical",
      businessImpact: "Test None business impact",
      recommendations: ["Recommendation 1", "Recommendation 2"],
      capex: 0,
      opex: 0,
    },
    Low: {
      description: "Test Low description",
      technical: "Test Low technical",
      businessImpact: "Test Low business impact",
      recommendations: ["Recommendation 1", "Recommendation 2"],
      capex: 5,
      opex: 2,
      uptime: "95%",
    },
    Moderate: {
      description: "Test Moderate description",
      technical: "Test Moderate technical",
      businessImpact: "Test Moderate business impact",
      recommendations: ["Recommendation 1", "Recommendation 2"],
      capex: 10,
      opex: 5,
      uptime: "99%",
    },
    High: {
      description: "Test High description",
      technical: "Test High technical",
      businessImpact: "Test High business impact",
      recommendations: ["Recommendation 1", "Recommendation 2"],
      capex: 20,
      opex: 10,
      uptime: "99.9%",
    },
    "Very High": {
      description: "Test Very High description",
      technical: "Test Very High technical",
      businessImpact: "Test Very High business impact",
      recommendations: ["Recommendation 1", "Recommendation 2"],
      capex: 40,
      opex: 20,
      uptime: "99.99%",
    },
  },
  // Similar structure for integrity and confidentiality options
  integrityOptions: {
    // Same structure as availabilityOptions
    None: {
      capex: 0,
      opex: 0,
      description: "Test",
      technical: "Test",
      businessImpact: "Test",
      recommendations: [],
    },
    Low: {
      capex: 5,
      opex: 2,
      description: "Test",
      technical: "Test",
      businessImpact: "Test",
      recommendations: [],
    },
    Moderate: {
      capex: 10,
      opex: 5,
      description: "Test",
      technical: "Test",
      businessImpact: "Test",
      recommendations: [],
    },
    High: {
      capex: 20,
      opex: 10,
      description: "Test",
      technical: "Test",
      businessImpact: "Test",
      recommendations: [],
    },
    "Very High": {
      capex: 40,
      opex: 20,
      description: "Test",
      technical: "Test",
      businessImpact: "Test",
      recommendations: [],
    },
  },
  confidentialityOptions: {
    // Same structure as availabilityOptions
    None: {
      capex: 0,
      opex: 0,
      description: "Test",
      technical: "Test",
      businessImpact: "Test",
      recommendations: [],
    },
    Low: {
      capex: 5,
      opex: 2,
      description: "Test",
      technical: "Test",
      businessImpact: "Test",
      recommendations: [],
    },
    Moderate: {
      capex: 10,
      opex: 5,
      description: "Test",
      technical: "Test",
      businessImpact: "Test",
      recommendations: [],
    },
    High: {
      capex: 20,
      opex: 10,
      description: "Test",
      technical: "Test",
      businessImpact: "Test",
      recommendations: [],
    },
    "Very High": {
      capex: 40,
      opex: 20,
      description: "Test",
      technical: "Test",
      businessImpact: "Test",
      recommendations: [],
    },
  },
  ROI_ESTIMATES: {
    NONE: { returnRate: "0%", description: "No ROI" },
    LOW: { returnRate: "50%", description: "Low ROI" },
    MODERATE: { returnRate: "200%", description: "Moderate ROI" },
    HIGH: { returnRate: "350%", description: "High ROI" },
    VERY_HIGH: { returnRate: "500%", description: "Very high ROI" },
  },
};

/**
 * Creates mock test data for business impact details
 */
export function createMockBusinessImpact(overrides = {}) {
  return {
    summary: "Test business impact summary",
    financial: {
      description: "Test financial impact",
      riskLevel: "Medium",
    },
    operational: {
      description: "Test operational impact",
      riskLevel: "Low",
    },
    ...overrides,
  };
}
