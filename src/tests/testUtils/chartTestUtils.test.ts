import { describe, expect, it, vi } from "vitest";
import { setupChartTest } from "./chartTestUtils";

describe("chartTestUtils", () => {
  it("properly sets up Chart.js test environment", () => {
    const { mockChartInstance, mockConstructor, chartMock, renderChart } =
      setupChartTest();

    // Verify the mock constructor and instance are properly setup
    expect(mockConstructor).toBeInstanceOf(Function);
    expect(mockConstructor.register).toBeInstanceOf(Function);
    expect(mockConstructor.defaults).toHaveProperty("font");
    expect(mockConstructor.defaults).toHaveProperty("plugins");

    // Verify the chart instance mock has the expected methods
    expect(mockChartInstance).toHaveProperty("destroy");
    expect(mockChartInstance).toHaveProperty("update");
    expect(mockChartInstance).toHaveProperty("resize");
    expect(mockChartInstance).toHaveProperty("data");

    // Verify the chart mock module structure
    expect(chartMock).toHaveProperty("__esModule", true);
    expect(chartMock).toHaveProperty("default", mockConstructor);

    // Test render function is present
    expect(renderChart).toBeInstanceOf(Function);
  });

  it("properly mocks Canvas API", () => {
    setupChartTest();

    // Should be able to create a Canvas and get a context
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    expect(context).toBeDefined();
    expect(context).toHaveProperty("clearRect");
    expect(context).toHaveProperty("fill");
    expect(context).toHaveProperty("beginPath");
    expect(context).toHaveProperty("stroke");
  });

  it("mocks ResizeObserver", () => {
    setupChartTest();

    // Should be able to create a ResizeObserver
    const observer = new ResizeObserver(() => {});

    expect(observer).toBeDefined();
    expect(observer).toHaveProperty("observe");
    expect(observer).toHaveProperty("unobserve");
    expect(observer).toHaveProperty("disconnect");
  });

  it("mocks requestAnimationFrame", () => {
    setupChartTest();

    const callback = vi.fn();
    requestAnimationFrame(callback);

    expect(callback).toHaveBeenCalledWith(0);
  });

  it("provides cleanup method", () => {
    const { cleanupMocks } = setupChartTest();

    expect(cleanupMocks).toBeInstanceOf(Function);

    // Ensure it runs without errors
    expect(() => cleanupMocks()).not.toThrow();
  });
});
