import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import SecurityLevelWidget from "./SecurityLevelWidget";
import { SECURITY_LEVEL_TEST_IDS, CIA_TEST_IDS } from "../../constants/testIds";

// Mock the useCIAOptions hook
vi.mock("../../hooks/useCIAOptions", () => ({
  useCIAOptions: () => ({
    availabilityOptions: {
      None: { description: "No availability controls" },
      Low: { description: "Basic availability controls", uptime: "95%" },
      Moderate: {
        description: "Standard availability controls",
        uptime: "99%",
      },
      High: { description: "Advanced availability controls", uptime: "99.9%" },
      "Very High": {
        description: "Maximum availability controls",
        uptime: "99.999%",
      },
    },
    integrityOptions: {
      None: { description: "No integrity controls" },
      Low: {
        description: "Basic integrity controls",
        validationMethod: "Manual checks",
      },
      Moderate: {
        description: "Standard integrity controls",
        validationMethod: "Automated checks",
      },
      High: {
        description: "Advanced integrity controls",
        validationMethod: "Digital signatures",
      },
      "Very High": {
        description: "Maximum integrity controls",
        validationMethod: "Blockchain validation",
      },
    },
    confidentialityOptions: {
      None: { description: "No confidentiality controls" },
      Low: {
        description: "Basic confidentiality controls",
        protectionMethod: "Access control",
      },
      Moderate: {
        description: "Standard confidentiality controls",
        protectionMethod: "Encryption",
      },
      High: {
        description: "Advanced confidentiality controls",
        protectionMethod: "Strong encryption",
      },
      "Very High": {
        description: "Maximum confidentiality controls",
        protectionMethod: "End-to-end encryption",
      },
    },
  }),
}));

describe("SecurityLevelWidget", () => {
  const mockOnAvailabilityChange = vi.fn();
  const mockOnIntegrityChange = vi.fn();
  const mockOnConfidentialityChange = vi.fn();
  const mockSetAvailability = vi.fn();
  const mockSetIntegrity = vi.fn();
  const mockSetConfidentiality = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default values", () => {
    render(<SecurityLevelWidget />);

    // Verify the widget renders
    expect(
      screen.getByTestId(SECURITY_LEVEL_TEST_IDS.SECURITY_LEVEL_SELECTOR)
    ).toBeInTheDocument();

    // Check default selection values
    expect(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT)).toHaveValue(
      "None"
    );
    expect(screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT)).toHaveValue(
      "None"
    );
    expect(screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT)).toHaveValue(
      "None"
    );
  });

  it("renders with custom initial values", () => {
    render(
      <SecurityLevelWidget
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
      />
    );

    // Check initial selection values
    expect(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT)).toHaveValue(
      "High"
    );
    expect(screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT)).toHaveValue(
      "Moderate"
    );
    expect(screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT)).toHaveValue(
      "Low"
    );
  });

  it("calls onChange handlers when values are changed", () => {
    render(
      <SecurityLevelWidget
        onAvailabilityChange={mockOnAvailabilityChange}
        onIntegrityChange={mockOnIntegrityChange}
        onConfidentialityChange={mockOnConfidentialityChange}
      />
    );

    // Change availability level
    fireEvent.change(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT), {
      target: { value: "High" },
    });
    expect(mockOnAvailabilityChange).toHaveBeenCalledWith("High");

    // Change integrity level
    fireEvent.change(screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT), {
      target: { value: "Moderate" },
    });
    expect(mockOnIntegrityChange).toHaveBeenCalledWith("Moderate");

    // Change confidentiality level
    fireEvent.change(screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT), {
      target: { value: "Low" },
    });
    expect(mockOnConfidentialityChange).toHaveBeenCalledWith("Low");
  });

  it("displays security level summary", () => {
    render(
      <SecurityLevelWidget
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
      />
    );

    // Check if summary elements exist and show correct values
    expect(screen.getByTestId("availability-summary")).toHaveTextContent(
      "High"
    );
    expect(screen.getByTestId("integrity-summary")).toHaveTextContent(
      "Moderate"
    );
    expect(screen.getByTestId("confidentiality-summary")).toHaveTextContent(
      "Low"
    );
  });

  it("displays loading state when loading is true", () => {
    render(<SecurityLevelWidget loading={true} />);

    // Check if loading indicator is shown
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    // The security level selector should not be rendered
    expect(
      screen.queryByTestId(SECURITY_LEVEL_TEST_IDS.SECURITY_LEVEL_SELECTOR)
    ).not.toBeInTheDocument();
  });

  it("shows error message when error is provided", () => {
    const testError = new Error("Test error message");
    render(<SecurityLevelWidget error={testError} />);

    // Check if error message is displayed
    expect(screen.getByText("Test error message")).toBeInTheDocument();

    // The security level selector should not be rendered
    expect(
      screen.queryByTestId(SECURITY_LEVEL_TEST_IDS.SECURITY_LEVEL_SELECTOR)
    ).not.toBeInTheDocument();
  });

  it("calls setState handlers when values are changed", () => {
    render(
      <SecurityLevelWidget
        setAvailability={mockSetAvailability}
        setIntegrity={mockSetIntegrity}
        setConfidentiality={mockSetConfidentiality}
      />
    );

    // Change availability level
    fireEvent.change(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT), {
      target: { value: "High" },
    });
    expect(mockSetAvailability).toHaveBeenCalledWith("High");

    // Change integrity level
    fireEvent.change(screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT), {
      target: { value: "Moderate" },
    });
    expect(mockSetIntegrity).toHaveBeenCalledWith("Moderate");

    // Change confidentiality level
    fireEvent.change(screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT), {
      target: { value: "Low" },
    });
    expect(mockSetConfidentiality).toHaveBeenCalledWith("Low");
  });

  it("calls both regular and setState handlers when both are provided", () => {
    render(
      <SecurityLevelWidget
        onAvailabilityChange={mockOnAvailabilityChange}
        setAvailability={mockSetAvailability}
      />
    );

    // Change availability level
    fireEvent.change(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT), {
      target: { value: "High" },
    });
    
    expect(mockOnAvailabilityChange).toHaveBeenCalledWith("High");
    expect(mockSetAvailability).toHaveBeenCalledWith("High");
  });
});
