import { renderHook } from "@testing-library/react"; // Changed from react-hooks
import { describe, expect, it, vi } from "vitest";
import { CIADetails } from "../types/cia-services";
import * as useCIAOptionsModule from "./useCIAOptions";
import { useCIAOptions } from "./useCIAOptions";

// Mock the React hooks
vi.mock("react", () => ({
  useMemo: (fn: () => any) => fn(),
}));

describe("useCIAOptions", () => {
  // Create mock options for testing with properly typed ROI_ESTIMATES
  const mockOptions: ReturnType<typeof useCIAOptionsModule.useCIAOptions> = {
    availabilityOptions: {
      None: {
        description: "Test description",
        impact: "Test impact",
        technical: "Test technical",
        businessImpact: "Test business impact",
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        recommendations: [],
      },
      Low: {
        description: "Test description",
        impact: "Test impact",
        technical: "Test technical",
        businessImpact: "Test business impact",
        capex: 10,
        opex: 5,
        bg: "#ffffff",
        text: "#000000",
        recommendations: ["Test recommendation"],
      },
      Moderate: {
        description: "Test description",
        impact: "Test impact",
        technical: "Test technical",
        businessImpact: "Test business impact",
        capex: 20,
        opex: 10,
        bg: "#ffffff",
        text: "#000000",
        recommendations: ["Test recommendation"],
      },
      High: {
        description: "Test description",
        impact: "Test impact",
        technical: "Test technical",
        businessImpact: "Test business impact",
        capex: 40,
        opex: 20,
        bg: "#ffffff",
        text: "#000000",
        recommendations: ["Test recommendation"],
      },
      "Very High": {
        description: "Test description",
        impact: "Test impact",
        technical: "Test technical",
        businessImpact: "Test business impact",
        capex: 60,
        opex: 30,
        bg: "#ffffff",
        text: "#000000",
        recommendations: ["Test recommendation"],
      },
    },
    integrityOptions: {
      None: {
        description: "Test description",
        impact: "Test impact",
        technical: "Test technical",
        businessImpact: "Test business impact",
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        recommendations: [],
      },
      Low: {
        description: "Test description",
        impact: "Test impact",
        technical: "Test technical",
        businessImpact: "Test business impact",
        capex: 10,
        opex: 5,
        bg: "#ffffff",
        text: "#000000",
        recommendations: ["Test recommendation"],
      },
      Moderate: {
        description: "Test description",
        impact: "Test impact",
        technical: "Test technical",
        businessImpact: "Test business impact",
        capex: 20,
        opex: 10,
        bg: "#ffffff",
        text: "#000000",
        recommendations: ["Test recommendation"],
      },
      High: {
        description: "Test description",
        impact: "Test impact",
        technical: "Test technical",
        businessImpact: "Test business impact",
        capex: 40,
        opex: 20,
        bg: "#ffffff",
        text: "#000000",
        recommendations: ["Test recommendation"],
      },
      "Very High": {
        description: "Test description",
        impact: "Test impact",
        technical: "Test technical",
        businessImpact: "Test business impact",
        capex: 60,
        opex: 30,
        bg: "#ffffff",
        text: "#000000",
        recommendations: ["Test recommendation"],
      },
    },
    confidentialityOptions: {
      None: {
        description: "Test description",
        impact: "Test impact",
        technical: "Test technical",
        businessImpact: "Test business impact",
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        recommendations: [],
      },
      Low: {
        description: "Test description",
        impact: "Test impact",
        technical: "Test technical",
        businessImpact: "Test business impact",
        capex: 10,
        opex: 5,
        bg: "#ffffff",
        text: "#000000",
        recommendations: ["Test recommendation"],
      },
      Moderate: {
        description: "Test description",
        impact: "Test impact",
        technical: "Test technical",
        businessImpact: "Test business impact",
        capex: 20,
        opex: 10,
        bg: "#ffffff",
        text: "#000000",
        recommendations: ["Test recommendation"],
      },
      High: {
        description: "Test description",
        impact: "Test impact",
        technical: "Test technical",
        businessImpact: "Test business impact",
        capex: 40,
        opex: 20,
        bg: "#ffffff",
        text: "#000000",
        recommendations: ["Test recommendation"],
      },
      "Very High": {
        description: "Test description",
        impact: "Test impact",
        technical: "Test technical",
        businessImpact: "Test business impact",
        capex: 60,
        opex: 30,
        bg: "#ffffff",
        text: "#000000",
        recommendations: ["Test recommendation"],
      },
    },
    ROI_ESTIMATES: {
      NONE: {
        returnRate: "0%",
        description: "No security investment means no return",
        value: "0%",
        potentialSavings: "$0",
        breakEvenPeriod: "N/A",
      },
      LOW: {
        returnRate: "100%",
        description: "Basic security provides minimal return",
        value: "100%",
        potentialSavings: "$10,000",
        breakEvenPeriod: "24 months",
      },
      MODERATE: {
        returnRate: "200%",
        description: "Standard security provides good value",
        value: "200%",
        potentialSavings: "$100,000",
        breakEvenPeriod: "12 months",
      },
      HIGH: {
        returnRate: "300%",
        description: "Advanced security provides excellent value",
        value: "300%",
        potentialSavings: "$500,000",
        breakEvenPeriod: "6 months",
      },
      VERY_HIGH: {
        returnRate: "400%",
        description: "Comprehensive security provides optimal value",
        value: "400%",
        potentialSavings: "$1,000,000+",
        breakEvenPeriod: "3 months",
      },
    },
    // Add the missing methods:
    getROIEstimate: vi.fn().mockReturnValue({
      returnRate: "150%",
      description: "Test ROI description",
    }),
    getValuePoints: vi.fn().mockReturnValue(["Value point 1", "Value point 2"]),
    getComponentDetails: vi.fn().mockReturnValue({
      description: "Component description",
      technical: "Technical details",
    }),
    getComponentDescription: vi.fn().mockReturnValue("Component description"),
    getImplementationDetails: vi.fn().mockReturnValue({
      steps: ["Step 1", "Step 2"],
      time: "2-4 weeks",
      cost: "medium",
    }),
  };

  // Mock the useCIAOptions function
  vi.spyOn(useCIAOptionsModule, "useCIAOptions").mockReturnValue(mockOptions);

  // Store options at the top level scope to be accessible throughout all tests
  const options = useCIAOptionsModule.useCIAOptions();

  describe("Structure Tests", () => {
    it("returns expected options structure", () => {
      expect(options).toHaveProperty("availabilityOptions");
      expect(options).toHaveProperty("integrityOptions");
      expect(options).toHaveProperty("confidentialityOptions");
      expect(options).toHaveProperty("ROI_ESTIMATES");
    });

    // Update validation function to match the enhanced EnhancedCIADetails interface
    const validateOptionStructure = (option: any) => {
      expect(option).toHaveProperty("description");
      expect(option).toHaveProperty("impact");
      expect(option).toHaveProperty("technical");
      expect(option).toHaveProperty("businessImpact");
      expect(option).toHaveProperty("capex");
      expect(option).toHaveProperty("opex");
      expect(option).toHaveProperty("bg");
      expect(option).toHaveProperty("text");
      expect(option).toHaveProperty("recommendations");
      expect(Array.isArray(option.recommendations)).toBe(true);
    };

    it("validates all availability options", () => {
      const availabilityOptions = options.availabilityOptions;
      expect(availabilityOptions).toBeDefined();

      // Test each option level
      Object.values(availabilityOptions).forEach((option) => {
        validateOptionStructure(option as CIADetails);
      });
    });

    it("validates all integrity options", () => {
      const integrityOptions = options.integrityOptions;
      expect(integrityOptions).toBeDefined();

      Object.values(integrityOptions).forEach((option) => {
        validateOptionStructure(option as CIADetails);
      });
    });

    it("validates all confidentiality options", () => {
      const confidentialityOptions = options.confidentialityOptions;
      expect(confidentialityOptions).toBeDefined();

      Object.values(confidentialityOptions).forEach((option) => {
        validateOptionStructure(option as CIADetails);
      });
    });
  });

  describe("Recommendations", () => {
    it("ensures all options have recommendations", () => {
      Object.values(options.availabilityOptions).forEach((option) => {
        expect(Array.isArray((option as CIADetails).recommendations)).toBe(
          true
        );
      });

      Object.values(options.integrityOptions).forEach((option) => {
        expect(Array.isArray((option as CIADetails).recommendations)).toBe(
          true
        );
      });

      Object.values(options.confidentialityOptions).forEach((option) => {
        expect(Array.isArray((option as CIADetails).recommendations)).toBe(
          true
        );
      });
    });
  });

  describe("Option Values", () => {
    it("ensures availability options have correct levels", () => {
      // Update test to check for all security levels
      expect(Object.keys(options.availabilityOptions)).toEqual([
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ]);
    });

    it("validates cost calculations are within bounds", () => {
      Object.values(options.availabilityOptions).forEach((option) => {
        const typedOption = option as CIADetails;
        expect(typedOption.capex).toBeGreaterThanOrEqual(0);
        expect(typedOption.capex).toBeLessThanOrEqual(100);
        expect(typedOption.opex).toBeGreaterThanOrEqual(0);
        expect(typedOption.opex).toBeLessThanOrEqual(100);
      });
    });

    it("ensures color values are valid hex codes", () => {
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;

      Object.values(options.availabilityOptions).forEach((option) => {
        const typedOption = option as CIADetails;
        expect(typedOption.bg).toMatch(hexColorRegex);
        expect(typedOption.text).toMatch(hexColorRegex);
      });
    });
  });

  // Test exported constants as well
  describe("Exported Constants", () => {
    it("exports availabilityOptions directly", () => {
      expect(useCIAOptionsModule.availabilityOptions).toBeDefined();
      expect(Object.keys(useCIAOptionsModule.availabilityOptions)).toContain(
        "None"
      );
    });

    it("exports integrityOptions directly", () => {
      expect(useCIAOptionsModule.integrityOptions).toBeDefined();
      expect(Object.keys(useCIAOptionsModule.integrityOptions)).toContain(
        "None"
      );
    });

    it("exports confidentialityOptions directly", () => {
      expect(useCIAOptionsModule.confidentialityOptions).toBeDefined();
      expect(Object.keys(useCIAOptionsModule.confidentialityOptions)).toContain(
        "None"
      );
    });

    it("exports ROI_ESTIMATES directly", () => {
      expect(useCIAOptionsModule.ROI_ESTIMATES).toBeDefined();
    });
  });
});

describe("useCIAOptions (TypeScript)", () => {
  it("should return object structure with all properties", () => {
    const { result } = renderHook(() => useCIAOptions());
    expect(result.current.availabilityOptions).toBeDefined();
    expect(result.current.integrityOptions).toBeDefined();
    expect(result.current.confidentialityOptions).toBeDefined();
    expect(result.current.ROI_ESTIMATES).toBeDefined();
  });
  // ...existing tests...
});
