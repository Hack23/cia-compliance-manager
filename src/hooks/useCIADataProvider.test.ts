import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import logger from "../utils/logger";
import { useCIADataProvider } from "./useCIADataProvider";

// Mock the logger to prevent console output during tests
vi.mock("../utils/logger", () => ({
  default: {
    error: vi.fn(),
    info: vi.fn(),
  },
}));

// Mock the fetch function or API module that would be used by the hook
vi.mock("../utils/api", () => ({
  fetchCIAData: vi.fn().mockImplementation(async () => {
    // Default mock implementation
    return {
      securityLevels: {
        availability: "Low",
        integrity: "Low",
        confidentiality: "Low",
      },
    };
  }),
}));

// Import the mocked module
import { fetchCIAData } from "../utils/api";

describe("useCIADataProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with loading state", () => {
    const { result } = renderHook(() => useCIADataProvider());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.ciaData).toBe(null);
  });

  it("updates security levels correctly", async () => {
    const { result } = renderHook(() => useCIADataProvider());

    // Wait for initial data to be loaded
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Update security levels
    act(() => {
      result.current.updateSecurityLevels("High", "High", "Very High");
    });

    // Check that levels were updated
    expect(result.current.ciaData?.securityLevels.availability).toBe("High");
    expect(result.current.ciaData?.securityLevels.integrity).toBe("High");
    expect(result.current.ciaData?.securityLevels.confidentiality).toBe(
      "Very High"
    );

    // Verify that the logger was called
    expect(logger.info).toHaveBeenCalledWith("Security levels updated", {
      availability: "High",
      integrity: "High",
      confidentiality: "Very High",
    });
  });

  it("handles errors gracefully", async () => {
    // Mock a fetch error for this test only
    (fetchCIAData as any).mockRejectedValueOnce(
      new Error("Failed to fetch data")
    );

    const { result } = renderHook(() => useCIADataProvider());

    // Wait for the error to be processed
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeTruthy();
    });

    // Logger should be called with the error
    expect(logger.error).toHaveBeenCalledWith(
      "Failed to load CIA data",
      expect.any(Error)
    );
  });
});
