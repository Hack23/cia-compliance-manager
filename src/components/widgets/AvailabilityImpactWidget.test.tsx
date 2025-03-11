import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import AvailabilityImpactWidget from "./AvailabilityImpactWidget";
import { AVAILABILITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import { SecurityLevel } from "../../types/cia";
import ciaContentService from "../../services/ciaContentService";

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
    expect(screen.getByText("High Availability")).toBeInTheDocument();
  });

  it("displays availability description from ciaContentService", () => {
    render(<AvailabilityImpactWidget {...defaultProps} />);
    expect(
      screen.getByText(
        "Robust availability with minimal unplanned downtime. Comprehensive redundancy and automated recovery systems."
      )
    ).toBeInTheDocument();
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

    // Check for uptime value
    expect(screen.getByText("Uptime")).toBeInTheDocument();
    expect(screen.getByText("99.9%")).toBeInTheDocument();

    // Check for RTO
    expect(screen.getByText(/Recovery Time Objective/i)).toBeInTheDocument();

    // Check for RPO
    expect(screen.getByText(/Recovery Point Objective/i)).toBeInTheDocument();
  });

  it("renders with different availability levels", () => {
    const { rerender } = render(<AvailabilityImpactWidget {...defaultProps} />);
    expect(screen.getByText("High Availability")).toBeInTheDocument();

    rerender(
      <AvailabilityImpactWidget {...defaultProps} availabilityLevel="Low" />
    );
    expect(screen.getByText("Low Availability")).toBeInTheDocument();

    rerender(
      <AvailabilityImpactWidget {...defaultProps} availabilityLevel="None" />
    );
    expect(screen.getByText("None Availability")).toBeInTheDocument();
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

    // Check for the description, which is provided by our mock
    expect(
      screen.getByText("Unknown availability description")
    ).toBeInTheDocument();

    // Check the uptime value, which is provided by our mock
    expect(screen.getByText("111%")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<AvailabilityImpactWidget {...defaultProps} />);

    // Check that the section has a region role
    expect(screen.getByRole("region")).toBeInTheDocument();

    // Check that the section has an aria-labelledby attribute
    expect(screen.getByRole("region")).toHaveAttribute(
      "aria-labelledby",
      "widget-title-availability-impact"
    );

    // Check that recommendations section exists
    expect(screen.getByText("Recommendations")).toBeInTheDocument();
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
