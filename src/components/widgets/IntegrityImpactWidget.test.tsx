import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../types/cia";
import IntegrityImpactWidget from "./IntegrityImpactWidget";

// Mock useCIAContentService to provide consistent test data
vi.mock("../../hooks/useCIAContentService", () => ({
  useCIAContentService: () => ({
    ciaContentService: {
      getComponentDetails: vi.fn().mockImplementation((component, level) => ({
        description: `${level} ${component} description`,
        technical: `${level} ${component} technical details`,
        businessImpact: `${level} ${component} business impact`
      })),
      getSecurityLevelDescription: vi.fn().mockImplementation((level) => 
        `${level} integrity description`
      ),
      getBusinessImpact: vi.fn().mockImplementation((component, level) => ({
        summary: `${level} ${component} business impact summary`,
        financial: { description: `${level} financial impact`, riskLevel: "Medium" },
        operational: { description: `${level} operational impact`, riskLevel: "Low" },
        reputational: { description: `${level} reputational impact`, riskLevel: "High" }
      })),
      getTechnicalImplementation: vi.fn().mockImplementation((component, level) => ({
        description: `${level} technical implementation`,
        implementationSteps: [`${level} step 1`, `${level} step 2`],
        effort: {
          development: "Medium",
          maintenance: "Low",
          expertise: "Advanced"
        }
      })),
      getRecommendations: vi.fn().mockImplementation((component, level) => [
        `${level} recommendation 1`,
        `${level} recommendation 2`,
        `${level} recommendation 3`
      ]),
      getProtectionLevel: vi.fn().mockReturnValue("Enhanced Protection"),
      getValidationMethod: vi.fn().mockImplementation((level) => `${level} validation method`)
    }
  })
}));

describe("IntegrityImpactWidget", () => {
  const defaultProps = {
    integrityLevel: "High" as SecurityLevel
  };

  it("renders without crashing", () => {
    render(<IntegrityImpactWidget {...defaultProps} />);

    // Use a more specific test ID that actually exists in the component
    expect(screen.getByTestId("integrity-impact")).toBeInTheDocument();
    
    // Instead of looking for "High Integrity", check for badge with "High" text
    // Use the specific test ID for the integrity badge that contains the level
    const integrityBadge = screen.getByTestId("integrity-impact-integrity-badge");
    expect(integrityBadge).toBeInTheDocument();
    expect(integrityBadge).toHaveTextContent("High");
    
    expect(screen.getByText("Integrity Profile")).toBeInTheDocument();
  });

  it("displays integrity description from ciaContentService", () => {
    render(<IntegrityImpactWidget {...defaultProps} />);
    
    // Use getAllByText since there are multiple elements with the same text
    // and check that at least one exists
    const descriptions = screen.getAllByText("High integrity description");
    expect(descriptions.length).toBeGreaterThan(0);
  });

  it("displays business impact summary", () => {
    render(<IntegrityImpactWidget {...defaultProps} />);
    
    expect(screen.getByText("Business Impact")).toBeInTheDocument();
    expect(screen.getByTestId("integrity-impact-business-impact")).toHaveTextContent(
      "High integrity business impact summary"
    );
  });

  it("displays recommendations", () => {
    render(<IntegrityImpactWidget {...defaultProps} />);
    
    expect(screen.getByText("Recommendations")).toBeInTheDocument();
    expect(screen.getByTestId("integrity-impact-recommendation-0")).toHaveTextContent(
      "High recommendation 1"
    );
  });

  it("shows validation technique", () => {
    render(<IntegrityImpactWidget {...defaultProps} />);
    
    const validationElement = screen.getByTestId("integrity-impact-validation-technique");
    expect(validationElement).toBeInTheDocument();
    expect(validationElement).toHaveTextContent("High validation method");
  });
});
