import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AvailabilityImpactWidget from "./AvailabilityImpactWidget";
import { AVAILABILITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import { SecurityLevel } from "../../types/cia";

// Mock the constants and icons
vi.mock("../../constants/coreConstants", () => ({
  CIA_COMPONENT_ICONS: {
    AVAILABILITY: "⏱️",
  },
}));

// Create a test object to provide default options for tests
const TEST_OPTIONS = {
  None: {
    description: "Test none description",
    businessImpact: "Test none impact",
    uptime: "< 90%",
    recommendations: ["Test rec 1", "Test rec 2"],
    mttr: "Days",
    rto: "Undefined",
    rpo: "Undefined",
  },
  High: {
    description: "Test high description",
    businessImpact: "Test high impact",
    uptime: "99.9%",
    recommendations: ["Test high rec 1", "Test high rec 2"],
    mttr: "Minutes",
    rto: "1 hour",
    rpo: "15 minutes",
  },
};

describe("AvailabilityImpactWidget", () => {
  // Test rendering with valid availability level
  it("renders correctly with valid availability level", () => {
    render(
      <AvailabilityImpactWidget availabilityLevel={"High" as SecurityLevel} />
    );

    expect(screen.getByText("High Availability")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Business Impact")).toBeInTheDocument();
  });

  // Test rendering with error state
  it("renders error state when availability level is unknown", () => {
    render(
      <AvailabilityImpactWidget
        availabilityLevel={"None" as SecurityLevel}
        options={{
          showErrorState: true,
        }}
      />
    );

    expect(
      screen.getByText("No availability information available")
    ).toBeInTheDocument();
  });

  // Test with different availability levels
  it("renders with High security level", () => {
    render(
      <AvailabilityImpactWidget
        availabilityLevel="High"
        integrityLevel="None"
        confidentialityLevel="None"
        options={TEST_OPTIONS}
      />
    );

    // Verify level is displayed correctly
    expect(screen.getByText(/Availability Impact: High/i)).toBeInTheDocument();

    // Check for High-specific content
    expect(screen.getByText(/99.9%/i)).toBeInTheDocument();
    expect(screen.getByText(/Minutes/i)).toBeInTheDocument();

    // Check for High-specific business perspective
    const businessPerspective = screen.getByText(/High availability provides/i);
    expect(businessPerspective).toBeInTheDocument();
  });

  // Test the display of metrics
  it("displays the correct metrics for high availability level", () => {
    render(
      <AvailabilityImpactWidget
        availabilityLevel={"High" as SecurityLevel}
        options={TEST_OPTIONS}
      />
    );

    expect(screen.getByText(/99.9%/)).toBeInTheDocument();
    expect(screen.getByText(/Minutes/)).toBeInTheDocument();
    expect(screen.getByText(/Test high description/)).toBeInTheDocument();
  });

  // Test recommendations rendering
  it("displays recommendations properly", () => {
    render(
      <AvailabilityImpactWidget
        availabilityLevel={"High" as SecurityLevel}
        options={TEST_OPTIONS}
      />
    );

    expect(screen.getByText("Recommendations")).toBeInTheDocument();
    expect(screen.getByText("Test high rec 1")).toBeInTheDocument();
    expect(screen.getByText("Test high rec 2")).toBeInTheDocument();
  });

  // Test with custom testId
  it("applies custom testId correctly", () => {
    const testId = "custom-availability-widget";
    render(
      <AvailabilityImpactWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        options={TEST_OPTIONS}
        testId={testId}
      />
    );

    // Check that testId is applied
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  // Test with level that doesn't exist in options
  it("handles unknown level gracefully", () => {
    // Using as any to bypass type checking, as we're intentionally testing invalid input
    render(
      <AvailabilityImpactWidget
        availabilityLevel={"Unknown" as any as SecurityLevel}
        integrityLevel="None"
        confidentialityLevel="None"
        options={TEST_OPTIONS}
      />
    );

    // Should fall back to "None" level content
    expect(
      screen.getByText(/No availability information available/i)
    ).toBeInTheDocument();
  });

  // Test for accessibility
  it("has proper accessibility attributes", () => {
    render(
      <AvailabilityImpactWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        options={TEST_OPTIONS}
      />
    );

    // Check for accessible elements
    expect(
      document.getElementById("availability-impact-title")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Implementation recommendations/i)
    ).toBeInTheDocument();
  });

  // Test for displaying recommendations
  it("displays recommendations when available", () => {
    render(
      <AvailabilityImpactWidget
        availabilityLevel="High"
        integrityLevel="None"
        confidentialityLevel="None"
        options={TEST_OPTIONS}
      />
    );

    // Check for recommendations
    expect(screen.getByText("Test high rec 1")).toBeInTheDocument();
    expect(screen.getByText("Test high rec 2")).toBeInTheDocument();
  });
});
