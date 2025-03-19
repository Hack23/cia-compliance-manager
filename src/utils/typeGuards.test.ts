import { CIA_TEST_IDS } from "../constants/testConstants";
// Import the missing functions
import {
    ensureArray,
    hasProperty,
    hasWidgetProps,
    isComplianceFramework,
    isComplianceStatus,
    isObject,
    isROIMetrics,
    isSecurityResource,
    isTechnicalImplementationDetails,
    isValidCIADetail,
    safeAccess,
} from "./typeGuards";

// Remove duplicate hasProperty implementation since we're importing it
const isArray = Array.isArray;
const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";
const isNumber = (value: unknown): value is number => typeof value === "number";
const isString = (value: unknown): value is string => typeof value === "string";
const isFullWidgetConfig = (obj: unknown) =>
  isObject(obj) && hasProperty(obj, "type") && hasProperty(obj, "title");

describe("TypeGuard Functions", () => {
  describe("safeAccess function", () => {
    it("returns the value when object and path exist", () => {
      const obj = { a: { b: { c: "test" } } };
      expect(safeAccess(obj, "a.b.c", undefined)).toBe("test");
    });

    it("returns default value when path does not exist", () => {
      const obj = { a: { b: "test" } };
      expect(safeAccess(obj, "a.b.c", "default")).toBe("default");
    });

    it("returns default value when object is null", () => {
      expect(safeAccess(null, "a.b.c", "default")).toBe("default");
    });

    it("returns default value when object is undefined", () => {
      expect(safeAccess(undefined, "a.b.c", "default")).toBe("default");
    });

    it("handles numeric property access", () => {
      const obj = { a: [{ b: "test" }, { b: "test2" }] };
      expect(safeAccess(obj, "a.1.b", undefined)).toBe("test2");
    });

    it("handles array access with bracket notation", () => {
      const obj = { a: [{ b: "test" }, { b: "test2" }] };
      expect(safeAccess(obj, "a[1].b", undefined)).toBe("test2");
    });

    it("handles nested objects with complex paths", () => {
      const obj = {
        security: {
          levels: {
            availability: "High",
            integrity: "Moderate",
            confidentiality: "Low",
          },
        },
      };

      expect(safeAccess(obj, "security.levels.availability")).toBe("High");
      expect(safeAccess(obj, "security.levels.integrity")).toBe("Moderate");
      expect(safeAccess(obj, "security.levels.confidentiality")).toBe("Low");

      expect(safeAccess(obj, "security.levels.unknown", "Not Found")).toBe(
        "Not Found"
      );
    });

    it("handles numeric paths with different formats", () => {
      const obj = { users: [{ name: "Alice" }, { name: "Bob" }] };

      expect(safeAccess(obj, "users.0.name")).toBe("Alice");
      expect(safeAccess(obj, "users.1.name")).toBe("Bob");

      expect(safeAccess(obj, "users[0].name")).toBe("Alice");
      expect(safeAccess(obj, "users[1].name")).toBe("Bob");

      expect(safeAccess(obj, ["users", 0, "name"])).toBe("Alice");
      expect(safeAccess(obj, ["users", 1, "name"])).toBe("Bob");
    });
  });

  describe("isValidCIADetail function", () => {
    it("returns true for valid CIA detail objects", () => {
      const validDetail = {
        description: "Test description",
        impact: "High",
        technical: "Technical details",
        businessImpact: "Business impact details",
        capex: 100,
        opex: 50,
        bg: "#f0f0f0",
        text: "#000000",
        recommendations: ["Recommendation 1", "Recommendation 2"],
      };

      expect(isValidCIADetail(validDetail)).toBe(true);
    });

    it("returns false for null or undefined values", () => {
      expect(isValidCIADetail(null)).toBe(false);
      expect(isValidCIADetail(undefined)).toBe(false);
    });
  });

  describe("isObject function", () => {
    it("returns true for object values", () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ key: "value" })).toBe(true);
      expect(isObject([])).toBe(true);
      expect(isObject(new Date())).toBe(true);
    });

    it("returns false for non-object values", () => {
      expect(isObject(null)).toBe(false);
      expect(isObject(undefined)).toBe(false);
      expect(isObject("string")).toBe(false);
      expect(isObject(123)).toBe(false);
      expect(isObject(true)).toBe(false);
    });
  });

  describe("ensureArray function", () => {
    it("returns the array if input is array", () => {
      const arr = [1, 2, 3];
      expect(ensureArray(arr)).toEqual(arr);
    });

    it("wraps non-array value in array", () => {
      expect(ensureArray("test" as any)).toEqual(["test"]);
      expect(ensureArray(42 as any)).toEqual([42]);
      expect(ensureArray({ a: 1 } as any)).toEqual([{ a: 1 }]);
    });

    it("returns empty array for null", () => {
      expect(ensureArray(null)).toEqual([]);
    });

    it("returns empty array for undefined", () => {
      expect(ensureArray(undefined)).toEqual([]);
    });

    it("preserves complex nested array structures", () => {
      const nestedArray = [
        [1, 2],
        [3, 4],
      ];
      expect(ensureArray(nestedArray)).toEqual(nestedArray);

      const mixedArray = [{ a: 1 }, [1, 2], "string"];
      expect(ensureArray(mixedArray)).toEqual(mixedArray);
    });

    it("uses standard test IDs from constants", () => {
      expect(CIA_TEST_IDS.AVAILABILITY).toBe("availability");
      expect(CIA_TEST_IDS.INTEGRITY).toBe("integrity");
      expect(CIA_TEST_IDS.CONFIDENTIALITY).toBe("confidentiality");
    });
  });
});

