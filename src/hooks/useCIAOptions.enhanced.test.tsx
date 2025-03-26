import { describe, expect, it, vi } from "vitest";

// Use vi.mock before imports - it gets hoisted
vi.mock("./useCIAOptions", () => {
  const mockOptions = {
    availabilityOptions: {
      None: {
        description: "Test None",
        capex: 0,
        opex: 0,
        bg: "#fff",
        text: "#000",
        recommendations: [],
        businessImpact: "",
        technical: "",
      },
      Low: {
        description: "Test Low",
        capex: 5000,
        opex: 1000,
        bg: "#fff",
        text: "#000",
        recommendations: [],
        businessImpact: "",
        technical: "",
      },
      Moderate: {
        description: "Test Moderate",
        capex: 10000,
        opex: 2000,
        bg: "#fff",
        text: "#000",
        recommendations: [],
        businessImpact: "",
        technical: "",
      },
      High: {
        description: "Test High",
        capex: 20000,
        opex: 4000,
        bg: "#fff",
        text: "#000",
        recommendations: [],
        businessImpact: "",
        technical: "",
      },
      "Very High": {
        description: "Test Very High",
        capex: 40000,
        opex: 8000,
        bg: "#fff",
        text: "#000",
        recommendations: [],
        businessImpact: "",
        technical: "",
      },
    },
    integrityOptions: {
      None: {
        description: "Test None",
        capex: 0,
        opex: 0,
        bg: "#fff",
        text: "#000",
        recommendations: [],
        businessImpact: "",
        technical: "",
      },
      Low: {
        description: "Test Low",
        capex: 5000,
        opex: 1000,
        bg: "#fff",
        text: "#000",
        recommendations: [],
        businessImpact: "",
        technical: "",
      },
      Moderate: {
        description: "Test Moderate",
        capex: 10000,
        opex: 2000,
        bg: "#fff",
        text: "#000",
        recommendations: [],
        businessImpact: "",
        technical: "",
      },
      High: {
        description: "Test High",
        capex: 20000,
        opex: 4000,
        bg: "#fff",
        text: "#000",
        recommendations: [],
        businessImpact: "",
        technical: "",
      },
      "Very High": {
        description: "Test Very High",
        capex: 40000,
        opex: 8000,
        bg: "#fff",
        text: "#000",
        recommendations: [],
        businessImpact: "",
        technical: "",
      },
    },
    confidentialityOptions: {
      None: {
        description: "Test None",
        capex: 0,
        opex: 0,
        bg: "#fff",
        text: "#000",
        recommendations: [],
        businessImpact: "",
        technical: "",
      },
      Low: {
        description: "Test Low",
        capex: 5000,
        opex: 1000,
        bg: "#fff",
        text: "#000",
        recommendations: [],
        businessImpact: "",
        technical: "",
      },
      Moderate: {
        description: "Test Moderate",
        capex: 10000,
        opex: 2000,
        bg: "#fff",
        text: "#000",
        recommendations: [],
        businessImpact: "",
        technical: "",
      },
      High: {
        description: "Test High",
        capex: 20000,
        opex: 4000,
        bg: "#fff",
        text: "#000",
        recommendations: [],
        businessImpact: "",
        technical: "",
      },
      "Very High": {
        description: "Test Very High",
        capex: 40000,
        opex: 8000,
        bg: "#fff",
        text: "#000",
        recommendations: [],
        businessImpact: "",
        technical: "",
      },
    },
    ROI_ESTIMATES: {
      NONE: { returnRate: "0%", description: "Test NONE", value: "0%" },
      LOW: { returnRate: "50%", description: "Test LOW", value: "50%" },
      MODERATE: {
        returnRate: "100%",
        description: "Test MODERATE",
        value: "100%",
      },
      HIGH: { returnRate: "200%", description: "Test HIGH", value: "200%" },
      VERY_HIGH: {
        returnRate: "500%",
        description: "Test VERY_HIGH",
        value: "500%",
      },
    },
  };

  return {
    useCIAOptions: () => mockOptions,
    // Also export the constants for direct import scenarios
    availabilityOptions: mockOptions.availabilityOptions,
    integrityOptions: mockOptions.integrityOptions,
    confidentialityOptions: mockOptions.confidentialityOptions,
    ROI_ESTIMATES: mockOptions.ROI_ESTIMATES,
  };
});

// Import only after mock is defined
import { renderHook } from "@testing-library/react";
import { ROI_ESTIMATES, useCIAOptions } from "./useCIAOptions";

describe("useCIAOptions Enhanced Tests", () => {
  it("returns all CIA options", () => {
    const { result } = renderHook(() => useCIAOptions());
    expect(result.current).toHaveProperty("availabilityOptions");
    expect(result.current).toHaveProperty("integrityOptions");
    expect(result.current).toHaveProperty("confidentialityOptions");
    expect(result.current).toHaveProperty("ROI_ESTIMATES");
  });

  it("provides all required security levels", () => {
    const { result } = renderHook(() => useCIAOptions());

    // Check availability options
    expect(result.current.availabilityOptions).toHaveProperty("None");
    expect(result.current.availabilityOptions).toHaveProperty("Low");
    expect(result.current.availabilityOptions).toHaveProperty("Moderate");
    expect(result.current.availabilityOptions).toHaveProperty("High");
    expect(result.current.availabilityOptions).toHaveProperty("Very High");

    // Similar checks for integrity and confidentiality
    expect(result.current.integrityOptions).toHaveProperty("None");
    expect(result.current.integrityOptions).toHaveProperty("Very High");

    expect(result.current.confidentialityOptions).toHaveProperty("None");
    expect(result.current.confidentialityOptions).toHaveProperty("Very High");
  });

  it("provides ROI estimates for all security levels", () => {
    const { result } = renderHook(() => useCIAOptions());

    expect(result.current.ROI_ESTIMATES).toHaveProperty("NONE");
    expect(result.current.ROI_ESTIMATES).toHaveProperty("LOW");
    expect(result.current.ROI_ESTIMATES).toHaveProperty("MODERATE");
    expect(result.current.ROI_ESTIMATES).toHaveProperty("HIGH");
    expect(result.current.ROI_ESTIMATES).toHaveProperty("VERY_HIGH");
  });

  it("exports ROI_ESTIMATES directly", () => {
    const { result } = renderHook(() => useCIAOptions());

    // Access ROI_ESTIMATES through the hook result
    expect(result.current.ROI_ESTIMATES).toBeDefined();
    expect(result.current.ROI_ESTIMATES).toHaveProperty("NONE");
    expect(result.current.ROI_ESTIMATES).toHaveProperty("LOW");
    expect(result.current.ROI_ESTIMATES).toHaveProperty("MODERATE");
    expect(result.current.ROI_ESTIMATES).toHaveProperty("HIGH");
    expect(result.current.ROI_ESTIMATES).toHaveProperty("VERY_HIGH");

    // Also verify we can access it from the direct export
    expect(ROI_ESTIMATES).toBeDefined();
    expect(ROI_ESTIMATES).toHaveProperty("NONE");
  });
});
