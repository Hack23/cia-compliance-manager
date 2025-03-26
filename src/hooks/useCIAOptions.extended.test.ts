import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCIAOptions } from "./useCIAOptions";

describe("useCIAOptions - Extended Tests", () => {
  it("returns correct availability options", () => {
    const { result } = renderHook(() => useCIAOptions());

    expect(result.current.getAvailabilityOptions()).toBeDefined();
    expect(Object.keys(result.current.getAvailabilityOptions())).toContain(
      "None"
    );
    expect(Object.keys(result.current.getAvailabilityOptions())).toContain(
      "Low"
    );
    expect(Object.keys(result.current.getAvailabilityOptions())).toContain(
      "Moderate"
    );
    expect(Object.keys(result.current.getAvailabilityOptions())).toContain(
      "High"
    );
    expect(Object.keys(result.current.getAvailabilityOptions())).toContain(
      "Very High"
    );
  });

  it("returns correct integrity options", () => {
    const { result } = renderHook(() => useCIAOptions());

    expect(result.current.getIntegrityOptions()).toBeDefined();
    expect(Object.keys(result.current.getIntegrityOptions())).toContain("None");
    expect(Object.keys(result.current.getIntegrityOptions())).toContain("Low");
    expect(Object.keys(result.current.getIntegrityOptions())).toContain(
      "Moderate"
    );
    expect(Object.keys(result.current.getIntegrityOptions())).toContain("High");
    expect(Object.keys(result.current.getIntegrityOptions())).toContain(
      "Very High"
    );
  });

  it("returns correct confidentiality options", () => {
    const { result } = renderHook(() => useCIAOptions());

    expect(result.current.getConfidentialityOptions()).toBeDefined();
    expect(Object.keys(result.current.getConfidentialityOptions())).toContain(
      "None"
    );
    expect(Object.keys(result.current.getConfidentialityOptions())).toContain(
      "Low"
    );
    expect(Object.keys(result.current.getConfidentialityOptions())).toContain(
      "Moderate"
    );
    expect(Object.keys(result.current.getConfidentialityOptions())).toContain(
      "High"
    );
    expect(Object.keys(result.current.getConfidentialityOptions())).toContain(
      "Very High"
    );
  });

  it("returns correct ROI estimates", () => {
    const { result } = renderHook(() => useCIAOptions());

    expect(result.current.getROIEstimates()).toBeDefined();
    expect(Object.keys(result.current.getROIEstimates())).toContain("NONE");
    expect(Object.keys(result.current.getROIEstimates())).toContain("LOW");
    expect(Object.keys(result.current.getROIEstimates())).toContain("MODERATE");
    expect(Object.keys(result.current.getROIEstimates())).toContain("HIGH");
    expect(Object.keys(result.current.getROIEstimates())).toContain(
      "VERY_HIGH"
    );
  });

  it("gets ROI estimate for security level", () => {
    const { result } = renderHook(() => useCIAOptions());

    expect(result.current.getROIEstimateForSecurityLevel("None")).toBe("NONE");
    expect(result.current.getROIEstimateForSecurityLevel("Low")).toBe("LOW");
    expect(result.current.getROIEstimateForSecurityLevel("Moderate")).toBe(
      "MODERATE"
    );
    expect(result.current.getROIEstimateForSecurityLevel("High")).toBe("HIGH");
    expect(result.current.getROIEstimateForSecurityLevel("Very High")).toBe(
      "VERY_HIGH"
    );
  });

  it("gets combined ROI key from levels", () => {
    const { result } = renderHook(() => useCIAOptions());

    expect(result.current.getCombinedROIKey("None", "None", "None")).toBe(
      "NONE"
    );
    expect(result.current.getCombinedROIKey("Low", "None", "None")).toBe("LOW");
    expect(result.current.getCombinedROIKey("Moderate", "Low", "Low")).toBe(
      "MODERATE"
    );
    expect(result.current.getCombinedROIKey("High", "High", "Moderate")).toBe(
      "HIGH"
    );
    expect(result.current.getCombinedROIKey("Very High", "High", "High")).toBe(
      "VERY_HIGH"
    );
  });

  it("gets ROI data for combined key", () => {
    const { result } = renderHook(() => useCIAOptions());

    const noneData = result.current.getROIDataForCombinedKey("NONE");
    expect(noneData).toBeDefined();
    expect(noneData.returnRate).toBe("0%");

    const highData = result.current.getROIDataForCombinedKey("HIGH");
    expect(highData).toBeDefined();
    expect(highData.returnRate).not.toBe("0%");
  });
});
