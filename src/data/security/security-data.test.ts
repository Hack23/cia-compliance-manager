import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../../types/cia";
import {
  availabilityData,
  availabilityOptions,
  confidentialityData,
  confidentialityOptions,
  integrityData,
  integrityOptions,
  ROI_ESTIMATES,
  roiEstimatesData,
} from "./index";

describe("Security Data Modules", () => {
  const securityLevels: SecurityLevel[] = [
    "None",
    "Low",
    "Moderate",
    "High",
    "Very High",
  ];

  describe("Availability Data", () => {
    it("should export data for all security levels", () => {
      securityLevels.forEach((level) => {
        expect(availabilityData[level]).toBeDefined();
        expect(availabilityData[level].description).toBeTruthy();
        expect(availabilityData[level].technical).toBeTruthy();
        expect(availabilityData[level].businessImpact).toBeTruthy();
      });
    });

    it("should include technical implementation details", () => {
      securityLevels.forEach((level) => {
        expect(availabilityData[level].technicalImplementation).toBeDefined();
        expect(
          availabilityData[level].technicalImplementation?.description
        ).toBeTruthy();
        expect(
          Array.isArray(
            availabilityData[level].technicalImplementation?.implementationSteps
          )
        ).toBe(true);
      });
    });

    it("should include business impact details", () => {
      securityLevels.forEach((level) => {
        expect(availabilityData[level].businessImpactDetails).toBeDefined();
      });
    });

    it("should include value points", () => {
      securityLevels.forEach((level) => {
        expect(Array.isArray(availabilityData[level].valuePoints)).toBe(true);
        expect(availabilityData[level].valuePoints?.length).toBeGreaterThan(0);
      });
    });

    it("should include component-specific metrics", () => {
      expect(availabilityData.Moderate.uptime).toBe("99%");
      expect(availabilityData.High.rto).toBe("15-60 minutes");
    });
  });

  describe("Integrity Data", () => {
    it("should export data for all security levels", () => {
      securityLevels.forEach((level) => {
        expect(integrityData[level]).toBeDefined();
        expect(integrityData[level].description).toBeTruthy();
        expect(integrityData[level].technical).toBeTruthy();
        expect(integrityData[level].businessImpact).toBeTruthy();
      });
    });

    it("should include technical implementation details", () => {
      securityLevels.forEach((level) => {
        expect(integrityData[level].technicalImplementation).toBeDefined();
        expect(
          integrityData[level].technicalImplementation?.description
        ).toBeTruthy();
      });
    });

    it("should include validation methods", () => {
      expect(integrityData.None.validationMethod).toBe("None");
      expect(integrityData.Low.validationMethod).toBe("Manual checks");
      expect(integrityData.Moderate.validationMethod).toBe(
        "Automated validation"
      );
      expect(integrityData.High.validationMethod).toBe(
        "Cryptographic verification"
      );
      expect(integrityData["Very High"].validationMethod).toBe(
        "Blockchain/distributed ledger"
      );
    });
  });

  describe("Confidentiality Data", () => {
    it("should export data for all security levels", () => {
      securityLevels.forEach((level) => {
        expect(confidentialityData[level]).toBeDefined();
        expect(confidentialityData[level].description).toBeTruthy();
        expect(confidentialityData[level].technical).toBeTruthy();
        expect(confidentialityData[level].businessImpact).toBeTruthy();
      });
    });

    it("should include protection methods", () => {
      expect(confidentialityData.None.protectionMethod).toBe("None");
      expect(confidentialityData.Low.protectionMethod).toBe(
        "Basic access control"
      );
      expect(confidentialityData.Moderate.protectionMethod).toBe(
        "Standard encryption"
      );
      expect(confidentialityData.High.protectionMethod).toBe("E2E encryption");
      expect(confidentialityData["Very High"].protectionMethod).toBe(
        "Military-grade encryption with zero-trust"
      );
    });
  });

  describe("ROI Estimates Data", () => {
    it("should export data for all security levels", () => {
      const levels = ["NONE", "LOW", "MODERATE", "HIGH", "VERY_HIGH"];

      levels.forEach((level) => {
        expect(roiEstimatesData[level]).toBeDefined();
        expect(roiEstimatesData[level].returnRate).toBeTruthy();
        expect(roiEstimatesData[level].description).toBeTruthy();
      });
    });

    it("should include breakeven periods", () => {
      expect(roiEstimatesData.MODERATE.breakEvenPeriod).toBeTruthy();
      expect(roiEstimatesData.HIGH.potentialSavings).toBeTruthy();
    });
  });

  describe("Exports for backward compatibility", () => {
    it("should provide compatibility exports", () => {
      // Check that index.ts exports match the actual data
      expect(availabilityOptions).toEqual(availabilityData);
      expect(integrityOptions).toEqual(integrityData);
      expect(confidentialityOptions).toEqual(confidentialityData);
      expect(ROI_ESTIMATES).toEqual(roiEstimatesData);
    });
  });
});
