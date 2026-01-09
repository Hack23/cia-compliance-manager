import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import { CIADataProvider } from "../types/cia-services";
import { createTestDataProvider } from "./testDataProvider";

describe("TestDataProvider", () => {
  let dataProvider: CIADataProvider;

  beforeEach(() => {
    dataProvider = createTestDataProvider();
  });

  describe("Structure", () => {
    it("should return an object with required CIADataProvider properties", () => {
      expect(dataProvider).toBeDefined();
      expect(dataProvider.availabilityOptions).toBeDefined();
      expect(dataProvider.integrityOptions).toBeDefined();
      expect(dataProvider.confidentialityOptions).toBeDefined();
      expect(dataProvider.roiEstimates).toBeDefined();
      expect(typeof dataProvider.getDefaultSecurityIcon).toBe("function");
      expect(typeof dataProvider.getDefaultValuePoints).toBe("function");
    });
  });

  describe("Availability Options", () => {
    const securityLevels: SecurityLevel[] = [
      "None",
      "Low",
      "Moderate",
      "High",
      "Very High",
    ];

    it("should have entries for all security levels", () => {
      securityLevels.forEach((level) => {
        expect(dataProvider.availabilityOptions[level]).toBeDefined();
      });
    });

    it("should have required properties for each security level", () => {
      securityLevels.forEach((level) => {
        const availOption = dataProvider.availabilityOptions[level];
        expect(availOption.description).toBeTruthy();
        expect(availOption.technical).toBeTruthy();
        expect(availOption.businessImpact).toBeTruthy();
        expect(typeof availOption.capex).toBe("number");
        expect(typeof availOption.opex).toBe("number");
        expect(availOption.bg).toBeTruthy();
        expect(availOption.text).toBeTruthy();
        expect(Array.isArray(availOption.recommendations)).toBe(true);
      });
    });

    it("should include availability-specific metrics", () => {
      securityLevels.forEach((level) => {
        const availOption = dataProvider.availabilityOptions[level];
        expect(availOption.uptime).toBeTruthy();
        expect(availOption.rto).toBeTruthy();
        expect(availOption.rpo).toBeTruthy();
        expect(availOption.mttr).toBeTruthy();
      });
    });

    it("should include businessImpactDetails with required properties", () => {
      securityLevels.forEach((level) => {
        const availOption = dataProvider.availabilityOptions[level];
        expect(availOption.businessImpactDetails).toBeDefined();
        expect(
          availOption.businessImpactDetails?.financialImpact
        ).toBeDefined();
        expect(
          availOption.businessImpactDetails?.operationalImpact
        ).toBeDefined();
      });
    });

    it("should include technicalImplementation details", () => {
      securityLevels.forEach((level) => {
        const availOption = dataProvider.availabilityOptions[level];
        expect(availOption.technicalImplementation).toBeDefined();
        expect(availOption.technicalImplementation?.description).toBeTruthy();
        expect(
          Array.isArray(
            availOption.technicalImplementation?.implementationSteps
          )
        ).toBe(true);
        expect(availOption.technicalImplementation?.effort).toBeDefined();
      });
    });
  });

  describe("Integrity Options", () => {
    const securityLevels: SecurityLevel[] = [
      "None",
      "Low",
      "Moderate",
      "High",
      "Very High",
    ];

    it("should have entries for all security levels", () => {
      securityLevels.forEach((level) => {
        expect(dataProvider.integrityOptions[level]).toBeDefined();
      });
    });

    it("should include integrity-specific properties", () => {
      securityLevels.forEach((level) => {
        const integrityOption = dataProvider.integrityOptions[level];
        expect(integrityOption.validationMethod).toBeTruthy();
      });

      // Verify specific validation methods for different levels
      expect(dataProvider.integrityOptions.None.validationMethod).toBe("None");
      expect(dataProvider.integrityOptions.Low.validationMethod).toBe(
        "Manual checks"
      );
      expect(dataProvider.integrityOptions.Moderate.validationMethod).toBe(
        "Automated validation"
      );
      expect(dataProvider.integrityOptions.High.validationMethod).toBe(
        "Cryptographic verification"
      );
      expect(dataProvider.integrityOptions["Very High"].validationMethod).toBe(
        "Blockchain/distributed ledger"
      );
    });
  });

  describe("Confidentiality Options", () => {
    const securityLevels: SecurityLevel[] = [
      "None",
      "Low",
      "Moderate",
      "High",
      "Very High",
    ];

    it("should have entries for all security levels", () => {
      securityLevels.forEach((level) => {
        expect(dataProvider.confidentialityOptions[level]).toBeDefined();
      });
    });

    it("should include confidentiality-specific properties", () => {
      securityLevels.forEach((level) => {
        const confidentialityOption =
          dataProvider.confidentialityOptions[level];
        expect(confidentialityOption.protectionMethod).toBeTruthy();
      });

      // Verify specific protection methods for different levels
      expect(dataProvider.confidentialityOptions.None.protectionMethod).toBe(
        "None"
      );
      expect(dataProvider.confidentialityOptions.Low.protectionMethod).toBe(
        "Basic access control"
      );
      expect(
        dataProvider.confidentialityOptions.Moderate.protectionMethod
      ).toBe("Standard encryption");
      expect(dataProvider.confidentialityOptions.High.protectionMethod).toBe(
        "E2E encryption"
      );
      expect(
        dataProvider.confidentialityOptions["Very High"].protectionMethod
      ).toBe("Military-grade encryption with zero-trust");
    });

    it("should include reputational impact for confidentiality", () => {
      securityLevels.forEach((level) => {
        const confidentialityOption =
          dataProvider.confidentialityOptions[level];
        expect(
          confidentialityOption.businessImpactDetails?.reputationalImpact
        ).toBeDefined();
      });
    });
  });

  describe("ROI Estimates", () => {
    it("should include entries for all security levels", () => {
      expect(dataProvider.roiEstimates.NONE).toBeDefined();
      expect(dataProvider.roiEstimates.LOW).toBeDefined();
      expect(dataProvider.roiEstimates.MODERATE).toBeDefined();
      expect(dataProvider.roiEstimates.HIGH).toBeDefined();
      expect(dataProvider.roiEstimates.VERY_HIGH).toBeDefined();
    });

    it("should include required properties for each ROI estimate", () => {
      const levels = ["NONE", "LOW", "MODERATE", "HIGH", "VERY_HIGH"] as const;

      levels.forEach((level) => {
        const roiEstimate = dataProvider.roiEstimates[level];
        expect(roiEstimate.returnRate).toBeTruthy();
        expect(roiEstimate.description).toBeTruthy();
        expect(roiEstimate.potentialSavings).toBeTruthy();
        expect(roiEstimate.breakEvenPeriod).toBeTruthy();
      });
    });

    it("should have appropriate values for different ROI levels", () => {
      const dataProvider = createTestDataProvider();
      const roiEstimates = dataProvider.roiEstimates;
      
      expect(roiEstimates.NONE.returnRate).toMatch(/^\d+%$|^0%$/);
      expect(roiEstimates.LOW.returnRate).toMatch(/^\d+%$/);
      
      // Verify tiers have increasing values
      const noneValue = parseInt(roiEstimates.NONE.returnRate);
      const lowValue = parseInt(roiEstimates.LOW.returnRate);
      const moderateValue = parseInt(roiEstimates.MODERATE.returnRate);
      const highValue = parseInt(roiEstimates.HIGH.returnRate);
      
      // Expect increasing values or equal values
      expect(lowValue).toBeGreaterThanOrEqual(noneValue);
      expect(moderateValue).toBeGreaterThanOrEqual(lowValue);
      expect(highValue).toBeGreaterThanOrEqual(moderateValue);
    });
  });

  describe("Utility Functions", () => {
    it("should return appropriate security icons", () => {
      // Fix the type error by checking if the function exists first
      expect(dataProvider.getDefaultSecurityIcon?.("None")).toBe("⚠️");
      expect(dataProvider.getDefaultSecurityIcon?.("Low")).toBe("🔑");
      expect(dataProvider.getDefaultSecurityIcon?.("Moderate")).toBe("🔓");
      expect(dataProvider.getDefaultSecurityIcon?.("High")).toBe("🔒");
      expect(dataProvider.getDefaultSecurityIcon?.("Very High")).toBe("🔐");
    });

    it("should return value points for all security levels", () => {
      const securityLevels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];

      securityLevels.forEach((level) => {
        // Use optional chaining to avoid "possibly undefined" errors
        const valuePoints = dataProvider.getDefaultValuePoints?.(level) || [];
        expect(Array.isArray(valuePoints)).toBe(true);
        expect(valuePoints.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Data Consistency", () => {
    it("should have consistent risk levels across all security levels", () => {
      const securityLevels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];

      securityLevels.forEach((level) => {
        const expectedRiskLevel = {
          None: "Critical",
          Low: "High",
          Moderate: "Medium",
          High: "Low",
          "Very High": "Minimal",
        }[level];

        // Check availability risk level
        expect(
          dataProvider.availabilityOptions[level].businessImpactDetails
            ?.financialImpact?.riskLevel
        ).toBe(expectedRiskLevel);

        // Check integrity risk level
        expect(
          dataProvider.integrityOptions[level].businessImpactDetails
            ?.financialImpact?.riskLevel
        ).toBe(expectedRiskLevel);

        // Check confidentiality risk level
        expect(
          dataProvider.confidentialityOptions[level].businessImpactDetails
            ?.reputationalImpact?.riskLevel
        ).toBe(expectedRiskLevel);
      });
    });

    it("should have consistent CAPEX/OPEX values across all dimensions", () => {
      const securityLevels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];

      securityLevels.forEach((level) => {
        const availabilityCapex = dataProvider.availabilityOptions[level].capex;
        const integrityCapex = dataProvider.integrityOptions[level].capex;
        const confidentialityCapex =
          dataProvider.confidentialityOptions[level].capex;

        // All dimensions should have the same CAPEX for the same security level
        expect(availabilityCapex).toBe(integrityCapex);
        expect(availabilityCapex).toBe(confidentialityCapex);

        const availabilityOpex = dataProvider.availabilityOptions[level].opex;
        const integrityOpex = dataProvider.integrityOptions[level].opex;
        const confidentialityOpex =
          dataProvider.confidentialityOptions[level].opex;

        // All dimensions should have the same OPEX for the same security level
        expect(availabilityOpex).toBe(integrityOpex);
        expect(availabilityOpex).toBe(confidentialityOpex);
      });
    });
  });

  describe("Additional Utility Functions", () => {
    it("should return appropriate expertise levels", () => {
      expect(dataProvider.getDefaultExpertiseLevel?.("None")).toBe("No expertise required");
      expect(dataProvider.getDefaultExpertiseLevel?.("Low")).toBe("Basic IT knowledge");
      expect(dataProvider.getDefaultExpertiseLevel?.("Moderate")).toBe("Security professional");
      expect(dataProvider.getDefaultExpertiseLevel?.("High")).toBe("Senior security specialist");
      expect(dataProvider.getDefaultExpertiseLevel?.("Very High")).toBe("Security architect/expert");
    });

    it("should return appropriate protection levels", () => {
      expect(dataProvider.getProtectionLevel?.("None")).toBe("No protection");
      expect(dataProvider.getProtectionLevel?.("Low")).toBe("Basic protection");
      expect(dataProvider.getProtectionLevel?.("Moderate")).toBe("Standard protection");
      expect(dataProvider.getProtectionLevel?.("High")).toBe("Advanced protection");
      expect(dataProvider.getProtectionLevel?.("Very High")).toBe("Maximum protection");
    });

    it("should handle invalid security level for getDefaultSecurityIcon with fallback", () => {
      // Test fallback path when invalid level is passed
      const invalidLevel = "Invalid" as unknown as SecurityLevel;
      expect(dataProvider.getDefaultSecurityIcon?.(invalidLevel)).toBe("❓");
    });

    it("should handle invalid security level for getDefaultExpertiseLevel with fallback", () => {
      const invalidLevel = "Invalid" as unknown as SecurityLevel;
      expect(dataProvider.getDefaultExpertiseLevel?.(invalidLevel)).toBe("Unknown");
    });

    it("should handle invalid security level for getProtectionLevel with fallback", () => {
      const invalidLevel = "Invalid" as unknown as SecurityLevel;
      expect(dataProvider.getProtectionLevel?.(invalidLevel)).toBe("Unknown");
    });

    it("should return different value points for None vs other levels", () => {
      const nonePoints = dataProvider.getDefaultValuePoints?.("None") || [];
      const highPoints = dataProvider.getDefaultValuePoints?.("High") || [];
      
      // None should have specific messages about no security
      expect(nonePoints[0]).toContain("No security controls");
      
      // High should have different messages
      expect(highPoints[0]).toContain("high");
      expect(highPoints[1]).toContain("advanced");
    });

    it("should differentiate between basic and advanced security requirements in value points", () => {
      const lowPoints = dataProvider.getDefaultValuePoints?.("Low") || [];
      const veryHighPoints = dataProvider.getDefaultValuePoints?.("Very High") || [];
      
      // Low should mention basic requirements
      expect(lowPoints[1]).toContain("basic");
      
      // Very High should mention advanced requirements
      expect(veryHighPoints[1]).toContain("advanced");
    });
  });

  describe("Availability-Specific Metrics", () => {
    it("should return appropriate uptime for all levels", () => {
      expect(dataProvider.availabilityOptions.None.uptime).toBe("<90%");
      expect(dataProvider.availabilityOptions.Low.uptime).toBe("95%");
      expect(dataProvider.availabilityOptions.Moderate.uptime).toBe("99%");
      expect(dataProvider.availabilityOptions.High.uptime).toBe("99.9%");
      expect(dataProvider.availabilityOptions["Very High"].uptime).toBe("99.999%");
    });

    it("should return appropriate RTO for all levels", () => {
      expect(dataProvider.availabilityOptions.None.rto).toBe("Days");
      expect(dataProvider.availabilityOptions.Low.rto).toBe("24 hours");
      expect(dataProvider.availabilityOptions.Moderate.rto).toBe("4 hours");
      expect(dataProvider.availabilityOptions.High.rto).toBe("1 hour");
      expect(dataProvider.availabilityOptions["Very High"].rto).toBe("15 minutes");
    });

    it("should return appropriate RPO for all levels", () => {
      expect(dataProvider.availabilityOptions.None.rpo).toBe("No backup");
      expect(dataProvider.availabilityOptions.Low.rpo).toBe("24 hours");
      expect(dataProvider.availabilityOptions.Moderate.rpo).toBe("4 hours");
      expect(dataProvider.availabilityOptions.High.rpo).toBe("1 hour");
      expect(dataProvider.availabilityOptions["Very High"].rpo).toBe("Near-zero");
    });

    it("should return appropriate MTTR for all levels", () => {
      expect(dataProvider.availabilityOptions.None.mttr).toBe("Undefined");
      expect(dataProvider.availabilityOptions.Low.mttr).toBe("12+ hours");
      expect(dataProvider.availabilityOptions.Moderate.mttr).toBe("4-8 hours");
      expect(dataProvider.availabilityOptions.High.mttr).toBe("1-2 hours");
      expect(dataProvider.availabilityOptions["Very High"].mttr).toBe("<1 hour");
    });
  });

  describe("Technical Implementation Effort", () => {
    it("should have development effort defined for all levels", () => {
      const securityLevels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];

      securityLevels.forEach((level) => {
        const availabilityOption = dataProvider.availabilityOptions[level];
        expect(availabilityOption.technicalImplementation?.effort?.development).toBeDefined();
        
        const integrityOption = dataProvider.integrityOptions[level];
        expect(integrityOption.technicalImplementation?.effort?.development).toBeDefined();
        
        const confidentialityOption = dataProvider.confidentialityOptions[level];
        expect(confidentialityOption.technicalImplementation?.effort?.development).toBeDefined();
      });
    });

    it("should have maintenance effort defined for all levels", () => {
      const securityLevels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];

      securityLevels.forEach((level) => {
        const availabilityOption = dataProvider.availabilityOptions[level];
        expect(availabilityOption.technicalImplementation?.effort?.maintenance).toBeDefined();
        
        const integrityOption = dataProvider.integrityOptions[level];
        expect(integrityOption.technicalImplementation?.effort?.maintenance).toBeDefined();
        
        const confidentialityOption = dataProvider.confidentialityOptions[level];
        expect(confidentialityOption.technicalImplementation?.effort?.maintenance).toBeDefined();
      });
    });

    it("should have expertise requirements defined for all levels", () => {
      const securityLevels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];

      securityLevels.forEach((level) => {
        const availabilityOption = dataProvider.availabilityOptions[level];
        expect(availabilityOption.technicalImplementation?.effort?.expertise).toBeDefined();
        
        const integrityOption = dataProvider.integrityOptions[level];
        expect(integrityOption.technicalImplementation?.effort?.expertise).toBeDefined();
        
        const confidentialityOption = dataProvider.confidentialityOptions[level];
        expect(confidentialityOption.technicalImplementation?.effort?.expertise).toBeDefined();
      });
    });
  });
});

describe("Test Data Provider", () => {
  const provider = createTestDataProvider();

  it("should return CIA options for all security levels", () => {
    const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
    levels.forEach((level) => {
      expect(provider.availabilityOptions[level]).toBeDefined();
      expect(provider.integrityOptions[level]).toBeDefined();
      expect(provider.confidentialityOptions[level]).toBeDefined();
    });
  });

  it("should return valid ROI estimates", () => {
    expect(provider.roiEstimates).toHaveProperty("NONE");
    expect(provider.roiEstimates).toHaveProperty("HIGH");
  });
});
