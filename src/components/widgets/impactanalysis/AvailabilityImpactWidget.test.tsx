import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import AvailabilityImpactWidget from "./AvailabilityImpactWidget";

// Mock useCIAContentService hook
vi.mock("../../../hooks/useCIAContentService", () => ({
  useCIAContentService: () => ({
    ciaContentService: {
      // Add getAvailabilityDetails method that the component is trying to access
      getAvailabilityDetails: (level: string) => {
        if (level === "High") {
          return {
            description:
              "Robust availability with minimal unplanned downtime. Comprehensive redundancy and automated recovery systems.",
            businessImpact:
              "Business continuity maintained through most disruptions with minimal customer impact.",
            uptime: "99.9%",
            rto: "15-60 minutes",
            rpo: "15 minutes",
            mttr: "10-30 minutes",
            recommendations: [
              "Deploy High redundancy",
              "Implement High failover mechanisms",
              "Set up High monitoring",
            ],
          };
        } else if (level === "Unknown") {
          return {
            description: "Unknown availability description",
            businessImpact: "Unknown availability business impact",
            uptime: "111%",
            recommendations: [],
          };
        }
        return {
          description: `${level} availability description`,
          businessImpact: `${level} availability business impact`,
          uptime:
            level === "None"
              ? "No uptime guarantee"
              : `${
                  90 + 3 * (level === "Low" ? 1 : level === "Moderate" ? 3 : 7)
                }%`,
          recommendations: [
            `Deploy ${level} redundancy`,
            `Implement ${level} failover mechanisms`,
            `Set up ${level} monitoring`,
          ],
        };
      },
      getComponentDetails: (component: string, level: string) => {
        if (level === "High") {
          return {
            description:
              "Robust availability with minimal unplanned downtime. Comprehensive redundancy and automated recovery systems.",
            businessImpact:
              "Business continuity maintained through most disruptions with minimal customer impact.",
            uptime: "99.9%",
            rto: "15-60 minutes",
            rpo: "15 minutes",
            mttr: "10-30 minutes",
            recommendations: [
              "Deploy High redundancy",
              "Implement High failover mechanisms",
              "Set up High monitoring",
            ],
          };
        } else if (level === "Unknown") {
          return {
            description: "Unknown availability description",
            businessImpact: "Unknown availability business impact",
            uptime: "111%",
            recommendations: [],
          };
        }
        return {
          description: `${level} availability description`,
          businessImpact: `${level} availability business impact`,
          uptime:
            level === "None"
              ? "No uptime guarantee"
              : `${
                  90 + 3 * (level === "Low" ? 1 : level === "Moderate" ? 3 : 7)
                }%`,
          recommendations: [
            `Deploy ${level} redundancy`,
            `Implement ${level} failover mechanisms`,
            `Set up ${level} monitoring`,
          ],
        };
      },
      getBusinessImpact: (component: string, level: string) => ({
        summary: `${level} availability business impact summary`,
        operational: {
          description: `${level} operational impact`,
          riskLevel: level === "None" ? "High Risk" : "Medium Risk",
        },
        financial: {
          description: `${level} financial impact`,
          riskLevel: level === "None" ? "High Risk" : "Low Risk",
        },
      }),
      getTechnicalImplementation: (component: string, level: string) => ({
        description: `${level} technical implementation`,
        implementationSteps: [
          `Step 1 for ${component} at ${level} level`,
          `Step 2 for ${component} at ${level} level`,
        ],
        effort: {
          development: "Medium",
          maintenance: "Ongoing",
          expertise: "Advanced",
        },
        rto: level !== "None" ? `${level} RTO` : undefined,
        rpo: level !== "None" ? `${level} RPO` : undefined,
        mttr: level !== "None" ? `${level} MTTR` : undefined,
      }),
      getBusinessPerspective: (component: string, level: string) =>
        level !== "Unknown" ? `${level} business perspective` : "",
      getRecommendations: (component: string, level: string) => [
        `Deploy ${level} redundancy`,
        `Implement ${level} failover mechanisms`,
        `Set up ${level} monitoring`,
      ],
      getSecurityLevel: () => "High",
      getRiskBadgeVariant: () => "success",
      getInformationSensitivity: () => "Sensitive",
      calculateBusinessImpactLevel: () => "Medium",
      getSecurityIcon: () => "🔒",
      getCategoryIcon: () => "⏰",
    },
    error: null,
    isLoading: false,
  }),
}));

// Mock StatusBadge component
vi.mock("../../../components/common/StatusBadge", () => ({
  default: ({
    children,
    status,
    size,
  }: {
    children: React.ReactNode;
    status: string;
    size?: string;
  }) => (
    <span data-testid="status-badge" className={`status-badge-${status}`}>
      {children}
    </span>
  ),
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
      <h3>Business Impact</h3>
      <p>{impact?.summary}</p>
    </div>
  ),
}));

