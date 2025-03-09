import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AvailabilityImpactWidget from "./AvailabilityImpactWidget";
import { AVAILABILITY_IMPACT_TEST_IDS } from "../../constants/testIds";

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
  // Test rendering with default props
  it("renders with basic options", () => {
    render(
      <AvailabilityImpactWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        options={TEST_OPTIONS}
      />
    );

    // Verify widget renders with default level text
    expect(screen.getByText(/Availability Impact: None/i)).toBeInTheDocument();

    // Check that content sections are present
    expect(screen.getByText("Test none description")).toBeInTheDocument();
    expect(screen.getByText("Test none impact")).toBeInTheDocument();
    expect(screen.getByText(/< 90%/i)).toBeInTheDocument();
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

  // Test with custom options
  it("renders with missing options gracefully", () => {
    const customOptions = {
      Moderate: {
        description: "Custom description",
        businessImpact: "Custom business impact",
        uptime: "Custom uptime",
        recommendations: ["Custom recommendation 1", "Custom recommendation 2"],
        mttr: "Custom MTTR",
        rto: "Custom RTO",
        rpo: "Custom RPO",
      },
    };

    render(
      <AvailabilityImpactWidget
        availabilityLevel="Moderate"
        integrityLevel="None"
        confidentialityLevel="None"
        options={customOptions}
      />
    );

    // Check for custom content
    expect(screen.getByText("Custom description")).toBeInTheDocument();
    expect(screen.getByText("Custom business impact")).toBeInTheDocument();
    expect(screen.getByText("Custom uptime")).toBeInTheDocument();
    expect(screen.getByText("Custom MTTR")).toBeInTheDocument();
    expect(screen.getByText("Custom RTO")).toBeInTheDocument();
    expect(screen.getByText("Custom RPO")).toBeInTheDocument();
    expect(screen.getByText("Custom recommendation 1")).toBeInTheDocument();
  });

  // Test with custom testId
  it("renders with custom testId", () => {
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
    // @ts-ignore - intentionally testing with invalid level
    render(
      <AvailabilityImpactWidget
        availabilityLevel="Unknown"
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
