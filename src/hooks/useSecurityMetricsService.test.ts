import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useSecurityMetricsService } from "./useSecurityMetricsService";

// Mock the data provider hook
vi.mock("./useCIADataProvider", () => ({
  useCIADataProvider: vi.fn(() => ({
    dataProvider: {
      availabilityOptions: { None: { description: "Test" } },
      integrityOptions: { None: { description: "Test" } },
      confidentialityOptions: { None: { description: "Test" } },
      roiEstimates: { NONE: { returnRate: "0%", description: "No ROI" } },
    },
    isLoading: false,
    error: null,
  })),
}));

describe("useSecurityMetricsService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should provide security metrics service after initialization", async () => {
    const { result } = renderHook(() => useSecurityMetricsService());

    // Wait for initialization to complete
    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    expect(result.current.error).toBe(null);
    expect(result.current.securityMetricsService).toBeDefined();
  });

  it("should return SecurityMetricsService instance with expected methods", async () => {
    const { result } = renderHook(() => useSecurityMetricsService());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    const service = result.current.securityMetricsService;
    expect(service).toBeDefined();

    // Test that service has expected methods
    expect(typeof service?.getSecurityMetrics).toBe("function");
    expect(typeof service?.calculateRoi).toBe("function");
    expect(typeof service?.getROIEstimates).toBe("function");
  });

  it("should provide service that can calculate security metrics", async () => {
    const { result } = renderHook(() => useSecurityMetricsService());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    const service = result.current.securityMetricsService;
    expect(service).toBeDefined();

    // Test security metrics calculation
    const metrics = service?.getSecurityMetrics("High", "High", "High");
    expect(metrics).toBeDefined();
  });

  it("should provide service that can calculate ROI", async () => {
    const { result } = renderHook(() => useSecurityMetricsService());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    const service = result.current.securityMetricsService;
    expect(service).toBeDefined();

    // Test ROI calculation
    const roi = service?.calculateRoi("High", 100000);
    expect(roi).toBeDefined();
    expect(roi).toHaveProperty("returnOnInvestment");
  });

  it("should provide service that can get ROI estimates", async () => {
    const { result } = renderHook(() => useSecurityMetricsService());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    const service = result.current.securityMetricsService;
    expect(service).toBeDefined();

    // Test ROI estimates
    const estimates = service?.getROIEstimates();
    expect(estimates).toBeDefined();
    expect(typeof estimates).toBe("object");
  });

  it("should allow refreshing the service", async () => {
    const { result } = renderHook(() => useSecurityMetricsService());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    const originalService = result.current.securityMetricsService;

    // Refresh the service
    result.current.refreshService();

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    expect(result.current.securityMetricsService).toBeDefined();
    // Service should be a new instance after refresh
    expect(result.current.securityMetricsService).not.toBe(originalService);
  });

  it("should handle initialization when dataProvider is null", async () => {
    // Mock useCIADataProvider to return null dataProvider
    vi.resetModules();
    vi.doMock("./useCIADataProvider", () => ({
      useCIADataProvider: vi.fn(() => ({
        dataProvider: null,
        isLoading: false,
        error: null,
      })),
    }));

    const { useSecurityMetricsService: useServiceWithoutProvider } = await import(
      "./useSecurityMetricsService"
    );
    const { result } = renderHook(() => useServiceWithoutProvider());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    // Should still create a service even without dataProvider
    expect(result.current.securityMetricsService).toBeDefined();
    expect(result.current.error).toBe(null);
  });

  it("should handle errors during initialization", async () => {
    // Mock to throw an error
    vi.resetModules();
    vi.doMock("./useCIADataProvider", () => ({
      useCIADataProvider: vi.fn(() => {
        throw new Error("Test initialization error");
      }),
    }));

    const { useSecurityMetricsService: useServiceWithError } = await import(
      "./useSecurityMetricsService"
    );
    
    // Expect the hook to handle the error
    expect(() => renderHook(() => useServiceWithError())).toThrow();
  });

  it("should not have error after successful initialization", async () => {
    const { result } = renderHook(() => useSecurityMetricsService());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    expect(result.current.error).toBe(null);
  });
});
