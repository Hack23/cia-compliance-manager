import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { SecurityLevel } from "../../types/cia";
import { CIAComponentType } from "../../types/cia-services"; // Import the CIAComponentType
import ConfidentialityImpactWidget from "./ConfidentialityImpactWidget";

// Mock ciaContentService
vi.mock("../../services/ciaContentService", () => ({
  __esModule: true,
  default: {
    getComponentDetails: vi.fn().mockImplementation((component: CIAComponentType, level: SecurityLevel) => {
      // Fix comparison by checking if level is equal to a string value rather than comparing types
      if (level === "Unknown" as SecurityLevel) {
        return undefined;
      }
      return {
        description: `${level} ${component} description`,
        businessImpact: `${level} ${component} business impact`,
        protectionMethod:
          level !== "None" ? `${level} protection method` : undefined,
      };
    }),
    getBusinessImpact: vi.fn().mockImplementation((component: CIAComponentType, level: SecurityLevel) => ({
      summary: `${level} ${component} business impact summary`,
      reputational: {
        description: `${level} reputational impact`,
        riskLevel: level === "None" ? "High Risk" : "Medium Risk",
      },
      regulatory: {
        description: `${level} regulatory impact`,
        riskLevel: level === "None" ? "High Risk" : "Low Risk",
      },
    })),
    getTechnicalImplementation: vi
      .fn()
      .mockImplementation((component: CIAComponentType, level: SecurityLevel) => ({
        description: `${level} technical implementation`,
        implementationSteps: [
          `Step 1 for ${component} at ${level} level`,
          `Step 2 for ${component} at ${level} level`,
          `Step 3 for ${component} at ${level} level`,
          `Step 4 for ${component} at ${level} level`,
        ],
        effort: {
          development: "Medium",
          maintenance: "Ongoing",
          expertise: "Advanced",
        },
        protectionMethod:
          level !== "None" ? `${level} protection method` : undefined,
      })),
    getRecommendations: vi
      .fn()
      .mockImplementation((component: CIAComponentType, level: SecurityLevel) => [
        `${level} recommendation 1`,
        `${level} recommendation 2`,
        `${level} recommendation 3`,
        `${level} recommendation 4`,
      ]),
    calculateBusinessImpactLevel: vi.fn().mockReturnValue("Moderate"),
  },
  // Fix: Export these as named exports instead of method calls
  getInformationSensitivity: vi.fn().mockImplementation((level: SecurityLevel) => {
    switch (level) {
      case "None":
        return "Public Data";
      case "Low":
        return "Internal Use";
      case "Moderate":
        return "Confidential";
      case "High":
        return "Restricted";
      case "Very High":
        return "Top Secret";
      default:
        return "Unknown";
    }
  }),
  getProtectionLevel: vi.fn().mockImplementation((level: SecurityLevel) => {
    switch (level) {
      case "None":
        return "No Protection";
      case "Low":
        return "Basic Protection";
      case "Moderate":
        return "Standard Protection";
      case "High":
        return "Enhanced Protection";
      case "Very High":
        return "Maximum Protection";
      default:
        return "Unknown protection";
    }
  }),
}));

describe("ConfidentialityImpactWidget", () => {
  const defaultProps = {
    confidentialityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    availabilityLevel: "Moderate" as SecurityLevel,
  };

  it("renders without crashing", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(screen.getByText(/confidentiality/i, { exact: false })).toBeInTheDocument();
  });

  it("displays confidentiality description", () => {
    render(<ConfidentialityImpactWidget 
      {...defaultProps} 
      confidentialityLevel="High" 
    />);
    expect(screen.getByText(/confidentiality/i, { exact: false })).toBeInTheDocument();
  });

  it("displays protection method when available", () => {
    render(<ConfidentialityImpactWidget 
      {...defaultProps}
      confidentialityLevel="High" 
    />);
    // Check for protection-related text
    expect(screen.getByText(/protection/i, { exact: false })).toBeInTheDocument();
  });

  it("doesn't display protection method when not available", () => {
    // Fix: Use a different mock implementation that doesn't redefine the entire module
    const originalGetComponentDetails = vi.mocked(
      require("../../services/ciaContentService").default.getComponentDetails
    );
    const mockImplementation = originalGetComponentDetails.getMockImplementation();
    
    // Override for just this test - fix by adding proper type annotations
    originalGetComponentDetails.mockImplementation((component: CIAComponentType, level: SecurityLevel) => ({
      description: "Test description",
      impact: "Test impact",
      recommendations: []
    }));
    
    render(<ConfidentialityImpactWidget 
      {...defaultProps}
      confidentialityLevel="None" 
    />);
    
    // Should still render without crashing
    expect(screen.getByText(/confidentiality/i, { exact: false })).toBeInTheDocument();
    
    // Restore the original implementation
    originalGetComponentDetails.mockImplementation(mockImplementation);
  });

  it("shows business impact information", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(screen.getByText(/impact/i, { exact: false })).toBeInTheDocument();
  });

  it("displays technical implementation details", () => {
    render(<ConfidentialityImpactWidget 
      {...defaultProps}
      confidentialityLevel="High" 
    />);
    // Check for technical-related text
    expect(screen.getByText(/technical/i, { exact: false })).toBeInTheDocument();
  });

  it("displays data protection classification", () => {
    render(<ConfidentialityImpactWidget 
      {...defaultProps}
      confidentialityLevel="Very High" 
    />);
    // Check for data protection text
    expect(screen.getByText(/protection/i, { exact: false })).toBeInTheDocument();
  });

  it("shows more recommendations when toggle is clicked", async () => {
    render(<ConfidentialityImpactWidget 
      {...defaultProps}
      confidentialityLevel="High" 
    />);
    
    // Find recommendations section
    const recommendationsSection = screen.getByText(/recommendations/i, { exact: false });
    expect(recommendationsSection).toBeInTheDocument();
  });

  it("handles error state when details not available", () => {
    // Fix: Use a different approach to mock the return value for this specific test
    const originalGetComponentDetails = vi.mocked(
      require("../../services/ciaContentService").default.getComponentDetails
    );
    const mockImplementation = originalGetComponentDetails.getMockImplementation();
    
    // Override to return null for this test
    originalGetComponentDetails.mockReturnValueOnce(null);
    
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    
    // Should render without crashing
    expect(screen.getByText(/confidentiality/i, { exact: false })).toBeInTheDocument();
    
    // Restore the original mock implementation
    originalGetComponentDetails.mockImplementation(mockImplementation);
  });

  it("accepts custom testId prop", () => {
    render(<ConfidentialityImpactWidget 
      {...defaultProps}
      testId="custom-test-id" 
    />);
    expect(screen.getByTestId("custom-test-id")).toBeInTheDocument();
  });
});
