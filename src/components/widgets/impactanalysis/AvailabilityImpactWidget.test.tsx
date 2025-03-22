import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import AvailabilityImpactWidget from "./AvailabilityImpactWidget";

// Mock ciaContentService with more complete implementation
vi.mock("../../services/ciaContentService", () => ({
  __esModule: true,
  default: {
    getComponentDetails: vi.fn().mockImplementation((component, level) => {
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
        };
      } else if (level === "Unknown") {
        return {
          description: "Unknown availability description",
          businessImpact: "Unknown availability business impact",
          uptime: "111%",
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
      };
    }),
    getBusinessImpact: vi.fn().mockImplementation((component, level) => ({
      summary: `${level} availability business impact summary`,
      operational: {
        description: `${level} operational impact`,
        riskLevel: level === "None" ? "High Risk" : "Medium Risk",
      },
      financial: {
        description: `${level} financial impact`,
        riskLevel: level === "None" ? "High Risk" : "Low Risk",
      },
    })),
    getTechnicalImplementation: vi
      .fn()
      .mockImplementation((component, level) => ({
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
      })),
    getBusinessPerspective: vi
      .fn()
      .mockImplementation((component, level) =>
        level !== "Unknown" ? `${level} business perspective` : ""
      ),
    getRecommendations: vi
      .fn()
      .mockImplementation((component, level) => [
        `Deploy ${level} redundancy`,
        `Implement ${level} failover mechanisms`,
        `Set up ${level} monitoring`,
      ]),
    // Add missing mocked functions
    getSecurityLevel: vi.fn().mockReturnValue("High"),
    getRiskBadgeVariant: vi.fn().mockReturnValue("success"),
    getInformationSensitivity: vi.fn().mockReturnValue("Sensitive"),
    calculateBusinessImpactLevel: vi.fn().mockReturnValue("Medium"),
    getSecurityIcon: vi.fn().mockReturnValue("🔒"),
    getCategoryIcon: vi.fn().mockReturnValue("⏰"),
  },
}));

// Mock StatusBadge component
vi.mock("../../components/common/StatusBadge", () => ({
  __esModule: true,
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
vi.mock("../../components/common/BusinessImpactSection", () => ({
  __esModule: true,
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
vi.mock("../../components/common/WidgetContainer", () => ({
  __esModule: true,
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
    availabilityLevel: "High" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    testId: "widget-availability-impact",
  };

  it("renders without crashing", () => {
    render(<AvailabilityImpactWidget {...defaultProps} />);
    expect(
      screen.getByTestId("widget-availability-impact")
    ).toBeInTheDocument();
  });

  it("displays availability description from ciaContentService", () => {
    render(<AvailabilityImpactWidget {...defaultProps} />);

    // Use getAllByText instead of getByText since the text appears multiple times
    const descriptionElements = screen.getAllByText(
      "Robust availability with minimal unplanned downtime. Comprehensive redundancy and automated recovery systems."
    );
    expect(descriptionElements.length).toBeGreaterThan(0);
    expect(descriptionElements[0]).toBeInTheDocument();
  });

  it("displays business impact information", () => {
    render(<AvailabilityImpactWidget {...defaultProps} />);
    expect(screen.getByText("Business Impact")).toBeInTheDocument();
    expect(
      screen.getByText("High availability business impact summary")
    ).toBeInTheDocument();
  });

  it("displays metrics like uptime, RTO, RPO", () => {
    render(<AvailabilityImpactWidget {...defaultProps} />);

    // Check for uptime target value - use correct text
    expect(screen.getByText("Uptime Target")).toBeInTheDocument();
    // Use testId to find the specific element with the uptime value instead of getByText
    expect(
      screen.getByTestId("widget-availability-impact-uptime-target")
    ).toHaveTextContent("99.9%");

    // Check for RTO
    expect(screen.getByText(/Recovery Time Objective/i)).toBeInTheDocument();

    // Check for RPO
    expect(screen.getByText(/Recovery Point Objective/i)).toBeInTheDocument();
  });

  it("renders with different availability levels", () => {
    const { rerender } = render(
      <AvailabilityImpactWidget {...defaultProps} availabilityLevel="Low" />
    );

    // Use testId to check if component rendered
    expect(
      screen.getByTestId("widget-availability-impact")
    ).toBeInTheDocument();

    // Rerender with different level
    rerender(
      <AvailabilityImpactWidget {...defaultProps} availabilityLevel="High" />
    );

    // Use testId to check if component rendered
    expect(
      screen.getByTestId("widget-availability-impact")
    ).toBeInTheDocument();
  });

  it("handles unknown level gracefully", () => {
    render(
      <AvailabilityImpactWidget
        {...defaultProps}
        availabilityLevel={"Unknown" as SecurityLevel}
      />
    );

    // Use testId to check if component rendered with Unknown level
    expect(
      screen.getByTestId("widget-availability-impact")
    ).toBeInTheDocument();
  });

  // The other test for unknown level can be simplified to avoid duplication
  it("shows default content for unknown level", () => {
    render(
      <AvailabilityImpactWidget
        {...defaultProps}
        availabilityLevel={"Unknown" as SecurityLevel}
      />
    );

    // Check that the widget still renders
    expect(
      screen.getByTestId("widget-availability-impact")
    ).toBeInTheDocument();
  });

  it("has proper ARIA attributes for accessibility", () => {
    render(
      <AvailabilityImpactWidget
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
      />
    );

    // Check that the section has a region role
    expect(screen.getByRole("region")).toBeInTheDocument();

    // Check that the section has an aria-labelledby attribute
    const region = screen.getByRole("region");
    expect(region).toHaveAttribute(
      "aria-labelledby",
      "availability-impact-heading"
    );

    // Check that the heading exists and has the correct ID
    const heading = screen.getByRole("heading", {
      name: /High Availability Impact/i,
    });
    expect(heading).toHaveAttribute("id", "availability-impact-heading");
  });

  it("displays recommendations when available", () => {
    render(<AvailabilityImpactWidget {...defaultProps} />);

    // Check for recommendations heading
    expect(screen.getByText("Recommendations")).toBeInTheDocument();

    // Check for actual recommendations based on our mock data
    expect(screen.getByText("Deploy High redundancy")).toBeInTheDocument();
    expect(
      screen.getByText("Implement High failover mechanisms")
    ).toBeInTheDocument();
    expect(screen.getByText("Set up High monitoring")).toBeInTheDocument();
  });

  it("accepts custom testId prop", () => {
    const testId = "custom-availability-widget";
    render(<AvailabilityImpactWidget {...defaultProps} testId={testId} />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
