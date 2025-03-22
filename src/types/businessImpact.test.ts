import { describe, expect, it } from "vitest";
import {
  BUSINESS_CONSIDERATIONS,
  BUSINESS_KEY_BENEFITS
} from "./businessImpact";

describe("Business Impact Types", () => {
  describe("BUSINESS_CONSIDERATIONS constant", () => {
    it("has correct structure for all CIA categories", () => {
      // CIA categories
      const ciaCategories = ["AVAILABILITY", "INTEGRITY", "CONFIDENTIALITY"];
      ciaCategories.forEach((category) => {
        expect(BUSINESS_CONSIDERATIONS).toHaveProperty(category);

        // Security levels
        const categoryObj = BUSINESS_CONSIDERATIONS[category];
        expect(categoryObj).toBeDefined();

        const securityLevels = ["NONE", "LOW", "MODERATE", "HIGH", "VERY_HIGH"];

        securityLevels.forEach((level) => {
          expect(categoryObj).toHaveProperty(level);

          // Check items array
          const items = categoryObj?.[level] || []; // Use optional chaining and default to empty array
          expect(Array.isArray(items)).toBe(true);

          // Check each item in the array
          if (items && items.length > 0) {
            items.forEach((item) => {
              expect(item).toHaveProperty("description");
            });
          }
        });
      });
    });
  });

  describe("BUSINESS_KEY_BENEFITS constant", () => {
    it("has entries for all security levels", () => {
      const securityLevels = ["NONE", "LOW", "MODERATE", "HIGH", "VERY_HIGH"];

      securityLevels.forEach((level) => {
        expect(BUSINESS_KEY_BENEFITS).toHaveProperty(level);

        const benefits = BUSINESS_KEY_BENEFITS[level];
        expect(Array.isArray(benefits)).toBe(true);

        // Check each benefit
        if (benefits && benefits.length > 0) {
          benefits.forEach((benefit: any) => {
            // Check if benefit is either a string or an object with title and description
            expect(
              typeof benefit === "string" || typeof benefit === "object"
            ).toBe(true);
            if (typeof benefit === "string") {
              expect(benefit.length).toBeGreaterThan(0);
            } else if (typeof benefit === "object") {
              expect(benefit).toHaveProperty("title");
              expect(benefit).toHaveProperty("description");
            }
          });
        }
      });
    });
  });
});
