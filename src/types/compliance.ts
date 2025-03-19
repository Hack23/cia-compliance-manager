import { SecurityLevel } from "./cia";

/**
 * Status of a framework's compliance
 */
export type FrameworkComplianceStatus = "compliant" | "partial" | "non-compliant";

/**
 * Compliance framework object structure
 */
export interface ComplianceFramework {
  id?: string;
  name: string;
  status: FrameworkComplianceStatus | string;
  description?: string;
  requiredLevel?: Record<string, SecurityLevel>;
}

/**
 * Compliance status response interface
 */
export interface ComplianceStatus {
  status: string;
  label?: string;
  complianceScore: number;
  compliantFrameworks: Array<string | ComplianceFramework>;
  partiallyCompliantFrameworks: Array<string | ComplianceFramework>;
  nonCompliantFrameworks: Array<string | ComplianceFramework>;
  remediationSteps?: string[];
  requirements?: string[];
}
