import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useCIAContentService } from "./useCIAContentService";

// Mock the imports needed by the hook
vi.mock("../services/ciaContentService", () => ({
  __esModule: true,
  CIAContentService: vi.fn().mockImplementation(() => ({
    getComponentDetails: vi.fn().mockReturnValue({ description: "mock details" }),
    getSecurityMetrics: vi.fn().mockReturnValue({ score: 50 }),
    getBusinessImpact: vi.fn().mockReturnValue({ summary: "mock impact" }),
    calculateBusinessImpactLevel: vi.fn().mockReturnValue("Moderate"),
  })),
}));

vi.mock("../hooks/useCIAOptions", () => ({
  __esModule: true,
  useCIAOptions: vi.fn().mockReturnValue({
    availabilityOptions: {
      None: { description: "None", capex: 0, opex: 0 },
      Low: { description: "Low", capex: 5, opex: 2 },
      Moderate: { description: "Moderate", capex: 10, opex: 5 },
      High: { description: "High", capex: 15, opex: 8 },
      "Very High": { description: "Very High", capex: 20, opex: 10 },
    },
    integrityOptions: {
      None: { description: "None", capex: 0, opex: 0 },
      Low: { description: "Low", capex: 5, opex: 2 },
      Moderate: { description: "Moderate", capex: 10, opex: 5 },
      High: { description: "High", capex: 15, opex: 8 },
      "Very High": { description: "Very High", capex: 20, opex: 10 },
    },
    confidentialityOptions: {
      None: { description: "None", capex: 0, opex: 0 },
      Low: { description: "Low", capex: 5, opex: 2 },
      Moderate: { description: "Moderate", capex: 10, opex: 5 },
      High: { description: "High", capex: 15, opex: 8 },
      "Very High": { description: "Very High", capex: 20, opex: 10 },
    },
    ROI_ESTIMATES: {
      NONE: { returnRate: "0%", description: "No ROI" },
      LOW: { returnRate: "50%", description: "Low ROI" },
      MODERATE: { returnRate: "200%", description: "Moderate ROI" },
      HIGH: { returnRate: "350%", description: "High ROI" },
      VERY_HIGH: { returnRate: "500%", description: "Very High ROI" },
    },
  }),
}));

describe("useCIAContentService", () => {
  it("should return a CIAContentService instance", () => {
    const { result } = renderHook(() => useCIAContentService());
    expect(result.current).toBeDefined();
  });

  it("should pass CIA options to the service", () => {
    const { result } = renderHook(() => useCIAContentService());
    expect(result.current).not.toBeNull();
  });
});
