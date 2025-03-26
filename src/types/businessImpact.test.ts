import { describe, expect, it } from "vitest";
import {
  BUSINESS_CONSIDERATIONS,
  BUSINESS_KEY_BENEFITS,
  BusinessKeyBenefit,
} from "./businessImpact";

describe("Business Impact Types", () => {
  describe("BUSINESS_CONSIDERATIONS constant", () => {
    it("has correct structure for all CIA categories", () => {
      // CIA categories
      const ciaCategories = ["AVAILABILITY", "INTEGRITY", "CONFIDENTIALITY"];
      ciaCategories.forEach((category) => {
        // Use type assertion to tell TypeScript the index is valid
        expect(BUSINESS_CONSIDERATIONS).toHaveProperty(category);

        // Use type assertion for the indexed access
        const categoryObj =
          BUSINESS_CONSIDERATIONS[
            category as keyof typeof BUSINESS_CONSIDERATIONS
          ];
        expect(categoryObj).toBeDefined();

        const securityLevels = ["NONE", "LOW", "MODERATE", "HIGH", "VERY_HIGH"];

        securityLevels.forEach((level) => {
          expect(categoryObj).toHaveProperty(level);

          // Check items array with proper type assertions
          const items = categoryObj?.[level as keyof typeof categoryObj] || [];
          expect(Array.isArray(items)).toBe(true);

          // Add explicit type to item parameter
          items.forEach((item: any) => {
            if (item) {
              expect(typeof item.title).toBe("string");
              expect(typeof item.description).toBe("string");
            }
          });
        });
      });
    });
  });

  describe("BUSINESS_KEY_BENEFITS constant", () => {
    it("has correct structure for all security levels", () => {
      const levels = ["NONE", "LOW", "MODERATE", "HIGH", "VERY_HIGH"];

      levels.forEach((level) => {
        // Use type assertion for the indexed access
        const benefits =
          BUSINESS_KEY_BENEFITS[level as keyof typeof BUSINESS_KEY_BENEFITS];
        expect(Array.isArray(benefits)).toBe(true);

        // Check each benefit item has required properties
        benefits.forEach((benefit: BusinessKeyBenefit) => {
          expect(typeof benefit.title).toBe("string");
          expect(typeof benefit.description).toBe("string");
        });
      });
    });
  });
});
