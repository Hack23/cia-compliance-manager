import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import {
  BUSINESS_IMPACT_TEST_IDS,
  CIA_TEST_IDS,
} from "../../constants/testIds";

// Important: Define the mock BEFORE importing the component
vi.mock("../../types/businessImpact", () => {
  return {
    BusinessKeyBenefits: {
      HIGH: ["Test benefit 1", "Test benefit 2"],
      NONE: [],
      LOW: [],
      MODERATE: [],
      VERY_HIGH: [],
    },
    BUSINESS_CONSIDERATIONS: {
      AVAILABILITY: {
        NONE: [
          {
            type: "financial",
            risk: "Critical Risk",
            description: "Test critical risk",
          },
          {
            type: "operational",
            risk: "High Risk",
            description: "Test high risk",
          },
        ],
        LOW: [],
        MODERATE: [],
        HIGH: [],
        VERY_HIGH: [],
      },
      INTEGRITY: {
        NONE: [],
        LOW: [],
        MODERATE: [],
        HIGH: [],
        VERY_HIGH: [],
      },
      CONFIDENTIALITY: {
        NONE: [],
        LOW: [],
        MODERATE: [],
        HIGH: [],
        VERY_HIGH: [],
      },
    },
  };
});

// Only import the component AFTER the mock is defined
import BusinessImpactAnalysisWidget from "./BusinessImpactAnalysisWidget";

describe("BusinessImpactAnalysisWidget", () => {
  // Default props to use in tests
  const defaultProps = {
    availabilityLevel: "None",
    integrityLevel: "None",
    confidentialityLevel: "None",
    securityLevel: "None",
  };

  it("renders without crashing", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);
    expect(screen.getByText(/CIA Security Profile/i)).toBeInTheDocument();
  });

  it("renders correctly with default props", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);

    // Check if CIA profile section is displayed
    expect(
      screen.getByTestId(BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY)
    ).toBeInTheDocument();

    // Check if all CIA components are displayed
    expect(
      screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SECTION)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SECTION)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SECTION)
    ).toBeInTheDocument();

    // Check if tabs are displayed
    expect(
      screen.getByTestId(BUSINESS_IMPACT_TEST_IDS.TAB_CONSIDERATIONS)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(BUSINESS_IMPACT_TEST_IDS.TAB_BENEFITS)
    ).toBeInTheDocument();
  });

  it("displays CIA security levels correctly", () => {
    render(
      <BusinessImpactAnalysisWidget
        confidentialityLevel="High"
        integrityLevel="Moderate"
        availabilityLevel="Low"
      />
    );

    // Check if all values are displayed correctly
    expect(
      screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_KV)
    ).toHaveTextContent("High");
    expect(screen.getByTestId(CIA_TEST_IDS.INTEGRITY_KV)).toHaveTextContent(
      "Moderate"
    );
    expect(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_KV)).toHaveTextContent(
      "Low"
    );
  });

  it("switches between considerations and benefits tabs", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);

    // Considerations tab should be active by default
    expect(
      screen.getByTestId(BUSINESS_IMPACT_TEST_IDS.BUSINESS_CONSIDERATIONS)
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(BUSINESS_IMPACT_TEST_IDS.BUSINESS_BENEFITS)
    ).not.toBeInTheDocument();

    // Click on benefits tab
    fireEvent.click(screen.getByTestId(BUSINESS_IMPACT_TEST_IDS.TAB_BENEFITS));

    // Benefits tab should now be active
    expect(
      screen.queryByTestId(BUSINESS_IMPACT_TEST_IDS.BUSINESS_CONSIDERATIONS)
    ).not.toBeInTheDocument();
    expect(
      screen.getByTestId(BUSINESS_IMPACT_TEST_IDS.BUSINESS_BENEFITS)
    ).toBeInTheDocument();
  });

  it("displays impact metrics section for higher security levels", () => {
    const { rerender } = render(
      <BusinessImpactAnalysisWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        securityLevel="Low"
      />
    );

    // Impact metrics should not be shown for Low security level
    expect(
      screen.queryByTestId(BUSINESS_IMPACT_TEST_IDS.IMPACT_METRICS_SECTION)
    ).not.toBeInTheDocument();

    // Rerender with Moderate security level
    rerender(
      <BusinessImpactAnalysisWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        securityLevel="Moderate"
      />
    );

    // Impact metrics should now be visible
    expect(
      screen.getByTestId(BUSINESS_IMPACT_TEST_IDS.IMPACT_METRICS_SECTION)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(BUSINESS_IMPACT_TEST_IDS.FINANCIAL_IMPACT_CARD)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(BUSINESS_IMPACT_TEST_IDS.OPERATIONAL_IMPACT_CARD)
    ).toBeInTheDocument();
  });

  it("displays correct benefits for security level", () => {
    // Testing with a mocked HIGH level that has benefits defined
    render(
      <BusinessImpactAnalysisWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        securityLevel="High"
      />
    );

    // Switch to benefits tab
    fireEvent.click(screen.getByTestId(BUSINESS_IMPACT_TEST_IDS.TAB_BENEFITS));

    // Should show benefits from our mock
    expect(
      screen.queryByTestId(BUSINESS_IMPACT_TEST_IDS.NO_BENEFITS_MESSAGE)
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("benefit-item-0")).toBeInTheDocument();
    expect(screen.getByText("Test benefit 1")).toBeInTheDocument();
  });

  it("renders risk badges with appropriate colors", () => {
    render(
      <BusinessImpactAnalysisWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
      />
    );

    // We should see our mocked considerations with risk badges
    const considerationItems = screen.getAllByTestId(/consideration-item-\d+/);
    expect(considerationItems.length).toBeGreaterThan(0);

    // Check for risk badges
    const riskBadges = screen.getAllByTestId(/risk-badge-\d+/);
    expect(riskBadges.length).toBeGreaterThan(0);
    expect(riskBadges[0]).toHaveTextContent("Critical Risk");
    expect(riskBadges[1]).toHaveTextContent("High Risk");
  });

  it("shows different business considerations based on security levels", () => {
    render(
      <BusinessImpactAnalysisWidget
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
        securityLevel="High"
      />
    );
  });
});
