import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import {
  getAvailabilityDetails,
  getConfidentialityDetails,
  getInformationSensitivity,
  getIntegrityDetails,
  getROIEstimate,
  getSecuritySummary,
  getValuePoints,
} from "./ciaContentService";

describe("CIAContentService Exported Functions", () => {
  describe("getSecuritySummary", () => {
    it("returns security summary based on security levels", async () => {
      const summary = await getSecuritySummary(
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel
      );

      expect(summary).toBeDefined();
      expect(summary).toHaveProperty("overallLevel");
      expect(summary).toHaveProperty("summary");
      expect(summary).toHaveProperty("recommendations");
      expect(summary).toHaveProperty("domains");
      expect(summary.domains).toHaveProperty("confidentiality");
      expect(summary.domains).toHaveProperty("integrity");
      expect(summary.domains).toHaveProperty("availability");
    });

    it("handles mixed security levels correctly", async () => {
      const summary = await getSecuritySummary(
        "Low" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "High" as SecurityLevel
      );

      expect(summary).toBeDefined();
      expect(summary.domains.availability.level).toBe("Low");
      expect(summary.domains.integrity.level).toBe("Moderate");
      expect(summary.domains.confidentiality.level).toBe("High");
    });
  });

  describe("Component Detail Functions", () => {
    it("getAvailabilityDetails returns component details", async () => {
      const details = await getAvailabilityDetails("Moderate" as SecurityLevel);

      expect(details).toBeDefined();
      expect(details).toHaveProperty("description");
      expect(details).toHaveProperty("technical");
      expect(details).toHaveProperty("businessImpact");
      expect(details).toHaveProperty("uptime");
      expect(details).toHaveProperty("mttr");
      expect(details).toHaveProperty("rto");
      expect(details).toHaveProperty("rpo");
      expect(details).toHaveProperty("recommendations");
    });

    it("getIntegrityDetails returns component details", async () => {
      const details = await getIntegrityDetails("High" as SecurityLevel);

      expect(details).toBeDefined();
      expect(details).toHaveProperty("description");
      expect(details).toHaveProperty("technical");
      expect(details).toHaveProperty("businessImpact");
      expect(details).toHaveProperty("recommendations");
    });

    it("getConfidentialityDetails returns component details", async () => {
      const details = await getConfidentialityDetails("High" as SecurityLevel);

      expect(details).toBeDefined();
      expect(details).toHaveProperty("description");
      expect(details).toHaveProperty("technical");
      expect(details).toHaveProperty("businessImpact");
      expect(details).toHaveProperty("recommendations");
    });
  });

  describe("Helper Functions", () => {
    it("getInformationSensitivity returns correct classification", () => {
      expect(getInformationSensitivity("None")).toBe("Public Data");
      expect(getInformationSensitivity("Low")).toBe("Internal Data");
      expect(getInformationSensitivity("Moderate")).toBe("Sensitive Data");
      expect(getInformationSensitivity("High")).toBe("Confidential Data");
      expect(getInformationSensitivity("Very High")).toBe("Restricted Data");
    });

    it("getROIEstimate returns ROI estimate with correct structure", () => {
      const roi = getROIEstimate("Moderate" as SecurityLevel);

      expect(roi).toBeDefined();
      expect(roi).toHaveProperty("returnRate");
      expect(roi).toHaveProperty("description");
      expect(roi).toHaveProperty("value");
    });

    it("getValuePoints returns value points for different security levels", () => {
      const nonePoints = getValuePoints("None" as SecurityLevel);
      const moderatePoints = getValuePoints("Moderate" as SecurityLevel);
      const highPoints = getValuePoints("High" as SecurityLevel);

      expect(Array.isArray(nonePoints)).toBe(true);
      expect(nonePoints.length).toBeGreaterThan(0);

      expect(Array.isArray(moderatePoints)).toBe(true);
      expect(moderatePoints.length).toBeGreaterThan(0);

      expect(Array.isArray(highPoints)).toBe(true);
      expect(highPoints.length).toBeGreaterThan(0);
    });
  });
});
