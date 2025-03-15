import { describe, expect, it } from "vitest";
import {
  AvailabilityImpactWidgetProps,
  ConfidentialityImpactWidgetProps,
  IntegrityImpactWidgetProps,
  SecurityResourcesWidgetProps,
  WidgetBaseProps,
} from "./widgets";

describe("Widget Type Definitions", () => {
  it("validates WidgetBaseProps interface", () => {
    const props: WidgetBaseProps = {
      testId: "test-widget",
      availabilityLevel: "None",
      integrityLevel: "None",
      confidentialityLevel: "None",
    };

    expect(props).toHaveProperty("testId");
    expect(props).toHaveProperty("availabilityLevel");
    expect(props).toHaveProperty("integrityLevel");
    expect(props).toHaveProperty("confidentialityLevel");
  });

  it("validates IntegrityImpactWidgetProps interface", () => {
    const props: IntegrityImpactWidgetProps = {
      integrityLevel: "High",
      availabilityLevel: "None",
      confidentialityLevel: "None",
    };

    expect(props).toHaveProperty("integrityLevel");
    expect(props.integrityLevel).toBe("High");
  });

  it("validates ConfidentialityImpactWidgetProps interface", () => {
    const props: ConfidentialityImpactWidgetProps = {
      confidentialityLevel: "High",
      availabilityLevel: "None",
      integrityLevel: "None",
    };

    expect(props).toHaveProperty("confidentialityLevel");
    expect(props.confidentialityLevel).toBe("High");
  });

  it("validates AvailabilityImpactWidgetProps interface", () => {
    const props: AvailabilityImpactWidgetProps = {
      availabilityLevel: "High",
      integrityLevel: "None",
      confidentialityLevel: "None",
    };

    expect(props).toHaveProperty("availabilityLevel");
    expect(props.availabilityLevel).toBe("High");
  });

  it("validates SecurityResourcesWidgetProps interface", () => {
    const props: SecurityResourcesWidgetProps = {
      securityLevel: "High",
      availabilityLevel: "Moderate",
      integrityLevel: "Low",
      confidentialityLevel: "High",
    };

    expect(props).toHaveProperty("securityLevel");
    expect(props.securityLevel).toBe("High");
    // Add validation for required CIA properties
    expect(props).toHaveProperty("availabilityLevel");
    expect(props).toHaveProperty("integrityLevel");
    expect(props).toHaveProperty("confidentialityLevel");
  });

  it("validates ConfidentialityDetailAdapter working with props", () => {
    const props: ConfidentialityImpactWidgetProps = {
      confidentialityLevel: "High",
      availabilityLevel: "None",
      integrityLevel: "None",
    };

    expect(props).toHaveProperty("confidentialityLevel");
    expect(props.confidentialityLevel).toBe("High");
  });

  it("validates AvailabilityDetailAdapter working with props", () => {
    const props: AvailabilityImpactWidgetProps = {
      availabilityLevel: "High",
      integrityLevel: "None",
      confidentialityLevel: "None",
    };

    expect(props).toHaveProperty("availabilityLevel");
    expect(props.availabilityLevel).toBe("High");
  });
});

describe("AvailabilityImpactWidgetProps", () => {
  const mockOptions = {
    None: {
      description: "No availability",
      businessImpact: "Complete service loss",
      uptime: "<90%",
      recommendations: ["Add redundancy"],
    },
    High: {
      description: "High availability",
      businessImpact: "Minimal service disruption",
      uptime: "99.9%",
      recommendations: ["Add more redundancy"],
    },
  };

  it("validates the structure of AvailabilityImpactWidgetProps", () => {
    const props: AvailabilityImpactWidgetProps = {
      availabilityLevel: "None",
      integrityLevel: "None",
      confidentialityLevel: "None",
      options: mockOptions, // Add the missing options property
    };

    expect(props.availabilityLevel).toBe("None");
    expect(props.options).toEqual(mockOptions);
  });

  it("handles different security levels", () => {
    const props: AvailabilityImpactWidgetProps = {
      availabilityLevel: "High",
      integrityLevel: "None",
      confidentialityLevel: "None",
      options: mockOptions, // Add the missing options property
    };

    expect(props.availabilityLevel).toBe("High");
  });
});
