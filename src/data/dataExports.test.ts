import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import { EnhancedCIADetails } from "../types/cia-services";

describe("Data Module Exports", () => {
  const securityLevels: SecurityLevel[] = [
    "None",
    "Low",
    "Moderate",
    "High",
    "Very High",
  ];

  describe("Security Data Module", () => {
    it("should properly export from index file", async () => {
      // Import the module
      const securityModule = await import("./security");

      // Check main data exports
      expect(securityModule.availabilityData).toBeDefined();
      expect(securityModule.integrityData).toBeDefined();
      expect(securityModule.confidentialityData).toBeDefined();
      expect(securityModule.roiEstimatesData).toBeDefined();

      // Check backward compatibility exports
      expect(securityModule.availabilityOptions).toBeDefined();
      expect(securityModule.integrityOptions).toBeDefined();
      expect(securityModule.confidentialityOptions).toBeDefined();
      expect(securityModule.ROI_ESTIMATES).toBeDefined();

      // Make sure they are the same objects (backward compatibility)
      expect(securityModule.availabilityData).toBe(
        securityModule.availabilityOptions
      );
      expect(securityModule.integrityData).toBe(
        securityModule.integrityOptions
      );
      expect(securityModule.confidentialityData).toBe(
        securityModule.confidentialityOptions
      );
      expect(securityModule.roiEstimatesData).toBe(
        securityModule.ROI_ESTIMATES
      );
    });
  });

  describe("Main CIA Options Exports", () => {
    it("should properly export from ciaOptionsData", async () => {
      // Import the module
      const ciaOptionsModule = await import("./ciaOptionsData");

      // Check main data exports
      expect(ciaOptionsModule.availabilityOptions).toBeDefined();
      expect(ciaOptionsModule.integrityOptions).toBeDefined();
      expect(ciaOptionsModule.confidentialityOptions).toBeDefined();
      expect(ciaOptionsModule.ROI_ESTIMATES).toBeDefined();

      // Validate availability options for all security levels
      securityLevels.forEach((level) => {
        const options = ciaOptionsModule.availabilityOptions[
          level
        ] as EnhancedCIADetails;
        expect(options).toBeDefined();
        expect(options.description).toBeTruthy();
        expect(options.technical).toBeTruthy();
        expect(options.businessImpact).toBeTruthy();
      });
    });
  });

  describe("Value Creation Data", () => {
    it("should export value creation data", async () => {
      // Import the module
      const valueCreationModule = await import("./valueCreationData");

      // Check main data exports
      expect(valueCreationModule.valueCreationPoints).toBeDefined();
      expect(valueCreationModule.valueCreationTitles).toBeDefined();
      expect(typeof valueCreationModule.getROIEstimateForLevel).toBe(
        "function"
      );

      // Check for all security levels
      securityLevels.forEach((level) => {
        expect(valueCreationModule.valueCreationPoints[level]).toBeDefined();
        expect(valueCreationModule.valueCreationTitles[level]).toBeDefined();

        const estimate = valueCreationModule.getROIEstimateForLevel(level);
        expect(estimate.value).toBeDefined();
        expect(estimate.description).toBeDefined();
      });
    });
  });

  describe("Risk Impact Data", () => {
    it("should export risk impact data", async () => {
      // Import the module
      const riskImpactModule = await import("./riskImpactData");

      // Check main data exports
      expect(riskImpactModule.financialImpactByLevel).toBeDefined();
      expect(riskImpactModule.operationalImpactByLevel).toBeDefined();
      expect(riskImpactModule.reputationalImpactByLevel).toBeDefined();
      expect(typeof riskImpactModule.getRiskLevelFromSecurityLevel).toBe(
        "function"
      );

      // Check for all security levels
      securityLevels.forEach((level) => {
        expect(riskImpactModule.financialImpactByLevel[level]).toBeDefined();
        expect(riskImpactModule.operationalImpactByLevel[level]).toBeDefined();
        expect(riskImpactModule.reputationalImpactByLevel[level]).toBeDefined();

        const riskLevel = riskImpactModule.getRiskLevelFromSecurityLevel(level);
        expect(riskLevel).toBeDefined();
      });
    });
  });
});
