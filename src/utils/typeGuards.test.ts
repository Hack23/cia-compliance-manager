import { describe, expect, it } from "vitest";
import { BusinessImpactDetails, CIADetails } from "../types/cia-services";
import {
  ensureArray,
  extractSecurityLevels,
  getImplementationCost,
  getSecurityLevelOption,
  hasProperty,
  hasTagValue,
  isAvailabilityDetail,
  isBusinessImpactDetails,
  isCIAComponentType,
  isCIADetails,
  isComplianceFramework,
  isComplianceStatus,
  isConfidentialityDetail,
  isIntegrityDetail,
  isNumber,
  isObject,
  isROIEstimate,
  isROIMetrics,
  isSecurityLevel,
  isSecurityProfile,
  isSecurityResource,
  isString,
  isTechnicalImplementationDetails,
  isValidCIADetail,
  isWidgetProps,
  parseRiskLevel,
  safeAccess,
  safeNumberConversion,
} from "./typeGuards";

// Mock constants
const CIA_TEST_IDS = {
  AVAILABILITY: "availability",
  INTEGRITY: "integrity",
  CONFIDENTIALITY: "confidentiality",
};

describe("Type Guard Utilities", () => {
  describe("Basic Type Guards", () => {
    it("isString correctly identifies strings", () => {
      expect(isString("test")).toBe(true);
      expect(isString("")).toBe(true);
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
      expect(isString({})).toBe(false);
      expect(isString([])).toBe(false);
    });

    it("isNumber correctly identifies numbers", () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber(0)).toBe(true);
      expect(isNumber(-10)).toBe(true);
      expect(isNumber(1.5)).toBe(true);
      expect(isNumber("123")).toBe(false);
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
      expect(isNumber({})).toBe(false);
      expect(isNumber([])).toBe(false);
    });

    it("isObject correctly identifies objects", () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1 })).toBe(true);
      expect(isObject([])).toBe(false); // Arrays are also objects in JavaScript
      expect(isObject(null)).toBe(false); // null is not an object for this function
      expect(isObject(undefined)).toBe(false);
      expect(isObject("string")).toBe(false);
      expect(isObject(123)).toBe(false);
    });
  });

  describe("CIA Specific Type Guards", () => {
    it("isSecurityLevel identifies valid security levels", () => {
      expect(isSecurityLevel("None")).toBe(true);
      expect(isSecurityLevel("Low")).toBe(true);
      expect(isSecurityLevel("Moderate")).toBe(true);
      expect(isSecurityLevel("High")).toBe(true);
      expect(isSecurityLevel("Very High")).toBe(true);

      // Invalid values
      expect(isSecurityLevel("Invalid")).toBe(false);
      expect(isSecurityLevel("")).toBe(false);
      expect(isSecurityLevel(null)).toBe(false);
      expect(isSecurityLevel(undefined)).toBe(false);
      expect(isSecurityLevel(123)).toBe(false);
    });

    it("isCIAComponentType identifies valid CIA component types", () => {
      expect(isCIAComponentType("availability")).toBe(true);
      expect(isCIAComponentType("integrity")).toBe(true);
      expect(isCIAComponentType("confidentiality")).toBe(true);

      // Invalid values
      expect(isCIAComponentType("invalid")).toBe(false);
      expect(isCIAComponentType("")).toBe(false);
      expect(isCIAComponentType(null)).toBe(false);
      expect(isCIAComponentType(undefined)).toBe(false);
      expect(isCIAComponentType(123)).toBe(false);
    });

    it("isValidCIADetail validates CIA detail objects", () => {
      const validDetail: CIADetails = {
        description: "Test",
        technical: "Test",
        businessImpact: "Test",
        capex: 10,
        opex: 5,
        bg: "#fff",
        text: "#000",
        recommendations: [],
      };

      expect(isValidCIADetail(validDetail)).toBe(true);
      expect(isValidCIADetail(null)).toBe(false);
      expect(isValidCIADetail(undefined)).toBe(false);
    });

    it("isCIADetails validates complete CIA details", () => {
      const validDetails: CIADetails = {
        description: "Test description",
        technical: "Test technical",
        businessImpact: "Test business impact",
        capex: 10,
        opex: 5,
        bg: "#fff",
        text: "#000",
        recommendations: ["Test recommendation"],
      };

      expect(isCIADetails(validDetails)).toBe(true);

      // Missing required fields
      expect(isCIADetails({ ...validDetails, description: undefined })).toBe(
        false
      );
      expect(isCIADetails({ ...validDetails, technical: undefined })).toBe(
        false
      );
      expect(isCIADetails({ ...validDetails, businessImpact: undefined })).toBe(
        false
      );
      expect(isCIADetails({ ...validDetails, capex: undefined })).toBe(false);
      expect(isCIADetails({ ...validDetails, opex: undefined })).toBe(false);
      expect(isCIADetails({ ...validDetails, bg: undefined })).toBe(false);
      expect(isCIADetails({ ...validDetails, text: undefined })).toBe(false);
      expect(
        isCIADetails({ ...validDetails, recommendations: undefined })
      ).toBe(false);

      // Not an object
      expect(isCIADetails(null)).toBe(false);
      expect(isCIADetails(undefined)).toBe(false);
      expect(isCIADetails("string")).toBe(false);
      expect(isCIADetails(123)).toBe(false);
    });
  });

  describe("Detail Type Guards", () => {
    it("isAvailabilityDetail validates availability details", () => {
      const validDetail = {
        description: "Test description",
        businessImpact: "Test impact",
        uptime: "99.9%",
        recommendations: [],
      };

      expect(isAvailabilityDetail(validDetail)).toBe(true);

      // Missing required fields
      expect(
        isAvailabilityDetail({ ...validDetail, description: undefined })
      ).toBe(false);
      expect(
        isAvailabilityDetail({ ...validDetail, businessImpact: undefined })
      ).toBe(false);
      expect(isAvailabilityDetail({ ...validDetail, uptime: undefined })).toBe(
        false
      );
      expect(
        isAvailabilityDetail({ ...validDetail, recommendations: undefined })
      ).toBe(false);
    });

    it("isIntegrityDetail validates integrity details", () => {
      const validDetail = {
        description: "Test description",
        businessImpact: "Test impact",
        recommendations: [],
      };

      expect(isIntegrityDetail(validDetail)).toBe(true);

      // Missing required fields
      expect(
        isIntegrityDetail({ ...validDetail, description: undefined })
      ).toBe(false);
      expect(
        isIntegrityDetail({ ...validDetail, businessImpact: undefined })
      ).toBe(false);
      expect(
        isIntegrityDetail({ ...validDetail, recommendations: undefined })
      ).toBe(false);
    });

    it("isConfidentialityDetail validates confidentiality details", () => {
      const validDetail = {
        impact: "Test impact",
        businessImpact: "Test business impact",
        recommendations: [],
      };

      expect(isConfidentialityDetail(validDetail)).toBe(true);

      // Missing required fields
      expect(
        isConfidentialityDetail({ ...validDetail, impact: undefined })
      ).toBe(false);
      expect(
        isConfidentialityDetail({ ...validDetail, businessImpact: undefined })
      ).toBe(false);
      expect(
        isConfidentialityDetail({ ...validDetail, recommendations: undefined })
      ).toBe(false);
    });

    it("isBusinessImpactDetails validates business impact details", () => {
      const validDetails: BusinessImpactDetails = {
        summary: "Test summary",
        financial: {
          description: "Test description",
          riskLevel: "Medium",
        },
      };

      expect(isBusinessImpactDetails(validDetails)).toBe(true);

      // Missing required fields
      expect(
        isBusinessImpactDetails({ ...validDetails, summary: undefined })
      ).toBe(false);

      // No impact categories
      expect(isBusinessImpactDetails({ summary: "Test summary" })).toBe(false);

      // Not an object
      expect(isBusinessImpactDetails(null)).toBe(false);
      expect(isBusinessImpactDetails(undefined)).toBe(false);
      expect(isBusinessImpactDetails("string")).toBe(false);
    });
  });

  describe("Security Profile Type Guards", () => {
    it("isSecurityProfile validates security profiles", () => {
      const validProfile = {
        availability: "High",
        integrity: "Moderate",
        confidentiality: "Low",
        overall: "Moderate",
      };

      expect(isSecurityProfile(validProfile)).toBe(true);

      // Missing required fields
      expect(
        isSecurityProfile({ ...validProfile, availability: undefined })
      ).toBe(false);
      expect(isSecurityProfile({ ...validProfile, integrity: undefined })).toBe(
        false
      );
      expect(
        isSecurityProfile({ ...validProfile, confidentiality: undefined })
      ).toBe(false);
      expect(isSecurityProfile({ ...validProfile, overall: undefined })).toBe(
        false
      );

      // Not an object
      expect(isSecurityProfile(null)).toBe(false);
      expect(isSecurityProfile(undefined)).toBe(false);
      expect(isSecurityProfile("string")).toBe(false);
    });
  });

  describe("Compliance Status Type Guards", () => {
    it("isComplianceStatus validates compliance status objects", () => {
      const validStatus = {
        compliantFrameworks: ["NIST"],
        partiallyCompliantFrameworks: ["ISO27001"],
        nonCompliantFrameworks: ["HIPAA"],
      };

      expect(isComplianceStatus(validStatus)).toBe(true);

      // With optional properties
      expect(
        isComplianceStatus({
          ...validStatus,
          remediationSteps: ["Step 1", "Step 2"],
          requirements: ["Req 1"],
          status: "Partially Compliant",
          complianceScore: 75,
        })
      ).toBe(true);

      // Invalid array properties
      expect(
        isComplianceStatus({
          ...validStatus,
          compliantFrameworks: "NIST",
        })
      ).toBe(false);

      expect(
        isComplianceStatus({
          ...validStatus,
          partiallyCompliantFrameworks: "ISO27001",
        })
      ).toBe(false);

      expect(
        isComplianceStatus({
          ...validStatus,
          nonCompliantFrameworks: "HIPAA",
        })
      ).toBe(false);

      // Invalid optional properties
      expect(
        isComplianceStatus({
          ...validStatus,
          remediationSteps: "Step 1",
        })
      ).toBe(false);

      expect(
        isComplianceStatus({
          ...validStatus,
          status: 123,
        })
      ).toBe(false);

      // Not an object
      expect(isComplianceStatus(null)).toBe(false);
      expect(isComplianceStatus(undefined)).toBe(false);
      expect(isComplianceStatus("string")).toBe(false);
    });

    it("validates isComplianceFramework function", () => {
      // Simple string framework
      expect(isComplianceFramework("ISO 27001")).toBe(true);

      // Complex framework object
      const validFramework = {
        name: "HIPAA",
        status: "compliant",
      };
      expect(isComplianceFramework(validFramework)).toBe(true);

      // Invalid inputs
      expect(isComplianceFramework(null)).toBe(false);
      expect(isComplianceFramework({})).toBe(false);
      expect(isComplianceFramework({ name: "Test" })).toBe(false);
    });
  });

  describe("Additional TypeGuards Tests", () => {
    it("isROIMetrics validates valid ROI metrics objects", () => {
      const validROI = {
        returnRate: "200%",
        description: "Good ROI",
        potentialSavings: "$100,000",
        breakEvenPeriod: "12 months",
      };
      expect(isROIMetrics(validROI)).toBe(true);

      const invalidROI1 = {};
      const invalidROI2 = { returnRate: 200, description: "test" }; // returnRate should be string
      const invalidROI3 = null;

      expect(isROIMetrics(invalidROI1)).toBe(false);
      expect(isROIMetrics(invalidROI2)).toBe(false);
      expect(isROIMetrics(invalidROI3)).toBe(false);
    });

    it("isTechnicalImplementationDetails validates implementation details", () => {
      const validDetails = {
        description: "Implementation details",
        implementationSteps: ["Step 1", "Step 2"],
        effort: {
          development: "Medium",
          maintenance: "Low",
          expertise: "Advanced",
        },
      };
      expect(isTechnicalImplementationDetails(validDetails)).toBe(true);

      const invalidDetails1 = {};
      const invalidDetails2 = {
        description: "test",
        implementationSteps: "not an array",
      };

      expect(isTechnicalImplementationDetails(invalidDetails1)).toBe(false);
      expect(isTechnicalImplementationDetails(invalidDetails2)).toBe(false);
    });

    it("isSecurityResource validates security resource objects", () => {
      const validResource = {
        title: "Resource",
        description: "Description",
        url: "https://example.com",
        category: "Category",
        tags: ["tag1", "tag2"],
        relevanceScore: 85,
        type: "Documentation",
      };
      expect(isSecurityResource(validResource)).toBe(true);

      const invalidResource1 = {};
      const invalidResource2 = { title: "Test", description: "Test" }; // Missing required fields

      expect(isSecurityResource(invalidResource1)).toBe(false);
      expect(isSecurityResource(invalidResource2)).toBe(false);
    });

    it("isWidgetProps validates widget props", () => {
      const validProps = {
        title: "Widget Title",
        description: "Widget description",
        icon: "🔍",
      };
      expect(isWidgetProps(validProps)).toBe(true);

      const invalidProps1 = {};
      const invalidProps2 = { title: 42 }; // title should be string

      expect(isWidgetProps(invalidProps1)).toBe(false);
      expect(isWidgetProps(invalidProps2)).toBe(false);
    });
  });

  describe("Utility Functions", () => {
    it("safeAccess safely accesses nested object properties", () => {
      const obj = {
        a: {
          b: {
            c: "value",
          },
          d: [{ e: "array value" }],
        },
      };

      expect(safeAccess(obj, "a.b.c")).toBe("value");
      expect(safeAccess(obj, "a.d[0].e")).toBe("array value");
      expect(safeAccess(obj, "a.b.missing")).toBeUndefined();
      expect(safeAccess(obj, "a.b.missing", "default")).toBe("default");
      expect(safeAccess(null, "a.b.c", "default")).toBe("default");
      expect(safeAccess(undefined, "a.b.c", "default")).toBe("default");
    });

    it("ensureArray converts values to arrays if they aren't already", () => {
      expect(ensureArray("value")).toEqual(["value"]);
      expect(ensureArray(123)).toEqual([123]);
      expect(ensureArray(null)).toEqual([]);
      expect(ensureArray(undefined)).toEqual([]);
      expect(ensureArray(["already", "array"])).toEqual(["already", "array"]);
    });

    it("safeNumberConversion safely converts values to numbers", () => {
      expect(safeNumberConversion(123)).toBe(123);
      expect(safeNumberConversion("123")).toBe(123);
      expect(safeNumberConversion("not a number")).toBe(0);
      expect(safeNumberConversion("not a number", 10)).toBe(10);
      expect(safeNumberConversion(undefined, 5)).toBe(5);
    });

    it("getSecurityLevelOption safely accesses security level options", () => {
      const options = {
        None: { value: 0 },
        Low: { value: 1 },
        Moderate: { value: 2 },
        High: { value: 3 },
        "Very High": { value: 4 },
      };

      expect(getSecurityLevelOption(options, "None")).toEqual({ value: 0 });
      expect(getSecurityLevelOption(options, "Low")).toEqual({ value: 1 });
      expect(getSecurityLevelOption(options, "Moderate")).toEqual({ value: 2 });
      expect(getSecurityLevelOption(options, "High")).toEqual({ value: 3 });
      expect(getSecurityLevelOption(options, "Very High")).toEqual({
        value: 4,
      });
      expect(getSecurityLevelOption(options, "Invalid")).toBeUndefined();
      expect(getSecurityLevelOption(options, undefined)).toEqual({ value: 0 }); // Defaults to None
    });

    it("hasProperty checks if an object has a property", () => {
      const obj = { a: 1, b: undefined, c: null };

      expect(hasProperty(obj, "a")).toBe(true);
      expect(hasProperty(obj, "b")).toBe(true);
      expect(hasProperty(obj, "c")).toBe(true);
      expect(hasProperty(obj, "d")).toBe(false);
      expect(hasProperty(null, "a")).toBe(false);
      expect(hasProperty(undefined, "a")).toBe(false);
    });

    it("hasTagValue checks if an object has a specific tag", () => {
      const obj = { tags: ["security", "compliance", "availability"] };

      expect(hasTagValue(obj, "security")).toBe(true);
      expect(hasTagValue(obj, "compliance")).toBe(true);
      expect(hasTagValue(obj, "missing")).toBe(false);
      expect(hasTagValue({ tags: "not-an-array" }, "tag")).toBe(false);
      expect(hasTagValue({ notags: [] }, "tag")).toBe(false);
      expect(hasTagValue(null, "tag")).toBe(false);
      expect(hasTagValue(undefined, "tag")).toBe(false);
    });

    it("parseRiskLevel parses risk level strings to numbers", () => {
      expect(parseRiskLevel("0")).toBe(0);
      expect(parseRiskLevel("1")).toBe(1);
      expect(parseRiskLevel("5")).toBe(5);
      expect(parseRiskLevel("Critical")).toBe(0);
      expect(parseRiskLevel(null)).toBe(0);
      expect(parseRiskLevel(undefined)).toBe(0);
    });

    it("extractSecurityLevels extracts security levels from objects", () => {
      const obj = {
        availability: "High",
        integrity: "Moderate",
        confidentiality: "Low",
      };

      expect(extractSecurityLevels(obj)).toEqual({
        availability: "High",
        integrity: "Moderate",
        confidentiality: "Low",
      });

      // Default values for missing properties
      expect(extractSecurityLevels({ availability: "High" })).toEqual({
        availability: "High",
        integrity: "None",
        confidentiality: "None",
      });

      // Not an object
      expect(extractSecurityLevels(null)).toEqual({
        availability: "None",
        integrity: "None",
        confidentiality: "None",
      });

      expect(extractSecurityLevels(undefined)).toEqual({
        availability: "None",
        integrity: "None",
        confidentiality: "None",
      });
    });

    it("getImplementationCost calculates implementation cost", () => {
      const costObj = {
        capex: 10,
        opex: 5,
        fte: 1,
      };

      expect(getImplementationCost(costObj)).toBe(100015); // 10 + 5 + (1 * 100000)
      expect(getImplementationCost({ capex: 10 })).toBe(10);
      expect(getImplementationCost({ opex: 5 })).toBe(5);
      expect(getImplementationCost({ fte: 2 })).toBe(200000);
      expect(getImplementationCost({})).toBe(0);
      expect(getImplementationCost(null)).toBe(0);
      expect(getImplementationCost(undefined)).toBe(0);
    });

    it("isROIEstimate validates ROI estimate objects", () => {
      const validEstimate = {
        returnRate: "200%",
        description: "Good ROI estimate",
      };

      expect(isROIEstimate(validEstimate)).toBe(true);

      const invalidEstimate1 = {};
      const invalidEstimate2 = { returnRate: 200 }; // Should be string

      expect(isROIEstimate(invalidEstimate1)).toBe(false);
      expect(isROIEstimate(invalidEstimate2)).toBe(false);
    });
  });

  it("uses standard test IDs from constants", () => {
    expect(CIA_TEST_IDS.AVAILABILITY).toBe("availability");
    expect(CIA_TEST_IDS.INTEGRITY).toBe("integrity");
    expect(CIA_TEST_IDS.CONFIDENTIALITY).toBe("confidentiality");
  });
});

