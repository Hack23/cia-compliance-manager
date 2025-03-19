import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CIADataProvider, CIADetails, SecurityLevel } from '../types/cia-services';
import { ComplianceService } from './complianceService';

// Create a helper function to generate valid CIADetails objects for testing
function createMockCIADetails(description: string, level: SecurityLevel): CIADetails {
  return {
    description,
    technical: `Technical details for ${level}`,
    businessImpact: `Business impact for ${level}`,
    capex: level === 'None' ? 0 : level === 'Low' ? 5 : level === 'Moderate' ? 10 : level === 'High' ? 15 : 20,
    opex: level === 'None' ? 0 : level === 'Low' ? 2 : level === 'Moderate' ? 5 : level === 'High' ? 8 : 10,
    bg: '#ffffff',
    text: '#000000',
    recommendations: [`Recommendation for ${level}`],
  };
}

// Create a proper mock that satisfies the CIADataProvider interface
const mockDataProvider: CIADataProvider = {
  availabilityOptions: {
    None: createMockCIADetails('No availability security controls', 'None'),
    Low: createMockCIADetails('Low availability security controls', 'Low'),
    Moderate: createMockCIADetails('Moderate availability security controls', 'Moderate'),
    High: createMockCIADetails('High availability security controls', 'High'),
    'Very High': createMockCIADetails('Very high availability security controls', 'Very High'),
  },
  integrityOptions: {
    None: createMockCIADetails('No integrity security controls', 'None'),
    Low: createMockCIADetails('Low integrity security controls', 'Low'),
    Moderate: createMockCIADetails('Moderate integrity security controls', 'Moderate'),
    High: createMockCIADetails('High integrity security controls', 'High'),
    'Very High': createMockCIADetails('Very high integrity security controls', 'Very High'),
  },
  confidentialityOptions: {
    None: createMockCIADetails('No confidentiality security controls', 'None'),
    Low: createMockCIADetails('Low confidentiality security controls', 'Low'),
    Moderate: createMockCIADetails('Moderate confidentiality security controls', 'Moderate'),
    High: createMockCIADetails('High confidentiality security controls', 'High'),
    'Very High': createMockCIADetails('Very high confidentiality security controls', 'Very High'),
  },
  roiEstimates: {
    NONE: { returnRate: '0%', description: 'No ROI' },
    LOW: { returnRate: '50%', description: 'Low ROI' },
    MODERATE: { returnRate: '200%', description: 'Moderate ROI' },
    HIGH: { returnRate: '350%', description: 'High ROI' },
    VERY_HIGH: { returnRate: '500%', description: 'Very high ROI' },
  },
  // Optional methods can remain as mocks
  getDefaultSecurityIcon: vi.fn(),
  getDefaultValuePoints: vi.fn(),
};

// Define FrameworkComplianceStatus type
type FrameworkComplianceStatus = 'compliant' | 'partial' | 'non-compliant';

