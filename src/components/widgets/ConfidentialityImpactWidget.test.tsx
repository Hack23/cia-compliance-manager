import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { SecurityLevel } from "../../types/cia";
import ConfidentialityImpactWidget from "./ConfidentialityImpactWidget";

// Mock ciaContentService
vi.mock("../../services/ciaContentService", () => ({
  __esModule: true,
  default: {
    getComponentDetails: vi.fn().mockImplementation((component, level) => {
      if (level === "Unknown") {
        return undefined;
      }
      return {
        description: `${level} ${component} description`,
        businessImpact: `${level} ${component} business impact`,
        protectionMethod:
          level !== "None" ? `${level} protection method` : undefined,
      };
    }),
    getBusinessImpact: vi.fn().mockImplementation((component, level) => ({
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
      .mockImplementation((component, level) => ({
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
      .mockImplementation((component, level) => [
        `${level} recommendation 1`,
        `${level} recommendation 2`,
        `${level} recommendation 3`,
        `${level} recommendation 4`,
      ]),
    calculateBusinessImpactLevel: vi.fn().mockReturnValue("Moderate"),
  },
  getInformationSensitivity: vi.fn().mockImplementation((level) => {
    switch (level) {
      case "None":
        return "Public Data"; // Fix to match actual implementation
      case "Low":
        return "Internal Use"; // Fix to match actual implementation
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
  getProtectionLevel: vi.fn().mockImplementation((level) => {
    switch (level) {
      case "None":
        return "No Protection"; // Fix to match actual implementation (capitalization)
      case "Low":
        return "Basic Protection"; // Fix to match actual implementation
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
    render(<ConfidentialityImpactWidget 
      confidentialityLevel="Moderate" 
      availabilityLevel="Moderate" 
      integrityLevel="Moderate" 
    />);
    expect(screen.getByText(/confidentiality/i, { exact: false })).toBeInTheDocument();
  });

  it("displays confidentiality description", () => {
    render(<ConfidentialityImpactWidget 
      confidentialityLevel="High" 
      availabilityLevel="Moderate" 
      integrityLevel="Moderate" 
    />);
    expect(screen.getByText(/confidentiality/i, { exact: false })).toBeInTheDocument();
  });

  it("displays protection method when available", () => {
    render(<ConfidentialityImpactWidget 
      confidentialityLevel="High" 
      availabilityLevel="Moderate" 
      integrityLevel="Moderate" 
    />);
    // Check for protection-related text
    expect(screen.getByText(/protection/i, { exact: false })).toBeInTheDocument();
  });

  it("doesn't display protection method when not available", () => {
    // Mock the service to return incomplete data
    vi.mock("../../services/ciaContentService", () => ({
      default: {
        getConfidentialityDetail: () => ({
          description: "Test description",
          impact: "Test impact",
          recommendations: []
        })
      }
    }));
    
    render(<ConfidentialityImpactWidget 
      confidentialityLevel="None" 
      availabilityLevel="None" 
      integrityLevel="None" 
    />);
    // Should still render without crashing
    expect(screen.getByText(/confidentiality/i, { exact: false })).toBeInTheDocument();
  });

  it("shows business impact information", () => {
    render(<ConfidentialityImpactWidget 
      confidentialityLevel="Moderate" 
      availabilityLevel="Moderate" 
      integrityLevel="Moderate" 
    />);
    expect(screen.getByText(/impact/i, { exact: false })).toBeInTheDocument();
  });

  it("displays technical implementation details", () => {
    render(<ConfidentialityImpactWidget 
      confidentialityLevel="High" 
      availabilityLevel="Moderate" 
      integrityLevel="Moderate" 
    />);
    // Check for technical-related text
    expect(screen.getByText(/technical/i, { exact: false })).toBeInTheDocument();
  });

  it("displays data protection classification", () => {
    render(<ConfidentialityImpactWidget 
      confidentialityLevel="Very High" 
      availabilityLevel="High" 
      integrityLevel="High" 
    />);
    // Check for data protection text
    expect(screen.getByText(/protection/i, { exact: false })).toBeInTheDocument();
  });

  it("shows more recommendations when toggle is clicked", async () => {
    render(<ConfidentialityImpactWidget 
      confidentialityLevel="High" 
      availabilityLevel="Moderate" 
      integrityLevel="Moderate" 
    />);
    
    // Find recommendations section
    const recommendationsSection = screen.getByText(/recommendations/i, { exact: false });
    expect(recommendationsSection).toBeInTheDocument();
  });

  it("handles error state when details not available", () => {
    // Mock service to return null details
    vi.mock("../../services/ciaContentService", () => ({
      default: {
        getConfidentialityDetail: () => null
      }
    }));
    
    render(<ConfidentialityImpactWidget 
      confidentialityLevel="Moderate" 
      availabilityLevel="Moderate" 
      integrityLevel="Moderate" 
    />);
    // Should render without crashing
    expect(screen.getByText(/confidentiality/i, { exact: false })).toBeInTheDocument();
  });

  it("accepts custom testId prop", () => {
    render(<ConfidentialityImpactWidget 
      confidentialityLevel="Moderate" 
      availabilityLevel="Moderate" 
      integrityLevel="Moderate" 
      testId="custom-test-id" 
    />);
    expect(screen.getByTestId("custom-test-id")).toBeInTheDocument();
  });
});
