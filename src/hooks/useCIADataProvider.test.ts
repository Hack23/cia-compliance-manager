import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCIADataProvider } from "./useCIADataProvider";

// Mock the data provider module
vi.mock("../data/ciaOptionsData", () => ({
  defaultCIADataProvider: {
    availabilityOptions: { minimal: { description: "Test" } },
    integrityOptions: { minimal: { description: "Test" } },
    confidentialityOptions: { minimal: { description: "Test" } },
    roiEstimates: { minimal: { roi: 10 } },
    initialize: vi.fn().mockResolvedValue(true),
  },
}));

describe("useCIADataProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with loading state", async () => {
    const { result } = renderHook(() => useCIADataProvider());

    // Initially should be in loading state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.dataProvider).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it("should provide data provider after initialization", async () => {
    const { result, rerender } = renderHook(() => useCIADataProvider());

    // Mock async initialization
    await act(async () => {
      // Wait for initialization to complete
      await new Promise((resolve) => setTimeout(resolve, 0));
      rerender();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.dataProvider).not.toBe(null);
    expect(result.current.dataProvider).toHaveProperty("availabilityOptions");
    expect(result.current.dataProvider).toHaveProperty("integrityOptions");
    expect(result.current.dataProvider).toHaveProperty(
      "confidentialityOptions"
    );
    expect(result.current.dataProvider).toHaveProperty("roiEstimates");
  });

  it("should allow refreshing the data provider", async () => {
    const { result, rerender } = renderHook(() => useCIADataProvider());

    // Mock async initialization
    await act(async () => {
      // Wait for initialization to complete
      await new Promise((resolve) => setTimeout(resolve, 0));
      rerender();
    });

    // Pre-refresh checks
    expect(result.current.isLoading).toBe(false);

    // Perform refresh - using the correct method name
    await act(async () => {
      result.current.refreshDataProvider();
      // Wait for refresh to complete
      await new Promise((resolve) => setTimeout(resolve, 0));
      rerender();
    });

    // Post-refresh checks
    expect(result.current.isLoading).toBe(false);
    expect(result.current.dataProvider).not.toBe(null);
  });
});