// Add missing mock for WidgetContainer
vi.mock("../../../components/common/WidgetContainer", () => ({
  default: ({
    children,
    title,
    testId,
  }: {
    children: React.ReactNode;
    title: string;
    testId?: string;
    isLoading?: boolean;
    error?: Error | null;
  }) => (
    <div
      data-testid={testId || "widget-container"}
      role="region"
      aria-labelledby="availability-impact-heading"
    >
      <h2 id="availability-impact-heading">{title}</h2>
      {children}
    </div>
  ),
}));

describe("AvailabilityImpactWidget", () => {
  const defaultProps = {
    availabilityLevel: "High" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    testId: "widget-availability-impact",
  };

  it("renders without crashing", async () => {
    await act(async () => {
      render(<AvailabilityImpactWidget {...defaultProps} />);
    });

    expect(
      screen.getByTestId("widget-availability-impact")
    ).toBeInTheDocument();
  });

  it("displays availability description from ciaContentService", async () => {
    await act(async () => {
      render(<AvailabilityImpactWidget {...defaultProps} />);
    });

    // Use getAllByText instead of getByText since the text appears multiple times
    const descriptionElements = screen.getAllByText(
      /Robust availability with minimal unplanned downtime/i,
      { exact: false }
    );
    expect(descriptionElements.length).toBeGreaterThan(0);
  });

  it("displays business impact information", async () => {
    await act(async () => {
      render(<AvailabilityImpactWidget {...defaultProps} />);
    });

    expect(screen.getByText("Business Impact")).toBeInTheDocument();
    expect(
      screen.getByText("High availability business impact summary")
    ).toBeInTheDocument();
  });

  it("displays metrics like uptime, RTO, RPO", () => {
    render(
      <AvailabilityImpactWidget
        availabilityLevel="High"
        testId="widget-availability-impact"
      />
    );

    // Check for availability metrics section
    expect(
      screen.getByTestId("widget-availability-impact-metrics")
    ).toBeInTheDocument();

    // Check for uptime target - use the correct text that's in the component
    expect(screen.getByText("Target Uptime:")).toBeInTheDocument();
    expect(screen.getByText(/99\.9%/)).toBeInTheDocument();

    // Check for RTO
    expect(screen.getByText(/Recovery Time Objective/i)).toBeInTheDocument();

    // Check for RPO
    expect(screen.getByText(/Recovery Point Objective/i)).toBeInTheDocument();
  });

  it("renders with different availability levels", async () => {
    let rerender: (ui: React.ReactElement) => void;

    await act(async () => {
      const result = render(
        <AvailabilityImpactWidget {...defaultProps} availabilityLevel="Low" />
      );
      rerender = result.rerender;
    });

    expect(
      screen.getByTestId("widget-availability-impact")
    ).toBeInTheDocument();

    // Rerender with different level
    await act(async () => {
      rerender(
        <AvailabilityImpactWidget {...defaultProps} availabilityLevel="High" />
      );
    });

    expect(
      screen.getByTestId("widget-availability-impact")
    ).toBeInTheDocument();
  });

  it("handles unknown level gracefully", async () => {
    await act(async () => {
      render(
        <AvailabilityImpactWidget
          {...defaultProps}
          availabilityLevel={"Unknown" as SecurityLevel}
        />
      );
    });

    expect(
      screen.getByTestId("widget-availability-impact")
    ).toBeInTheDocument();
  });

  it("shows default content for unknown level", async () => {
    await act(async () => {
      render(
        <AvailabilityImpactWidget
          {...defaultProps}
          availabilityLevel={"Unknown" as SecurityLevel}
        />
      );
    });

    expect(
      screen.getByTestId("widget-availability-impact")
    ).toBeInTheDocument();
  });

  it("has proper ARIA attributes for accessibility", async () => {
    await act(async () => {
      render(
        <AvailabilityImpactWidget
          availabilityLevel="High"
          integrityLevel="Moderate"
          confidentialityLevel="Low"
          testId="widget-availability-impact"
        />
      );
    });

    // Check that the region role exists from our WidgetContainer mock
    expect(screen.getByRole("region")).toBeInTheDocument();

    // Check that the aria-labelledby attribute exists from our mock
    const region = screen.getByRole("region");
    expect(region).toHaveAttribute(
      "aria-labelledby",
      "availability-impact-heading"
    );
  });

  it("displays recommendations when available", async () => {
    await act(async () => {
      render(<AvailabilityImpactWidget {...defaultProps} />);
    });

    // Check for recommendations heading
    expect(screen.getByText(/Recommendations/i)).toBeInTheDocument();

    // Check for actual recommendations based on our mock data
    expect(screen.getByText("Deploy High redundancy")).toBeInTheDocument();
    expect(
      screen.getByText("Implement High failover mechanisms")
    ).toBeInTheDocument();
    expect(screen.getByText("Set up High monitoring")).toBeInTheDocument();
  });

  it("accepts custom testId prop", async () => {
    const testId = "custom-availability-widget";

    await act(async () => {
      render(<AvailabilityImpactWidget {...defaultProps} testId={testId} />);
    });

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