describe("Additional TypeGuards Tests", () => {
  describe("isROIMetrics", () => {
    it("should validate valid ROI metrics objects", () => {
      const validROI = {
        returnRate: "200%",
        description: "Good ROI",
        potentialSavings: "$100,000",
        breakEvenPeriod: "12 months",
      };
      expect(isROIMetrics(validROI)).toBe(true);
    });

    it("should reject invalid ROI metrics objects", () => {
      const invalidROI1 = {};
      const invalidROI2 = { returnRate: 200, description: "test" }; // returnRate should be string
      const invalidROI3 = null;

      expect(isROIMetrics(invalidROI1)).toBe(false);
      expect(isROIMetrics(invalidROI2)).toBe(false);
      expect(isROIMetrics(invalidROI3)).toBe(false);
    });
  });

  describe("isTechnicalImplementationDetails", () => {
    it("should validate valid technical implementation details", () => {
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
    });

    it("should reject invalid technical implementation details", () => {
      const invalidDetails1 = {};
      const invalidDetails2 = {
        description: "test",
        implementationSteps: "not an array",
      };

      expect(isTechnicalImplementationDetails(invalidDetails1)).toBe(false);
      expect(isTechnicalImplementationDetails(invalidDetails2)).toBe(false);
    });
  });

  describe("isSecurityResource", () => {
    it("should validate valid security resource objects", () => {
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
    });

    it("should reject invalid security resource objects", () => {
      const invalidResource1 = {};
      const invalidResource2 = { title: "Test", description: "Test" }; // Missing required fields

      expect(isSecurityResource(invalidResource1)).toBe(false);
      expect(isSecurityResource(invalidResource2)).toBe(false);
    });
  });

  describe("hasWidgetProps", () => {
    it("should validate valid widget props", () => {
      const validProps = {
        title: "Widget Title",
        description: "Widget description",
        icon: "🔍",
      };
      expect(hasWidgetProps(validProps)).toBe(true);
    });

    it("should reject invalid widget props", () => {
      const invalidProps1 = {};
      const invalidProps2 = { title: 42 }; // title should be string

      expect(hasWidgetProps(invalidProps1)).toBe(false);
      expect(hasWidgetProps(invalidProps2)).toBe(false);
    });
  });
});

