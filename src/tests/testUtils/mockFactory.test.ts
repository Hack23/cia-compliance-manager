import { describe, expect, it, vi } from "vitest";
import { createChartJsMock, mockDOMAPIs } from "./mockFactory";

describe("mockFactory utilities", () => {
  describe("createChartJsMock", () => {
    it("returns properly structured mock constructor and instance", () => {
      const { mockConstructor, mockInstance, mockModule } = createChartJsMock();

      expect(mockConstructor).toBeInstanceOf(Function);
      expect(mockInstance).toHaveProperty("destroy");
      expect(mockInstance).toHaveProperty("update");
      expect(mockInstance).toHaveProperty("resize");

      // Check module structure
      expect(mockModule).toHaveProperty("__esModule", true);
      expect(mockModule).toHaveProperty("default");
      expect(mockModule.default).toBe(mockConstructor);
    });

    it("creates mocks that can be properly spied on", () => {
      const { mockInstance } = createChartJsMock();

      // Spy on a method
      const destroySpy = vi.spyOn(mockInstance, "destroy");

      // Call the method
      mockInstance.destroy();

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
