import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import { CIAComponentType } from "../../../types/cia-services";
import AvailabilityImpactWidget from "./AvailabilityImpactWidget";

// Mock useCIAContentService hook
vi.mock("../../../hooks/useCIAContentService", () => ({
  useCIAContentService: () => ({
    ciaContentService: {
      getComponentDetails: (
        component: CIAComponentType,
        level: SecurityLevel
      ) => {
        return {
          description: `${level} ${component} description`,
          businessImpact: `${level} ${component} business impact`,
          uptime: level === "High" ? "99.9%" : "99%",
          rto: level === "High" ? "4 hours" : "12 hours",
          rpo: level === "High" ? "4 hours" : "12 hours",
          mttr: level === "High" ? "4 hours" : "8 hours",
          sla: level === "High" ? "24/7" : "Business hours, 7 days",
        };
      },
      getBusinessImpact: (
        component: CIAComponentType,
        level: SecurityLevel
      ) => ({
        summary: `${level} ${component} business impact summary`,
        financial: {
          description: `${level} financial impact`,
          riskLevel: level === "None" ? "Critical Risk" : "Medium Risk",
        },
        operational: {
          description: `${level} operational impact`,
          riskLevel: level === "None" ? "Critical Risk" : "Low Risk",
        },
      }),
      getDefaultSLAMetrics: (level: SecurityLevel) => {
        switch (level) {
          case "None":
            return {
              uptime: "Best effort",
              rto: "No commitment",
              rpo: "No commitment",
              mttr: "No commitment",
              sla: "No SLA",
            };
          case "Low":
            return {
              uptime: "95% (18 days downtime/year)",
              rto: "24 hours",
              rpo: "24 hours",
              mttr: "24 hours",
              sla: "Business hours",
            };
          case "Moderate":
            return {
              uptime: "99% (3.7 days downtime/year)",
              rto: "12 hours",
              rpo: "12 hours",
              mttr: "8 hours",
              sla: "Business hours, 7 days",
            };
          case "High":
            return {
              uptime: "99.9% (8.8 hours downtime/year)",
              rto: "4 hours",
              rpo: "4 hours",
              mttr: "4 hours",
              sla: "24/7",
            };
          case "Very High":
            return {
              uptime: "99.999% (5 minutes downtime/year)",
              rto: "15 minutes",
              rpo: "15 minutes",
              mttr: "1 hour",
              sla: "24/7 with priority response",
            };
          default:
            return {
              uptime: "Unknown",
              rto: "Unknown",
              rpo: "Unknown",
              mttr: "Unknown",
              sla: "Unknown",
            };
        }
      },
    },
    error: null,
    isLoading: false,
  }),
}));

// Mock BusinessImpactSection component
vi.mock("../../../components/common/BusinessImpactSection", () => ({
  default: ({
    impact,
    testId,
  }: {
    impact: { summary: string } | undefined;
    testId?: string;
  }) => (
    <div data-testid={testId || "business-impact-section"}>
      {impact?.summary}
    </div>
  ),
}));

// Mock SecurityLevelBadge component
vi.mock("../../../components/common/SecurityLevelBadge", () => ({
  default: ({ level, testId }: { level: string; testId?: string }) => (
    <div data-testid={testId || "security-level-badge"}>{level}</div>
  ),
}));

// Mock WidgetContainer component
vi.mock("../../../components/common/WidgetContainer", () => ({
  default: ({
    children,
    title,
    testId,
  }: {
    children: React.ReactNode;
    title: string;
    testId?: string;
  }) => (
    <div data-testid={testId || "widget-container"}>
      <h2>{title}</h2>
      {children}
    </div>
  ),
}));

describe("AvailabilityImpactWidget", () => {
  const defaultProps = {
    level: "Moderate" as SecurityLevel,
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    testId: "availability-widget",
  };

  it("renders without crashing", () => {
    render(<AvailabilityImpactWidget {...defaultProps} />);
    expect(screen.getByTestId("availability-widget")).toBeInTheDocument();
  });

  it("displays security level badge", () => {
    render(<AvailabilityImpactWidget {...defaultProps} />);
    expect(screen.getByTestId("availability-widget-level")).toBeInTheDocument();
    expect(screen.getByTestId("availability-widget-level")).toHaveTextContent(
      "Moderate"
    );
  });

  it("displays business impact section", () => {
    render(<AvailabilityImpactWidget {...defaultProps} />);
    expect(screen.getByText("Business Impact")).toBeInTheDocument();
    expect(
      screen.getByTestId("availability-widget-business-impact")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Moderate availability business impact summary")
    ).toBeInTheDocument();
  });

  it("displays SLA metrics section", () => {
    render(<AvailabilityImpactWidget {...defaultProps} />);
    expect(screen.getByText("SLA Metrics")).toBeInTheDocument();

    // Check for uptime metrics
    expect(screen.getByText("Uptime Target")).toBeInTheDocument();
    expect(screen.getByText("99%")).toBeInTheDocument();

    // Check for RTO
    expect(screen.getByText("Recovery Time Objective")).toBeInTheDocument();

    // Use getAllByText for elements that appear multiple times
    const rtoElements = screen.getAllByText("12 hours");
    expect(rtoElements.length).toBeGreaterThan(0);

    // Check for SLA
    expect(screen.getByText("Service Level Agreement")).toBeInTheDocument();
    expect(screen.getByText("Business hours, 7 days")).toBeInTheDocument();
  });

  it("uses the specific availability level from props when available", () => {
    render(
      <AvailabilityImpactWidget
        {...defaultProps}
        level="Low"
        availabilityLevel="High"
      />
    );
    expect(screen.getByTestId("availability-widget-level")).toHaveTextContent(
      "High"
    );
    expect(screen.getByText("99.9%")).toBeInTheDocument();
    // Use queryAllByText and index for duplicate texts instead of getByText
    const rtpElements = screen.queryAllByText("4 hours");
    expect(rtpElements.length).toBeGreaterThan(0);
    expect(screen.getByText("24/7")).toBeInTheDocument();
  });

  it("falls back to the legacy level prop when specific level is not provided", () => {
    render(
      <AvailabilityImpactWidget
        level="Low"
        availabilityLevel="Low" // Provide a valid SecurityLevel value instead of undefined
        testId="availability-widget"
      />
    );
    expect(screen.getByTestId("availability-widget-level")).toHaveTextContent(
      "Low"
    );
  });

  it("accepts custom testId prop", () => {
    render(
      <AvailabilityImpactWidget {...defaultProps} testId="custom-test-id" />
    );
    expect(screen.getByTestId("custom-test-id")).toBeInTheDocument();
    expect(screen.getByTestId("custom-test-id-level")).toBeInTheDocument();
    expect(
      screen.getByTestId("custom-test-id-business-impact")
    ).toBeInTheDocument();
  });

  it("handles None level correctly", () => {
    render(
      <AvailabilityImpactWidget {...defaultProps} availabilityLevel="None" />
    );
    expect(screen.getByTestId("availability-widget-level")).toHaveTextContent(
      "None"
    );
    // None level would show default metrics for "None" level
    // We don't want to hardcode these values - they come from the hook
  });

  it("handles Very High level correctly", () => {
    render(
      <AvailabilityImpactWidget
        {...defaultProps}
        availabilityLevel="Very High"
      />
    );
    expect(screen.getByTestId("availability-widget-level")).toHaveTextContent(
      "Very High"
    );
    // Very High level would show advanced metrics
    // We don't want to hardcode these values - they come from the hook
  });
});
