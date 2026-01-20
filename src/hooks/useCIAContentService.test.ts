import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CIAContentService } from "../services/ciaContentService";
import { useCIAContentService } from "./useCIAContentService";

// Hoist mock definition to the top to avoid reference errors
const mockCIAService = vi.hoisted(() => ({
  // Core methods that the tests rely on
  getComponentDetails: vi.fn().mockReturnValue({ description: "mock details" }),
  getSecurityMetrics: vi.fn().mockReturnValue({ score: 50 }),
  getBusinessImpact: vi.fn().mockReturnValue({ summary: "mock impact" }),
  calculateBusinessImpactLevel: vi.fn().mockReturnValue("Moderate"),
  initialize: vi.fn().mockResolvedValue(undefined),
  // Additional methods needed for the tests
  getComponentContent: vi.fn(),
  getCIAOptions: vi.fn(),
  getRecommendations: vi.fn(),
  getSecurityLevelDescription: vi.fn(),
  // Include any required properties from CIAContentService to satisfy TypeScript
  dataProvider: {},
  businessImpactService: {},
  complianceService: {},
  securityMetricsService: {},
  technicalImplementationService: {},
  securityResourceService: {},
})) as unknown as CIAContentService;

// Mock the imports needed by the hook
vi.mock("../services/ciaContentService", () => ({
  createCIAContentService: vi.fn().mockReturnValue(mockCIAService),
}));

// Import the mocks directly to be able to modify their behavior
const mockedModule = vi.mocked(await import("../services/ciaContentService"));

// Mock the utils module
vi.mock("../utils", () => ({
  // Provide both functions used from the utils module
  toErrorObject: vi.fn((err) =>
    err instanceof Error ? err : new Error(String(err)),
  ),
  formatError: vi.fn((err, prefix) =>
    prefix ? `${prefix}: ${String(err)}` : String(err),
  ),
}));

describe("useCIAContentService", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Reset the createCIAContentService implementation to default
    mockedModule.createCIAContentService.mockReturnValue(mockCIAService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return a CIAContentService instance", async () => {
    const { result } = renderHook(() => useCIAContentService());
    expect(result.current).toBeDefined();
    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("should provide refresh function", async () => {
    const { result } = renderHook(() => useCIAContentService());

    // Wait for initial loading to complete
    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Reset the mock to track new calls
    vi.clearAllMocks();

    // Call refresh and verify it works - we need to wrap in act
    act(() => {
      result.current.refresh();
    });

    // The loading state should be true right after calling refresh
    expect(result.current.isLoading).toBe(true);

    // After waiting, it should be false again
    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("should handle errors gracefully", async () => {
    // Mock createCIAContentService to throw an error
    const mockError = new Error("Service initialization failed");

    // Setup the mock to throw an error
    mockedModule.createCIAContentService.mockImplementationOnce(() => {
      throw mockError;
    });

    const { result } = renderHook(() => useCIAContentService());

    // Wait for the hook to finish processing
    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(
        "Service initialization failed",
      );
    });
  });
});
