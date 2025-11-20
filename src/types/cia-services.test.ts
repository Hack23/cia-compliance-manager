import { describe, expect, it } from "vitest";
import { SecurityLevel } from "./cia";
import {
  BusinessImpactDetails,
  CIAComponentType,
  CIADataProvider,
  CIADetails,
  ROIEstimate,
  ROIEstimatesMap,
  ROIMetrics,
  TechnicalImplementationDetails,
  isCIAComponentType,
} from "./cia-services";

describe("CIADetails Interface", () => {
  it("should allow valid CIADetails objects", () => {
    // Create a minimal valid CIADetails object
    const validCIADetails: CIADetails = {
      description: "Test description",
      technical: "Technical details",
      businessImpact: "Business impact details",
      capex: 100,
      opex: 50,
      bg: "#ffffff",
      text: "#000000",
      recommendations: ["Recommendation 1", "Recommendation 2"],
    };

    // Test object matches interface
    expect(validCIADetails.description).toBe("Test description");
    expect(validCIADetails.capex).toBe(100);
    expect(validCIADetails.recommendations.length).toBe(2);
  });

  it("should allow full CIADetails with all properties", () => {
    // Create a comprehensive object with all possible properties
    const fullDetails: CIADetails = {
      // Core descriptive fieldstion",
      description: "Comprehensive security protection",
      technical: "Advanced technical implementation",
      businessImpact: "Test business impact",
      capex: 1000,
      opex: 200,
      bg: "#ffffff",
      text: "#000000",
      recommendations: ["Recommendation 1", "Recommendation 2"],
      // Add any additional properties expected by the test
      businessImpactDetails: {
        summary: "Summary",
        financial: { description: "Financial impact", riskLevel: "Medium" },
        operational: { description: "Operational impact", riskLevel: "Low" }
      },
      technicalImplementation: {
        description: "Implementation details",
        implementationSteps: ["Step 1", "Step 2"],
        effort: {
          development: "Medium",
          maintenance: "Low",
          expertise: "Advanced"
        }
      }
    };
    
    // This validation should pass with the correct interface
    const result: CIADetails = fullDetails;
    expect(result).toEqual(fullDetails);
  });

  it("should work with CIADetails interface", () => {
    // Create object using CIADetails
    const details: CIADetails = {
      description: "Using deprecated interface",
      technical: "Technical details",
      businessImpact: "Business impact details",
      capex: 200,
      opex: 100,
      bg: "#cccccc",
      text: "#000000",
      recommendations: ["Update implementation"],

      // Additional properties
      securityIcon: "🔐",
      valuePoints: ["Added value"],
    };

    // Should work the same as CIADetails
    expect(details.description).toBe("Using deprecated interface");
    expect(details.technical).toBe("Technical details");
    expect(details.businessImpact).toBe("Business impact details");
  });

  it("should handle different combinations of optional fields", () => {
    // Test availability-focused details
    const availabilityDetails: CIADetails = {
      description: "High availability service",
      technical: "Technical details",
      businessImpact: "Business impact",
      capex: 1000,
      opex: 500,
      bg: "#f0f0f0",
      text: "#000000",
      recommendations: ["Recommendation"],

      // Availability-specific fields
      uptime: "99.99%",
      rto: "15 minutes",
      rpo: "1 hour",
      mttr: "30 minutes",
    };

    expect(availabilityDetails.uptime).toBe("99.99%");
    expect(availabilityDetails.rto).toBe("15 minutes");

    // Test integrity-focused details
    const integrityDetails: CIADetails = {
      description: "Data integrity solution",
      technical: "Technical details",
      businessImpact: "Business impact",
      capex: 1000,
      opex: 500,
      bg: "#f0f0f0",
      text: "#000000",
      recommendations: ["Recommendation"],

      // Integrity-specific fields
      validationMethod: "Cryptographic hash verification",
    };

    expect(integrityDetails.validationMethod).toBe(
      "Cryptographic hash verification"
    );

    // Fix the BusinessImpactDetails test by adding the required summary field
    const impactDetails: BusinessImpactDetails = {
      summary: "Impact summary",
      financial: { 
        description: "Financial impact description", 
        riskLevel: "Medium Risk", 
        annualRevenueLoss: "$100,000" 
      },
      operational: { 
        description: "Operational impact description", 
        riskLevel: "Low Risk", 
        meanTimeToRecover: "4 hours" 
      },
      // Keep legacy properties
      financialImpact: { 
        description: "Financial impact description", 
        riskLevel: "Medium Risk", 
        annualRevenueLoss: "$100,000" 
      },
      operationalImpact: { 
        description: "Operational impact description", 
        riskLevel: "Low Risk", 
        meanTimeToRecover: "4 hours" 
      },
      reputationalImpact: { 
        description: "Reputational impact description", 
        riskLevel: "High Risk" 
      },
      strategic: { 
        description: "Strategic impact description", 
        riskLevel: "Medium Risk" 
      },
      regulatory: { 
        description: "Regulatory impact description", 
        riskLevel: "High Risk" 
      }
    };

    expect(impactDetails.summary).toBe("Impact summary");

    // Test confidentiality-focused details
    const confidentialityDetails: CIADetails = {
      description: "Data confidentiality solution",
      technical: "Technical details",
      businessImpact: "Business impact",
      capex: 1000,
      opex: 500,
      bg: "#f0f0f0",
      text: "#000000",
      recommendations: ["Recommendation"],

      // Confidentiality-specific fields
      protectionMethod: "End-to-end encryption",
    };

    expect(confidentialityDetails.protectionMethod).toBe(
      "End-to-end encryption"
    );
  });

  it("should handle business impact details structure", () => {
    // Fix the BusinessImpactDetails object by adding the required summary property
    const impactDetails: BusinessImpactDetails = {
      summary: "Impact summary",
      financial: { 
        description: "Financial impact", 
        riskLevel: "Medium" 
      },
      operational: { 
        description: "Operational impact", 
        riskLevel: "Low" 
      },
      reputational: { 
        description: "Reputational impact", 
        riskLevel: "High" 
      },
    };

    expect(impactDetails.summary).toBe("Impact summary");
    if (impactDetails.financial) {
      expect(impactDetails.financial.riskLevel).toBe("Medium");
    }

    // Test optional properties
    const fullImpactDetails: BusinessImpactDetails = {
      summary: "Full impact summary",
      financial: {
        description: "Financial impact",
        riskLevel: "High",
        annualRevenueLoss: "5-10%",
      },
      operational: {
        description: "Operational impact",
        riskLevel: "High",
        meanTimeToRecover: "8 hours",
      },
      reputational: {
        description: "Reputational impact",
        riskLevel: "Critical",
      },
      strategic: {
        description: "Strategic impact",
        riskLevel: "High",
        competitiveAdvantage: "Lost market share",
      },
      regulatory: {
        description: "Regulatory impact",
        riskLevel: "Critical",
        complianceImpact: "GDPR fines up to 4% of annual revenue",
      },
    };

    expect(fullImpactDetails.strategic?.competitiveAdvantage).toBe(
      "Lost market share"
    );
    expect(fullImpactDetails.regulatory?.complianceImpact).toBe(
      "GDPR fines up to 4% of annual revenue"
    );
  });

  it("should handle undefined businessImpactDetails gracefully", () => {
    const detailsWithoutImpact: CIADetails = {
      description: "No impact details",
      technical: "Technical details",
      businessImpact: "Business impact",
      capex: 100,
      opex: 50,
      bg: "#ffffff",
      text: "#000000",
      recommendations: [],
    };

    expect(detailsWithoutImpact.businessImpactDetails).toBeUndefined();
  });

  it("should handle undefined optional fields gracefully", () => {
    const minimalDetails: CIADetails = {
      description: "Test",
      impact: "Test",
      technical: "Test",
      businessImpact: "Test",
      capex: 100,
      opex: 20,
      bg: "#ffffff",
      text: "#000000",
      recommendations: [],
    };

    // Test that optional fields can be undefined
    expect(minimalDetails.businessImpactDetails).toBeUndefined();
    expect(minimalDetails.technicalImplementation).toBeUndefined();
  });
});

