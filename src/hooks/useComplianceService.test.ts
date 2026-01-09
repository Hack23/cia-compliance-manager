import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useComplianceService } from "./useComplianceService";

describe("useComplianceService", () => {
  it("should provide compliance service immediately", () => {
    const { result } = renderHook(() => useComplianceService());

    // Service should be available immediately
    expect(result.current.complianceService).toBeDefined();
    expect(result.current.error).toBe(null);
  });

  it("should provide compliance service after initialization", async () => {
    const { result } = renderHook(() => useComplianceService());

    // Wait for initialization to complete
    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    expect(result.current.error).toBe(null);
    expect(result.current.complianceService).toBeDefined();
    expect(result.current.complianceService).toHaveProperty(
      "getComplianceStatus"
    );
  });

  it("should return ComplianceServiceAdapter instance", async () => {
    const { result } = renderHook(() => useComplianceService());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    const service = result.current.complianceService;
    expect(service).toBeDefined();
    
    // Test that service has expected methods
    expect(typeof service.getComplianceStatus).toBe("function");
    expect(typeof service.getCompliantFrameworks).toBe("function");
    expect(typeof service.getFrameworkStatus).toBe("function");
  });

  it("should provide compliance service that can get compliance status", async () => {
    const { result } = renderHook(() => useComplianceService());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    const service = result.current.complianceService;
    // Pass individual parameters as expected by the service
    const status = service.getComplianceStatus(
      "High",
      "High",
      "High"
    );

    expect(status).toBeDefined();
    expect(status).toHaveProperty("compliantFrameworks");
    expect(status).toHaveProperty("nonCompliantFrameworks");
    expect(Array.isArray(status.compliantFrameworks)).toBe(true);
    expect(Array.isArray(status.nonCompliantFrameworks)).toBe(true);
  });

  it("should maintain the same service instance across re-renders", async () => {
    const { result, rerender } = renderHook(() => useComplianceService());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    const firstInstance = result.current.complianceService;

    // Re-render the hook
    rerender();

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    const secondInstance = result.current.complianceService;

    // Should be the same instance due to useMemo
    expect(firstInstance).toBe(secondInstance);
  });

  it("should not have error after successful initialization", async () => {
    const { result } = renderHook(() => useComplianceService());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    expect(result.current.error).toBe(null);
  });

  it("should handle different security levels", async () => {
    const { result } = renderHook(() => useComplianceService());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    const service = result.current.complianceService;

    // Test with different security levels
    const status1 = service.getComplianceStatus("None", "None", "None");
    expect(status1).toBeDefined();

    const status2 = service.getComplianceStatus("Low", "Moderate", "High");
    expect(status2).toBeDefined();

    const status3 = service.getComplianceStatus("Very High", "Very High", "Very High");
    expect(status3).toBeDefined();
  });

  it("should provide compliant frameworks method", async () => {
    const { result } = renderHook(() => useComplianceService());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    const service = result.current.complianceService;
    const frameworks = service.getCompliantFrameworks("High");

    expect(Array.isArray(frameworks)).toBe(true);
  });

  it("should provide framework status method", async () => {
    const { result } = renderHook(() => useComplianceService());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 1000 }
    );

    const service = result.current.complianceService;
    const status = service.getFrameworkStatus("ISO 27001", "High", "High", "High");

    expect(status).toBeDefined();
    // Framework status returns an object with status information
    expect(typeof status).toBe("object");
  });
});
