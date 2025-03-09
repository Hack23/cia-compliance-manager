import { describe, it, expect, vi } from "vitest";
import {
  WidgetBaseProps,
  IntegrityImpactWidgetProps,
  ConfidentialityImpactWidgetProps,
  AvailabilityImpactWidgetProps,
  SecurityResourcesWidgetProps,
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
    const mockOptions = {
      None: { description: "No integrity" },
      High: { description: "High integrity" },
    };

    const props: IntegrityImpactWidgetProps = {
      integrityLevel: "High",
      availabilityLevel: "None",
      confidentialityLevel: "None",
      options: mockOptions,
    };

    expect(props).toHaveProperty("integrityLevel");
    expect(props.integrityLevel).toBe("High");
    expect(props).toHaveProperty("options");
    expect(props.options).toEqual(mockOptions);
  });

  it("validates ConfidentialityImpactWidgetProps interface", () => {
    const mockOptions = {
      None: { description: "No confidentiality" },
      High: { description: "High confidentiality" },
    };

    const props: ConfidentialityImpactWidgetProps = {
      confidentialityLevel: "High",
      availabilityLevel: "None",
      integrityLevel: "None",
      options: mockOptions,
    };

    expect(props).toHaveProperty("confidentialityLevel");
    expect(props.confidentialityLevel).toBe("High");
    expect(props).toHaveProperty("options");
    expect(props.options).toEqual(mockOptions);
  });

  it("validates AvailabilityImpactWidgetProps interface", () => {
    const mockOptions = {
      None: { description: "No availability" },
      High: { description: "High availability" },
    };

    const props: AvailabilityImpactWidgetProps = {
      availabilityLevel: "High",
      integrityLevel: "None",
      confidentialityLevel: "None",
      options: mockOptions,
    };

    expect(props).toHaveProperty("availabilityLevel");
    expect(props.availabilityLevel).toBe("High");
    expect(props).toHaveProperty("options");
    expect(props.options).toEqual(mockOptions);
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
    const mockOptions = {
      None: { description: "No confidentiality" },
      High: { description: "High confidentiality" },
    };

    const props: ConfidentialityImpactWidgetProps = {
      confidentialityLevel: "High",
      availabilityLevel: "None",
      integrityLevel: "None",
      options: mockOptions,
    };

    expect(props).toHaveProperty("confidentialityLevel");
    expect(props.confidentialityLevel).toBe("High");
    expect(props).toHaveProperty("options");
  });

  it("validates AvailabilityDetailAdapter working with props", () => {
    const mockOptions = {
      None: { description: "No availability" },
      High: { description: "High availability", uptime: "99.9%" },
    };

    const props: AvailabilityImpactWidgetProps = {
      availabilityLevel: "High",
      integrityLevel: "None",
      confidentialityLevel: "None",
      options: mockOptions,
    };

    expect(props).toHaveProperty("availabilityLevel");
    expect(props.availabilityLevel).toBe("High");
    expect(props).toHaveProperty("options");
    // Add null check to prevent undefined error
    expect(props.options.High?.uptime).toBe("99.9%");
  });
});
