import { describe, expect, it } from "vitest";
import {
  CIA_TEST_IDS,
  TEST_DATA,
  TEST_HELPERS,
  TEST_MATCHERS,
  createValuePointMatcher,
  getPartialTextMatcher,
  getTextElementMatcher,
} from "./testConstants";

describe("Test Constants", () => {
  describe("CIA_TEST_IDS", () => {
    it("provides identifiers for CIA components", () => {
      expect(CIA_TEST_IDS.AVAILABILITY).toBeDefined();
      expect(CIA_TEST_IDS.INTEGRITY).toBeDefined();
      expect(CIA_TEST_IDS.CONFIDENTIALITY).toBeDefined();
    });
  });

  describe("TEST_DATA", () => {
    it("provides mock options with required properties", () => {
      expect(TEST_DATA.MOCK_OPTIONS.BASE).toHaveProperty("capex");
      expect(TEST_DATA.MOCK_OPTIONS.BASE).toHaveProperty("opex");

      expect(TEST_DATA.MOCK_OPTIONS.LOW).toHaveProperty("capex");
      expect(TEST_DATA.MOCK_OPTIONS.LOW).toHaveProperty("opex");
      expect(TEST_DATA.MOCK_OPTIONS.LOW).toHaveProperty("description");
    });

    it("provides mock descriptions", () => {
      expect(TEST_DATA.MOCK_DESCRIPTIONS).toHaveProperty("AVAILABILITY");
      expect(TEST_DATA.MOCK_DESCRIPTIONS).toHaveProperty("INTEGRITY");
      expect(TEST_DATA.MOCK_DESCRIPTIONS).toHaveProperty("CONFIDENTIALITY");
    });
  });

  describe("TEST_MATCHERS", () => {
    it("provides regex patterns for matching test content", () => {
      expect(TEST_MATCHERS.UPTIME_PATTERN).toBeInstanceOf(RegExp);
      expect(TEST_MATCHERS.DOWNTIME_PATTERN).toBeInstanceOf(RegExp);

      expect(TEST_MATCHERS.SECURITY_DESCRIPTIONS_REGEX).toHaveProperty("NONE");
      expect(TEST_MATCHERS.SECURITY_DESCRIPTIONS_REGEX).toHaveProperty("LOW");
      expect(TEST_MATCHERS.SECURITY_DESCRIPTIONS_REGEX).toHaveProperty(
        "MODERATE"
      );
      expect(TEST_MATCHERS.SECURITY_DESCRIPTIONS_REGEX).toHaveProperty("HIGH");
    });

    it("correctly matches text with regex patterns", () => {
      // Test the regex patterns
      expect("99.9% uptime").toMatch(TEST_MATCHERS.UPTIME_PATTERN);
      expect("Expected downtime: 4 hours").toMatch(
        TEST_MATCHERS.DOWNTIME_PATTERN
      );
    });
  });

  describe("TEST_HELPERS", () => {
    it("provides checkSecurityLevelColor utility", () => {
      // Need to set up a test DOM element
      const element = document.createElement("div");
      element.className = "security-level-low";

      // Test the helper function
      const result = TEST_HELPERS.checkSecurityLevelColor(element, "low");
      expect(typeof result).toBe("boolean");
    });

    it("provides getTestId utility", () => {
      const testId = TEST_HELPERS.getTestId("component", "entity", "action");
      expect(testId).toBe("component-entity-action");

      const simpleTestId = TEST_HELPERS.getTestId("component", "entity");
      expect(simpleTestId).toBe("component-entity");
    });
  });

  describe("createValuePointMatcher", () => {
    it("creates regex for matching value points", () => {
      const matcher = createValuePointMatcher("Improved security posture");
      expect(matcher).toBeInstanceOf(RegExp);
      expect("Improved security posture reduces risk").toMatch(matcher);
    });

    it("limits match to first few words", () => {
      const matcher = createValuePointMatcher("First second third fourth");
      expect("First second third different text").toMatch(matcher);
      expect("First second different").not.toMatch(matcher);
    });
  });

  describe("getTextElementMatcher", () => {
    it("creates matcher function for finding text in elements", () => {
      const matcher = getTextElementMatcher("test text", "test-class");
      expect(typeof matcher).toBe("function");

      // Create mock element and content
      const element = { className: "test-class" };
      const content = "containing test text inside";

      // Test the matcher function
      const result = matcher(content, element as any);
      expect(result).toBe(true);
    });
  });

  describe("getPartialTextMatcher", () => {
    it("creates partial text matcher string", () => {
      const result = getPartialTextMatcher("This is a test");
      expect(typeof result).toBe("string");
      expect("This is a test example").toMatch(new RegExp(result));
    });
  });
});
