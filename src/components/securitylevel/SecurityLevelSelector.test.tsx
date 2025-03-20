import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../types/cia";
import SecurityLevelSelector from "./SecurityLevelSelector";

// Set up mocks properly with explicit type annotations
vi.mock("./Selection", () => ({
  __esModule: true,
  default: ({
    id,
    label,
    value,
    options,
    onChange,
    testId,
  }: {
    id: string;
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    testId?: string;
  }) => (
    <div data-testid={testId || `mock-selection-${id}`}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as SecurityLevel)}
        data-testid={`${id}-select`}
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  ),
}));

describe("SecurityLevelSelector", () => {
  // Create proper callbacks for each CIA component
  const mockOnAvailabilityChange = vi.fn();
  const mockOnIntegrityChange = vi.fn();
  const mockOnConfidentialityChange = vi.fn();

  // Default prop values for the component - using all required props
  const defaultProps = {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    onAvailabilityChange: mockOnAvailabilityChange,
    onIntegrityChange: mockOnIntegrityChange,
    onConfidentialityChange: mockOnConfidentialityChange,
  };

  beforeEach(() => {
    mockOnAvailabilityChange.mockReset();
    mockOnIntegrityChange.mockReset();
    mockOnConfidentialityChange.mockReset();
  });

  it("renders the selector with default values", () => {
    const { container } = render(<SecurityLevelSelector {...defaultProps} />);

    // More generic approach - look for the selects directly in the container
    const selects = container.querySelectorAll("select");
    expect(selects.length).toBeGreaterThan(0);

    // Check if there are sections for each CIA component
    expect(container.textContent).toMatch(/availability/i);
    expect(container.textContent).toMatch(/integrity/i);
    expect(container.textContent).toMatch(/confidentiality/i);
  });

  it("renders with different security levels", () => {
    const { container } = render(
      <SecurityLevelSelector
        {...defaultProps}
        availabilityLevel="High"
        integrityLevel="Very High"
        confidentialityLevel="Low"
      />
    );

    // Just verify that the component renders without errors
    expect(container).toBeInTheDocument();

    // The component should have the values we provided
    expect(container.textContent).toContain("High");
    expect(container.textContent).toContain("Very High");
    expect(container.textContent).toContain("Low");
  });

  it("calls callback when availability level changes", () => {
    const mockOnAvailabilityChange = vi.fn();
    render(
      <SecurityLevelSelector
        availabilityLevel="Low"
        integrityLevel="Moderate"
        confidentialityLevel="High"
        onAvailabilityChange={mockOnAvailabilityChange}
      />
    );

    // Get the mock select element
    const availabilitySelect = screen.getByTestId("availabilitySelect-select");

    // Simulate selection change - use fireEvent to trigger the change
    fireEvent.change(availabilitySelect, { target: { value: "High" } });

    // Check if callback was called
    expect(mockOnAvailabilityChange).toHaveBeenCalledWith("High");
  });

  it("handles disabled state", () => {
    const { container } = render(
      <SecurityLevelSelector {...defaultProps} disabled />
    );

    // Check if all selects are disabled
    const selects = container.querySelectorAll("select");
    selects.forEach((select) => {
      expect(select).toBeDisabled();
    });
  });
});
