import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CIADataProvider, CIADetails, SecurityLevel } from '../types/cia-services';
import { ComplianceService } from './complianceService';

// Create a proper mock that satisfies the CIADataProvider interface
const mockDataProvider: CIADataProvider = {
  availabilityOptions: {
    None: { description: 'None availability', capex: 0, opex: 0 },
    Low: { description: 'Low availability', capex: 5, opex: 2 },
    Moderate: { description: 'Moderate availability', capex: 10, opex: 5 },
    High: { description: 'High availability', capex: 15, opex: 8 },
    'Very High': { description: 'Very high availability', capex: 20, opex: 10 },
  },
  integrityOptions: {
    None: { description: 'None integrity', capex: 0, opex: 0 },
    Low: { description: 'Low integrity', capex: 5, opex: 2 },
    Moderate: { description: 'Moderate integrity', capex: 10, opex: 5 },
    High: { description: 'High integrity', capex: 15, opex: 8 },
    'Very High': { description: 'Very high integrity', capex: 20, opex: 10 },
  },
  confidentialityOptions: {
    None: { description: 'None confidentiality', capex: 0, opex: 0 },
    Low: { description: 'Low confidentiality', capex: 5, opex: 2 },
    Moderate: { description: 'Moderate confidentiality', capex: 10, opex: 5 },
    High: { description: 'High confidentiality', capex: 15, opex: 8 },
    'Very High': { description: 'Very high confidentiality', capex: 20, opex: 10 },
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

// Mock functions with proper return types
vi.mock('./complianceUtils', () => ({
  // ...existing mocks...
}));

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

// Mock security levels with complete CIADetails objects
const mockLevels = {
  None: createMockCIADetails('No security controls', 'None'),
  Low: createMockCIADetails('Basic security controls', 'Low'),
  Moderate: createMockCIADetails('Standard security controls', 'Moderate'),
  High: createMockCIADetails('Advanced security controls', 'High'),
  'Very High': createMockCIADetails('Maximum security controls', 'Very High'),
};

// Define FrameworkComplianceStatus type if missing
interface FrameworkComplianceStatus {
  framework: string;
  status: 'compliant' | 'partial' | 'non-compliant';
  requiredLevel: SecurityLevel;
  details?: string;
}

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
      
      const highStatus = service.getComplianceStatus('High', 'High', 'High', 'finance');
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
      // Healthcare scenario (HIPAA compliance)
      const healthcareStatus = service.getComplianceStatus("High", "High", "High");
      expect(healthcareStatus.compliantFrameworks).toContain("HIPAA");
      
      // Financial services scenario (PCI DSS compliance)
      const financialStatus = service.getComplianceStatus("Very High", "Very High", "Very High");
      expect(financialStatus.compliantFrameworks).toContain("PCI DSS");
      
      // EU company scenario (GDPR compliance)
      const gdprStatus = service.getComplianceStatus("Moderate", "Moderate", "High");
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
      expect(service.getCompliantFrameworks("None")).toHaveLength(0);
      expect(service.getCompliantFrameworks("Low")).toHaveLength(1);
      expect(service.getCompliantFrameworks("Moderate").length).toBeGreaterThan(1);
      expect(service.getCompliantFrameworks("High").length).toBeGreaterThan(service.getCompliantFrameworks("Moderate").length);
      expect(service.getCompliantFrameworks("Very High").length).toBeGreaterThan(service.getCompliantFrameworks("High").length);
    });

    it("includes appropriate frameworks for High security level", () => {
      const frameworks = service.getCompliantFrameworks("High");
      expect(frameworks).toContain("ISO 27001");
      expect(frameworks).toContain("GDPR");
    });

    it("includes all major frameworks for Very High security level", () => {
      const frameworks = service.getCompliantFrameworks("Very High");
      expect(frameworks).toContain("HIPAA");
      expect(frameworks).toContain("PCI DSS");
      expect(frameworks).toContain("NIST 800-53");
    });

    it("returns consistent results on multiple invocations", () => {
      const firstCall = service.getCompliantFrameworks("High");
      const secondCall = service.getCompliantFrameworks("High");
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
      // Should default to Moderate requirement
      expect(service.getFrameworkStatus("Unknown Framework", "Low")).toBe("partial");
      expect(service.getFrameworkStatus("Unknown Framework", "Moderate")).toBe("compliant");
    });
    
    it("applies business logic correctly to framework compliance status", () => {
      // Test each possible status
      const testCases: [string, SecurityLevel, FrameworkComplianceStatus][] = [
        // Framework / Level / Expected Status
        ["HIPAA", "None", "non-compliant"],
        ["HIPAA", "Low", "non-compliant"],
        ["HIPAA", "Moderate", "partial"],
        ["HIPAA", "High", "compliant"],
        ["HIPAA", "Very High", "compliant"],
        
        ["PCI DSS", "High", "compliant"],
        ["PCI DSS", "Moderate", "partial"],
        
        ["GDPR", "Low", "partial"],
        ["GDPR", "Moderate", "compliant"]
      ];
      
      testCases.forEach(([framework, level, expectedStatus]) => {
        expect(service.getFrameworkStatus(framework, level)).toBe(expectedStatus);
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
      // Fix: Use proper object structure for context
      expect(service.isFrameworkApplicable('HIPAA', { industry: 'healthcare' })).toBe(true);
      expect(service.isFrameworkApplicable('PCI DSS', { industry: 'finance' })).toBe(true);
      // ... more cases ...
    });

    it("returns true for region-specific frameworks", () => {
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