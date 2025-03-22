import { describe, expect, it, vi } from "vitest";
import { createChartJsMock } from "../testMocks/ciaOptionsMocks";
import { mockDOMAPIs } from "./mockFactory";

describe("mockFactory utilities", () => {
  describe("createChartJsMock", () => {
    it("creates mocks that can be properly spied on", () => {
      const chartMock = createChartJsMock();
      const chartInstance = chartMock.default();

      // Make sure destroy is a mock function we can spy on
      const destroySpy = vi.spyOn(chartInstance, "destroy");

      // Call the destroy method
      chartInstance.destroy();

      // Verify spy works
      expect(destroySpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("mockDOMAPIs", () => {
    it("mocks HTMLCanvasElement.prototype.getContext", () => {
      mockDOMAPIs();

      expect(HTMLCanvasElement.prototype.getContext).toBeInstanceOf(Function);

      const ctx = document.createElement("canvas").getContext("2d");
      expect(ctx).toBeDefined();
      expect(ctx).toHaveProperty("clearRect");
      expect(ctx).toHaveProperty("beginPath");
    });

    it("mocks ResizeObserver", () => {
      mockDOMAPIs();

      expect(global.ResizeObserver).toBeDefined();

      const observer = new ResizeObserver(() => {});
      expect(observer).toHaveProperty("observe");
      expect(observer).toHaveProperty("disconnect");
      expect(observer.observe).toBeInstanceOf(Function);
    });

    it("mocks requestAnimationFrame", () => {
      mockDOMAPIs();

      expect(global.requestAnimationFrame).toBeDefined();

      const callback = vi.fn();
      requestAnimationFrame(callback);

      expect(callback).toHaveBeenCalledWith(0);
    });
  });
});