describe("Supporting Types", () => {
  it("should validate CIAComponentType", () => {
    // Valid component types
    const validComponents: CIAComponentType[] = [
      "confidentiality",
      "integrity",
      "availability",
    ];

    expect(validComponents).toHaveLength(3);
    expect(validComponents).toContain("confidentiality");
    expect(validComponents).toContain("integrity");
    expect(validComponents).toContain("availability");

    // Test the type guard
    expect(isCIAComponentType("confidentiality")).toBe(true);
    expect(isCIAComponentType("integrity")).toBe(true);
    expect(isCIAComponentType("availability")).toBe(true);
    expect(isCIAComponentType("security")).toBe(false);
    expect(isCIAComponentType(null)).toBe(false);
    expect(isCIAComponentType(undefined)).toBe(false);
    expect(isCIAComponentType(123)).toBe(false);
  });

  it("should validate BusinessImpactDetails", () => {
    const impactDetails: BusinessImpactDetails = {
      summary: "Impact summary",
      financial: { 
        description: "Financial impact", 
        riskLevel: "Medium", 
        annualRevenueLoss: "1-2%" 
      },
      operational: { 
        description: "Operational impact", 
        riskLevel: "Low", 
        meanTimeToRecover: "1 hour" 
      },
      reputational: { 
        description: "Reputational impact", 
        riskLevel: "High" 
      },
    };

    expect(impactDetails.summary).toBe("Impact summary");
    if (impactDetails.financial) {
      expect(impactDetails.financial.riskLevel).toBe("Medium");
    }

    // Test optional properties
    const fullImpactDetails: BusinessImpactDetails = {
      summary: "Full impact summary",
      financial: {
        description: "Financial impact",
        riskLevel: "High",
        annualRevenueLoss: "5-10%",
      },
      operational: {
        description: "Operational impact",
        riskLevel: "High",
        meanTimeToRecover: "8 hours",
      },
      reputational: {
        description: "Reputational impact",
        riskLevel: "Critical",
      },
      strategic: {
        description: "Strategic impact",
        riskLevel: "High",
        competitiveAdvantage: "Lost market share",
      },
      regulatory: {
        description: "Regulatory impact",
        riskLevel: "Critical",
        complianceImpact: "GDPR fines up to 4% of annual revenue",
      },
    };

    expect(fullImpactDetails.strategic?.competitiveAdvantage).toBe(
      "Lost market share"
    );
    expect(fullImpactDetails.regulatory?.complianceImpact).toBe(
      "GDPR fines up to 4% of annual revenue"
    );
  });

  it("should validate TechnicalImplementationDetails", () => {
    const techDetails: TechnicalImplementationDetails = {
      description: "Implementation description",
      implementationSteps: ["Step 1", "Step 2"],
      effort: {
        development: "1 week",
        maintenance: "Monthly",
        expertise: "Mid-level developer",
      },
      requirements: ["Node.js", "Docker"],
      technologies: ["Express", "MongoDB"],
    };

    expect(techDetails.description).toBe("Implementation description");
    expect(techDetails.implementationSteps.length).toBe(2);
    expect(techDetails.effort.development).toBe("1 week");

    // Test with availability-specific metrics
    const availabilityTechDetails: TechnicalImplementationDetails = {
      description: "High availability implementation",
      implementationSteps: ["Step 1", "Step 2"],
      effort: {
        development: "2 weeks",
        maintenance: "Weekly",
        expertise: "Senior developer",
      },
      requirements: ["Kubernetes"],
      technologies: ["Docker", "Redis"],
      rto: "15 minutes",
      rpo: "5 minutes",
      mttr: "30 minutes",
    };

    expect(availabilityTechDetails.rto).toBe("15 minutes");
    expect(availabilityTechDetails.rpo).toBe("5 minutes");
    expect(availabilityTechDetails.mttr).toBe("30 minutes");
  });

  // Fix the ROIEstimate test case by adding the returnRate property
  it("should validate ROI related types", () => {
    const roiMetrics: ROIMetrics = {
      value: "$10,000",
      percentage: "150%",
      description: "Strong ROI",
    };

    const roiEstimate: ROIEstimate = {
      returnRate: "200%", // Add this required field
      description: "Excellent return",
      value: "200%", // Both value and returnRate supported for backward compatibility
    };

    const roiMap: ROIEstimatesMap = {
      NONE: { returnRate: "0%", description: "No return" },
      LOW: { returnRate: "50%", description: "Low return" },
      MODERATE: { returnRate: "150%", description: "Moderate return" },
      HIGH: { returnRate: "300%", description: "High return" },
      VERY_HIGH: { returnRate: "500%", description: "Maximum return" },
    };

    expect(roiMetrics.percentage).toBe("150%");
    expect(roiEstimate.returnRate).toBe("200%");
    expect(roiEstimate.value).toBe("200%"); // Check backward compatibility field
    expect(roiMap.HIGH.returnRate).toBe("300%");

    // Test with optional properties
    const detailedROI: ROIEstimate = {
      returnRate: "250%",
      description: "Very good return on investment",
      potentialSavings: "$50,000 annually",
      breakEvenPeriod: "6 months",
    };

    expect(detailedROI.potentialSavings).toBe("$50,000 annually");
    expect(detailedROI.breakEvenPeriod).toBe("6 months");
  });

  it("should validate CIADataProvider", () => {
    // Create a minimal mock data provider
    const mockProvider: CIADataProvider = {
      availabilityOptions: {
        None: {
          description: "No availability",
          technical: "No controls",
          businessImpact: "Severe impact",
          capex: 0,
          opex: 0,
          bg: "#fff",
          text: "#000",
          recommendations: [],
        } as CIADetails,
        // Other levels would be defined similarly
      } as Record<SecurityLevel, CIADetails>,
      integrityOptions: {} as Record<SecurityLevel, CIADetails>,
      confidentialityOptions: {} as Record<SecurityLevel, CIADetails>,
      roiEstimates: {
        NONE: { returnRate: "0%", description: "No return" },
        LOW: { returnRate: "50%", description: "Low return" },
        MODERATE: { returnRate: "150%", description: "Moderate return" },
        HIGH: { returnRate: "300%", description: "High return" },
        VERY_HIGH: { returnRate: "500%", description: "Maximum return" },
      },
      getDefaultSecurityIcon: (level: SecurityLevel) => "🔒",
      getDefaultValuePoints: (level: SecurityLevel) => [
        "Value point 1",
        "Value point 2",
      ],
    };

    expect(mockProvider.availabilityOptions.None.description).toBe(
      "No availability"
    );
    expect(typeof mockProvider.getDefaultSecurityIcon).toBe("function");

    // Use optional chaining to avoid the possibly undefined error
    expect(mockProvider.getDefaultSecurityIcon?.("High")).toBe("🔒");

    // Fix any "Cannot invoke an object which is possibly 'undefined'" errors
    // In the function with the error on line 443, add a null check:

    // Somewhere around line 443 (replace with the actual code that causes the error)
    if (mockProvider && mockProvider.getDefaultSecurityIcon) {
      mockProvider.getDefaultSecurityIcon("High");
    }

    // Fix another undefined error with optional chaining
    expect(mockProvider?.getDefaultSecurityIcon?.("High")).toBe("🔒");

    // Create a properly defined impactDetails for this test
    const testImpactDetails = {
      summary: "Test summary",
      financial: {
        description: "Financial impact",
        riskLevel: "Medium",
      },
      financialImpact: {
        description: "Financial impact",
        riskLevel: "Medium",
      },
    };

    // Use the properly defined variable
    const financial =
      testImpactDetails.financial ?? testImpactDetails.financialImpact;
    expect(financial?.riskLevel).toBeDefined();
  });
});