describe("Object property type guards", () => {
  describe("hasProperty", () => {
    it("returns true when object has the specified property", () => {
      const obj = { name: "Test", value: 123 };
      expect(hasProperty(obj, "name")).toBe(true);
      expect(hasProperty(obj, "value")).toBe(true);
    });

    it("returns false when object does not have the specified property", () => {
      const obj = { name: "Test" };
      expect(hasProperty(obj, "age")).toBe(false);
    });

    it("returns false for null or undefined objects", () => {
      expect(hasProperty(null, "name")).toBe(false);
      expect(hasProperty(undefined, "name")).toBe(false);
    });
  });

  describe("isString", () => {
    it("returns true for string values", () => {
      expect(isString("test")).toBe(true);
      expect(isString("")).toBe(true);
    });

    it("returns false for non-string values", () => {
      expect(isString(123)).toBe(false);
      expect(isString(true)).toBe(false);
      expect(isString({})).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
    });
  });

  describe("isNumber", () => {
    it("returns true for number values", () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber(0)).toBe(true);
      expect(isNumber(-5)).toBe(true);
    });

    it("returns false for non-number values", () => {
      expect(isNumber("123")).toBe(false);
      expect(isNumber(true)).toBe(false);
      expect(isNumber({})).toBe(false);
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
    });
  });

  describe("isBoolean", () => {
    it("returns true for boolean values", () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });

    it("returns false for non-boolean values", () => {
      expect(isBoolean(0)).toBe(false);
      expect(isBoolean(1)).toBe(false);
      expect(isBoolean("true")).toBe(false);
      expect(isBoolean({})).toBe(false);
      expect(isBoolean(null)).toBe(false);
      expect(isBoolean(undefined)).toBe(false);
    });
  });

  describe("isObject", () => {
    it("returns true for object values", () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ name: "Test" })).toBe(true);
    });

    it("returns false for non-object values", () => {
      expect(isObject(123)).toBe(false);
      expect(isObject("object")).toBe(false);
      expect(isObject(true)).toBe(false);
      expect(isObject(null)).toBe(false); // Note: null is not considered an object in this context
      expect(isObject(undefined)).toBe(false);
    });
  });

  describe("isArray", () => {
    it("returns true for array values", () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
    });

    it("returns false for non-array values", () => {
      expect(isArray({})).toBe(false);
      expect(isArray("array")).toBe(false);
      expect(isArray(123)).toBe(false);
      expect(isArray(null)).toBe(false);
      expect(isArray(undefined)).toBe(false);
    });
  });

  describe("isFullWidgetConfig", () => {
    it("returns true for valid complete widget config objects", () => {
      const config = {
        type: "SECURITY_LEVEL", // Replace WidgetType.SECURITY_LEVEL with string value
        title: "Security Level",
        description: "Security level description",
        icon: "security",
        priority: 1,
        visible: true,
      };
      expect(isFullWidgetConfig(config)).toBe(true);
    });

    it("returns false for incomplete widget config objects", () => {
      // Missing title
      const config1 = {
        type: "SECURITY_LEVEL", // Replace WidgetType.SECURITY_LEVEL with string value
        description: "Security level description",
        icon: "security",
        priority: 1,
        visible: true,
      };
      expect(isFullWidgetConfig(config1)).toBe(false);

      // Missing type
      const config2 = {
        title: "Security Level",
        description: "Security level description",
        icon: "security",
        priority: 1,
        visible: true,
      };
      expect(isFullWidgetConfig(config2)).toBe(false);
    });

    it("returns false for non-object values", () => {
      expect(isFullWidgetConfig("not an object")).toBe(false);
      expect(isFullWidgetConfig(null)).toBe(false);
      expect(isFullWidgetConfig(undefined)).toBe(false);
    });
  });
});

describe("Compliance Type Guards", () => {
  it("validates isComplianceStatus function", () => {
    const validStatus = {
      status: "Partially Compliant",
      compliantFrameworks: ["ISO 27001"],
      partiallyCompliantFrameworks: ["NIST CSF"],
      nonCompliantFrameworks: ["HIPAA", "PCI DSS"],
      complianceScore: 50
    };
    
    expect(isComplianceStatus(validStatus)).toBe(true);
    expect(isComplianceStatus(null)).toBe(false);
    expect(isComplianceStatus({})).toBe(false);
    expect(isComplianceStatus({ status: "test" })).toBe(false);
  });
  
  it("validates isComplianceFramework function", () => {
    // Simple string framework
    expect(isComplianceFramework("ISO 27001")).toBe(true);
    
    // Complex framework object
    const validFramework = {
      name: "HIPAA",
      status: "compliant"
    };
    expect(isComplianceFramework(validFramework)).toBe(true);
    
    // Invalid inputs
    expect(isComplianceFramework(null)).toBe(false);
    expect(isComplianceFramework({})).toBe(false);
    expect(isComplianceFramework({ name: "Test" })).toBe(false);
  });
});
