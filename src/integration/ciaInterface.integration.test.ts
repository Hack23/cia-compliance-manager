import { describe, expect, it } from "vitest";
import {
  availabilityOptions,
  confidentialityOptions,
  integrityOptions,
} from "../data/ciaOptionsData";
import { createTestDataProvider } from "../data/testDataProvider";
import { SecurityLevel } from "../types/cia";
import {
  CIADetails,
  EnhancedCIADetails,
  CIAComponentType,
} from "../types/cia-services";

describe("CIA Interface Integration", () => {
  describe("Backward Compatibility", () => {
    it("should allow using EnhancedCIADetails where CIADetails is expected", () => {
      // This function expects CIADetails but should work with EnhancedCIADetails
      function processSecurityDetails(details: CIADetails): string {
        return details.description;
      }

      // Create an object with EnhancedCIADetails type
      const enhancedDetails: EnhancedCIADetails = {
        description: "Enhanced details",
        technical: "Technical description",
        businessImpact: "Business impact",
        capex: 100,
        opex: 50,
        bg: "#ffffff",
        text: "#000000",
        recommendations: ["Recommendation"],
        // EnhancedCIADetails specific fields
        securityIcon: "🔒",
        valuePoints: ["Value point"],
      };

      // Should work with the function expecting CIADetails
      expect(processSecurityDetails(enhancedDetails)).toBe("Enhanced details");
    });

    it("should allow existing code to use either interface interchangeably", () => {
      // Make sure existing code can still use the deprecated interface
      const oldCode = (details: EnhancedCIADetails): string => {
        return `Icon: ${details.securityIcon || "⚠️"}, Description: ${
          details.description
        }`;
      };

      // Create a standard CIADetails object
      const newStyleDetails: CIADetails = {
        description: "New interface usage",
        technical: "Technical details",
        businessImpact: "Business impact",
        capex: 100,
        opex: 50,
        bg: "#ffffff",
        text: "#000000",
        recommendations: ["Recommendation"],
        securityIcon: "🔐",
      };

      // Old code should still work with new interface objects
      expect(oldCode(newStyleDetails)).toBe(
        "Icon: 🔐, Description: New interface usage"
      );
    });
  });

  describe("Data Module Compatibility", () => {
    it("should confirm that imported data matches the CIADetails interface", () => {
      const securityLevels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];

      // Check each security level in each component
      securityLevels.forEach((level) => {
        // Availability should conform to CIADetails
        const availDetails: CIADetails = availabilityOptions[level];
        expect(availDetails).toBeDefined();
        expect(availDetails.description).toBeTruthy();

        // Integrity should conform to CIADetails
        const integrityDetails: CIADetails = integrityOptions[level];
        expect(integrityDetails).toBeDefined();
        expect(integrityDetails.description).toBeTruthy();

        // Confidentiality should conform to CIADetails
        const confidentialityDetails: CIADetails =
          confidentialityOptions[level];
        expect(confidentialityDetails).toBeDefined();
        expect(confidentialityDetails.description).toBeTruthy();
      });
    });

    it("should verify component-specific fields are preserved", () => {
      // Check availability-specific fields
      expect(availabilityOptions["High"].uptime).toBeDefined();
      expect(availabilityOptions["High"].rto).toBeDefined();
      expect(availabilityOptions["High"].rpo).toBeDefined();

      // Check integrity-specific fields
      expect(integrityOptions["High"].validationMethod).toBeDefined();

      // Check confidentiality-specific fields
      expect(confidentialityOptions["High"].protectionMethod).toBeDefined();
    });
  });

  describe("Test Data Provider Compatibility", () => {
    it("should confirm that testDataProvider generates valid CIADetails objects", () => {
      const dataProvider = createTestDataProvider();
      const securityLevels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];

      securityLevels.forEach((level) => {
        // Each component's data should match the CIADetails interface
        const availData: CIADetails = dataProvider.availabilityOptions[level];
        const integrityData: CIADetails = dataProvider.integrityOptions[level];
        const confidentialityData: CIADetails =
          dataProvider.confidentialityOptions[level];

        // Check core required properties
        expect(availData.description).toBeTruthy();
        expect(availData.technical).toBeTruthy();
        expect(availData.businessImpact).toBeTruthy();
        expect(typeof availData.capex).toBe("number");
        expect(typeof availData.opex).toBe("number");

        expect(integrityData.description).toBeTruthy();
        expect(confidentialityData.description).toBeTruthy();

        // Check component specific fields
        expect(availData.uptime).toBeTruthy();
        expect(integrityData.validationMethod).toBeTruthy();
        expect(confidentialityData.protectionMethod).toBeTruthy();
      });
    });

    it("should verify business impact details structure", () => {
      const dataProvider = createTestDataProvider();

      // Get a "High" level with detailed business impact
      const highAvail = dataProvider.availabilityOptions["High"];
      const highIntegrity = dataProvider.integrityOptions["High"];
      const highConfidentiality = dataProvider.confidentialityOptions["High"];

      // Check business impact details structure
      expect(highAvail.businessImpactDetails).toBeDefined();
      expect(highAvail.businessImpactDetails?.financialImpact?.riskLevel).toBe(
        "Low"
      );
      expect(
        highAvail.businessImpactDetails?.operationalImpact?.riskLevel
      ).toBe("Low");

      expect(highIntegrity.businessImpactDetails).toBeDefined();
      expect(highConfidentiality.businessImpactDetails).toBeDefined();
    });

    it("should verify technical implementation details structure", () => {
      const dataProvider = createTestDataProvider();

      // Check all components
      const components: ("availability" | "integrity" | "confidentiality")[] = [
        "availability",
        "integrity",
        "confidentiality",
      ];

      components.forEach((component) => {
        const highLevel = dataProvider[`${component}Options`]["High"];
        expect(highLevel.technicalImplementation).toBeDefined();
        expect(highLevel.technicalImplementation?.description).toBeTruthy();
        expect(
          Array.isArray(highLevel.technicalImplementation?.implementationSteps)
        ).toBe(true);
        expect(highLevel.technicalImplementation?.effort).toBeDefined();
        expect(
          highLevel.technicalImplementation?.effort.development
        ).toBeTruthy();
        expect(
          highLevel.technicalImplementation?.effort.maintenance
        ).toBeTruthy();
        expect(
          highLevel.technicalImplementation?.effort.expertise
        ).toBeTruthy();
      });
    });
  });

  describe("Interface Extension Compatibility", () => {
    it("should allow adding new fields to CIADetails in the future", () => {
      // This type extends CIADetails with new fields (for future expansion)
      type FutureCIADetails = CIADetails & {
        aiAssessment?: {
          score: number;
          recommendations: string[];
        };
        cloudSpecific?: {
          multiRegion: boolean;
          serviceProvider: string[];
        };
      };

      // Create object with the extended type
      const futureDetails: FutureCIADetails = {
        // Regular CIADetails fields
        description: "Future-ready implementation",
        technical: "Advanced implementation",
        businessImpact: "Strategic impact",
        capex: 500,
        opex: 250,
        bg: "#ffffff",
        text: "#000000",
        recommendations: ["Use AI", "Implement cloud security"],

        // New fields
        aiAssessment: {
          score: 92,
          recommendations: ["Add anomaly detection"],
        },
        cloudSpecific: {
          multiRegion: true,
          serviceProvider: ["AWS", "Azure"],
        },
      };

      // Should satisfy both the original interface and have new fields
      const processDetails = (details: CIADetails): string =>
        details.description;
      expect(processDetails(futureDetails)).toBe("Future-ready implementation");
      expect(futureDetails.aiAssessment?.score).toBe(92);
      expect(futureDetails.cloudSpecific?.multiRegion).toBe(true);
    });

    it("should support partial objects for quick prototyping", () => {
      // Use type assertion to create partial objects when needed
      const partialDetails = {
        description: "Partial implementation",
        technical: "Basic technical details",
        businessImpact: "Limited business impact",
        capex: 50,
        opex: 25,
        bg: "#f8f8f8",
        text: "#333333",
        recommendations: ["Start with basics"],
      } as CIADetails;

      // Should work with functions expecting full interface
      const getDescription = (details: CIADetails): string =>
        details.description;
      expect(getDescription(partialDetails)).toBe("Partial implementation");
    });
  });

  describe("Supporting Types", () => {
    it("should verify CIAComponentType restrictions", () => {
      // Valid component types
      const componentTypes: CIAComponentType[] = [
        "confidentiality",
        "integrity",
        "availability",
      ];

      expect(componentTypes).toHaveLength(3);
      expect(componentTypes).toContain("confidentiality");
      expect(componentTypes).toContain("integrity");
      expect(componentTypes).toContain("availability");

      // TypeScript would prevent this at compile-time, but we can't test that directly
      // The next best thing is to verify the type only accepts these three values
      const isValidComponentType = (type: string): boolean => {
        return ["confidentiality", "integrity", "availability"].includes(type);
      };

      componentTypes.forEach((type) => {
        expect(isValidComponentType(type)).toBe(true);
      });

      expect(isValidComponentType("security")).toBe(false);
    });

    it("should verify ROIEstimatesMap structure", () => {
      const dataProvider = createTestDataProvider();

      // Check the structure matches ROIEstimatesMap
      const estimates = dataProvider.roiEstimates;

      expect(estimates.NONE).toBeDefined();
      expect(estimates.LOW).toBeDefined();
      expect(estimates.MODERATE).toBeDefined();
      expect(estimates.HIGH).toBeDefined();
      expect(estimates.VERY_HIGH).toBeDefined();

      // Check structure of individual estimates
      expect(estimates.HIGH.returnRate).toBeDefined();
      expect(estimates.HIGH.description).toBeDefined();
      expect(estimates.HIGH.potentialSavings).toBeDefined();
      expect(estimates.HIGH.breakEvenPeriod).toBeDefined();
    });
  });
});
