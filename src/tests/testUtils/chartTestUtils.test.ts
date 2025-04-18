import { describe, expect, it } from "vitest";
import {
  createChartMock,
  setupChartEnvironment,
  setupChartTest,
} from "./chartTestUtils";

describe("chartTestUtils", () => {
  it("properly sets up Chart.js test environment", () => {
    const {
      mockChartInstance,
      mockConstructor,
      chartMock,
      renderChart,
      cleanupMocks,
    } = setupChartTest();

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

    // Clean up after the test
    cleanupMocks();
  });

  it("creates a chart mock with data collectors", () => {
    const { chartModule, getMockData, getMockOptions, resetMockData } =
      createChartMock();

    // Verify the chart module structure
    expect(chartModule).toHaveProperty("Chart");
    expect(chartModule.Chart).toHaveProperty("register");

    // Check data collectors are functions
    expect(getMockData).toBeInstanceOf(Function);
    expect(getMockOptions).toBeInstanceOf(Function);
    expect(resetMockData).toBeInstanceOf(Function);

    // Test creating a chart and collecting data
    const mockData = { datasets: [{ data: [1, 2, 3] }] };
    const mockOptions = { responsive: true };

    // Create a new chart instance
    new chartModule.Chart("canvas", {
      data: mockData,
      options: mockOptions,
    });

    // Check data was collected
    expect(getMockData()).toEqual(mockData);
    expect(getMockOptions()).toEqual(mockOptions);

    // Test reset function
    resetMockData();
    expect(getMockData()).toBeNull();
    expect(getMockOptions()).toBeNull();
  });

  it("properly mocks Canvas API", () => {
    setupChartTest();

    // Should be able to create a Canvas and get a context
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    expect(context).toBeDefined();
    expect(context).not.toBeNull();
    if (context) {
      expect(context).toHaveProperty("clearRect");
      expect(context).toHaveProperty("fill");
      expect(context).toHaveProperty("beginPath");
    }
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

  it("provides setupChartEnvironment function", () => {
    const cleanup = setupChartEnvironment();

    // Should properly mock the canvas context
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    expect(context).not.toBeNull();

    // Should return a cleanup function
    expect(cleanup).toBeInstanceOf(Function);
    cleanup();
  });
});
