import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCIADataProvider } from "./useCIADataProvider";

// Mock the data provider module
vi.mock("../services/dataProviders", () => ({
  createDefaultDataProvider: vi.fn(() => ({
    availabilityOptions: { minimal: { description: "Test" } },
    integrityOptions: { minimal: { description: "Test" } },
    confidentialityOptions: { minimal: { description: "Test" } },
    roiEstimates: { minimal: { roi: 10 } },
  })),
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
    const { result } = renderHook(() => useCIADataProvider());

    // Wait for initialization to complete
    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

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
    const { result } = renderHook(() => useCIADataProvider());

    // Wait for initialization to complete
    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    // Pre-refresh checks
    expect(result.current.isLoading).toBe(false);
    const originalProvider = result.current.dataProvider;

    // Perform refresh
    await act(async () => {
      await result.current.refreshDataProvider();
    });

    // Wait for refresh to complete
    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    // Post-refresh checks
    expect(result.current.dataProvider).not.toBe(null);
    expect(result.current.dataProvider).not.toBe(originalProvider);
  });

  it("should handle errors during initialization", async () => {
    // Mock the module to throw an error
    vi.resetModules();
    vi.doMock("../services/dataProviders", () => ({
      createDefaultDataProvider: vi.fn(() => {
        throw new Error("Test initialization error");
      }),
    }));

    const { useCIADataProvider: useCIADataProviderWithError } = await import(
      "./useCIADataProvider"
    );
    const { result } = renderHook(() => useCIADataProviderWithError());

    // Wait for error handling to complete
    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    expect(result.current.error).not.toBe(null);
    expect(result.current.error?.message).toBe("Test initialization error");
    expect(result.current.dataProvider).toBe(null);
  });

  it("should handle non-Error exceptions during initialization", async () => {
    // Mock the module to throw a non-Error value
    vi.resetModules();
    vi.doMock("../services/dataProviders", () => ({
      createDefaultDataProvider: vi.fn(() => {
        throw "String error"; // eslint-disable-line no-throw-literal
      }),
    }));

    const { useCIADataProvider: useCIADataProviderWithError } = await import(
      "./useCIADataProvider"
    );
    const { result } = renderHook(() => useCIADataProviderWithError());

    // Wait for error handling to complete
    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    expect(result.current.error).not.toBe(null);
    expect(result.current.error?.message).toBe(
      "Failed to initialize data provider"
    );
    expect(result.current.dataProvider).toBe(null);
  });
});
