import { SecurityLevel } from "./cia";

/**
 * Risk-related type definitions
 * 
 * ## Business Perspective
 * 
 * These types provide a structured way to represent and evaluate security risks,
 * supporting consistent risk assessment and communication across the application. ⚠️
 * 
 * Well-defined risk types enable organizations to make informed security decisions
 * based on standardized risk criteria.
 */

/**
 * Risk level identifiers
 */
export type RiskLevel =
  | "Critical"
  | "Critical Risk"
  | "High"
  | "High Risk"
  | "Medium"
  | "Medium Risk"
  | "Low"
  | "Low Risk"
  | "Minimal"
  | "Minimal Risk"
  | "Unknown"
  | "Unknown Risk";

/**
 * Risk assessment details
 */
export interface RiskAssessment {
  level: RiskLevel;
  score?: number;
  description: string;
  mitigationRecommendations?: string[];
  businessImpact?: string;
  likelihoodScore?: number;
  impactScore?: number;
}

/**
 * Risk matrix cell
 */
export interface RiskMatrixCell {
  likelihood: number;
  impact: number;
  level: RiskLevel;
  color: string;
}

/**
 * Risk matrix configuration
 */
export interface RiskMatrix {
  rows: number;
  columns: number;
  cells: RiskMatrixCell[];
}

/**
 * Risk treatment action
 */
export type RiskTreatmentAction =
  | "Accept"
  | "Mitigate"
  | "Transfer"
  | "Avoid"
  | "Monitor";

/**
 * Risk treatment plan
 */
export interface RiskTreatmentPlan {
  action: RiskTreatmentAction;
  description: string;
  responsibleParty?: string;
  dueDate?: Date;
  status?: "Not Started" | "In Progress" | "Completed" | "Overdue";
}

/**
 * Risk level string literals
 */
export type RiskLevelLiteral = "Critical" | "High" | "Medium" | "Moderate" | "Low" | "Minimal" | "Unknown";

/**
 * Risk level numeric values for calculations (0-4, higher = more risk)
 */
export interface RiskLevelValue {
  Critical: 4;
  High: 3;
  Medium: 2;
  Moderate: 2;
  Low: 1;
  Minimal: 0;
  Unknown: 0;
}

/**
 * Mapping between security levels and risk levels
 */
export const SECURITY_TO_RISK_MAPPING: Record<SecurityLevel, RiskLevelLiteral> = {
  "None": "Critical",
  "Low": "High",
  "Moderate": "Medium",
  "High": "Low",
  "Very High": "Minimal"
};
