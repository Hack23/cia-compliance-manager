import { beforeEach, describe, expect, it } from "vitest";
import { createMockDataProvider } from "../tests/testMocks/mockTypes";
import { SecurityLevel } from "../types/cia";
import {
  ComplianceServiceAdapter,
  getFrameworkCoverage,
} from "./ComplianceServiceAdapter";

describe("ComplianceServiceAdapter - Additional Coverage", () => {
  let adapter: ComplianceServiceAdapter;

  beforeEach(() => {
    adapter = new ComplianceServiceAdapter(createMockDataProvider());
  });

  describe("getFrameworkRequiredLevel", () => {
    it("returns correct security level for standard frameworks", () => {
      expect(
        adapter.getFrameworkRequiredLevel("ISO 27001", "confidentiality")
      ).toBe("Moderate");
      expect(
        adapter.getFrameworkRequiredLevel("HIPAA", "confidentiality")
      ).toBe("High");
      expect(adapter.getFrameworkRequiredLevel("PCI DSS", "integrity")).toBe(
        "High"
      );
    });

    it("handles case-insensitive framework names", () => {
      expect(
        adapter.getFrameworkRequiredLevel("iso 27001", "confidentiality")
      ).toBe("Moderate");
      expect(
        adapter.getFrameworkRequiredLevel("Hipaa", "confidentiality")
      ).toBe("High");
    });
  });

  describe("isFrameworkApplicable", () => {
    it("returns true for general frameworks regardless of industry/region", () => {
      expect(adapter.isFrameworkApplicable("ISO 27001")).toBe(true);
      expect(adapter.isFrameworkApplicable("NIST CSF")).toBe(true);
    });

    it("returns true for industry-specific frameworks when matching industry", () => {
      expect(adapter.isFrameworkApplicable("HIPAA", "healthcare")).toBe(true);
      expect(adapter.isFrameworkApplicable("PCI DSS", "finance")).toBe(true);
    });
  });

  // Test the exported function instead of a class method
  describe("getFrameworkCoverage function", () => {
    it("returns array of framework coverage data", () => {
      const result = getFrameworkCoverage({
        availability: "High" as SecurityLevel,
        integrity: "High" as SecurityLevel,
        confidentiality: "High" as SecurityLevel,
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
