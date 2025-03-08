import { describe, it, expect } from "vitest";
import { CIADetails } from "./cia";
import {
  WidgetBaseProps,
  IntegrityImpactWidgetProps,
  ConfidentialityImpactWidgetProps,
  AvailabilityImpactWidgetProps,
  SecurityResourcesWidgetProps,
} from "./widgets";

describe("Widget Types", () => {
  it("WidgetBaseProps should have correct structure", () => {
    const props: WidgetBaseProps = {
      testId: "test-widget",
    };

    expect(props.testId).toBe("test-widget");
  });

  it("IntegrityImpactWidgetProps should extend WidgetBaseProps", () => {
    const mockOptions: Record<string, CIADetails> = {
      None: {
        description: "Test",
        impact: "Test",
        technical: "Test",
        businessImpact: "Test",
        capex: 0,
        opex: 0,
        bg: "#fff",
        text: "#000",
        recommendations: [],
      },
    };

    const props: IntegrityImpactWidgetProps = {
      level: "None",
      options: mockOptions,
      testId: "test-integrity-widget",
    };

    expect(props.testId).toBe("test-integrity-widget"); // from WidgetBaseProps
    expect(props.level).toBe("None");
    expect(props.options).toBe(mockOptions);
  });

  it("ConfidentialityImpactWidgetProps should have correct structure", () => {
    const props: ConfidentialityImpactWidgetProps = {
      level: "High",
      options: {
        High: {
          impact: "Strong confidentiality protection",
          businessImpact: "Business data is well-protected",
          recommendations: ["Use encryption", "Implement access control"],
        },
      },
    };

    expect(props.level).toBe("High");
    expect(props.options).toBeDefined();
  });

  it("AvailabilityImpactWidgetProps should have correct structure", () => {
    const props: AvailabilityImpactWidgetProps = {
      level: "Moderate",
      testId: "test-id",
      options: {
        High: {
          description: "High availability",
          businessImpact: "Business remains operational",
          uptime: "99.9%",
          recommendations: ["Use load balancing", "Implement failover"],
        },
      },
    };

    expect(props.level).toBe("Moderate");
    expect(props.testId).toBe("test-id");
    expect(props.options).toBeDefined();
  });

  it("SecurityResourcesWidgetProps should have correct structure", () => {
    const props: SecurityResourcesWidgetProps = {
      securityLevel: "Very High",
    };

    expect(props.securityLevel).toBe("Very High");
  });

  it("tests confidentiality impact widget props", () => {
    const props: ConfidentialityImpactWidgetProps = {
      level: "High",
      options: {
        High: {
          impact: "Strong confidentiality protection",
          businessImpact: "Business data is well-protected",
          recommendations: ["Use encryption", "Implement access control"],
        },
      },
    };

    expect(props.level).toBe("High");
    expect(props.options).toBeDefined();
  });

  it("tests availability impact widget props", () => {
    const props: AvailabilityImpactWidgetProps = {
      level: "High",
      testId: "availability-widget",
      options: {
        High: {
          description: "High availability",
          businessImpact: "Business remains operational",
          uptime: "99.9%",
          recommendations: ["Use load balancing", "Implement failover"],
        },
      },
    };

    expect(props.level).toBe("High");
    expect(props.testId).toBe("availability-widget");
    expect(props.options).toBeDefined();
  });
});
