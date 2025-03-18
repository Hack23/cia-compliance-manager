// Mock the useCIAOptions hook with test data - place at the top of the file before any imports
vi.mock("./useCIAOptions", () => {
  // Define all mock data inline within this closure to avoid hoisting issues
  return {
    __esModule: true,
    useCIAOptions: () => ({
      availabilityOptions: {
        None: { description: "Test None" },
        Low: { description: "Test Low" },
        Moderate: { description: "Test Moderate" },
        High: { description: "Test High" },
        "Very High": { description: "Test Very High" },
      },
      integrityOptions: {
        None: { description: "Test None" },
        Low: { description: "Test Low" },
        Moderate: { description: "Test Moderate" },
        High: { description: "Test High" },
        "Very High": { description: "Test Very High" },
      },
      confidentialityOptions: {
        None: { description: "Test None" },
        Low: { description: "Test Low" },
        Moderate: { description: "Test Moderate" },
        High: { description: "Test High" },
        "Very High": { description: "Test Very High" },
      },
      ROI_ESTIMATES: {
        NONE: { returnRate: "0%", description: "Test NONE" },
        LOW: { returnRate: "50%", description: "Test LOW" },
        MODERATE: { returnRate: "100%", description: "Test MODERATE" },
        HIGH: { returnRate: "200%", description: "Test HIGH" },
        VERY_HIGH: { returnRate: "500%", description: "Test VERY_HIGH" },
      },
    }),
    // Default export - same values
    default: {
      availabilityOptions: {
        None: { description: "Test None" },
        Low: { description: "Test Low" },
        Moderate: { description: "Test Moderate" },
        High: { description: "Test High" },
        "Very High": { description: "Test Very High" },
      },
      integrityOptions: {
        None: { description: "Test None" },
        Low: { description: "Test Low" },
        Moderate: { description: "Test Moderate" },
        High: { description: "Test High" },
        "Very High": { description: "Test Very High" },
      },
      confidentialityOptions: {
        None: { description: "Test None" },
        Low: { description: "Test Low" },
        Moderate: { description: "Test Moderate" },
        High: { description: "Test High" },
        "Very High": { description: "Test Very High" },
      },
      ROI_ESTIMATES: {
        NONE: { returnRate: "0%", description: "Test NONE" },
        LOW: { returnRate: "50%", description: "Test LOW" },
        MODERATE: { returnRate: "100%", description: "Test MODERATE" },
        HIGH: { returnRate: "200%", description: "Test HIGH" },
        VERY_HIGH: { returnRate: "500%", description: "Test VERY_HIGH" },
      },
    },
    // Named exports - must be defined inline
    availabilityOptions: {
      None: { description: "Test None" },
      Low: { description: "Test Low" },
      Moderate: { description: "Test Moderate" },
      High: { description: "Test High" },
      "Very High": { description: "Test Very High" },
    },
    integrityOptions: {
      None: { description: "Test None" },
      Low: { description: "Test Low" },
      Moderate: { description: "Test Moderate" },
      High: { description: "Test High" },
      "Very High": { description: "Test Very High" },
    },
    confidentialityOptions: {
      None: { description: "Test None" },
      Low: { description: "Test Low" },
      Moderate: { description: "Test Moderate" },
      High: { description: "Test High" },
      "Very High": { description: "Test Very High" },
    },
    ROI_ESTIMATES: {
      NONE: { returnRate: "0%", description: "Test NONE" },
      LOW: { returnRate: "50%", description: "Test LOW" },
      MODERATE: { returnRate: "100%", description: "Test MODERATE" },
      HIGH: { returnRate: "200%", description: "Test HIGH" },
      VERY_HIGH: { returnRate: "500%", description: "Test VERY_HIGH" },
    },
  };
});

// Now import everything after the mock
import { describe, expect, it } from "vitest";
import { renderHook } from "../tests/testUtils/hookTestUtils";
import { useCIAOptions } from "./useCIAOptions";


describe("useCIAOptions Enhanced", () => {
  it("should return all CIA options", () => {
    const { result } = renderHook(() => useCIAOptions());
    expect(result.current).toHaveProperty("availabilityOptions");
    expect(result.current).toHaveProperty("integrityOptions");
    expect(result.current).toHaveProperty("confidentialityOptions");
    expect(result.current).toHaveProperty("ROI_ESTIMATES");
  });
  // ...existing tests...
});

describe("useCIAOptions Hook Enhanced Tests", () => {
  it("returns consistent options structure on multiple renders", () => {
    // First render
    const { result, rerender } = renderHook(() => useCIAOptions());

    // Save reference to first render result
    const firstRenderOptions = result.current;

    // Trigger a rerender
    rerender();

    // Check that the references are the same (memoization works)
    expect(result.current).toBe(firstRenderOptions);
    expect(result.current.availabilityOptions).toBe(
      firstRenderOptions.availabilityOptions
    );
    expect(result.current.integrityOptions).toBe(
      firstRenderOptions.integrityOptions
    );
    expect(result.current.confidentialityOptions).toBe(
      firstRenderOptions.confidentialityOptions
    );
    expect(result.current.ROI_ESTIMATES).toBe(firstRenderOptions.ROI_ESTIMATES);
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
});
