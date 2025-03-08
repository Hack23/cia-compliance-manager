import React from "react";
import { render, screen } from "@testing-library/react";
import IntegrityImpactWidget from "./IntegrityImpactWidget";

// Add mock options for testing
const mockOptions = {
  None: {
    description: "No data integrity controls.",
    businessImpact: "Decisions based on potentially corrupt data",
    validationMethod: "None",
    recommendations: [
      "Implement basic data validation",
      "Create manual verification processes",
    ],
  },
  High: {
    description: "Advanced integrity with blockchain verification.",
    businessImpact: "High confidence in data integrity",
    validationMethod: "Blockchain verification",
    recommendations: ["Regular audits", "Automated verification"],
  },
};

describe("IntegrityImpactWidget", () => {
  it("renders without crashing", () => {
    render(<IntegrityImpactWidget level="None" options={{}} />);
    expect(screen.getByText("Integrity Impact: None")).toBeInTheDocument();
  });

  it("renders correctly with default props", () => {
    render(<IntegrityImpactWidget level="None" options={{}} />);

    expect(screen.getByTestId("widget-integrity-impact")).toBeInTheDocument();
    expect(screen.getByText(/Integrity Impact: None/i)).toBeInTheDocument();
  });

  it("displays the correct integrity information", () => {
    render(<IntegrityImpactWidget level="None" options={mockOptions} />);

    expect(screen.getByText("No data integrity controls.")).toBeInTheDocument();
    expect(
      screen.getByText("Decisions based on potentially corrupt data")
    ).toBeInTheDocument();
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("displays recommendations when available", () => {
    render(<IntegrityImpactWidget level="None" options={mockOptions} />);

    expect(
      screen.getByText("Implement basic data validation")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Create manual verification processes")
    ).toBeInTheDocument();
  });

  it("updates content when level changes", () => {
    const { rerender } = render(
      <IntegrityImpactWidget level="None" options={mockOptions} />
    );

    expect(screen.getByText("No data integrity controls.")).toBeInTheDocument();

    rerender(<IntegrityImpactWidget level="High" options={mockOptions} />);

    expect(
      screen.getByText("Advanced integrity with blockchain verification.")
    ).toBeInTheDocument();
    expect(screen.getByText("Blockchain verification")).toBeInTheDocument();
  });
});