import {
  isArray,
  isBoolean,
  isCIAComponent,
  isDate,
  isError,
  isFunction,
  isNull,
  isNullish,
  isUndefined,
  isValidKey,
} from "./typeGuards";

describe("Type Guards", () => {
  describe("isString", () => {
    it("returns true for strings", () => {
      expect(isString("test")).toBe(true);
      expect(isString("")).toBe(true);
      expect(isString(String("constructed"))).toBe(true);
    });

    it("returns false for non-strings", () => {
      expect(isString(123)).toBe(false);
      expect(isString(true)).toBe(false);
      expect(isString({})).toBe(false);
      expect(isString([])).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
    });
  });

  describe("isNumber", () => {
    it("returns true for numbers", () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber(0)).toBe(true);
      expect(isNumber(-1)).toBe(true);
      expect(isNumber(0.5)).toBe(true);
      expect(isNumber(Number(123))).toBe(true);
    });

    it("returns false for non-numbers", () => {
      expect(isNumber("123")).toBe(false);
      expect(isNumber(NaN)).toBe(false); // NaN is not considered a valid number
      expect(isNumber(true)).toBe(false);
      expect(isNumber({})).toBe(false);
      expect(isNumber([])).toBe(false);
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
    });
  });

  describe("isBoolean", () => {
    it("returns true for booleans", () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
      expect(isBoolean(Boolean(1))).toBe(true);
    });

    it("returns false for non-booleans", () => {
      expect(isBoolean(1)).toBe(false);
      expect(isBoolean("true")).toBe(false);
      expect(isBoolean({})).toBe(false);
      expect(isBoolean([])).toBe(false);
      expect(isBoolean(null)).toBe(false);
      expect(isBoolean(undefined)).toBe(false);
    });
  });

  describe("isObject", () => {
    it("returns true for objects", () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1 })).toBe(true);
      expect(isObject(new Object())).toBe(true);
    });

    it("returns false for non-objects", () => {
      expect(isObject(null)).toBe(false); // null is not considered an object
      expect(isObject([])).toBe(false); // arrays are not considered objects
      expect(isObject("object")).toBe(false);
      expect(isObject(123)).toBe(false);
      expect(isObject(true)).toBe(false);
      expect(isObject(undefined)).toBe(false);
      expect(isObject(() => {})).toBe(false); // functions are not considered objects
    });
  });

  describe("isArray", () => {
    it("returns true for arrays", () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
      expect(isArray(Array.from([1, 2, 3]))).toBe(true);
    });

    it("returns false for non-arrays", () => {
      expect(isArray({})).toBe(false);
      expect(isArray("array")).toBe(false);
      expect(isArray(123)).toBe(false);
      expect(isArray(true)).toBe(false);
      expect(isArray(null)).toBe(false);
      expect(isArray(undefined)).toBe(false);
    });
  });

  describe("isFunction", () => {
    it("returns true for functions", () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function () {})).toBe(true);
      expect(isFunction(Array.isArray)).toBe(true);
    });

    it("returns false for non-functions", () => {
      expect(isFunction({})).toBe(false);
      expect(isFunction([])).toBe(false);
      expect(isFunction("function")).toBe(false);
      expect(isFunction(123)).toBe(false);
      expect(isFunction(true)).toBe(false);
      expect(isFunction(null)).toBe(false);
      expect(isFunction(undefined)).toBe(false);
    });
  });

  describe("isNull", () => {
    it("returns true for null", () => {
      expect(isNull(null)).toBe(true);
    });

    it("returns false for non-null values", () => {
      expect(isNull(undefined)).toBe(false);
      expect(isNull(0)).toBe(false);
      expect(isNull("")).toBe(false);
      expect(isNull(false)).toBe(false);
      expect(isNull({})).toBe(false);
      expect(isNull([])).toBe(false);
    });
  });

  describe("isUndefined", () => {
    it("returns true for undefined", () => {
      expect(isUndefined(undefined)).toBe(true);
      let undefVar;
      expect(isUndefined(undefVar)).toBe(true);
    });

    it("returns false for non-undefined values", () => {
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined(0)).toBe(false);
      expect(isUndefined("")).toBe(false);
      expect(isUndefined(false)).toBe(false);
      expect(isUndefined({})).toBe(false);
      expect(isUndefined([])).toBe(false);
    });
  });

  describe("isDate", () => {
    it("returns true for dates", () => {
      expect(isDate(new Date())).toBe(true);
      expect(isDate(new Date("2023-01-01"))).toBe(true);
    });

    it("returns false for non-dates", () => {
      expect(isDate("2023-01-01")).toBe(false);
      expect(isDate(123)).toBe(false);
      expect(isDate({})).toBe(false);
      expect(isDate([])).toBe(false);
      expect(isDate(null)).toBe(false);
      expect(isDate(undefined)).toBe(false);
    });
  });

  describe("isSecurityLevel", () => {
    it("returns true for valid security levels", () => {
      expect(isSecurityLevel("None")).toBe(true);
      expect(isSecurityLevel("Low")).toBe(true);
      expect(isSecurityLevel("Moderate")).toBe(true);
      expect(isSecurityLevel("High")).toBe(true);
      expect(isSecurityLevel("Very High")).toBe(true);
    });

    it("returns false for invalid security levels", () => {
      expect(isSecurityLevel("none")).toBe(false); // case sensitive
      expect(isSecurityLevel("VeryHigh")).toBe(false); // no space
      expect(isSecurityLevel("Medium")).toBe(false); // not a valid level
      expect(isSecurityLevel("")).toBe(false);
      expect(isSecurityLevel(123 as any)).toBe(false);
      expect(isSecurityLevel(null as any)).toBe(false);
      expect(isSecurityLevel(undefined as any)).toBe(false);
    });
  });

  describe("isCIAComponent", () => {
    it("returns true for valid CIA components", () => {
      expect(isCIAComponent("confidentiality")).toBe(true);
      expect(isCIAComponent("integrity")).toBe(true);
      expect(isCIAComponent("availability")).toBe(true);
    });

    it("returns false for invalid CIA components", () => {
      expect(isCIAComponent("Confidentiality")).toBe(false); // case sensitive
      expect(isCIAComponent("security")).toBe(false);
      expect(isCIAComponent("")).toBe(false);
      expect(isCIAComponent(123 as any)).toBe(false);
      expect(isCIAComponent(null as any)).toBe(false);
      expect(isCIAComponent(undefined as any)).toBe(false);
    });
  });

  describe("hasProperty", () => {
    it("returns true when object has the specified property", () => {
      const obj = { name: "test", value: 123 };
      expect(hasProperty(obj, "name")).toBe(true);
      expect(hasProperty(obj, "value")).toBe(true);
    });

    it("returns false when object does not have the specified property", () => {
      const obj = { name: "test" };
      expect(hasProperty(obj, "age")).toBe(false);
      expect(hasProperty(obj, "toString")).toBe(false); // Doesn't check prototype chain
    });

    it("handles edge cases gracefully", () => {
      expect(hasProperty(null as any, "prop")).toBe(false);
      expect(hasProperty(undefined as any, "prop")).toBe(false);
      expect(hasProperty({}, "")).toBe(false);
    });
  });

  describe("isValidKey", () => {
    it("returns true for valid object keys", () => {
      expect(isValidKey("name")).toBe(true);
      expect(isValidKey("_id")).toBe(true);
      expect(isValidKey("property1")).toBe(true);
      expect(isValidKey(0)).toBe(true); // Numbers are valid keys
      expect(isValidKey("0")).toBe(true);
    });

    it("returns false for invalid object keys", () => {
      expect(isValidKey(null)).toBe(false);
      expect(isValidKey(undefined)).toBe(false);
      expect(isValidKey({})).toBe(false);
      expect(isValidKey([])).toBe(false);
      expect(isValidKey(() => {})).toBe(false);
    });
  });

  describe("isNullish", () => {
    it("returns true for null and undefined", () => {
      expect(isNullish(null)).toBe(true);
      expect(isNullish(undefined)).toBe(true);
    });

    it("returns false for non-nullish values", () => {
      expect(isNullish(0)).toBe(false);
      expect(isNullish("")).toBe(false);
      expect(isNullish(false)).toBe(false);
      expect(isNullish({})).toBe(false);
      expect(isNullish([])).toBe(false);
    });
  });

  describe("isError", () => {
    it("returns true for error objects", () => {
      expect(isError(new Error())).toBe(true);
      expect(isError(new TypeError())).toBe(true);
      expect(isError(new RangeError())).toBe(true);
    });

    it("returns false for non-error values", () => {
      expect(isError({ message: "Error-like object" })).toBe(false);
      expect(isError("Error message")).toBe(false);
      expect(isError(null)).toBe(false);
      expect(isError(undefined)).toBe(false);
      expect(isError(123)).toBe(false);
      expect(isError(true)).toBe(false);
      expect(isError({})).toBe(false);
      expect(isError([])).toBe(false);
    });
  });
});
