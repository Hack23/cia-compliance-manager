import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TECHNICAL_DETAILS_WIDGET_IDS } from "../../../constants/testIds";
import { CIAComponent, SecurityLevel } from "../../../types/cia";
import {
  CIAComponentDetails,
  CIAComponentDetailsProps,
} from "./CIAComponentDetails";

// Mock SecurityLevelBadge component
vi.mock("../../common/SecurityLevelBadge", () => ({
  default: ({ level, testId }: { level: SecurityLevel; testId: string }) => (
    <div data-testid={testId}>{level}</div>
  ),
}));

describe("CIAComponentDetails", () => {
  const mockDetails = {
    description: "Test description",
    technical: "Technical details",
    businessImpact: "Business impact",
  };

  const mockCiaContentService = {
    getComponentDetails: vi.fn().mockReturnValue(mockDetails),
    getTechnicalRequirements: vi.fn().mockReturnValue(["Requirement 1", "Requirement 2"]),
  };

  const defaultProps: CIAComponentDetailsProps = {
    component: "confidentiality" as CIAComponent,
    level: "Moderate" as SecurityLevel,
    details: mockDetails,
    ciaContentService: mockCiaContentService,
    testId: "cia-component",
    getTechnicalDescription: vi.fn(() => "Technical description for Moderate confidentiality"),
    getTechnicalRequirements: vi.fn(() => [
      "Implement encryption at rest",
      "Implement role-based access control",
    ]),
    getTechnologies: vi.fn(() => "AES-256, TLS 1.3"),
    getConfigurations: vi.fn(() => "Configure firewall rules, Set up VPN"),
    getExpertiseRequired: vi.fn(() => [
      "Security Engineer",
      "DevOps Engineer",
    ]),
  };

  it("renders without crashing", () => {
    render(<CIAComponentDetails {...defaultProps} />);
    expect(screen.getByTestId(TECHNICAL_DETAILS_WIDGET_IDS.section("confidentiality"))).toBeInTheDocument();
  });

  it("displays component icon for confidentiality", () => {
    render(<CIAComponentDetails {...defaultProps} />);
    expect(screen.getByText("🔒")).toBeInTheDocument();
  });

  it("displays component icon for integrity", () => {
    const integrityProps = {
      ...defaultProps,
      component: "integrity" as CIAComponent,
    };
    render(<CIAComponentDetails {...integrityProps} />);
    expect(screen.getByTestId(TECHNICAL_DETAILS_WIDGET_IDS.section("integrity"))).toBeInTheDocument();
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("displays component icon for availability", () => {
    const availabilityProps = {
      ...defaultProps,
      component: "availability" as CIAComponent,
    };
    render(<CIAComponentDetails {...availabilityProps} />);
    expect(screen.getByTestId(TECHNICAL_DETAILS_WIDGET_IDS.section("availability"))).toBeInTheDocument();
    expect(screen.getByText("⏱️")).toBeInTheDocument();
  });

  it("displays component title for confidentiality", () => {
    render(<CIAComponentDetails {...defaultProps} />);
    expect(screen.getByText("Confidentiality Controls")).toBeInTheDocument();
  });

  it("displays component title for integrity", () => {
    const integrityProps = {
      ...defaultProps,
      component: "integrity" as CIAComponent,
    };
    render(<CIAComponentDetails {...integrityProps} />);
    expect(screen.getByText("Integrity Controls")).toBeInTheDocument();
  });

  it("displays component title for availability", () => {
    const availabilityProps = {
      ...defaultProps,
      component: "availability" as CIAComponent,
    };
    render(<CIAComponentDetails {...availabilityProps} />);
    expect(screen.getByText("Availability Controls")).toBeInTheDocument();
  });

  it("displays security level badge", () => {
    render(<CIAComponentDetails {...defaultProps} />);
    const moderateElements = screen.getAllByText("Moderate");
    expect(moderateElements.length).toBeGreaterThan(0);
  });

  it("displays technical description", () => {
    render(<CIAComponentDetails {...defaultProps} />);
    expect(screen.getByTestId("widget-technical-details-label-description")).toBeInTheDocument();
  });

  it("displays implementation requirements header", () => {
    render(<CIAComponentDetails {...defaultProps} />);
    expect(screen.getByTestId("widget-technical-details-header")).toBeInTheDocument();
  });

  it("displays technical requirements", () => {
    render(<CIAComponentDetails {...defaultProps} />);
    expect(screen.getByTestId("widget-technical-details-list-implementation-steps")).toBeInTheDocument();
    expect(screen.getByText(/Implement encryption at rest/i)).toBeInTheDocument();
    expect(screen.getByText(/Implement role-based access control/i)).toBeInTheDocument();
  });

  it("displays required technologies when advanced details are shown", () => {
    render(<CIAComponentDetails {...defaultProps} />);
    const toggleButton = screen.getByTestId("cia-component-confidentiality-toggle-advanced");
    fireEvent.click(toggleButton);
    expect(screen.getByText(/AES-256, TLS 1.3/i)).toBeInTheDocument();
  });

  it("displays required configurations when advanced details are shown", () => {
    render(<CIAComponentDetails {...defaultProps} />);
    const toggleButton = screen.getByTestId("cia-component-confidentiality-toggle-advanced");
    fireEvent.click(toggleButton);
    expect(screen.getByText(/Configure firewall rules, Set up VPN/i)).toBeInTheDocument();
  });

  it("displays required expertise when advanced details are shown", () => {
    render(<CIAComponentDetails {...defaultProps} />);
    const toggleButton = screen.getByTestId("cia-component-confidentiality-toggle-advanced");
    fireEvent.click(toggleButton);
    expect(screen.getByText(/Security Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/DevOps Engineer/i)).toBeInTheDocument();
  });

  it("displays development effort", () => {
    render(<CIAComponentDetails {...defaultProps} />);
    expect(screen.getByTestId("widget-technical-details-label-development-effort")).toBeInTheDocument();
  });

  it("displays maintenance level", () => {
    render(<CIAComponentDetails {...defaultProps} />);
    expect(screen.getByTestId("widget-technical-details-label-maintenance-level")).toBeInTheDocument();
  });

  it("displays required expertise section when advanced details are shown", () => {
    render(<CIAComponentDetails {...defaultProps} />);
    const toggleButton = screen.getByTestId("cia-component-confidentiality-toggle-advanced");
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("widget-technical-details-list-required-expertise")).toBeInTheDocument();
  });

  it("displays technical header", () => {
    render(<CIAComponentDetails {...defaultProps} />);
    const headers = screen.getAllByTestId("widget-technical-details-header");
    expect(headers.length).toBeGreaterThan(0);
  });

  it("handles High security level", () => {
    const highLevelProps = {
      ...defaultProps,
      level: "High" as SecurityLevel,
      getTechnicalDescription: vi.fn(() => "Technical description for High confidentiality"),
    };
    
    render(<CIAComponentDetails {...highLevelProps} />);
    const highElements = screen.getAllByText("High");
    expect(highElements.length).toBeGreaterThan(0);
  });

  it("handles Very High security level", () => {
    const veryHighProps = {
      ...defaultProps,
      level: "Very High" as SecurityLevel,
      getTechnicalDescription: vi.fn(() => "Technical description for Very High confidentiality"),
    };
    
    render(<CIAComponentDetails {...veryHighProps} />);
    const veryHighElements = screen.getAllByText("Very High");
    expect(veryHighElements.length).toBeGreaterThan(0);
  });

  it("handles None security level", () => {
    const noneProps = {
      ...defaultProps,
      level: "None" as SecurityLevel,
      getTechnicalDescription: vi.fn(() => "No technical requirements"),
      getTechnicalRequirements: vi.fn(() => []),
    };
    
    render(<CIAComponentDetails {...noneProps} />);
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("calls getTechnicalDescription with correct parameters", () => {
    const mockGetTechnicalDescription = vi.fn(() => "Description");
    render(
      <CIAComponentDetails
        {...defaultProps}
        getTechnicalDescription={mockGetTechnicalDescription}
      />
    );
    
    expect(mockGetTechnicalDescription).toHaveBeenCalledWith(
      "confidentiality",
      "Moderate"
    );
  });

  it("calls getTechnicalRequirements with correct parameters", () => {
    const mockGetTechnicalRequirements = vi.fn(() => ["Req 1"]);
    render(
      <CIAComponentDetails
        {...defaultProps}
        getTechnicalRequirements={mockGetTechnicalRequirements}
      />
    );
    
    expect(mockGetTechnicalRequirements).toHaveBeenCalledWith(
      "confidentiality",
      "Moderate"
    );
  });

  it("calls getTechnologies with correct parameters when advanced details are shown", () => {
    const mockGetTechnologies = vi.fn(() => "Tech");
    render(
      <CIAComponentDetails
        {...defaultProps}
        getTechnologies={mockGetTechnologies}
      />
    );
    
    const toggleButton = screen.getByTestId("cia-component-confidentiality-toggle-advanced");
    fireEvent.click(toggleButton);
    
    expect(mockGetTechnologies).toHaveBeenCalledWith(
      "confidentiality",
      "Moderate"
    );
  });

  it("calls getConfigurations with correct parameters when advanced details are shown", () => {
    const mockGetConfigurations = vi.fn(() => "Config");
    render(
      <CIAComponentDetails
        {...defaultProps}
        getConfigurations={mockGetConfigurations}
      />
    );
    
    const toggleButton = screen.getByTestId("cia-component-confidentiality-toggle-advanced");
    fireEvent.click(toggleButton);
    
    expect(mockGetConfigurations).toHaveBeenCalledWith(
      "confidentiality",
      "Moderate"
    );
  });

  it("calls getExpertiseRequired with correct parameters when advanced details are shown", () => {
    const mockGetExpertiseRequired = vi.fn(() => ["Expert"]);
    render(
      <CIAComponentDetails
        {...defaultProps}
        getExpertiseRequired={mockGetExpertiseRequired}
      />
    );
    
    const toggleButton = screen.getByTestId("cia-component-confidentiality-toggle-advanced");
    fireEvent.click(toggleButton);
    
    expect(mockGetExpertiseRequired).toHaveBeenCalledWith(
      "confidentiality",
      "Moderate"
    );
  });

  it("renders with custom testId", () => {
    const customTestId = "custom-cia-component";
    render(<CIAComponentDetails {...defaultProps} testId={customTestId} />);
    
    expect(screen.getByTestId(TECHNICAL_DETAILS_WIDGET_IDS.section("confidentiality"))).toBeInTheDocument();
  });

  it("displays multiple technical requirements", () => {
    const multipleReqsProps = {
      ...defaultProps,
      getTechnicalRequirements: vi.fn(() => [
        "Requirement 1",
        "Requirement 2",
        "Requirement 3",
        "Requirement 4",
      ]),
    };
    
    render(<CIAComponentDetails {...multipleReqsProps} />);
    expect(screen.getByText("Requirement 1")).toBeInTheDocument();
    expect(screen.getByText("Requirement 2")).toBeInTheDocument();
    expect(screen.getByText("Requirement 3")).toBeInTheDocument();
    expect(screen.getByText("Requirement 4")).toBeInTheDocument();
  });

  it("handles empty technical requirements", () => {
    const emptyReqsProps = {
      ...defaultProps,
      getTechnicalRequirements: vi.fn(() => []),
    };
    
    render(<CIAComponentDetails {...emptyReqsProps} />);
    expect(screen.getByTestId("widget-technical-details-list-implementation-steps")).toBeInTheDocument();
  });

  it("handles empty expertise requirements when advanced details are shown", () => {
    const emptyExpertiseProps = {
      ...defaultProps,
      getExpertiseRequired: vi.fn(() => []),
    };
    
    render(<CIAComponentDetails {...emptyExpertiseProps} />);
    const toggleButton = screen.getByTestId("cia-component-confidentiality-toggle-advanced");
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("widget-technical-details-list-required-expertise")).toBeInTheDocument();
  });

  it("applies correct theme colors for confidentiality", () => {
    const { container } = render(<CIAComponentDetails {...defaultProps} />);
    // Check that purple theme classes are applied
    expect(container.querySelector('.text-purple-800')).toBeTruthy();
  });

  it("applies correct theme colors for integrity", () => {
    const integrityProps = {
      ...defaultProps,
      component: "integrity" as CIAComponent,
    };
    const { container } = render(<CIAComponentDetails {...integrityProps} />);
    // Check that green theme classes are applied
    expect(container.querySelector('.text-green-800')).toBeTruthy();
  });

  it("applies correct theme colors for availability", () => {
    const availabilityProps = {
      ...defaultProps,
      component: "availability" as CIAComponent,
    };
    const { container } = render(<CIAComponentDetails {...availabilityProps} />);
    // Check that blue theme classes are applied
    expect(container.querySelector('.text-blue-800')).toBeTruthy();
  });
});
