import { SecurityLevel } from "../types/cia";

/**
 * Value creation points by security level
 *
 * ## Business Perspective
 *
 * These data points articulate the business value delivered by different
 * security levels, helping organizations understand the benefits beyond
 * just risk reduction. 📈
 */
export const valueCreationPoints: Record<SecurityLevel, string[]> = {
  None: [
    "No security value creation",
    "Maximum exposure to security risks",
    "No protection for business assets or data",
    "Non-compliance with regulatory requirements",
    "Significant business risk with no mitigation",
  ],
  Low: [
    "Basic security foundation established",
    "Minimal protection against common threats",
    "Some risk reduction for non-critical systems",
    "First step toward regulatory compliance",
    "Limited business enablement for non-sensitive operations",
  ],
  Moderate: [
    "Standard security posture established",
    "Balanced protection for business operations",
    "Meets basic requirements for most business activities",
    "Enables operations in moderately regulated environments",
    "Reasonable risk management for business continuity",
  ],
  High: [
    "Strong security posture that enables business confidence",
    "Robust protection for sensitive data and operations",
    "Supports expansion into regulated industries",
    "Enhances reputation with security-conscious customers",
    "Significant risk reduction with measurable business value",
  ],
  "Very High": [
    "Maximum security enabling operations in highly regulated environments",
    "Comprehensive protection for critical business assets",
    "Competitive advantage through superior security capabilities",
    "Strategic enabler for high-value and high-risk business activities",
    "Meets the most stringent customer and regulatory requirements",
  ],
};

/**
 * Value creation titles by security level
 *
 * ## Business Perspective
 *
 * These titles provide a quick reference to the value delivered by each
 * security level, helping stakeholders understand the impact at a glance.
 */
export const valueCreationTitles: Record<SecurityLevel, string> = {
  None: "No Security Value",
  Low: "Basic Security Value",
  Moderate: "Standard Security Value",
  High: "Enhanced Security Value",
  "Very High": "Maximum Security Value",
};

/**
 * Get ROI estimates based on security level
 *
 * ## Business Perspective
 *
 * These ROI estimates help organizations quantify the financial benefits
 * of investing in different security levels, supporting informed decision-making.
 */
export function getROIEstimateForLevel(level: SecurityLevel): {
  value: string;
  description: string;
  returnRate: string;
} {
  switch (level) {
    case "Very High":
      return {
        value: "500%",
        description: "Maximum ROI with comprehensive security implementation",
        returnRate: "5x",
      };
    case "High":
      return {
        value: "350%",
        description: "Strong ROI with robust security controls",
        returnRate: "3.5x",
      };
    case "Moderate":
      return {
        value: "200%",
        description: "Good ROI with balanced security measures",
        returnRate: "2x",
      };
    case "Low":
      return {
        value: "50%",
        description: "Limited ROI with basic security controls",
        returnRate: "0.5x",
      };
    case "None":
    default:
      return {
        value: "0%",
        description: "No ROI without security investment",
        returnRate: "0x",
      };
  }
}
