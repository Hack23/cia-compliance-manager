import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import AvailabilityImpactWidget from "./AvailabilityImpactWidget";
import { CIADetails } from "../../types/cia";

describe("AvailabilityImpactWidget", () => {
  const mockOptions: Record<string, CIADetails> = {
    None: {
      description: "No guaranteed uptime or availability controls.",
      impact: "Complete business disruption during outages",
      technical: "No redundancy or monitoring in place.",
      businessImpact:
        "Critical business operations completely halt during outages",
      capex: 0,
      opex: 0,
      uptime: "< 90%",
      recommendations: [
        "Implement basic monitoring",
        "Create backup procedures",
      ],
    },
    High: {
      description: "Robust high availability with multiple redundancy.",
      impact: "Near-zero downtime except in catastrophic scenarios",
      technical: "Multiple redundant systems with automated recovery.",
      businessImpact: "Business continuity preserved in most scenarios",
      capex: 25,
      opex: 15,
      uptime: "99.9%",
      recommendations: [
        "Implement geographic redundancy",
        "Partially active redundant systems",
      ],
    },
  };

  it("renders without crashing", () => {
    render(<AvailabilityImpactWidget level="None" options={{}} />);
    expect(screen.getByText("Availability Impact: None")).toBeInTheDocument();
  });

  it("displays the correct level", () => {
    render(<AvailabilityImpactWidget level="High" options={{}} />);
    expect(screen.getByText("Availability Impact: High")).toBeInTheDocument();
  });

  it("displays the correct availability information", () => {
    render(<AvailabilityImpactWidget level="None" options={mockOptions} />);

    expect(
      screen.getByText("No guaranteed uptime or availability controls.")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Critical business operations completely halt during outages"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("< 90%")).toBeInTheDocument();
  });

  it("displays recommendations when available", () => {
    render(<AvailabilityImpactWidget level="None" options={mockOptions} />);

    expect(screen.getByText("Implement basic monitoring")).toBeInTheDocument();
    expect(screen.getByText("Create backup procedures")).toBeInTheDocument();
  });

  it("updates content when level changes", () => {
    const { rerender } = render(
      <AvailabilityImpactWidget level="None" options={mockOptions} />
    );

    expect(
      screen.getByText("No guaranteed uptime or availability controls.")
    ).toBeInTheDocument();

    rerender(<AvailabilityImpactWidget level="High" options={mockOptions} />);

    expect(
      screen.getByText("Robust high availability with multiple redundancy.")
    ).toBeInTheDocument();
    expect(screen.getByText("99.9%")).toBeInTheDocument();
  });
});
