import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import logger from "./logger";

describe("Logger Utility", () => {
  // Save the original console methods
  const originalConsoleLog = console.log;
  const originalConsoleInfo = console.info;
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;
  const originalConsoleDebug = console.debug;

  // Setup spies
  beforeEach(() => {
    console.log = vi.fn();
    console.info = vi.fn();
    console.warn = vi.fn();
    console.error = vi.fn();
    console.debug = vi.fn();
  });

  // Restore original console methods
  afterEach(() => {
    console.log = originalConsoleLog;
    console.info = originalConsoleInfo;
    console.warn = originalConsoleWarn;
    console.error = originalConsoleError;
    console.debug = originalConsoleDebug;

    // Reset mocks
    vi.clearAllMocks();
  });

  it("logs a message with the correct prefix", () => {
    logger.log("Test message");
    expect(console.log).toHaveBeenCalledWith("[CIA-CM]", "Test message");
  });

  it("logs an info message", () => {
    logger.info("Info message");
    expect(console.info).toHaveBeenCalledWith("[CIA-CM]", "Info message");
  });

  it("logs a warning message", () => {
    logger.warn("Warning message");
    expect(console.warn).toHaveBeenCalledWith("[CIA-CM]", "Warning message");
  });

  it("logs an error message", () => {
    logger.error("Error message");
    expect(console.error).toHaveBeenCalledWith("[CIA-CM]", "Error message");
  });

  it("logs a debug message", () => {
    logger.debug("Debug message");
    expect(console.debug).toHaveBeenCalledWith("[CIA-CM]", "Debug message");
  });

  it("formats objects properly in log messages", () => {
    const testObject = { key: "value", nested: { prop: true } };
    logger.log("Object:", testObject);
    expect(console.log).toHaveBeenCalledWith("[CIA-CM]", "Object:", testObject);
  });

  it("handles multiple arguments correctly", () => {
    logger.log("First", "Second", 123, { test: true });
    expect(console.log).toHaveBeenCalledWith(
      "[CIA-CM]",
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
      "An error occurred:",
      error
    );
  });

  it("accepts no arguments gracefully", () => {
    logger.log();
    expect(console.log).toHaveBeenCalledWith("[CIA-CM]");
  });

  it("supports method chaining", () => {
    const result = logger.log("Chainable");
    expect(result).toBe(logger);

    // Verify we can chain methods
    logger.log("First").info("Second");
    expect(console.log).toHaveBeenCalledWith("[CIA-CM]", "First");
    expect(console.info).toHaveBeenCalledWith("[CIA-CM]", "Second");
  });
});
