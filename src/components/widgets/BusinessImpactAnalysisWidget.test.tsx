import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import BusinessImpactAnalysisWidget from "./BusinessImpactAnalysisWidget";
import {
  BUSINESS_IMPACT_TEST_IDS,
  CIA_TEST_IDS,
} from "../../constants/testIds";
import { BusinessKeyBenefits } from "../../types/businessImpact";

describe("BusinessImpactAnalysisWidget", () => {
  it("renders correctly with default props", () => {
    render(<BusinessImpactAnalysisWidget />);

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
        confidentiality="High"
        integrity="Moderate"
        availability="Low"
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
    render(<BusinessImpactAnalysisWidget />);

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
      <BusinessImpactAnalysisWidget securityLevel="Low" />
    );

    // Impact metrics should not be shown for Low security level
    expect(
      screen.queryByTestId(BUSINESS_IMPACT_TEST_IDS.IMPACT_METRICS_SECTION)
    ).not.toBeInTheDocument();

    // Rerender with Moderate security level
    rerender(<BusinessImpactAnalysisWidget securityLevel="Moderate" />);

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
    // Assuming we have benefits defined for the High level
    render(<BusinessImpactAnalysisWidget securityLevel="High" />);

    // Switch to benefits tab
    fireEvent.click(screen.getByTestId(BUSINESS_IMPACT_TEST_IDS.TAB_BENEFITS));

    // If there are benefits for High level, they should be displayed
    if (BusinessKeyBenefits.HIGH && BusinessKeyBenefits.HIGH.length > 0) {
      expect(
        screen.queryByTestId(BUSINESS_IMPACT_TEST_IDS.NO_BENEFITS_MESSAGE)
      ).not.toBeInTheDocument();
      expect(screen.getByTestId("benefit-item-0")).toBeInTheDocument();
    } else {
      // Otherwise, the no benefits message should be displayed
      expect(
        screen.getByTestId(BUSINESS_IMPACT_TEST_IDS.NO_BENEFITS_MESSAGE)
      ).toBeInTheDocument();
    }
  });
});
