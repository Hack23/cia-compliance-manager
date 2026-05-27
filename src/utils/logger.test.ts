import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import logger from "./logger";

describe("Logger Utility", () => {
  // Save the original console methods
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;

  // Setup spies
  beforeEach(() => {
    console.warn = vi.fn();
    console.error = vi.fn();
  });

  // Restore original console methods
  afterEach(() => {
    console.warn = originalConsoleWarn;
    console.error = originalConsoleError;

    // Reset mocks
    vi.clearAllMocks();
  });

  it("logs a message with the correct prefix and level", () => {
    logger.log("Test message");
    expect(console.warn).toHaveBeenCalledWith(
      "[CIA-CM]",
      "[LOG]",
      "Test message"
    );
  });

  it("logs an info message via console.warn", () => {
    logger.info("Info message");
    expect(console.warn).toHaveBeenCalledWith(
      "[CIA-CM]",
      "[INFO]",
      "Info message"
    );
  });

  it("logs a warning message via console.warn", () => {
    logger.warn("Warning message");
    expect(console.warn).toHaveBeenCalledWith(
      "[CIA-CM]",
      "[WARN]",
      "Warning message"
    );
  });

  it("logs an error message via console.error", () => {
    logger.error("Error message");
    expect(console.error).toHaveBeenCalledWith(
      "[CIA-CM]",
      "[ERROR]",
      "Error message"
    );
  });

  it("logs a debug message via console.warn", () => {
    logger.debug("Debug message");
    expect(console.warn).toHaveBeenCalledWith(
      "[CIA-CM]",
      "[DEBUG]",
      "Debug message"
    );
  });

  it("formats objects properly in log messages", () => {
    const testObject = { key: "value", nested: { prop: true } };
    logger.log("Object:", testObject);
    expect(console.warn).toHaveBeenCalledWith(
      "[CIA-CM]",
      "[LOG]",
      "Object:",
      testObject
    );
  });

  it("handles multiple arguments correctly", () => {
    logger.log("First", "Second", 123, { test: true });
    expect(console.warn).toHaveBeenCalledWith(
      "[CIA-CM]",
      "[LOG]",
      "First",
      "Second",
      123,
      { test: true }
    );
  });

  it("handles error objects with stack traces", () => {
    const error = new Error("Test error");
    logger.error("An error occurred:", error);
    expect(console.error).toHaveBeenCalledWith(
      "[CIA-CM]",
      "[ERROR]",
      "An error occurred:",
      error
    );
  });

  it("accepts no arguments gracefully", () => {
    logger.log();
    expect(console.warn).toHaveBeenCalledWith("[CIA-CM]", "[LOG]");
  });

  it("supports method chaining", () => {
    const result = logger.log("Chainable");
    expect(result).toBe(logger);

    // Verify we can chain methods
    logger.log("First").info("Second");
    expect(console.warn).toHaveBeenCalledWith("[CIA-CM]", "[LOG]", "First");
    expect(console.warn).toHaveBeenCalledWith("[CIA-CM]", "[INFO]", "Second");
  });

  it("logs an info message with context", () => {
    const context = { user: "admin", action: "login" };
    logger.info("Info message with context", context);
    expect(console.warn).toHaveBeenCalledWith(
      "[CIA-CM]",
      "[INFO]",
      "Info message with context",
      context
    );
  });

  it("logs a warning message with context", () => {
    const context = { warning: "deprecation" };
    logger.warn("Warning message with context", context);
    expect(console.warn).toHaveBeenCalledWith(
      "[CIA-CM]",
      "[WARN]",
      "Warning message with context",
      context
    );
  });

  it("logs an error message with context", () => {
    const context = new Error("Internal error");
    logger.error("Error message with context", context);
    expect(console.error).toHaveBeenCalledWith(
      "[CIA-CM]",
      "[ERROR]",
      "Error message with context",
      context
    );
  });

  it("logs a debug message with context", () => {
    const context = { debug: true, level: 3 };
    logger.debug("Debug message with context", context);
    expect(console.warn).toHaveBeenCalledWith(
      "[CIA-CM]",
      "[DEBUG]",
      "Debug message with context",
      context
    );
  });
});
