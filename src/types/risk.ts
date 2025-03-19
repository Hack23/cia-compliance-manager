/**
 * Risk level types for the application
 * 
 * ## Business Perspective
 * 
 * These type definitions ensure consistent representation of risk across
 * the application, supporting reliable risk assessment, visualization,
 * and business impact analysis. 📊
 */

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

// Add this import at the top
import { SecurityLevel } from "./cia";
