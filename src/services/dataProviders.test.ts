import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import { ALL_SECURITY_LEVELS } from "../constants/securityLevels";
import { createDefaultDataProvider } from "./dataProviders";

describe("dataProviders", () => {
  describe("createDefaultDataProvider", () => {
    it("should create a valid data provider", () => {
      const provider = createDefaultDataProvider();

      expect(provider).toBeDefined();
      expect(provider.availabilityOptions).toBeDefined();
      expect(provider.integrityOptions).toBeDefined();
      expect(provider.confidentialityOptions).toBeDefined();
      expect(provider.roiEstimates).toBeDefined();
    });

    describe("availabilityOptions", () => {
      const securityLevels = ALL_SECURITY_LEVELS;

      it("should have options for all security levels", () => {
        const provider = createDefaultDataProvider();

        securityLevels.forEach((level) => {
          expect(provider.availabilityOptions[level]).toBeDefined();
        });
      });

      it("should have valid descriptions for each level", () => {
        const provider = createDefaultDataProvider();

        securityLevels.forEach((level) => {
          const option = provider.availabilityOptions[level];
          expect(option.description).toBeDefined();
          expect(typeof option.description).toBe("string");
          expect(option.description.length).toBeGreaterThan(0);
        });
      });

      it("should have technical details for each level", () => {
        const provider = createDefaultDataProvider();

        securityLevels.forEach((level) => {
          const option = provider.availabilityOptions[level];
          expect(option.technical).toBeDefined();
          expect(typeof option.technical).toBe("string");
        });
      });

      it("should have business impact for each level", () => {
        const provider = createDefaultDataProvider();

        securityLevels.forEach((level) => {
          const option = provider.availabilityOptions[level];
          expect(option.businessImpact).toBeDefined();
          expect(typeof option.businessImpact).toBe("string");
        });
      });

      it("should have cost values for each level", () => {
        const provider = createDefaultDataProvider();

        securityLevels.forEach((level) => {
          const option = provider.availabilityOptions[level];
          expect(option.capex).toBeDefined();
          expect(option.opex).toBeDefined();
          expect(typeof option.capex).toBe("number");
          expect(typeof option.opex).toBe("number");
        });
      });

      it("should have increasing costs with higher security levels", () => {
        const provider = createDefaultDataProvider();

        const noneCost = provider.availabilityOptions["None"].capex;
        const lowCost = provider.availabilityOptions["Low"].capex;
        const veryHighCost = provider.availabilityOptions["Very High"].capex;

        expect(lowCost).toBeGreaterThan(noneCost);
        expect(veryHighCost).toBeGreaterThan(lowCost);
      });

      it("should have recommendations for higher security levels", () => {
        const provider = createDefaultDataProvider();

        ["Low", "Moderate", "High", "Very High"].forEach((level) => {
          const option = provider.availabilityOptions[level as SecurityLevel];
          expect(option.recommendations).toBeDefined();
          expect(Array.isArray(option.recommendations)).toBe(true);
          expect(option.recommendations?.length).toBeGreaterThan(0);
        });
      });

      it("should have empty or no recommendations for None level", () => {
        const provider = createDefaultDataProvider();
        const option = provider.availabilityOptions["None"];
        
        expect(option.recommendations).toBeDefined();
        expect(Array.isArray(option.recommendations)).toBe(true);
        expect(option.recommendations?.length).toBe(0);
      });
    });

    describe("integrityOptions", () => {
      const securityLevels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];

      it("should have options for all security levels", () => {
        const provider = createDefaultDataProvider();

        securityLevels.forEach((level) => {
          expect(provider.integrityOptions[level]).toBeDefined();
        });
      });

      it("should have valid descriptions for each level", () => {
        const provider = createDefaultDataProvider();

        securityLevels.forEach((level) => {
          const option = provider.integrityOptions[level];
          expect(option.description).toBeDefined();
          expect(typeof option.description).toBe("string");
          expect(option.description.length).toBeGreaterThan(0);
        });
      });

      it("should have technical details for each level", () => {
        const provider = createDefaultDataProvider();

        securityLevels.forEach((level) => {
          const option = provider.integrityOptions[level];
          expect(option.technical).toBeDefined();
          expect(typeof option.technical).toBe("string");
        });
      });

      it("should have business impact for each level", () => {
        const provider = createDefaultDataProvider();

        securityLevels.forEach((level) => {
          const option = provider.integrityOptions[level];
          expect(option.businessImpact).toBeDefined();
          expect(typeof option.businessImpact).toBe("string");
        });
      });

      it("should have cost values for each level", () => {
        const provider = createDefaultDataProvider();

        securityLevels.forEach((level) => {
          const option = provider.integrityOptions[level];
          expect(option.capex).toBeDefined();
          expect(option.opex).toBeDefined();
          expect(typeof option.capex).toBe("number");
          expect(typeof option.opex).toBe("number");
        });
      });

      it("should have increasing costs with higher security levels", () => {
        const provider = createDefaultDataProvider();

        const noneCost = provider.integrityOptions["None"].capex;
        const lowCost = provider.integrityOptions["Low"].capex;
        const veryHighCost = provider.integrityOptions["Very High"].capex;

        expect(lowCost).toBeGreaterThan(noneCost);
        expect(veryHighCost).toBeGreaterThan(lowCost);
      });
    });

    describe("confidentialityOptions", () => {
      const securityLevels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];

      it("should have options for all security levels", () => {
        const provider = createDefaultDataProvider();

        securityLevels.forEach((level) => {
          expect(provider.confidentialityOptions[level]).toBeDefined();
        });
      });

      it("should have valid descriptions for each level", () => {
        const provider = createDefaultDataProvider();

        securityLevels.forEach((level) => {
          const option = provider.confidentialityOptions[level];
          expect(option.description).toBeDefined();
          expect(typeof option.description).toBe("string");
          expect(option.description.length).toBeGreaterThan(0);
        });
      });

      it("should have technical details for each level", () => {
        const provider = createDefaultDataProvider();

        securityLevels.forEach((level) => {
          const option = provider.confidentialityOptions[level];
          expect(option.technical).toBeDefined();
          expect(typeof option.technical).toBe("string");
        });
      });

      it("should have business impact for each level", () => {
        const provider = createDefaultDataProvider();

        securityLevels.forEach((level) => {
          const option = provider.confidentialityOptions[level];
          expect(option.businessImpact).toBeDefined();
          expect(typeof option.businessImpact).toBe("string");
        });
      });

      it("should have cost values for each level", () => {
        const provider = createDefaultDataProvider();

        securityLevels.forEach((level) => {
          const option = provider.confidentialityOptions[level];
          expect(option.capex).toBeDefined();
          expect(option.opex).toBeDefined();
          expect(typeof option.capex).toBe("number");
          expect(typeof option.opex).toBe("number");
        });
      });

      it("should have increasing costs with higher security levels", () => {
        const provider = createDefaultDataProvider();

        const noneCost = provider.confidentialityOptions["None"].capex;
        const lowCost = provider.confidentialityOptions["Low"].capex;
        const veryHighCost = provider.confidentialityOptions["Very High"].capex;

        expect(lowCost).toBeGreaterThan(noneCost);
        expect(veryHighCost).toBeGreaterThan(lowCost);
      });
    });

    describe("roiEstimates", () => {
      it("should have ROI estimates for all levels", () => {
        const provider = createDefaultDataProvider();
        const levels = ["NONE", "LOW", "MODERATE", "HIGH", "VERY_HIGH"];

        levels.forEach((level) => {
          expect(provider.roiEstimates[level]).toBeDefined();
        });
      });

      it("should have return rates for all levels", () => {
        const provider = createDefaultDataProvider();
        const levels = ["NONE", "LOW", "MODERATE", "HIGH", "VERY_HIGH"];

        levels.forEach((level) => {
          const estimate = provider.roiEstimates[level];
          expect(estimate.returnRate).toBeDefined();
          expect(typeof estimate.returnRate).toBe("string");
        });
      });

      it("should have descriptions for all levels", () => {
        const provider = createDefaultDataProvider();
        const levels = ["NONE", "LOW", "MODERATE", "HIGH", "VERY_HIGH"];

        levels.forEach((level) => {
          const estimate = provider.roiEstimates[level];
          expect(estimate.description).toBeDefined();
          expect(typeof estimate.description).toBe("string");
        });
      });

      it("should have increasing ROI with higher security levels", () => {
        const provider = createDefaultDataProvider();

        const noneROI = provider.roiEstimates["NONE"].returnRate;
        const lowROI = provider.roiEstimates["LOW"].returnRate;
        const veryHighROI = provider.roiEstimates["VERY_HIGH"].returnRate;

        expect(noneROI).toBe("0%");
        expect(lowROI).not.toBe("0%");
        expect(veryHighROI).toContain("%");
      });
    });

    describe("data consistency", () => {
      it("should have consistent structure across all security levels", () => {
        const provider = createDefaultDataProvider();
        const securityLevels: SecurityLevel[] = [
          "None",
          "Low",
          "Moderate",
          "High",
          "Very High",
        ];

        securityLevels.forEach((level) => {
          // Check availability option structure
          const avail = provider.availabilityOptions[level];
          expect(avail).toHaveProperty("description");
          expect(avail).toHaveProperty("technical");
          expect(avail).toHaveProperty("businessImpact");
          expect(avail).toHaveProperty("capex");
          expect(avail).toHaveProperty("opex");

          // Check integrity option structure
          const integ = provider.integrityOptions[level];
          expect(integ).toHaveProperty("description");
          expect(integ).toHaveProperty("technical");
          expect(integ).toHaveProperty("businessImpact");
          expect(integ).toHaveProperty("capex");
          expect(integ).toHaveProperty("opex");

          // Check confidentiality option structure
          const conf = provider.confidentialityOptions[level];
          expect(conf).toHaveProperty("description");
          expect(conf).toHaveProperty("technical");
          expect(conf).toHaveProperty("businessImpact");
          expect(conf).toHaveProperty("capex");
          expect(conf).toHaveProperty("opex");
        });
      });
    });
  });
});
