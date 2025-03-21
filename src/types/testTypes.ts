// Test-specific type definitions
import { CIAComponent, SecurityLevel } from "./cia";

// Type for mock options creation
export interface MockOptions {
  description: string;
  technical: string;
  impact?: string;
  capex: number;
  opex: number;
  bg?: string;
  text?: string;
  recommendations?: string[];
}

// Type for mock handlers
export interface MockHandlers {
  setAvailability: (level: SecurityLevel) => void;
  setIntegrity: (level: SecurityLevel) => void;
  setConfidentiality: (level: SecurityLevel) => void;
}

// Type for test wrapper components
export interface TestWrapperProps {
  children: React.ReactNode;
}

// Type for test data
export interface TestData {
  securityLevels: Record<string, string>;
  descriptions: Record<string, string>;
  options: Record<string, any>;
}

/**
 * Test utility types for CIA Compliance Manager
 *
 * These types are used exclusively for testing purposes and
 * should not be used in production code.
 */

/**
 * Simple test data structure for security levels
 */
export interface TestSecurityData {
  level: SecurityLevel;
  component: CIAComponent;
  score?: number;
  description?: string;
}

/**
 * Test mock structure for security assessment results
 */
export interface TestAssessmentResult {
  id: string;
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  overallScore: number;
  complianceStatus: "compliant" | "partial" | "non-compliant";
  riskLevel: "Critical" | "High" | "Medium" | "Low" | "Minimal";
  timestamp?: string;
}

/**
 * Options for test data generation
 */
export interface TestDataOptions {
  includeTimestamps?: boolean;
  includeDescriptions?: boolean;
  randomizeScores?: boolean;
  fixedSecurityLevel?: SecurityLevel;
}
