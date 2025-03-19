import { SecurityLevel } from "./cia";

/**
 * Framework compliance status
 */
export type FrameworkComplianceStatus = "compliant" | "partial" | "non-compliant";

/**
 * Structure for compliance framework
 */
export interface ComplianceFramework {
  id?: string;
  name: string;
  status: string | FrameworkComplianceStatus;
  description?: string;
  requiredLevels?: {
    availability?: SecurityLevel;
    integrity?: SecurityLevel;
    confidentiality?: SecurityLevel;
  };
}

/**
 * Structure for compliance status response
 */
export interface ComplianceStatus {
  /** Overall compliance status description */
  status: string;
  /** Optional display label (for UI purposes) */
  label?: string;
  /** List of frameworks that are fully compliant */
  compliantFrameworks: Array<string | ComplianceFramework>;
  /** List of frameworks that are partially compliant */
  partiallyCompliantFrameworks: Array<string | ComplianceFramework>;
  /** List of frameworks that are non-compliant */
  nonCompliantFrameworks: Array<string | ComplianceFramework>;
  /** Actionable steps to remediate compliance gaps */
  remediationSteps?: string[];
  /** Requirements from relevant compliance frameworks */
  requirements?: string[];
  /** Compliance score as a percentage (0-100) */
  complianceScore: number;
}

/**
 * Industry or region specific applicability options
 */
export interface FrameworkApplicabilityOptions {
  industry?: string;
  region?: string;
}