describe('ComplianceService', () => {
  let service: ComplianceService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ComplianceService(mockDataProvider);
  });

  describe('getComplianceStatus', () => {
    it('should return compliance status for different security levels', () => {
      // Fix function calls to include all required parameters (availability, integrity, confidentiality)
      const noneStatus = service.getComplianceStatus('None', 'None', 'None');
      expect(noneStatus.compliantFrameworks).toEqual([]);
      
      const lowStatus = service.getComplianceStatus('Low', 'Low', 'Low');
      expect(lowStatus.compliantFrameworks).toHaveLength(1);
      
      const moderateStatus = service.getComplianceStatus('Moderate', 'Moderate', 'Moderate');
      expect(moderateStatus.compliantFrameworks).toHaveLength(3);
      
      // Fix: Use proper object structure for industry parameter
      const highStatus = service.getComplianceStatus('High', 'High', 'High', { industry: 'finance' });
      expect(highStatus.compliantFrameworks).toHaveLength(5);
      
      const veryHighStatus = service.getComplianceStatus('Very High', 'Very High', 'Very High');
      expect(veryHighStatus.compliantFrameworks).toHaveLength(6);
    });

    it("returns compliance status with all required properties", () => {
      const status = service.getComplianceStatus("Moderate", "Moderate", "Moderate");
      
      expect(status).toHaveProperty("status");
      expect(status).toHaveProperty("compliantFrameworks");
      expect(status).toHaveProperty("partiallyCompliantFrameworks");
      expect(status).toHaveProperty("nonCompliantFrameworks");
      expect(status).toHaveProperty("remediationSteps");
      expect(status).toHaveProperty("requirements");
      expect(status).toHaveProperty("complianceScore");
    });

    it("returns non-compliant status for None security level", () => {
      const status = service.getComplianceStatus("None", "None", "None");
      
      expect(status.status).toBe("Non-Compliant");
      expect(status.compliantFrameworks).toHaveLength(0);
      expect(status.nonCompliantFrameworks.length).toBeGreaterThan(0);
      expect(status.complianceScore).toBe(0); // Zero compliance score for None level
    });

    it("returns fully compliant status for Very High security level", () => {
      const status = service.getComplianceStatus("Very High", "Very High", "Very High");
      
      expect(status.status).toBe("Compliant with all major frameworks");
      expect(status.compliantFrameworks.length).toBeGreaterThan(0);
      expect(status.nonCompliantFrameworks).toHaveLength(0);
      expect(status.complianceScore).toBe(100); // Full compliance score for Very High level
      
      // Major frameworks should be included
      ["HIPAA", "PCI DSS", "GDPR", "ISO 27001", "NIST 800-53"].forEach(framework => {
        expect(status.compliantFrameworks).toContain(framework);
      });
    });

    it("calculates appropriate compliance status for mixed security levels", () => {
      // HIPAA requires High level across all components
      // This combination should be partially compliant at best
      const status = service.getComplianceStatus("High", "Moderate", "Low");
      
      // Should have a mix of compliant, partial, and non-compliant frameworks
      expect(status.compliantFrameworks.length).toBeGreaterThanOrEqual(0);
      expect(status.partiallyCompliantFrameworks.length).toBeGreaterThan(0);
      expect(status.nonCompliantFrameworks.length).toBeGreaterThan(0);
      
      // HIPAA should be non-compliant with this combination
      expect(status.nonCompliantFrameworks).toContain("HIPAA");
      
      // The overall compliance status should reflect partial compliance
      expect(status.status).toBe("Meets basic compliance only");
      
      // Compliance score should be between 0-100
      expect(status.complianceScore).toBeGreaterThan(0);
      expect(status.complianceScore).toBeLessThan(100);
    });

    it("generates relevant remediation steps for specific non-compliant frameworks", () => {
      const status = service.getComplianceStatus("Low", "Low", "Low");
      
      expect(status.remediationSteps.length).toBeGreaterThan(0);
      
      // Verify remediation steps are relevant to specific frameworks
      if (status.nonCompliantFrameworks.includes("GDPR")) {
        expect(status.remediationSteps.some(step => 
          step.toLowerCase().includes("data protection") || 
          step.toLowerCase().includes("consent")
        )).toBe(true);
      }
      
      if (status.nonCompliantFrameworks.includes("HIPAA")) {
        expect(status.remediationSteps.some(step => 
          step.toLowerCase().includes("phi") || 
          step.toLowerCase().includes("healthcare") ||
          step.toLowerCase().includes("audit")
        )).toBe(true);
      }
      
      if (status.nonCompliantFrameworks.includes("PCI DSS")) {
        expect(status.remediationSteps.some(step => 
          step.toLowerCase().includes("cardholder") || 
          step.toLowerCase().includes("encryption") ||
          step.toLowerCase().includes("scanning")
        )).toBe(true);
      }
    });

    it("calculates compliance score based on framework coverage", () => {
      const highStatus = service.getComplianceStatus("High", "High", "High");
      const lowStatus = service.getComplianceStatus("Low", "Low", "Low");
      
      expect(highStatus.complianceScore).toBeGreaterThan(lowStatus.complianceScore);
      expect(highStatus.complianceScore).toBeGreaterThan(0);
      expect(highStatus.complianceScore).toBeLessThanOrEqual(100);
    });
    
    it("returns appropriate compliance requirements based on relevant frameworks", () => {
      const status = service.getComplianceStatus("High", "High", "High");
      
      // Should have requirements for relevant frameworks
      expect(status.requirements.length).toBeGreaterThan(0);
      
      // Requirements should map to relevant frameworks
      if (status.compliantFrameworks.includes("ISO 27001") || status.partiallyCompliantFrameworks.includes("ISO 27001")) {
        expect(status.requirements.some(req => 
          req.toLowerCase().includes("risk") || 
          req.toLowerCase().includes("asset") || 
          req.toLowerCase().includes("security")
        )).toBe(true);
      }
    });
    
    it("handles specific industry compliance scenarios correctly", () => {
      // Fix: Use proper object structure for industry parameter
      const healthcareStatus = service.getComplianceStatus("High", "High", "High", { industry: "healthcare" });
      expect(healthcareStatus.compliantFrameworks).toContain("HIPAA");
      
      // Fix: Use proper object structure for industry parameter
      const financialStatus = service.getComplianceStatus("Very High", "Very High", "Very High", { industry: "finance" });
      expect(financialStatus.compliantFrameworks).toContain("PCI DSS");
      
      // Fix: Use proper object structure for region parameter
      const gdprStatus = service.getComplianceStatus("Moderate", "Moderate", "High", { region: "EU" });
      // Should be compliant with GDPR with these levels
      expect(gdprStatus.compliantFrameworks).toContain("GDPR");
    });

    it("validates that all generated arrays (compliant, partial, non-compliant) are mutually exclusive", () => {
      const status = service.getComplianceStatus("High", "Moderate", "Low");
      
      const allFrameworks = [
        ...status.compliantFrameworks,
        ...status.partiallyCompliantFrameworks,
        ...status.nonCompliantFrameworks
      ];
      
      const uniqueFrameworks = new Set(allFrameworks);
      expect(uniqueFrameworks.size).toBe(allFrameworks.length);
    });

    it("handles edge cases when one or more security levels are borderline", () => {
      const borderlineStatus = service.getComplianceStatus("Moderate", "Moderate", "High");
      
      expect(borderlineStatus.complianceScore).toBeGreaterThan(0);
      expect(borderlineStatus.complianceScore).toBeLessThan(100);
      
      const borderlineStatus2 = service.getComplianceStatus("High", "High", "Moderate");
      
      expect(borderlineStatus2.complianceScore).toBeGreaterThan(0);
      expect(borderlineStatus2.complianceScore).toBeLessThan(100);
    });

    it("verifies rounding of numeric scores", () => {
      const status = service.getComplianceStatus("Moderate", "Moderate", "Moderate");
      
      expect(Number.isInteger(status.complianceScore)).toBe(true);
    });
  });

  describe("getCompliantFrameworks", () => {
    it("returns appropriate frameworks for each security level", () => {
      // Fix: Provide all required arguments
      const noneFrameworks = service.getCompliantFrameworks("None", "None", "None");
      const lowFrameworks = service.getCompliantFrameworks("Low", "Low", "Low");
      const moderateFrameworks = service.getCompliantFrameworks("Moderate", "Moderate", "Moderate");
      const highFrameworks = service.getCompliantFrameworks("High", "High", "High");
      const veryHighFrameworks = service.getCompliantFrameworks("Very High", "Very High", "Very High");
      
      expect(noneFrameworks.length).toBeLessThan(lowFrameworks.length);
      expect(lowFrameworks.length).toBeLessThan(moderateFrameworks.length);
      expect(moderateFrameworks.length).toBeLessThan(highFrameworks.length);
      expect(highFrameworks.length).toBeLessThan(veryHighFrameworks.length);
    });

    it("includes appropriate frameworks for High security level", () => {
      const frameworks = service.getCompliantFrameworks("High", "High", "High");
      expect(frameworks).toContain("ISO 27001");
      expect(frameworks).toContain("GDPR");
    });

    it("includes all major frameworks for Very High security level", () => {
      const frameworks = service.getCompliantFrameworks("Very High", "Very High", "Very High");
      expect(frameworks).toContain("HIPAA");
      expect(frameworks).toContain("PCI DSS");
      expect(frameworks).toContain("NIST 800-53");
    });

    it("returns consistent results on multiple invocations", () => {
      const firstCall = service.getCompliantFrameworks("High", "High", "High");
      const secondCall = service.getCompliantFrameworks("High", "High", "High");
      expect(firstCall).toEqual(secondCall);
    });
  });

  describe("getComplianceStatusText", () => {
    it("returns appropriate status text for each security level", () => {
      expect(service.getComplianceStatusText("None")).toBe("Non-Compliant");
      expect(service.getComplianceStatusText("Low")).toBe("Non-Compliant");
      expect(service.getComplianceStatusText("Moderate")).toBe("Meets basic compliance only");
      expect(service.getComplianceStatusText("High")).toBe("Compliant with standard frameworks");
      expect(service.getComplianceStatusText("Very High")).toBe("Compliant with all major frameworks");
    });
  });

  describe("getFrameworkStatus", () => {
    it('correctly determines compliance status for major frameworks', () => {
      // Fix: Provide all required arguments (availability, integrity, confidentiality)
      expect(service.getFrameworkStatus('NIST 800-53', 'High', 'High', 'High')).toBe('compliant');
      expect(service.getFrameworkStatus('GDPR', 'Moderate', 'High', 'High')).toBe('compliant');
      expect(service.getFrameworkStatus('SOC2', 'Low', 'Moderate', 'Moderate')).toBe('partial');
      expect(service.getFrameworkStatus('PCI DSS', 'Low', 'Low', 'Low')).toBe('non-compliant');
      expect(service.getFrameworkStatus('HIPAA', 'None', 'None', 'None')).toBe('non-compliant');
    });

    it("handles unknown frameworks appropriately", () => {
      // Fix: Provide all required arguments
      expect(service.getFrameworkStatus("Unknown Framework", 'Low', 'Low', 'Low')).toBe("partial");
      expect(service.getFrameworkStatus("Unknown Framework", 'Moderate', 'Moderate', 'Moderate')).toBe("compliant");
    });
    
    it("applies business logic correctly to framework compliance status", () => {
      // Update test cases to provide all required arguments
      const testFrameworks: Array<[string, SecurityLevel, SecurityLevel, SecurityLevel, FrameworkComplianceStatus]> = [
        // Framework / AvailabilityLevel / IntegrityLevel / ConfidentialityLevel / Expected Status
        ["HIPAA", "None", "None", "None", "non-compliant"],
        ["HIPAA", "Low", "Low", "Low", "non-compliant"],
        ["HIPAA", "Moderate", "Moderate", "Moderate", "partial"],
        ["HIPAA", "High", "High", "High", "compliant"],
        ["HIPAA", "Very High", "Very High", "Very High", "compliant"],
        
        ["PCI DSS", "High", "High", "High", "compliant"],
        ["PCI DSS", "Moderate", "Moderate", "Moderate", "partial"],
        
        ["GDPR", "Low", "Low", "Low", "partial"],
        ["GDPR", "Moderate", "Moderate", "Moderate", "compliant"]
      ];
      
      testFrameworks.forEach(([framework, avail, integ, conf, expectedStatus]) => {
        expect(service.getFrameworkStatus(framework, avail, integ, conf)).toBe(expectedStatus);
      });
    });
  });

  describe("getFrameworkDescription", () => {
    it("returns appropriate descriptions for known frameworks", () => {
      expect(service.getFrameworkDescription("GDPR")).toContain("European Union");
      expect(service.getFrameworkDescription("HIPAA")).toContain("health");
      expect(service.getFrameworkDescription("ISO 27001")).toContain("information security");
    });

    it("returns a generic description for unknown frameworks", () => {
      expect(service.getFrameworkDescription("Unknown Framework")).toContain("Framework details");
    });
    
    it("provides comprehensive descriptions relevant to business context", () => {
      const pciDescription = service.getFrameworkDescription("PCI DSS");
      expect(pciDescription).toContain("payment");
      expect(pciDescription).toContain("credit card");
      
      const isoDescription = service.getFrameworkDescription("ISO 27001");
      expect(isoDescription).toContain("international standard");
      expect(isoDescription).toContain("information security");
    });
  });

  describe("getFrameworkRequiredLevel", () => {
    it("returns the correct security level for each framework component", () => {
      // Test different frameworks with each component
      expect(service.getFrameworkRequiredLevel("HIPAA", "confidentiality")).toBe("High");
      expect(service.getFrameworkRequiredLevel("HIPAA", "integrity")).toBe("High");
      expect(service.getFrameworkRequiredLevel("HIPAA", "availability")).toBe("High");
      
      expect(service.getFrameworkRequiredLevel("GDPR", "confidentiality")).toBe("High");
      expect(service.getFrameworkRequiredLevel("GDPR", "integrity")).toBe("Moderate");
      expect(service.getFrameworkRequiredLevel("GDPR", "availability")).toBe("Moderate");
      
      expect(service.getFrameworkRequiredLevel("PCI DSS", "confidentiality")).toBe("Very High");
      expect(service.getFrameworkRequiredLevel("PCI DSS", "integrity")).toBe("High");
    });

    it("defaults to 'Moderate' for unknown frameworks", () => {
      expect(service.getFrameworkRequiredLevel("Unknown Framework", "confidentiality")).toBe("Moderate");
      expect(service.getFrameworkRequiredLevel("Unknown Framework", "integrity")).toBe("Moderate");
      expect(service.getFrameworkRequiredLevel("Unknown Framework", "availability")).toBe("Moderate");
    });

    it("handles inconsistent framework name casing", () => {
      // The implementation should be case-insensitive for framework names
      expect(service.getFrameworkRequiredLevel("hipaa", "confidentiality")).toBe("High");
      expect(service.getFrameworkRequiredLevel("GDPR", "confidentiality")).toBe("High");
      expect(service.getFrameworkRequiredLevel("Pci dSS", "confidentiality")).toBe("Very High");
    });
  });

  describe("isFrameworkApplicable", () => {
    it('returns true for industry-specific frameworks', () => {
      // Fix: Match the expected function signature by passing string directly
      expect(service.isFrameworkApplicable('HIPAA', 'healthcare')).toBe(true);
      expect(service.isFrameworkApplicable('PCI DSS', 'finance')).toBe(true);
    });

    it("returns true for region-specific frameworks", () => {
      // Fix: Match the expected function signature for region parameter
      expect(service.isFrameworkApplicable("GDPR", undefined, "EU")).toBe(true);
      expect(service.isFrameworkApplicable("HIPAA", undefined, "US")).toBe(true);
      expect(service.isFrameworkApplicable("UK GDPR", undefined, "UK")).toBe(true);
      expect(service.isFrameworkApplicable("Privacy Act", undefined, "AU")).toBe(true);
    });

    it("returns true for general frameworks regardless of industry/region", () => {
      expect(service.isFrameworkApplicable("ISO 27001")).toBe(true);
      expect(service.isFrameworkApplicable("NIST CSF")).toBe(true);
      expect(service.isFrameworkApplicable("CIS Controls")).toBe(true);
    });

    it("returns false for frameworks not applicable to industry", () => {
      // Fix: Match the expected function signature for industry parameter
      expect(service.isFrameworkApplicable("HIPAA", "finance")).toBe(false);
      expect(service.isFrameworkApplicable("FERPA", "healthcare")).toBe(false);
    });

    it("returns false for frameworks not applicable to region", () => {
      expect(service.isFrameworkApplicable("GDPR", undefined, "US")).toBe(false);
      expect(service.isFrameworkApplicable("CCPA", undefined, "EU")).toBe(false);
    });

    it("handles case insensitivity in parameters", () => {
      expect(service.isFrameworkApplicable("HIPAA", "Healthcare")).toBe(true);
      expect(service.isFrameworkApplicable("gdpr", undefined, "eu")).toBe(true);
    });

    it("validates framework with both industry and region", () => {
      expect(service.isFrameworkApplicable("HIPAA", "healthcare", "US")).toBe(true);
      expect(service.isFrameworkApplicable("GDPR", "retail", "EU")).toBe(true);
      expect(service.isFrameworkApplicable("HIPAA", "healthcare", "EU")).toBe(false);
    });
  });

  describe("createComplianceService", () => {
    it("creates a ComplianceService instance", () => {
      // Replace createComplianceService with the class constructor.
      const service = new ComplianceService(mockDataProvider);
      expect(service).toBeDefined();
    });
  });
});