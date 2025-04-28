/**
 * Literal types for risk levels
 */
export type RiskLevelLiteral =
  | "Critical"
  | "High"
  | "Medium"
  | "Low"
  | "Minimal"
  | "Unknown";

/**
 * Comprehensive risk level interface
 */
export interface RiskLevel {
  level: RiskLevelLiteral;
  description: string;
  value: number;
  color?: string;
  badge?: string;
}
