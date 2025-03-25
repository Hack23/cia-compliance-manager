import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCIAContentService } from "./useCIAContentService";

// Create mocked implementations
const mockCIAService = {
  getComponentDetails: vi.fn().mockReturnValue({ description: "mock details" }),
  getSecurityMetrics: vi.fn().mockReturnValue({ score: 50 }),
  getBusinessImpact: vi.fn().mockReturnValue({ summary: "mock impact" }),
  calculateBusinessImpactLevel: vi.fn().mockReturnValue("Moderate"),
  initialize: vi.fn().mockResolvedValue(undefined),
};

// Mock the imports needed by the hook
vi.mock("../services/ciaContentService", () => ({
  __esModule: true,
  CIAContentService: vi.fn().mockImplementation(() => mockCIAService),
  createCIAContentService: vi.fn().mockImplementation(() => mockCIAService),
}));

// Import the mocks directly to be able to modify their behavior
const mockedModule = vi.mocked(await import("../services/ciaContentService"));

// Mock error utility
vi.mock("../utils/errorUtils", () => ({
  __esModule: true,
  toErrorObject: vi
    .fn()
    .mockImplementation((err) =>
      err instanceof Error ? err : new Error(String(err))
    ),
}));

describe("useCIAContentService", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Reset the createCIAContentService implementation to default
    mockedModule.createCIAContentService.mockImplementation(
      () => mockCIAService
    );
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
        "Service initialization failed"
      );
    });
  });
});
