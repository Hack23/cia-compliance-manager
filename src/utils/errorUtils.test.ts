import { describe, expect, it, vi } from "vitest";
import {
  displayErrorMessage,
  formatErrorMessage,
  handleApiError,
  isErrorWithMessage,
} from "./errorUtils";

describe("errorUtils", () => {
  describe("isErrorWithMessage", () => {
    it("returns true for Error objects", () => {
      const error = new Error("Test error");
      expect(isErrorWithMessage(error)).toBe(true);
    });

    it("returns true for objects with message properties", () => {
      const error = { message: "Test error" };
      expect(isErrorWithMessage(error)).toBe(true);
    });

    it("returns false for objects without message properties", () => {
      const error = { someProperty: "Test error" };
      expect(isErrorWithMessage(error)).toBe(false);
    });

    it("returns false for non-objects", () => {
      expect(isErrorWithMessage("string error")).toBe(false);
      expect(isErrorWithMessage(123)).toBe(false);
      expect(isErrorWithMessage(null)).toBe(false);
      expect(isErrorWithMessage(undefined)).toBe(false);
    });
  });

  describe("formatErrorMessage", () => {
    it("formats Error objects", () => {
      const error = new Error("Test error");
      expect(formatErrorMessage(error)).toBe("Test error");
    });

    it("formats objects with message properties", () => {
      const error = { message: "Test error" };
      expect(formatErrorMessage(error)).toBe("Test error");
    });

    it("returns a generic message for unknown errors", () => {
      expect(formatErrorMessage(null)).toBe("An unknown error occurred");
      expect(formatErrorMessage(undefined)).toBe("An unknown error occurred");
      expect(formatErrorMessage({ someProperty: "value" })).toBe(
        "An unknown error occurred"
      );
    });

    it("converts non-object errors to strings", () => {
      expect(formatErrorMessage("String error")).toBe("String error");
      expect(formatErrorMessage(123)).toBe("123");
    });
  });

  describe("displayErrorMessage", () => {
    beforeEach(() => {
      vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("logs error messages to console", () => {
      const error = new Error("Test error");
      displayErrorMessage(error);
      expect(console.error).toHaveBeenCalledWith("Error:", "Test error");
    });

    it("handles null and undefined gracefully", () => {
      displayErrorMessage(null);
      expect(console.error).toHaveBeenCalledWith(
        "Error:",
        "An unknown error occurred"
      );

      displayErrorMessage(undefined);
      expect(console.error).toHaveBeenCalledWith(
        "Error:",
        "An unknown error occurred"
      );
    });
  });

  describe("handleApiError", () => {
    beforeEach(() => {
      vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("formats and logs API errors", () => {
      const error = new Error("API error");
      handleApiError(error, "TestOperation");
      expect(console.error).toHaveBeenCalledWith(
        "API Error (TestOperation):",
        "API error"
      );
    });

    it("includes operation name in log message", () => {
      const error = new Error("API error");
      handleApiError(error, "FetchData");
      expect(console.error).toHaveBeenCalledWith(
        "API Error (FetchData):",
        "API error"
      );
    });

    it("returns the formatted error message", () => {
      const error = new Error("API error");
      const result = handleApiError(error, "TestOperation");
      expect(result).toBe("API error");
    });
  });
});
