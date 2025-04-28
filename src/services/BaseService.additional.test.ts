import { describe, expect, it } from "vitest";
import { createMockDataProvider } from "../tests/testMocks/mockTypes";
import { SecurityLevel } from "../types/cia";
import { BaseService } from "./BaseService";

// Test implementation of BaseService to access protected methods
class TestBaseService extends BaseService {
  public formatCurrencyTest(value: number): string {
    return this.formatCurrency(value);
  }

  public formatPercentageTest(value: number): string {
    return this.formatPercentage(value);
  }

  public isCIAComponentTypeTest(component: string): boolean {
    return this.isCIAComponentType(component);
  }

  public getDefaultSecurityIconTest(level: SecurityLevel): string {
    return this.getDefaultSecurityIcon(level);
  }

  public capitalizeFirstLetterTest(string: string): string {
    return this.capitalizeFirstLetter(string);
  }
}

describe("BaseService Additional Tests", () => {
  const dataProvider = createMockDataProvider();
  const service = new TestBaseService(dataProvider);

  describe("formatCurrency", () => {
    it("should format currency values correctly", () => {
      expect(service.formatCurrencyTest(1000)).toBe("$1,000");
      expect(service.formatCurrencyTest(1500.75)).toBe("$1,501");
      expect(service.formatCurrencyTest(0)).toBe("$0");
      expect(service.formatCurrencyTest(-1000)).toBe("-$1,000");
    });
  });

  describe("formatPercentage", () => {
    it("should format percentage values correctly", () => {
      expect(service.formatPercentageTest(50)).toBe("50%");
      expect(service.formatPercentageTest(0)).toBe("0%");
      expect(service.formatPercentageTest(100)).toBe("100%");
      expect(service.formatPercentageTest(33.33)).toBe("33.33%");
    });
  });

  describe("isCIAComponentType", () => {
    it("should identify valid CIA component types", () => {
      expect(service.isCIAComponentTypeTest("availability")).toBe(true);
      expect(service.isCIAComponentTypeTest("integrity")).toBe(true);
      expect(service.isCIAComponentTypeTest("confidentiality")).toBe(true);
    });

    it("should reject invalid CIA component types", () => {
      expect(service.isCIAComponentTypeTest("invalid")).toBe(false);
      expect(service.isCIAComponentTypeTest("")).toBe(false);
      expect(service.isCIAComponentTypeTest("security")).toBe(false);
    });
  });

  describe("capitalizeFirstLetter", () => {
    it("should capitalize the first letter of a string", () => {
      expect(service.capitalizeFirstLetterTest("test")).toBe("Test");
      expect(service.capitalizeFirstLetterTest("hello world")).toBe(
        "Hello world"
      );
      expect(service.capitalizeFirstLetterTest("")).toBe("");
    });
  });

  describe("getDefaultSecurityIcon", () => {
    it("should return correct icons for security levels", () => {
      expect(service.getDefaultSecurityIconTest("None")).toBe("⚠️");
      expect(service.getDefaultSecurityIconTest("Low")).toBe("🔑");
      expect(service.getDefaultSecurityIconTest("Moderate")).toBe("🔓");
      expect(service.getDefaultSecurityIconTest("High")).toBe("🔒");
      expect(service.getDefaultSecurityIconTest("Very High")).toBe("🔐");
    });

    it("should return question mark for invalid security level", () => {
      // @ts-expect-error Testing with invalid security level
      expect(service.getDefaultSecurityIconTest("Invalid")).toBe("❓");
    });
  });
});
