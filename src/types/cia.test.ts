import { describe, expect, it } from "vitest";
import { CIADetails } from "./cia";

describe("CIADetails Type", () => {
  // Create a test record to validate against
  const testRecord: Record<string, CIADetails> = {
    None: {
      description: "Test",
      impact: "Test",
      technical: "Test",
      businessImpact: "Test",
      capex: 0,
      opex: 0,
      bg: "#ffffff",
      text: "#000000",
      recommendations: [],
    },
    Low: {
      description: "Test",
      impact: "Test",
      technical: "Test",
      businessImpact: "Test",
      capex: 10,
      opex: 5,
      bg: "#efefef",
      text: "#000000",
      recommendations: ["Test recommendation"],
    },
  };

  it("should be correctly structured", () => {
    // Create an object that conforms to the CIADetails interface
    const details: CIADetails = {
      description: "Test Description",
      impact: "Test Impact",
      technical: "Test Technical Controls",
      businessImpact: "Test Business Impact",
      capex: 50,
      opex: 30,
      bg: "#ffffff",
      text: "#000000",
      recommendations: ["Recommendation 1", "Recommendation 2"],
    };

    // Verify the structure
    expect(details).toHaveProperty("description");
    expect(details).toHaveProperty("impact");
    expect(details).toHaveProperty("technical");
    expect(details).toHaveProperty("businessImpact");
    expect(details).toHaveProperty("capex");
    expect(details).toHaveProperty("opex");
    expect(details).toHaveProperty("bg");
    expect(details).toHaveProperty("text");
    expect(details).toHaveProperty("recommendations");

    // Verify the types
    expect(typeof details.description).toBe("string");
    expect(typeof details.impact).toBe("string");
    expect(typeof details.technical).toBe("string");
    expect(typeof details.businessImpact).toBe("string");
    expect(typeof details.capex).toBe("number");
    expect(typeof details.opex).toBe("number");
    expect(typeof details.bg).toBe("string");
    expect(typeof details.text).toBe("string");
    expect(Array.isArray(details.recommendations)).toBe(true);
  });

  it("supports all expected CIA levels", () => {
    Object.values(testRecord).forEach((details) => {
      expect(details).toHaveProperty("businessImpact");
      expect(details).toHaveProperty("capex");
      expect(details).toHaveProperty("opex");
      expect(details).toHaveProperty("bg");
      expect(details).toHaveProperty("text");
      expect(details).toHaveProperty("recommendations");
    });
  });

  it("handles recommendations array properly", () => {
    // Test with empty recommendations
    const emptyRecDetails: CIADetails = {
      description: "Test",
      impact: "Test",
      technical: "Test",
      businessImpact: "Test",
      capex: 10,
      opex: 5,
      bg: "#ffffff",
      text: "#000000",
      recommendations: [],
    };

    // Check that empty recommendations is an array
    expect(Array.isArray(emptyRecDetails.recommendations)).toBe(true);
    expect(emptyRecDetails.recommendations).toEqual([]);

    // Test with multiple recommendations
    const multiRecDetails: CIADetails = {
      description: "Test",
      impact: "Test",
      technical: "Test",
      businessImpact: "Test",
      capex: 10,
      opex: 5,
      bg: "#ffffff",
      text: "#000000",
      recommendations: [
        "Recommendation 1",
        "Recommendation 2",
        "Recommendation 3",
      ],
    };

    // First check that recommendations is defined and is an array
    expect(multiRecDetails.recommendations).toBeDefined();
    expect(Array.isArray(multiRecDetails.recommendations)).toBe(true);

    // Use non-null assertion operator to inform TypeScript that we're certain recommendations exists
    // This is safe because we've already verified it's defined above
    expect(multiRecDetails.recommendations!.length).toBe(3);
    expect(multiRecDetails.recommendations![0]).toBe("Recommendation 1");
    expect(multiRecDetails.recommendations![1]).toBe("Recommendation 2");
    expect(multiRecDetails.recommendations![2]).toBe("Recommendation 3");
  });

  it("handles optional fields correctly", () => {
    // Create a minimal CIADetails object
    const minimalDetails: CIADetails = {
      description: "Minimal Test",
      impact: "Minimal Impact",
      technical: "Minimal Tech",
      businessImpact: "Minimal Business Impact",
      capex: 0,
      opex: 0,
      bg: "#ffffff",
      text: "#000000",
      recommendations: [],
    };

    // Verify required fields
    expect(minimalDetails.description).toBeDefined();
    expect(minimalDetails.impact).toBeDefined();
    expect(minimalDetails.technical).toBeDefined();
    expect(minimalDetails.businessImpact).toBeDefined();
    expect(minimalDetails.capex).toBeDefined();
    expect(minimalDetails.opex).toBeDefined();

    // Optional fields should be defined but can be empty
    expect(minimalDetails.recommendations).toBeDefined();
    expect(Array.isArray(minimalDetails.recommendations)).toBe(true);
  });
});
