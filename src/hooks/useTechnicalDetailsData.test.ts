import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useTechnicalDetailsData } from "./useTechnicalDetailsData";

describe("useTechnicalDetailsData", () => {
  const mockCIAContentService = {
    getComponentDetails: vi.fn((component: string, level: string) => ({
      description: `${component} details for ${level}`,
      technical: `Technical info for ${component}`,
    })),
    getTechnicalRequirements: vi.fn(() => ["Requirement 1", "Requirement 2"]),
    getRequiredExpertise: vi.fn(() => ["Expert 1", "Expert 2"]),
  };

  it("should get confidentiality details from service", () => {
    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", mockCIAContentService)
    );

    expect(result.current.confidentialityDetails).toBeDefined();
    expect(result.current.confidentialityDetails.description).toContain("confidentiality");
  });

  it("should use fallback for confidentiality details when service is null", () => {
    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", null)
    );

    expect(result.current.confidentialityDetails).toBeDefined();
    expect(result.current.confidentialityDetails.description).toBeDefined();
  });

  it("should handle errors when getting confidentiality details", () => {
    const errorService = {
      getComponentDetails: vi.fn(() => {
        throw new Error("Test error");
      }),
    };

    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", errorService)
    );

    expect(result.current.confidentialityDetails).toBeDefined();
  });

  it("should use fallback when service returns null for confidentiality details", () => {
    const nullService = {
      getComponentDetails: vi.fn(() => null),
    };

    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", nullService)
    );

    expect(result.current.confidentialityDetails).toBeDefined();
  });

  it("should get integrity details from service", () => {
    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", mockCIAContentService)
    );

    expect(result.current.integrityDetails).toBeDefined();
    expect(result.current.integrityDetails.description).toContain("integrity");
  });

  it("should use fallback for integrity details when service is null", () => {
    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", null)
    );

    expect(result.current.integrityDetails).toBeDefined();
    expect(result.current.integrityDetails.description).toBeDefined();
  });

  it("should handle errors when getting integrity details", () => {
    const errorService = {
      getComponentDetails: vi.fn(() => {
        throw new Error("Test error");
      }),
    };

    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", errorService)
    );

    expect(result.current.integrityDetails).toBeDefined();
  });

  it("should use fallback when service returns null for integrity details", () => {
    const nullService = {
      getComponentDetails: vi.fn(() => null),
    };

    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", nullService)
    );

    expect(result.current.integrityDetails).toBeDefined();
  });

  it("should get availability details from service", () => {
    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", mockCIAContentService)
    );

    expect(result.current.availabilityDetails).toBeDefined();
    expect(result.current.availabilityDetails.description).toContain("availability");
  });

  it("should use fallback for availability details when service is null", () => {
    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", null)
    );

    expect(result.current.availabilityDetails).toBeDefined();
    expect(result.current.availabilityDetails.description).toBeDefined();
  });

  it("should handle errors when getting availability details", () => {
    const errorService = {
      getComponentDetails: vi.fn(() => {
        throw new Error("Test error");
      }),
    };

    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", errorService)
    );

    expect(result.current.availabilityDetails).toBeDefined();
  });

  it("should use fallback when service returns null for availability details", () => {
    const nullService = {
      getComponentDetails: vi.fn(() => null),
    };

    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", nullService)
    );

    expect(result.current.availabilityDetails).toBeDefined();
  });

  it("should calculate confidentiality complexity", () => {
    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "Moderate", "Low", null)
    );

    expect(result.current.confidentialityComplexity).toBeDefined();
    expect(result.current.confidentialityComplexity.value).toBeGreaterThanOrEqual(0);
    expect(result.current.confidentialityComplexity.label).toBeDefined();
  });

  it("should calculate integrity complexity", () => {
    const { result } = renderHook(() =>
      useTechnicalDetailsData("Low", "High", "Moderate", null)
    );

    expect(result.current.integrityComplexity).toBeDefined();
    expect(result.current.integrityComplexity.value).toBeGreaterThanOrEqual(0);
    expect(result.current.integrityComplexity.label).toBeDefined();
  });

  it("should calculate availability complexity", () => {
    const { result } = renderHook(() =>
      useTechnicalDetailsData("Very High", "Low", "Moderate", null)
    );

    expect(result.current.availabilityComplexity).toBeDefined();
    expect(result.current.availabilityComplexity.value).toBeGreaterThanOrEqual(0);
    expect(result.current.availabilityComplexity.label).toBeDefined();
  });

  it("should calculate complexity values correctly for different security levels", () => {
    const { result: resultNone } = renderHook(() =>
      useTechnicalDetailsData("None", "None", "None", null)
    );
    const { result: resultLow } = renderHook(() =>
      useTechnicalDetailsData("Low", "Low", "Low", null)
    );
    const { result: resultModerate } = renderHook(() =>
      useTechnicalDetailsData("Moderate", "Moderate", "Moderate", null)
    );
    const { result: resultHigh } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", null)
    );
    const { result: resultVeryHigh } = renderHook(() =>
      useTechnicalDetailsData("Very High", "Very High", "Very High", null)
    );

    // Complexity values should increase or stay equal as security level increases
    expect(resultNone.current.confidentialityComplexity.value).toBeLessThan(
      resultLow.current.confidentialityComplexity.value
    );
    expect(resultLow.current.confidentialityComplexity.value).toBeLessThanOrEqual(
      resultModerate.current.confidentialityComplexity.value
    );
    expect(resultModerate.current.confidentialityComplexity.value).toBeLessThanOrEqual(
      resultHigh.current.confidentialityComplexity.value
    );
    expect(resultHigh.current.confidentialityComplexity.value).toBeLessThanOrEqual(
      resultVeryHigh.current.confidentialityComplexity.value
    );
  });

  it("should provide getTechnicalDescription function", () => {
    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", mockCIAContentService)
    );

    expect(typeof result.current.getTechnicalDescription).toBe("function");
    const description = result.current.getTechnicalDescription("confidentiality", "High");
    expect(description).toBeDefined();
    expect(typeof description).toBe("string");
  });

  it("should provide getTechnicalRequirements function", () => {
    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", mockCIAContentService)
    );

    expect(typeof result.current.getTechnicalRequirements).toBe("function");
    const requirements = result.current.getTechnicalRequirements("confidentiality", "High");
    expect(Array.isArray(requirements)).toBe(true);
    expect(requirements).toEqual(["Requirement 1", "Requirement 2"]);
  });

  it("should use fallback for technical requirements when service is null", () => {
    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", null)
    );

    const requirements = result.current.getTechnicalRequirements("confidentiality", "High");
    expect(Array.isArray(requirements)).toBe(true);
    expect(requirements.length).toBeGreaterThan(0);
  });

  it("should handle errors when getting technical requirements", () => {
    const errorService = {
      getTechnicalRequirements: vi.fn(() => {
        throw new Error("Test error");
      }),
    };

    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", errorService)
    );

    const requirements = result.current.getTechnicalRequirements("confidentiality", "High");
    expect(Array.isArray(requirements)).toBe(true);
  });

  it("should use fallback when service returns empty array for requirements", () => {
    const emptyService = {
      getTechnicalRequirements: vi.fn(() => []),
    };

    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", emptyService)
    );

    const requirements = result.current.getTechnicalRequirements("confidentiality", "High");
    expect(Array.isArray(requirements)).toBe(true);
    expect(requirements.length).toBeGreaterThan(0);
  });

  it("should use fallback when service returns non-array for requirements", () => {
    const invalidService = {
      getTechnicalRequirements: vi.fn(() => "not an array"),
    };

    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", invalidService)
    );

    const requirements = result.current.getTechnicalRequirements("confidentiality", "High");
    expect(Array.isArray(requirements)).toBe(true);
  });

  it("should provide getTechnologies function", () => {
    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", mockCIAContentService)
    );

    expect(typeof result.current.getTechnologies).toBe("function");
    const technologies = result.current.getTechnologies("confidentiality", "High");
    expect(typeof technologies).toBe("string");
    expect(technologies).toBeDefined();
  });

  it("should provide getConfigurations function", () => {
    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", mockCIAContentService)
    );

    expect(typeof result.current.getConfigurations).toBe("function");
    const configurations = result.current.getConfigurations("confidentiality", "High");
    expect(typeof configurations).toBe("string");
    expect(configurations).toBeDefined();
  });

  it("should provide getExpertiseRequired function", () => {
    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", mockCIAContentService)
    );

    expect(typeof result.current.getExpertiseRequired).toBe("function");
    const expertise = result.current.getExpertiseRequired("confidentiality", "High");
    expect(Array.isArray(expertise)).toBe(true);
    expect(expertise).toEqual(["Expert 1", "Expert 2"]);
  });

  it("should use fallback for expertise when service is null", () => {
    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", null)
    );

    const expertise = result.current.getExpertiseRequired("confidentiality", "High");
    expect(Array.isArray(expertise)).toBe(true);
    expect(expertise.length).toBeGreaterThan(0);
  });

  it("should handle errors when getting expertise requirements", () => {
    const errorService = {
      getRequiredExpertise: vi.fn(() => {
        throw new Error("Test error");
      }),
    };

    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", errorService)
    );

    const expertise = result.current.getExpertiseRequired("confidentiality", "High");
    expect(Array.isArray(expertise)).toBe(true);
  });

  it("should use fallback when service returns empty array for expertise", () => {
    const emptyService = {
      getRequiredExpertise: vi.fn(() => []),
    };

    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", emptyService)
    );

    const expertise = result.current.getExpertiseRequired("confidentiality", "High");
    expect(Array.isArray(expertise)).toBe(true);
    expect(expertise.length).toBeGreaterThan(0);
  });

  it("should use fallback when service returns non-array for expertise", () => {
    const invalidService = {
      getRequiredExpertise: vi.fn(() => "not an array"),
    };

    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "High", "High", invalidService)
    );

    const expertise = result.current.getExpertiseRequired("confidentiality", "High");
    expect(Array.isArray(expertise)).toBe(true);
  });

  it("should work with all CIA components", () => {
    const { result } = renderHook(() =>
      useTechnicalDetailsData("High", "Moderate", "Low", mockCIAContentService)
    );

    // Test each component
    const confTech = result.current.getTechnologies("confidentiality", "High");
    const intTech = result.current.getTechnologies("integrity", "Moderate");
    const avTech = result.current.getTechnologies("availability", "Low");

    expect(confTech).toBeDefined();
    expect(intTech).toBeDefined();
    expect(avTech).toBeDefined();
  });

  it("should work with all security levels", () => {
    const levels: Array<"None" | "Low" | "Moderate" | "High" | "Very High"> = [
      "None",
      "Low",
      "Moderate",
      "High",
      "Very High",
    ];

    levels.forEach((level) => {
      const { result } = renderHook(() =>
        useTechnicalDetailsData(level, level, level, null)
      );

      expect(result.current.confidentialityDetails).toBeDefined();
      expect(result.current.integrityDetails).toBeDefined();
      expect(result.current.availabilityDetails).toBeDefined();
      expect(result.current.confidentialityComplexity).toBeDefined();
      expect(result.current.integrityComplexity).toBeDefined();
      expect(result.current.availabilityComplexity).toBeDefined();
    });
  });

  it("should memoize details correctly on re-renders", () => {
    const { result, rerender } = renderHook(
      ({ a, i, c }) => useTechnicalDetailsData(a, i, c, mockCIAContentService),
      {
        initialProps: {
          a: "High" as const,
          i: "High" as const,
          c: "High" as const,
        },
      }
    );

    const firstDetails = result.current.confidentialityDetails;

    // Re-render with same props
    rerender({
      a: "High" as const,
      i: "High" as const,
      c: "High" as const,
    });

    // Should be the same object reference (memoized)
    expect(result.current.confidentialityDetails).toBe(firstDetails);
  });

  it("should update details when security level changes", () => {
    const { result, rerender } = renderHook(
      ({ a, i, c }) => useTechnicalDetailsData(a, i, c, null),
      {
        initialProps: {
          a: "Low" as const,
          i: "Low" as const,
          c: "Low" as const,
        },
      }
    );

    const firstComplexity = result.current.confidentialityComplexity.value;

    // Re-render with different props
    rerender({
      a: "Very High" as const,
      i: "Very High" as const,
      c: "Very High" as const,
    });

    // Complexity should be different
    expect(result.current.confidentialityComplexity.value).not.toBe(firstComplexity);
    expect(result.current.confidentialityComplexity.value).toBeGreaterThan(firstComplexity);
  });
});
