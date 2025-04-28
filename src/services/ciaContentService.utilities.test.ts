import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import { CIAContentService } from "./ciaContentService";

describe("CIAContentService Utility Methods", () => {
  const service = new CIAContentService();

  describe("getComponentContent", () => {
    it("returns content for valid component and level", () => {
      const content = service.getComponentContent("availability", "Moderate");

      expect(content).toBeDefined();
      expect(content).toHaveProperty("description");
      expect(content).toHaveProperty("technical");
      expect(content).toHaveProperty("businessImpact");
      expect(content).toHaveProperty("recommendations");
      expect(Array.isArray(content.recommendations)).toBe(true);
    });

    it("returns fallback content for invalid component", () => {
      // @ts-expect-error Testing with invalid component
      const content = service.getComponentContent("invalid", "Moderate");

      expect(content).toBeDefined();
      expect(content.description).toContain("invalid");
      expect(content.technical).toContain("invalid");
      expect(content.businessImpact).toContain("invalid");
      expect(Array.isArray(content.recommendations)).toBe(true);
    });
  });

  describe("getBusinessImpactContent", () => {
    it("generates formatted business impact content", () => {
      const content = service.getBusinessImpactContent(
        "confidentiality",
        "High" as SecurityLevel
      );

      expect(typeof content).toBe("string");
      expect(content).toContain("## Business Impact Summary");
      expect(content).toContain("### Financial Impact");
      expect(content).toContain("### Operational Impact");
      expect(content).toContain("### Reputational Impact");
    });
  });

  describe("getSummaryContent", () => {
    it("generates security profile summary", () => {
      const content = service.getSummaryContent(
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel
      );

      expect(typeof content).toBe("string");
      expect(content).toContain("# Security Profile Summary");
      expect(content).toContain("## Current Security Configuration");
      expect(content).toContain("## Security Score");
      expect(content).toContain("## Business Impact");
      expect(content).toContain("## Compliance Status");
    });
  });

  describe("getComplianceDescription", () => {
    it("returns compliance description for each security level", () => {
      const securityLevels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];

      securityLevels.forEach((level) => {
        const description = service.getComplianceDescription(level);
        expect(typeof description).toBe("string");
        expect(description.length).toBeGreaterThan(20);
      });

      // Check specific content for a level
      expect(service.getComplianceDescription("High")).toContain(
        "Compliant with major regulatory frameworks"
      );
    });
  });

  describe("getFrameworkRequiredLevel", () => {
    it("returns framework required level for a component", () => {
      const result = service.getFrameworkRequiredLevel(
        "availability",
        "Moderate" as SecurityLevel
      );

      expect(typeof result).toBe("string");
      expect(result).toContain("level for availability");
    });
  });
});
