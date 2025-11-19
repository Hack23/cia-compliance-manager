import { describe, expect, it } from "vitest";
import {
  BUSINESS_CONSIDERATIONS,
  BUSINESS_KEY_BENEFITS,
  BUSINESS_VALUE_METRICS,
  INDUSTRY_ROI_FACTORS,
  BUSINESS_VALUE_STATEMENTS,
  COMPONENT_BUSINESS_CONSIDERATIONS,
  BUSINESS_IMPACT_METRICS,
  SECURITY_VALUE_METRICS,
  getBusinessConsiderationsForCategory,
  getBusinessBenefitsForLevel,
  getIndustryROIFactor,
} from "./businessConstants";
import { SecurityLevel } from "../types/cia";

describe("businessConstants", () => {
  describe("BUSINESS_CONSIDERATIONS", () => {
    it("contains all expected categories", () => {
      expect(BUSINESS_CONSIDERATIONS).toBeDefined();
      expect(BUSINESS_CONSIDERATIONS.financial).toBeDefined();
      expect(BUSINESS_CONSIDERATIONS.operational).toBeDefined();
      expect(BUSINESS_CONSIDERATIONS.strategic).toBeDefined();
      expect(BUSINESS_CONSIDERATIONS.reputational).toBeDefined();
      expect(BUSINESS_CONSIDERATIONS.regulatory).toBeDefined();
    });

    it("has valid consideration structure", () => {
      const financialConsiderations = BUSINESS_CONSIDERATIONS.financial;
      expect(Array.isArray(financialConsiderations)).toBe(true);
      expect(financialConsiderations.length).toBeGreaterThan(0);
      
      const firstConsideration = financialConsiderations[0];
      expect(firstConsideration.title).toBeDefined();
      expect(firstConsideration.description).toBeDefined();
      expect(firstConsideration.type).toBeDefined();
      expect(firstConsideration.importance).toBeDefined();
      expect(firstConsideration.businessArea).toBeDefined();
    });
  });

  describe("BUSINESS_KEY_BENEFITS", () => {
    it("contains benefits for all security levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level) => {
        expect(BUSINESS_KEY_BENEFITS[level]).toBeDefined();
        expect(Array.isArray(BUSINESS_KEY_BENEFITS[level])).toBe(true);
        expect(BUSINESS_KEY_BENEFITS[level].length).toBeGreaterThan(0);
      });
    });

    it("has valid benefit structure", () => {
      const lowBenefits = BUSINESS_KEY_BENEFITS.Low;
      
      lowBenefits.forEach((benefit) => {
        expect(benefit.title).toBeDefined();
        expect(benefit.description).toBeDefined();
        expect(typeof benefit.title).toBe("string");
        expect(typeof benefit.description).toBe("string");
      });
    });
  });

  describe("BUSINESS_VALUE_METRICS", () => {
    it("contains all expected metrics", () => {
      expect(BUSINESS_VALUE_METRICS.customerTrust).toBeDefined();
      expect(BUSINESS_VALUE_METRICS.marketAccess).toBeDefined();
      expect(BUSINESS_VALUE_METRICS.competitiveAdvantage).toBeDefined();
      expect(BUSINESS_VALUE_METRICS.operationalEfficiency).toBeDefined();
      expect(BUSINESS_VALUE_METRICS.riskReduction).toBeDefined();
    });

    it("has valid metric structure", () => {
      const customerTrust = BUSINESS_VALUE_METRICS.customerTrust;
      
      expect(customerTrust.name).toBeDefined();
      expect(customerTrust.description).toBeDefined();
      expect(customerTrust.measurementMethod).toBeDefined();
      expect(customerTrust.securityImpact).toBeDefined();
    });
  });

  describe("INDUSTRY_ROI_FACTORS", () => {
    it("contains expected industries", () => {
      expect(INDUSTRY_ROI_FACTORS.finance).toBeDefined();
      expect(INDUSTRY_ROI_FACTORS.healthcare).toBeDefined();
      expect(INDUSTRY_ROI_FACTORS.retail).toBeDefined();
      expect(INDUSTRY_ROI_FACTORS.general).toBeDefined();
    });

    it("has numeric values for all industries", () => {
      Object.values(INDUSTRY_ROI_FACTORS).forEach((factor) => {
        expect(typeof factor).toBe("number");
        expect(factor).toBeGreaterThan(0);
      });
    });
  });

  describe("BUSINESS_VALUE_STATEMENTS", () => {
    it("contains statements for all security levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level) => {
        expect(BUSINESS_VALUE_STATEMENTS[level]).toBeDefined();
        expect(Array.isArray(BUSINESS_VALUE_STATEMENTS[level])).toBe(true);
        expect(BUSINESS_VALUE_STATEMENTS[level].length).toBeGreaterThan(0);
      });
    });
  });

  describe("COMPONENT_BUSINESS_CONSIDERATIONS", () => {
    it("contains considerations for all CIA components", () => {
      expect(COMPONENT_BUSINESS_CONSIDERATIONS.AVAILABILITY).toBeDefined();
      expect(COMPONENT_BUSINESS_CONSIDERATIONS.INTEGRITY).toBeDefined();
      expect(COMPONENT_BUSINESS_CONSIDERATIONS.CONFIDENTIALITY).toBeDefined();
    });

    it("contains considerations for all security levels per component", () => {
      const availabilityConsiderations = COMPONENT_BUSINESS_CONSIDERATIONS.AVAILABILITY;
      
      expect(availabilityConsiderations.NONE).toBeDefined();
      expect(availabilityConsiderations.LOW).toBeDefined();
      expect(availabilityConsiderations.MODERATE).toBeDefined();
      expect(availabilityConsiderations.HIGH).toBeDefined();
      expect(availabilityConsiderations.VERY_HIGH).toBeDefined();
    });
  });

  describe("BUSINESS_IMPACT_METRICS", () => {
    it("contains metrics for all CIA components", () => {
      expect(BUSINESS_IMPACT_METRICS.AVAILABILITY).toBeDefined();
      expect(BUSINESS_IMPACT_METRICS.INTEGRITY).toBeDefined();
      expect(BUSINESS_IMPACT_METRICS.CONFIDENTIALITY).toBeDefined();
    });

    it("contains metrics for all security levels per component", () => {
      const availabilityMetrics = BUSINESS_IMPACT_METRICS.AVAILABILITY;
      
      expect(availabilityMetrics.NONE).toBeDefined();
      expect(availabilityMetrics.LOW).toBeDefined();
      expect(availabilityMetrics.MODERATE).toBeDefined();
      expect(availabilityMetrics.HIGH).toBeDefined();
      expect(availabilityMetrics.VERY_HIGH).toBeDefined();
    });
  });

  describe("SECURITY_VALUE_METRICS", () => {
    it("contains ROI estimates for all security levels", () => {
      const roiEstimates = SECURITY_VALUE_METRICS.ROI_ESTIMATES;
      
      expect(roiEstimates.NONE).toBeDefined();
      expect(roiEstimates.LOW).toBeDefined();
      expect(roiEstimates.MODERATE).toBeDefined();
      expect(roiEstimates.HIGH).toBeDefined();
      expect(roiEstimates.VERY_HIGH).toBeDefined();
    });

    it("contains time to value for all security levels", () => {
      const timeToValue = SECURITY_VALUE_METRICS.TIME_TO_VALUE;
      
      expect(timeToValue.NONE).toBeDefined();
      expect(timeToValue.LOW).toBeDefined();
      expect(timeToValue.MODERATE).toBeDefined();
      expect(timeToValue.HIGH).toBeDefined();
      expect(timeToValue.VERY_HIGH).toBeDefined();
    });
  });

  describe("getBusinessConsiderationsForCategory", () => {
    it("returns considerations for valid categories", () => {
      const financial = getBusinessConsiderationsForCategory("financial");
      expect(Array.isArray(financial)).toBe(true);
      expect(financial.length).toBeGreaterThan(0);
    });

    it("handles case-insensitive category names", () => {
      const upper = getBusinessConsiderationsForCategory("FINANCIAL");
      const lower = getBusinessConsiderationsForCategory("financial");
      const mixed = getBusinessConsiderationsForCategory("Financial");
      
      expect(upper).toEqual(lower);
      expect(lower).toEqual(mixed);
    });

    it("returns empty array for invalid categories", () => {
      const invalid = getBusinessConsiderationsForCategory("invalid-category");
      expect(Array.isArray(invalid)).toBe(true);
      expect(invalid.length).toBe(0);
    });

    it("returns correct considerations for each valid category", () => {
      const operational = getBusinessConsiderationsForCategory("operational");
      expect(operational.length).toBeGreaterThan(0);
      
      const strategic = getBusinessConsiderationsForCategory("strategic");
      expect(strategic.length).toBeGreaterThan(0);
      
      const reputational = getBusinessConsiderationsForCategory("reputational");
      expect(reputational.length).toBeGreaterThan(0);
      
      const regulatory = getBusinessConsiderationsForCategory("regulatory");
      expect(regulatory.length).toBeGreaterThan(0);
    });
  });

  describe("getBusinessBenefitsForLevel", () => {
    it("returns benefits for valid security levels", () => {
      const lowBenefits = getBusinessBenefitsForLevel("Low");
      expect(Array.isArray(lowBenefits)).toBe(true);
      expect(lowBenefits.length).toBeGreaterThan(0);
    });

    it("returns benefits for all security levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level) => {
        const benefits = getBusinessBenefitsForLevel(level);
        expect(Array.isArray(benefits)).toBe(true);
        expect(benefits.length).toBeGreaterThan(0);
      });
    });

    it("returns empty array for invalid security level", () => {
      const invalid = getBusinessBenefitsForLevel("Invalid" as SecurityLevel);
      expect(Array.isArray(invalid)).toBe(true);
      expect(invalid.length).toBe(0);
    });
  });

  describe("getIndustryROIFactor", () => {
    it("returns correct factor for valid industries", () => {
      expect(getIndustryROIFactor("finance")).toBe(1.8);
      expect(getIndustryROIFactor("healthcare")).toBe(1.6);
      expect(getIndustryROIFactor("retail")).toBe(1.3);
    });

    it("handles case-insensitive industry names", () => {
      expect(getIndustryROIFactor("FINANCE")).toBe(1.8);
      expect(getIndustryROIFactor("Finance")).toBe(1.8);
      expect(getIndustryROIFactor("finance")).toBe(1.8);
    });

    it("returns default factor for invalid industries", () => {
      const defaultFactor = INDUSTRY_ROI_FACTORS.general;
      expect(getIndustryROIFactor("unknown-industry")).toBe(defaultFactor);
      expect(getIndustryROIFactor("")).toBe(defaultFactor);
    });

    it("returns correct factor for all valid industries", () => {
      expect(getIndustryROIFactor("manufacturing")).toBe(1.0);
      expect(getIndustryROIFactor("technology")).toBe(1.4);
      expect(getIndustryROIFactor("government")).toBe(0.9);
      expect(getIndustryROIFactor("education")).toBe(0.8);
    });
  });
});
