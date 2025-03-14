import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { SecurityLevel } from "../../types/cia";
import AvailabilityImpactWidget from "./AvailabilityImpactWidget";

// Mock ciaContentService
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
  },
}));

describe("AvailabilityImpactWidget", () => {
  const defaultProps = {
    availabilityLevel: "High" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
  };

  it("renders without crashing", () => {
    render(<AvailabilityImpactWidget {...defaultProps} />);
    // Check for Availability Profile instead of High Availability
    expect(screen.getByText("Availability Profile")).toBeInTheDocument();
    // Check for High in status badge
    expect(screen.getByTestId("status-badge")).toHaveTextContent("High");
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
    const { rerender } = render(<AvailabilityImpactWidget {...defaultProps} />);
    // Check for badge with High text instead of combined "High Availability"
    expect(screen.getByTestId("status-badge")).toHaveTextContent("High");

    rerender(
      <AvailabilityImpactWidget {...defaultProps} availabilityLevel="Low" />
    );
    expect(screen.getByTestId("status-badge")).toHaveTextContent("Low");

    rerender(
      <AvailabilityImpactWidget {...defaultProps} availabilityLevel="None" />
    );
    expect(screen.getByTestId("status-badge")).toHaveTextContent("None");
  });

  it("handles unknown level gracefully", () => {
    render(
      <AvailabilityImpactWidget
        availabilityLevel={"Unknown" as SecurityLevel}
        integrityLevel="None"
        confidentialityLevel="None"
      />
    );

    // Check that the widget still renders with Unknown level displayed
    // Instead of looking for "Unknown Availability", check for the badge that has "Unknown"
    expect(screen.getByTestId("status-badge")).toHaveTextContent("Unknown");

    // Use a more specific selector - look for the text in the impact card description
    // Use getAllByText and take just the first one
    expect(
      screen.getAllByText("Unknown availability description")[0]
    ).toBeInTheDocument();

    // Check the uptime value using testId rather than text content
    expect(
      screen.getByTestId("widget-availability-impact-uptime-target")
    ).toHaveTextContent("111%");
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
