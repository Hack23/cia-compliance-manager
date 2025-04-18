import { CIADataProvider } from "../types/cia-services";

/**
 * Creates a default data provider with mock data
 *
 * @returns A CIADataProvider instance with default data
 */
export function createDefaultDataProvider(): CIADataProvider {
  return {
    // Mock component options for availability
    availabilityOptions: {
      None: {
        description: "No availability guarantees",
        technical: "No specific availability measures in place",
        businessImpact:
          "Business operations may experience frequent disruptions",
        capex: 0,
        opex: 0,
        bg: "",
        text: "",
        recommendations: [],
      },
      Low: {
        description: "Basic availability",
        technical: "Single server deployment with basic backup",
        businessImpact:
          "May experience occasional downtime with recovery within 24-48 hours",
        capex: 5000,
        opex: 1000,
        bg: "",
        text: "",
        recommendations: [
          "Implement basic monitoring",
          "Create backup procedures",
        ],
      },
      Moderate: {
        description: "Standard availability",
        technical: "Server redundancy within a single location",
        businessImpact: "Limited downtime with recovery within 4-8 hours",
        capex: 15000,
        opex: 3000,
        bg: "",
        text: "",
        recommendations: [
          "Add redundant infrastructure",
          "Implement automated backups",
        ],
      },
      High: {
        description: "Enhanced availability",
        technical: "Multi-site redundancy with active-passive configuration",
        businessImpact: "Minimal downtime with recovery within 15-60 minutes",
        capex: 40000,
        opex: 8000,
        bg: "",
        text: "",
        recommendations: [
          "Deploy multi-region infrastructure",
          "Implement automated failover",
        ],
      },
      "Very High": {
        description: "Maximum availability",
        technical:
          "Global multi-site redundancy with active-active configuration",
        businessImpact:
          "Near-continuous operations with recovery within minutes",
        capex: 100000,
        opex: 20000,
        bg: "",
        text: "",
        recommendations: [
          "Implement global load balancing",
          "Deploy distributed architecture",
        ],
      },
    },

    // Mock component options for integrity
    integrityOptions: {
      None: {
        description: "No data integrity controls",
        technical: "No validation or checking of data",
        businessImpact: "High risk of data corruption and errors",
        capex: 0,
        opex: 0,
        bg: "",
        text: "",
        recommendations: [],
      },
      Low: {
        description: "Basic integrity checks",
        technical: "Basic input validation and error checking",
        businessImpact: "Reduced but still significant risk of data errors",
        capex: 5000,
        opex: 1000,
        bg: "",
        text: "",
        recommendations: [
          "Implement basic input validation",
          "Add error logging",
        ],
      },
      Moderate: {
        description: "Standard integrity controls",
        technical: "Comprehensive validation and error handling",
        businessImpact: "Moderate protection against data corruption",
        capex: 15000,
        opex: 3000,
        bg: "",
        text: "",
        recommendations: [
          "Implement data validation framework",
          "Add data quality monitoring",
        ],
      },
      High: {
        description: "Enhanced integrity controls",
        technical: "Cryptographic verification and advanced validation",
        businessImpact: "Strong protection against data corruption",
        capex: 35000,
        opex: 7000,
        bg: "",
        text: "",
        recommendations: [
          "Implement digital signatures",
          "Deploy integrity monitoring",
        ],
      },
      "Very High": {
        description: "Maximum integrity controls",
        technical: "Blockchain or immutable ledger technologies",
        businessImpact: "Highest level of protection against data tampering",
        capex: 90000,
        opex: 18000,
        bg: "",
        text: "",
        recommendations: [
          "Implement immutable audit logs",
          "Deploy blockchain technology",
        ],
      },
    },

    // Mock component options for confidentiality
    confidentialityOptions: {
      None: {
        description: "No confidentiality controls",
        technical: "No encryption or access controls",
        businessImpact: "Data is openly accessible to anyone",
        capex: 0,
        opex: 0,
        bg: "",
        text: "",
        recommendations: [],
      },
      Low: {
        description: "Basic confidentiality",
        technical: "Basic access controls and limited encryption",
        businessImpact: "Basic protection for non-sensitive data",
        capex: 5000,
        opex: 1000,
        bg: "",
        text: "",
        recommendations: [
          "Implement basic authentication",
          "Add access controls",
        ],
      },
      Moderate: {
        description: "Standard confidentiality",
        technical: "Role-based access control and data-at-rest encryption",
        businessImpact: "Adequate protection for most business data",
        capex: 20000,
        opex: 4000,
        bg: "",
        text: "",
        recommendations: ["Implement RBAC", "Deploy data-at-rest encryption"],
      },
      High: {
        description: "Enhanced confidentiality",
        technical: "End-to-end encryption and multi-factor authentication",
        businessImpact: "Strong protection for sensitive data",
        capex: 45000,
        opex: 9000,
        bg: "",
        text: "",
        recommendations: ["Implement E2E encryption", "Deploy MFA"],
      },
      "Very High": {
        description: "Maximum confidentiality",
        technical: "Zero-trust architecture with advanced encryption",
        businessImpact: "Highest level of protection for critical data",
        capex: 110000,
        opex: 22000,
        bg: "",
        text: "",
        recommendations: [
          "Implement zero-trust architecture",
          "Deploy homomorphic encryption",
        ],
      },
    },

    // Mock ROI estimates
    roiEstimates: {
      NONE: { returnRate: "0%", description: "No ROI" },
      LOW: { returnRate: "50%", description: "Low ROI" },
      MODERATE: { returnRate: "150%", description: "Moderate ROI" },
      HIGH: { returnRate: "250%", description: "High ROI" },
      VERY_HIGH: { returnRate: "400%", description: "Very High ROI" },
    },
  };
}
