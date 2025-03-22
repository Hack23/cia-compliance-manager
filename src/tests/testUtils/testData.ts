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
    None: {
      capex: 0,
      opex: 0,
      description: "Test None integrity description",
      technical: "Test None integrity technical",
      businessImpact: "Test None integrity business impact",
      recommendations: [
        "Implement basic input validation",
        "Add data validation checks",
      ],
    },
    Low: {
      capex: 5,
      opex: 2,
      description: "Test Low integrity description",
      technical: "Test Low integrity technical",
      businessImpact: "Test Low integrity business impact",
      recommendations: ["Add checksums", "Implement basic error checking"],
      validationMethod: "Manual validation",
    },
    Moderate: {
      capex: 10,
      opex: 5,
      description: "Test Moderate integrity description",
      technical: "Test Moderate integrity technical",
      businessImpact: "Test Moderate integrity business impact",
      recommendations: [
        "Implement automated validation",
        "Add comprehensive checks",
      ],
      validationMethod: "Automated validation",
    },
    High: {
      capex: 20,
      opex: 10,
      description: "Test High integrity description",
      technical: "Test High integrity technical",
      businessImpact: "Test High integrity business impact",
      recommendations: [
        "Implement cryptographic verification",
        "Add hash validation",
      ],
      validationMethod: "Cryptographic verification",
    },
    "Very High": {
      capex: 40,
      opex: 20,
      description: "Test Very High integrity description",
      technical: "Test Very High integrity technical",
      businessImpact: "Test Very High integrity business impact",
      recommendations: [
        "Implement blockchain validation",
        "Add distributed ledger",
      ],
      validationMethod: "Distributed ledger validation",
    },
  },
  confidentialityOptions: {
    None: {
      capex: 0,
      opex: 0,
      description: "Test None confidentiality description",
      technical: "Test None confidentiality technical",
      businessImpact: "Test None confidentiality business impact",
      recommendations: [
        "Implement basic access controls",
        "Define user permissions",
      ],
    },
    Low: {
      capex: 5,
      opex: 2,
      description: "Test Low confidentiality description",
      technical: "Test Low confidentiality technical",
      businessImpact: "Test Low confidentiality business impact",
      recommendations: ["Add basic encryption", "Implement access controls"],
      securityControls: "Basic access control",
    },
    Moderate: {
      capex: 10,
      opex: 5,
      description: "Test Moderate confidentiality description",
      technical: "Test Moderate confidentiality technical",
      businessImpact: "Test Moderate confidentiality business impact",
      recommendations: ["Implement RBAC", "Add standard encryption"],
      securityControls: "RBAC and standard encryption",
    },
    High: {
      capex: 20,
      opex: 10,
      description: "Test High confidentiality description",
      technical: "Test High confidentiality technical",
      businessImpact: "Test High confidentiality business impact",
      recommendations: ["Implement E2E encryption", "Add MFA and monitoring"],
      securityControls: "E2E encryption with MFA",
    },
    "Very High": {
      capex: 40,
      opex: 20,
      description: "Test Very High confidentiality description",
      technical: "Test Very High confidentiality technical",
      businessImpact: "Test Very High confidentiality business impact",
      recommendations: [
        "Implement zero-trust architecture",
        "Add military-grade encryption",
      ],
      securityControls:
        "Zero-trust architecture with military-grade encryption",
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
