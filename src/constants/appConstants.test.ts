import { describe, expect, it } from "vitest";
import { SECURITY_LEVEL_COLORS, WIDGET_ICONS } from "./appConstants";

describe("appConstants constants", () => {
  describe("SECURITY_LEVEL_COLORS", () => {
    it("should contain the expected security levels", () => {
      // Just verify that the object exists and has the expected keys
      expect(SECURITY_LEVEL_COLORS).toBeDefined();
      expect(Object.keys(SECURITY_LEVEL_COLORS)).toContain("NONE");
      expect(Object.keys(SECURITY_LEVEL_COLORS)).toContain("LOW");
      expect(Object.keys(SECURITY_LEVEL_COLORS)).toContain("MODERATE");
      expect(Object.keys(SECURITY_LEVEL_COLORS)).toContain("HIGH");
      expect(Object.keys(SECURITY_LEVEL_COLORS)).toContain("VERY_HIGH");
    });
  });

  describe("WIDGET_ICONS", () => {
    it("should contain the expected widget icon keys", () => {
      // Just verify that the object exists and has expected properties
      expect(WIDGET_ICONS).toBeDefined();
      expect(typeof WIDGET_ICONS).toBe("object");
      expect(Object.keys(WIDGET_ICONS).length).toBeGreaterThan(0);
    });
  });
});
