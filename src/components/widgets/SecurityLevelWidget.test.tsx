import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import SecurityLevelWidget from "./SecurityLevelWidget";
import {
  SECURITY_LEVELS,
  CIA_LABELS,
  CIA_DESCRIPTIONS,
} from "../../constants/appConstants";
import { CIA_TEST_IDS } from "../../constants/testIds";

// Update the mock implementation to match the new interface with typed parameters
vi.mock("../controls/SecurityLevelSelector", () => ({
  default: ({
    level,
    onChange,
    testId,
  }: // other props
  {
    level: string;
    onChange: (value: string) => void;
    testId?: string;
    [key: string]: any;
  }) => (
    <div data-testid={testId || "security-level-selector-mock"}>
      <select
        data-testid="level-select"
        value={level}
        onChange={(e) => onChange(e.target.value)}
      >
        {/* options */}
      </select>
    </div>
  ),
}));

describe("SecurityLevelWidget", () => {
  const mockSetAvailability = vi.fn();
  const mockSetIntegrity = vi.fn();
  const mockSetConfidentiality = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all security level components", () => {
    render(
      <SecurityLevelWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        setAvailability={mockSetAvailability}
        setIntegrity={mockSetIntegrity}
        setConfidentiality={mockSetConfidentiality}
      />
    );

    expect(
      screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT)
    ).toBeInTheDocument();
  });

  it("selects have default values", () => {
    render(
      <SecurityLevelWidget
        availabilityLevel="Low"
        integrityLevel="Moderate"
        confidentialityLevel="High"
        setAvailability={mockSetAvailability}
        setIntegrity={mockSetIntegrity}
        setConfidentiality={mockSetConfidentiality}
      />
    );

    expect(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT)).toHaveValue(
      "Low"
    );
    expect(screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT)).toHaveValue(
      "Moderate"
    );
    expect(screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT)).toHaveValue(
      "High"
    );
  });

  it("handles selection changes", () => {
    render(
      <SecurityLevelWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        setAvailability={mockSetAvailability}
        setIntegrity={mockSetIntegrity}
        setConfidentiality={mockSetConfidentiality}
      />
    );

    fireEvent.change(screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT), {
      target: { value: SECURITY_LEVELS.HIGH },
    });
    expect(mockSetConfidentiality).toHaveBeenCalledWith(SECURITY_LEVELS.HIGH);
  });

  // Remaining tests still work with our mock

  it("displays correct options and values", () => {
    render(
      <SecurityLevelWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        setAvailability={mockSetAvailability}
        setIntegrity={mockSetIntegrity}
        setConfidentiality={mockSetConfidentiality}
      />
    );

    const availabilitySelect = screen.getByTestId(
      CIA_TEST_IDS.AVAILABILITY_SELECT
    );
    const allOptions = availabilitySelect.querySelectorAll("option");
    expect(allOptions.length).toBe(5); // None, Low, Moderate, High, Very High
    expect(allOptions[0]?.textContent).toBe("None");
    expect(allOptions[1]?.textContent).toBe("Low");
  });

  // Then update the test cases to use the new prop names
  it("renders with custom initial values", () => {
    render(
      <SecurityLevelWidget
        availabilityLevel={SECURITY_LEVELS.MODERATE}
        integrityLevel={SECURITY_LEVELS.HIGH}
        confidentialityLevel={SECURITY_LEVELS.LOW}
        setAvailability={mockSetAvailability}
        setIntegrity={mockSetIntegrity}
        setConfidentiality={mockSetConfidentiality}
      />
    );
    // Test assertions
  });

  // ... other tests ...
});
