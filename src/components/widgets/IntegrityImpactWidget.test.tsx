import React from "react";
import { render, screen } from "@testing-library/react";
import IntegrityImpactWidget from "./IntegrityImpactWidget";

describe("IntegrityImpactWidget", () => {
  it("renders with empty options", () => {
    render(
      <IntegrityImpactWidget
        integrityLevel="None"
        availabilityLevel="None"
        confidentialityLevel="None"
        options={{}}
      />
    );
    expect(screen.getByText("Integrity Impact: None")).toBeInTheDocument();
  });

  it("renders with custom level", () => {
    render(
      <IntegrityImpactWidget
        integrityLevel="High"
        availabilityLevel="None"
        confidentialityLevel="None"
        options={{}}
      />
    );
    expect(screen.getByTestId("widget-integrity-impact")).toBeInTheDocument();
    expect(screen.getByText(/Integrity Impact: High/i)).toBeInTheDocument();
  });

  it("displays detailed information when available", () => {
    const mockOptions = {
      None: {
        description: "No integrity controls",
        businessImpact: "Potential data corruption",
        validationMethod: "None",
        recommendations: ["Implement basic data validation"],
      },
      High: {
        description: "Strong integrity controls",
        businessImpact: "Data corruption prevented",
        validationMethod: "Digital signatures",
        recommendations: ["Implement cryptographic verification"],
      },
    };

    render(
      <IntegrityImpactWidget
        integrityLevel="High"
        availabilityLevel="None"
        confidentialityLevel="None"
        options={mockOptions}
      />
    );
    expect(screen.getByText("Strong integrity controls")).toBeInTheDocument();
    expect(screen.getByText("Data corruption prevented")).toBeInTheDocument();
    expect(screen.getByText("Digital signatures")).toBeInTheDocument();
  });

  it("handles missing data gracefully", () => {
    const mockOptions = {
      None: {
        description: "No integrity controls",
        businessImpact: "Potential data corruption",
        validationMethod: "None",
        recommendations: ["Implement basic data validation"],
      },
      High: {
        description: "Strong integrity controls",
        businessImpact: "Data corruption prevented",
        validationMethod: "Digital signatures",
        recommendations: ["Implement cryptographic verification"],
      },
    };

    render(
      <IntegrityImpactWidget
        integrityLevel="Moderate"
        availabilityLevel="None"
        confidentialityLevel="None"
        options={mockOptions}
      />
    );
    expect(screen.getByText("No integrity controls")).toBeInTheDocument();
  });

  it("renders without errors when options are undefined", () => {
    render(
      <IntegrityImpactWidget
        integrityLevel="None"
        availabilityLevel="None"
        confidentialityLevel="None"
        options={{}}
      />
    );
    expect(screen.getByText("Integrity Impact: None")).toBeInTheDocument();
  });

  it("displays recommendations when available", () => {
    const mockOptions = {
      None: {
        description: "No integrity controls",
        businessImpact: "Potential data corruption",
        validationMethod: "None",
        recommendations: ["Implement basic data validation"],
      },
      High: {
        description: "Strong integrity controls",
        businessImpact: "Data corruption prevented",
        validationMethod: "Digital signatures",
        recommendations: ["Implement cryptographic verification"],
      },
    };

    render(
      <IntegrityImpactWidget
        integrityLevel="High"
        availabilityLevel="None"
        confidentialityLevel="None"
        options={mockOptions}
      />
    );
    expect(
      screen.getByText("Implement cryptographic verification")
    ).toBeInTheDocument();
  });
});
