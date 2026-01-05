import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ImplementationGuidancePanel from "./ImplementationGuidancePanel";
import { TechnicalImplementationDetails } from "../../../types/cia-services";

describe("ImplementationGuidancePanel", () => {
  const mockGuides: TechnicalImplementationDetails[] = [
    {
      description: "Availability implementation guide",
      implementationSteps: ["Step 1", "Step 2"],
      effort: {
        development: "Medium",
        maintenance: "Low",
        expertise: "Standard",
      },
      expertiseLevel: "Standard",
      developmentEffort: "Medium",
    },
    {
      description: "Integrity implementation guide",
      implementationSteps: ["Step 1", "Step 2"],
      effort: {
        development: "High",
        maintenance: "Medium",
        expertise: "Advanced",
      },
      expertiseLevel: "Advanced",
      developmentEffort: "High",
    },
    {
      description: "Confidentiality implementation guide",
      implementationSteps: ["Step 1", "Step 2"],
      effort: {
        development: "Medium",
        maintenance: "Medium",
        expertise: "Standard",
      },
      expertiseLevel: "Standard",
      developmentEffort: "Medium",
    },
  ];

  it("renders the panel with title", () => {
    render(
      <ImplementationGuidancePanel
        implementationGuides={mockGuides}
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    expect(screen.getByText("Implementation Tips")).toBeInTheDocument();
  });

  it("displays general implementation tips", () => {
    render(
      <ImplementationGuidancePanel
        implementationGuides={mockGuides}
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    expect(screen.getByText("Getting Started with Implementation")).toBeInTheDocument();
    expect(
      screen.getByText(/Begin with a thorough assessment/)
    ).toBeInTheDocument();
  });

  it("displays confidentiality guide when provided", () => {
    render(
      <ImplementationGuidancePanel
        implementationGuides={mockGuides}
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="High"
      />
    );

    expect(screen.getByText(/Confidentiality \(High\)/)).toBeInTheDocument();
    expect(screen.getByText("Confidentiality implementation guide")).toBeInTheDocument();
  });

  it("displays integrity guide when provided", () => {
    render(
      <ImplementationGuidancePanel
        implementationGuides={mockGuides}
        availabilityLevel="Moderate"
        integrityLevel="Very High"
        confidentialityLevel="Moderate"
      />
    );

    expect(screen.getByText(/Integrity \(Very High\)/)).toBeInTheDocument();
    expect(screen.getByText("Integrity implementation guide")).toBeInTheDocument();
  });

  it("displays availability guide when provided", () => {
    render(
      <ImplementationGuidancePanel
        implementationGuides={mockGuides}
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    expect(screen.getByText(/Availability \(High\)/)).toBeInTheDocument();
    expect(screen.getByText("Availability implementation guide")).toBeInTheDocument();
  });

  it("displays expertise level for each component", () => {
    render(
      <ImplementationGuidancePanel
        implementationGuides={mockGuides}
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    const expertiseLabels = screen.getAllByText(/Expertise:/);
    expect(expertiseLabels.length).toBeGreaterThan(0);
  });

  it("displays development effort for each component", () => {
    render(
      <ImplementationGuidancePanel
        implementationGuides={mockGuides}
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    const effortLabels = screen.getAllByText(/Effort:/);
    expect(effortLabels.length).toBeGreaterThan(0);
  });

  it("displays common implementation challenges", () => {
    render(
      <ImplementationGuidancePanel
        implementationGuides={mockGuides}
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    expect(screen.getByText("Common Implementation Challenges")).toBeInTheDocument();
    expect(
      screen.getByText(/Balancing security with usability/)
    ).toBeInTheDocument();
  });

  it("handles empty implementation guides array", () => {
    render(
      <ImplementationGuidancePanel
        implementationGuides={[]}
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Should still render general tips
    expect(screen.getByText("Getting Started with Implementation")).toBeInTheDocument();
    // But not component-specific cards
    expect(screen.queryByText(/Confidentiality/)).not.toBeInTheDocument();
  });

  it("handles undefined guides gracefully", () => {
    const partialGuides = [undefined, mockGuides[1], undefined];
    
    render(
      <ImplementationGuidancePanel
        implementationGuides={partialGuides}
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Should only render integrity guide
    expect(screen.getByText("Integrity (Moderate)")).toBeInTheDocument();
    expect(screen.queryByText("Confidentiality (Moderate)")).not.toBeInTheDocument();
    expect(screen.queryByText("Availability (Moderate)")).not.toBeInTheDocument();
  });

  it("uses default descriptions when guide description is missing", () => {
    const guidesWithoutDescriptions: TechnicalImplementationDetails[] = [
      { ...mockGuides[0], description: "" },
      { ...mockGuides[1], description: "" },
      { ...mockGuides[2], description: "" },
    ];

    render(
      <ImplementationGuidancePanel
        implementationGuides={guidesWithoutDescriptions}
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    expect(
      screen.getByText("Focus on systems uptime and recovery capabilities.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Focus on data accuracy and validation mechanisms.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Focus on data protection and access controls.")
    ).toBeInTheDocument();
  });

  it("uses default values when expertise level is missing", () => {
    const guidesWithoutExpertise: TechnicalImplementationDetails[] = [
      { ...mockGuides[0], expertiseLevel: "" },
      { ...mockGuides[1], expertiseLevel: "" },
      { ...mockGuides[2], expertiseLevel: "" },
    ];

    render(
      <ImplementationGuidancePanel
        implementationGuides={guidesWithoutExpertise}
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    const standardLabels = screen.getAllByText(/Standard/);
    expect(standardLabels.length).toBe(3);
  });

  it("applies custom className", () => {
    render(
      <ImplementationGuidancePanel
        implementationGuides={mockGuides}
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
        className="custom-class"
      />
    );

    const panel = screen.getByTestId("implementation-guidance-panel");
    expect(panel).toHaveClass("custom-class");
  });

  it("applies custom testId", () => {
    render(
      <ImplementationGuidancePanel
        implementationGuides={mockGuides}
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
        testId="custom-test-id"
      />
    );

    expect(screen.getByTestId("custom-test-id")).toBeInTheDocument();
  });

  it("renders all 5 general implementation steps", () => {
    render(
      <ImplementationGuidancePanel
        implementationGuides={mockGuides}
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    expect(
      screen.getByText(/Begin with a thorough assessment/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Prioritize implementations based on risk/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Implement controls gradually/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Document your implementation process/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Test and validate controls/)
    ).toBeInTheDocument();
  });

  it("renders all 5 common challenges", () => {
    render(
      <ImplementationGuidancePanel
        implementationGuides={mockGuides}
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    expect(
      screen.getByText(/Balancing security with usability/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Maintaining consistent controls/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Integration with legacy systems/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Building security expertise/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Allocating sufficient resources/)
    ).toBeInTheDocument();
  });
});
