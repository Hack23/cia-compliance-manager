import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import SecurityLevelWidget from "./SecurityLevelWidget";

describe("SecurityLevelWidget", () => {
  // Mock the expected change handlers
  const mockAvailabilityChange = vi.fn();
  const mockIntegrityChange = vi.fn();
  const mockConfidentialityChange = vi.fn();

  // Default props for the component
  const defaultProps = {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    onAvailabilityChange: mockAvailabilityChange,
    onIntegrityChange: mockIntegrityChange,
    onConfidentialityChange: mockConfidentialityChange,
    testId: "test-security-level",
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
  });

  it("renders without crashing", () => {
    render(<SecurityLevelWidget {...defaultProps} />);
    // Update to use the correct testId with the widget-container prefix
    expect(
      screen.getByTestId("widget-container-test-security-level")
    ).toBeInTheDocument();
  });

  it("displays the component title", () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    // Fix: Be more specific with the text pattern to match only the header
    expect(
      screen.getByText("Security Level Configuration")
    ).toBeInTheDocument();
  });

  it("shows security level selectors", () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    // Check for flexible content patterns rather than exact elements
    // Update to use the correct testId with the widget-container prefix
    const content =
      screen.getByTestId("widget-container-test-security-level").textContent ||
      "";

    // Look for key terms using regular expressions for resilience
    expect(content).toMatch(/availability|uptime|continuity/i);
    expect(content).toMatch(/integrity|accuracy|validation/i);
    expect(content).toMatch(/confidentiality|privacy|protection/i);
  });

  it("calls onAvailabilityChange when changed", () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    // Find the select element more flexibly
    const selects = screen.getAllByRole("combobox");

    // Get the availability select (assuming it's the first one, but this is fragile)
    // Try to find it by its label instead
    const availabilitySelect =
      screen.getByLabelText(/availability/i) || selects[0];

    // Change the selection
    fireEvent.change(availabilitySelect, { target: { value: "High" } });

    // Check that the handler was called
    expect(mockAvailabilityChange).toHaveBeenCalledWith("High");
  });

  it("calls onIntegrityChange when changed", () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    // Find the select element more flexibly
    const selects = screen.getAllByRole("combobox");

    // Get the integrity select (assuming it's the second one, but this is fragile)
    // Try to find it by its label instead
    const integritySelect = screen.getByLabelText(/integrity/i) || selects[1];

    // Change the selection
    fireEvent.change(integritySelect, { target: { value: "High" } });

    // Check that the handler was called
    expect(mockIntegrityChange).toHaveBeenCalledWith("High");
  });

  it("calls onConfidentialityChange when changed", () => {
    render(<SecurityLevelWidget {...defaultProps} />);

    // Find the select element more flexibly
    const selects = screen.getAllByRole("combobox");

    // Get the confidentiality select (assuming it's the third one, but this is fragile)
    // Try to find it by its label instead
    const confidentialitySelect =
      screen.getByLabelText(/confidentiality/i) || selects[2];

    // Change the selection
    fireEvent.change(confidentialitySelect, { target: { value: "High" } });

    // Check that the handler was called
    expect(mockConfidentialityChange).toHaveBeenCalledWith("High");
  });

  it("displays the current security levels", () => {
    const levels = {
      availabilityLevel: "High" as SecurityLevel,
      integrityLevel: "Low" as SecurityLevel,
      confidentialityLevel: "Very High" as SecurityLevel,
    };

    render(<SecurityLevelWidget {...defaultProps} {...levels} />);

    // Check the displayed values in a way that doesn't depend on implementation details
    // Update to use the correct testId with the widget-container prefix
    const content =
      screen.getByTestId("widget-container-test-security-level").textContent ||
      "";

    // Check for the specific security levels in the content
    expect(content).toContain("High");
    expect(content).toContain("Low");
    expect(content).toContain("Very High");
  });

  it("accepts custom testId", () => {
    const customTestId = "custom-security-level";
    render(<SecurityLevelWidget {...defaultProps} testId={customTestId} />);
    // Update to use the correct testId with the widget-container prefix
    expect(
      screen.getByTestId("widget-container-custom-security-level")
    ).toBeInTheDocument();
  });

  // Add a test for handling different security level options
  it("supports all security level options", () => {
    // Try with different security levels
    const testLevels = ["None", "Low", "Moderate", "High", "Very High"];

    for (const level of testLevels) {
      // Reset the mocks between renders
      vi.resetAllMocks();

      const { unmount } = render(
        <SecurityLevelWidget
          {...defaultProps}
          availabilityLevel={level as SecurityLevel}
          integrityLevel={level as SecurityLevel}
          confidentialityLevel={level as SecurityLevel}
        />
      );

      // Simple check - the level should be in the content
      // Update to use the correct testId with the widget-container prefix
      const content =
        screen.getByTestId("widget-container-test-security-level")
          .textContent || "";
      expect(content).toContain(level);

      // Clean up between iterations
      unmount();
    }
  });
});
