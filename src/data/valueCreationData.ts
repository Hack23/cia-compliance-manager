import { SecurityLevel } from "../types/cia";
import { ROIEstimate } from "../types/cia-services";
import { ROI_ESTIMATES } from "./ciaOptionsData";

/**
 * Mapping of value creation points by security level
 */
export const valueCreationPoints: Record<SecurityLevel, string[]> = {
  "None": [
    "No security controls implemented",
    "Maximum risk exposure",
    "No compliance coverage",
    "No protection against threats"
  ],
  "Low": [
    "Basic security requirements met",
    "Reduced risk exposure for common threats",
    "Minimal compliance coverage",
    "Essential security awareness"
  ],
  "Moderate": [
    "Standard industry practices implemented",
    "Balanced security and usability",
    "Meets most regulatory requirements",
    "Good protection against common threats",
    "Regular security assessment process"
  ],
  "High": [
    "Advanced security controls in place",
    "Comprehensive risk mitigation",
    "Robust compliance coverage",
    "Protection against sophisticated threats",
    "Regular security testing and validation",
    "Strong incident response capabilities"
  ],
  "Very High": [
    "Maximum security protection",
    "Enterprise-grade security architecture",
    "Comprehensive compliance coverage",
    "Protection against advanced persistent threats",
    "Continuous security monitoring and improvement",
    "Robust disaster recovery capabilities",
    "Regular penetration testing and vulnerability scanning"
  ]
};

/**
 * Mapping of value creation titles by security level
 */
export const valueCreationTitles: Record<SecurityLevel, string> = {
  "None": "No Security Investment",
  "Low": "Basic Security Foundation",
  "Moderate": "Standard Security Protection",
  "High": "Advanced Security Framework",
  "Very High": "Enterprise-Grade Security"
};

/**
 * Get ROI estimate for a specific security level
 * 
 * @param level - Security level to get ROI estimate for
 * @returns ROI estimate object
 */
export function getROIEstimateForLevel(level: SecurityLevel): ROIEstimate {
  // Map the level to the corresponding ROI estimate key
  const levelToKeyMap: Record<SecurityLevel, keyof typeof ROI_ESTIMATES> = {
    "None": "NONE",
    "Low": "LOW",
    "Moderate": "MODERATE",
    "High": "HIGH",
    "Very High": "VERY_HIGH"
  };
  
  const key = levelToKeyMap[level];
  return ROI_ESTIMATES[key];
}
