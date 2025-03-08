import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import TechnicalDetailsWidget from "./TechnicalDetailsWidget";
import { WIDGET_TEST_IDS } from "../../constants/testIds";
import userEvent from "@testing-library/user-event";

describe("TechnicalDetailsWidget", () => {
  const defaultProps = {
    availabilityLevel: "None",
    integrityLevel: "Low",
    confidentialityLevel: "Moderate",
    testId: WIDGET_TEST_IDS.TECHNICAL_DETAILS_WIDGET,
  };

  // Use cleanup between tests
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders without crashing", () => {
    render(<TechnicalDetailsWidget {...defaultProps} />);
    expect(
      screen.getByTestId(WIDGET_TEST_IDS.TECHNICAL_DETAILS_WIDGET)
    ).toBeInTheDocument();
  });

  it("displays technical details for the selected component", () => {
    render(<TechnicalDetailsWidget {...defaultProps} />);
    // Default tab is availability
    expect(screen.getByTestId("technical-description")).toHaveTextContent(
      "No redundancy or monitoring in place."
    );
  });

  it("switches between tabs", async () => {
    // Use container to scope queries
    const { container } = render(
      <TechnicalDetailsWidget
        availabilityLevel="Moderate"
        integrityLevel="High"
        confidentialityLevel="Very High"
        testId="test-technical-details-widget"
      />
    );

    // Create a scoped query function for this specific rendered component
    const getByTestId = (id: string) => within(container).getByTestId(id);

    // Find the integrity tab and click it
    const integrityTab = getByTestId(
      "test-technical-details-widget-integrity-tab"
    );
    fireEvent.click(integrityTab);

    // Verify tab content is displayed
    expect(getByTestId("integrity-level-indicator")).toHaveTextContent("High");

    // Find the invisible element that's used in tests for integrity tab
    const hiddenTab = getByTestId("integrity-tab");

    // Verify active tab styling on the hidden element that the test is looking for
    expect(hiddenTab).toHaveClass("border-b-2");
    expect(hiddenTab).toHaveClass("border-blue-500");

    // Test clicking the confidentiality tab
    const confidentialityTab = getByTestId(
      "test-technical-details-widget-confidentiality-tab"
    );
    fireEvent.click(confidentialityTab);

    // Verify confidentiality tab content is displayed
    expect(getByTestId("confidentiality-level-indicator")).toHaveTextContent(
      "Very High"
    );

    // Test for hidden tab styling as well
    const hiddenConfidentialityTab = getByTestId("confidentiality-tab");
    expect(hiddenConfidentialityTab).toHaveClass("border-b-2");
  });

  it("handles different security levels", () => {
    // Use container to scope queries
    const { container } = render(
      <TechnicalDetailsWidget
        availabilityLevel="Low"
        integrityLevel="Moderate"
        confidentialityLevel="High"
        testId="unique-test-id"
      />
    );

    // Create a scoped query function for this specific rendered component
    const getByTestId = (id: string) => within(container).getByTestId(id);

    // Check if availability level shows correctly
    expect(getByTestId("availability-level-indicator")).toHaveTextContent(
      "Low"
    );

    // Switch to integrity tab
    const integrityTab = getByTestId("unique-test-id-integrity-tab");
    fireEvent.click(integrityTab);

    // Check if integrity level shows correctly
    expect(getByTestId("integrity-level-indicator")).toHaveTextContent(
      "Moderate"
    );

    // Switch to confidentiality tab
    const confidentialityTab = getByTestId(
      "unique-test-id-confidentiality-tab"
    );
    fireEvent.click(confidentialityTab);

    // Check if confidentiality level shows correctly
    expect(getByTestId("confidentiality-level-indicator")).toHaveTextContent(
      "High"
    );
  });

  it("shows implementation details for each level", () => {
    const { container } = render(
      <TechnicalDetailsWidget {...defaultProps} testId="details-test-widget" />
    );

    // Create a scoped query function
    const getByTestId = (id: string) => within(container).getByTestId(id);

    // Choose a tab
    fireEvent.click(getByTestId("details-test-widget-availability-tab"));

    // Check for implementation headers
    expect(getByTestId("implementation-header")).toBeInTheDocument();
    expect(getByTestId("resources-header")).toBeInTheDocument();
    expect(getByTestId("development-effort")).toBeInTheDocument();
    expect(getByTestId("maintenance-level")).toBeInTheDocument();
    expect(getByTestId("required-expertise")).toBeInTheDocument();
  });

  it("handles backward compatibility props", () => {
    const { container } = render(
      <TechnicalDetailsWidget
        availability="High"
        integrity="High"
        confidentiality="High"
        testId="compat-test-widget"
      />
    );

    // Create a scoped query function
    const getByTestId = (id: string) => within(container).getByTestId(id);

    // Should use the backward compatibility props
    expect(getByTestId("availability-level-indicator")).toHaveTextContent(
      "High"
    );

    // Switch to integrity tab
    fireEvent.click(getByTestId("compat-test-widget-integrity-tab"));
    expect(getByTestId("integrity-level-indicator")).toHaveTextContent("High");
  });
});
