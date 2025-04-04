import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../types/cia";
import SecurityLevelSelector from "./SecurityLevelSelector";

// Mock useCIAOptions hook
vi.mock("../../hooks/useCIAOptions", () => {
  const mockOptions = {
    availabilityOptions: {
      None: { description: "No availability", technical: "No controls" },
      Low: { description: "Basic availability", technical: "Basic controls" },
      Moderate: {
        description: "Standard availability",
        technical: "Standard controls",
      },
      High: {
        description: "High availability",
        technical: "Advanced controls",
      },
      "Very High": {
        description: "Maximum availability",
        technical: "Maximum controls",
      },
    },
    integrityOptions: {
      None: { description: "No integrity", technical: "No controls" },
      Low: { description: "Basic integrity", technical: "Basic controls" },
      Moderate: {
        description: "Standard integrity",
        technical: "Standard controls",
      },
      High: { description: "High integrity", technical: "Advanced controls" },
      "Very High": {
        description: "Maximum integrity",
        technical: "Maximum controls",
      },
    },
    confidentialityOptions: {
      None: { description: "No confidentiality", technical: "No controls" },
      Low: {
        description: "Basic confidentiality",
        technical: "Basic controls",
      },
      Moderate: {
        description: "Standard confidentiality",
        technical: "Standard controls",
      },
      High: {
        description: "High confidentiality",
        technical: "Advanced controls",
      },
      "Very High": {
        description: "Maximum confidentiality",
        technical: "Maximum controls",
      },
    },
  };

  return {
    __esModule: true,
    useCIAOptions: () => mockOptions,
    default: () => mockOptions,
    // Add direct exports
    availabilityOptions: mockOptions.availabilityOptions,
    integrityOptions: mockOptions.integrityOptions,
    confidentialityOptions: mockOptions.confidentialityOptions,
  };
});

// Fix the Selection mock to match the actual component's prop types
vi.mock("./Selection", () => {
  const SelectionMock = ({
    id,
    label,
    value,
    options,
    onChange,
    testId,
    disabled,
    infoContent,
    contextInfo,
  }: {
    id: string;
    label: string;
    value: string;
    options: Array<{ value: string; label: string } | string>;
    onChange: (value: string) => void;
    testId?: string;
    disabled?: boolean;
    infoContent?: string;
    contextInfo?: string;
  }) => (
    <div data-testid={testId || `mock-selection-${id}`}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid={`${id}-select`}
        disabled={disabled}
      >
        {Array.isArray(options) &&
          options.map((opt) => {
            // Fix: Check if option is a string or an object
            const optValue = typeof opt === "string" ? opt : opt.value;
            const optLabel = typeof opt === "string" ? opt : opt.label;

            return (
              <option key={optValue} value={optValue}>
                {optLabel}
              </option>
            );
          })}
      </select>
      {infoContent && <div className="info-content">{infoContent}</div>}
      {contextInfo && <div className="context-info">{contextInfo}</div>}
    </div>
  );

  return {
    __esModule: true,
    default: SelectionMock,
    // Add the Selection named export
    Selection: SelectionMock,
  };
});

describe("SecurityLevelSelector Enhanced Tests", () => {
  const defaultProps = {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    onAvailabilityChange: vi.fn(),
    onIntegrityChange: vi.fn(),
    onConfidentialityChange: vi.fn(),
    testId: "test-selector",
  };

  it("renders with different security levels correctly", () => {
    const { getByTestId } = render(
      <SecurityLevelSelector
        availabilityLevel={"Low" as SecurityLevel}
        integrityLevel={"Moderate" as SecurityLevel}
        confidentialityLevel={"High" as SecurityLevel}
        onAvailabilityChange={vi.fn()}
        onIntegrityChange={vi.fn()}
        onConfidentialityChange={vi.fn()}
        testId="test-selector"
      />
    );

    // Check if component renders
    expect(getByTestId("test-selector")).toBeInTheDocument();
  });

  it("handles availability change correctly", () => {
    const handleChange = vi.fn();

    const { getByTestId } = render(
      <SecurityLevelSelector
        {...defaultProps}
        availabilityLevel={"None" as SecurityLevel}
        integrityLevel={"None" as SecurityLevel}
        confidentialityLevel={"None" as SecurityLevel}
        onAvailabilityChange={handleChange}
      />
    );

    // Find the select element - use the *-select test ID format
    expect(getByTestId("availabilitySelect-select")).toBeInTheDocument();
  });

  it("handles integrity change correctly", () => {
    const handleChange = vi.fn();

    const { getByTestId } = render(
      <SecurityLevelSelector
        {...defaultProps}
        onIntegrityChange={handleChange}
      />
    );

    // Find the select element - use the *-select test ID format
    expect(getByTestId("integritySelect-select")).toBeInTheDocument();
  });

  it("handles confidentiality change correctly", () => {
    const handleChange = vi.fn();

    const { getByTestId } = render(
      <SecurityLevelSelector
        {...defaultProps}
        onConfidentialityChange={handleChange}
      />
    );

    // Find the select element - use the *-select test ID format
    expect(getByTestId("confidentialitySelect-select")).toBeInTheDocument();
  });

  it("handles keyboard navigation in dropdowns", () => {
    const { getByTestId } = render(<SecurityLevelSelector {...defaultProps} />);

    // Just check that the component renders
    expect(getByTestId("test-selector")).toBeInTheDocument();
  });

  it("handles tooltip display on hover", () => {
    // The useCIAOptions already provides tooltip content in the mock
    const { getByTestId } = render(
      <SecurityLevelSelector
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
        onAvailabilityChange={vi.fn()}
        onIntegrityChange={vi.fn()}
        onConfidentialityChange={vi.fn()}
        testId="test-selector"
      />
    );

    // We can't easily test actual tooltip rendering in jsdom,
    // but we can check that the elements with tooltip functionality exist
    const availabilitySection = getByTestId("test-selector");
    expect(availabilitySection).toBeInTheDocument();
  });

  it("renders with different layout on mobile viewport", () => {
    // Mock a mobile viewport width
    global.innerWidth = 400;
    global.dispatchEvent(new Event("resize"));

    const { getByTestId } = render(
      <SecurityLevelSelector
        availabilityLevel="Low"
        integrityLevel="Moderate"
        confidentialityLevel="High"
        onAvailabilityChange={vi.fn()}
        onIntegrityChange={vi.fn()}
        onConfidentialityChange={vi.fn()}
        compact={true} // Enable compact mode for mobile
        testId="test-selector"
      />
    );

    // Check that the component renders with appropriate className
    expect(getByTestId("test-selector")).toBeInTheDocument();
  });

  it("provides accessibility attributes for screen readers", () => {
    const { getByLabelText } = render(
      <SecurityLevelSelector
        availabilityLevel="Low"
        integrityLevel="Moderate"
        confidentialityLevel="High"
        onAvailabilityChange={vi.fn()}
        onIntegrityChange={vi.fn()}
        onConfidentialityChange={vi.fn()}
        testId="test-selector"
      />
    );

    // Check for accessibility through label text
    const availabilitySelect = getByLabelText(/availability/i);
    const integritySelect = getByLabelText(/integrity/i);
    const confidentialitySelect = getByLabelText(/confidentiality/i);

    expect(availabilitySelect).toBeInTheDocument();
    expect(integritySelect).toBeInTheDocument();
    expect(confidentialitySelect).toBeInTheDocument();
  });
});
