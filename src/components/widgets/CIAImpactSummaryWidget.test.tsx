import React from "react";
import { render, screen } from "@testing-library/react";
import CIAImpactSummaryWidget from "./CIAImpactSummaryWidget";
import { WIDGET_TEST_IDS } from "../../constants/testIds";
import { SecurityLevel } from "../../types/cia";

describe("CIAImpactSummaryWidget", () => {
  it("renders with correct security levels", () => {
    render(
      <CIAImpactSummaryWidget
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
      />
    );

    // Check that widget renders correctly
    expect(
      screen.getByTestId(WIDGET_TEST_IDS.CIA_IMPACT_SUMMARY)
    ).toBeInTheDocument();

    // Check availability level is displayed correctly
    expect(
      screen.getByTestId(WIDGET_TEST_IDS.CIA_IMPACT_AVAILABILITY_LEVEL)
    ).toHaveTextContent("High");

    // Check integrity level is displayed correctly
    expect(
      screen.getByTestId(WIDGET_TEST_IDS.CIA_IMPACT_INTEGRITY_LEVEL)
    ).toHaveTextContent("Moderate");

    // Check confidentiality level is displayed correctly
    expect(
      screen.getByTestId(WIDGET_TEST_IDS.CIA_IMPACT_CONFIDENTIALITY_LEVEL)
    ).toHaveTextContent("Low");
  });

  it("handles None security level", () => {
    render(
      <CIAImpactSummaryWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
      />
    );

    // Check availability level is displayed correctly
    expect(
      screen.getByTestId(WIDGET_TEST_IDS.CIA_IMPACT_AVAILABILITY_LEVEL)
    ).toHaveTextContent("None");

    // Check integrity level is displayed correctly
    expect(
      screen.getByTestId(WIDGET_TEST_IDS.CIA_IMPACT_INTEGRITY_LEVEL)
    ).toHaveTextContent("None");

    // Check confidentiality level is displayed correctly
    expect(
      screen.getByTestId(WIDGET_TEST_IDS.CIA_IMPACT_CONFIDENTIALITY_LEVEL)
    ).toHaveTextContent("None");
  });

  it("renders with custom class name", () => {
    const customClass = "custom-class";
    render(
      <CIAImpactSummaryWidget
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
        className={customClass}
      />
    );

    // Check that custom class is applied to the widget
    expect(screen.getByTestId(WIDGET_TEST_IDS.CIA_IMPACT_SUMMARY)).toHaveClass(
      customClass
    );
  });
});
