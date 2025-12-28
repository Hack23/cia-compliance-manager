import { StatusType } from "../types/common/StatusTypes";

/**
 * Status utility functions for badge variants and styling
 * 
 * Provides consistent status-to-style mapping for badges, alerts, and
 * visual indicators throughout the application. Ensures uniform color
 * representation of risk levels and compliance status.
 * 
 * @example
 * ```typescript
 * import { getStatusVariant, getRiskColorClass } from './statusUtils';
 * 
 * // Get badge variant
 * const variant = getStatusVariant('high'); // 'success'
 * 
 * // Get risk color class
 * const colorClass = getRiskColorClass('High Risk'); // 'text-orange-600 dark:text-orange-400'
 * ```
 */

/**
 * Converts a risk level string to a status badge variant
 * 
 * Maps security levels to appropriate badge variants for consistent
 * visual representation. Uses color-coded variants that align with
 * security posture intuition (green=secure, red=insecure).
 *
 * @param level - The risk level string (e.g., "Low Risk", "High Risk")
 * @returns The corresponding StatusType for the badge
 * 
 * @example
 * ```typescript
 * getStatusVariant('none')       // 'error' (red - critical)
 * getStatusVariant('low')        // 'warning' (yellow)
 * getStatusVariant('moderate')   // 'info' (blue)
 * getStatusVariant('high')       // 'success' (green)
 * getStatusVariant('very high')  // 'purple' (premium)
 * getStatusVariant('unknown')    // 'neutral' (gray)
 * 
 * // Usage in component
 * <StatusBadge variant={getStatusVariant(securityLevel)}>
 *   {securityLevel}
 * </StatusBadge>
 * ```
 */
export function getStatusVariant(level: string): StatusType {
  const normalizedLevel = level.toLowerCase();
  if (normalizedLevel === "none") return "error";
  if (normalizedLevel === "low") return "warning";
  if (normalizedLevel === "moderate") return "info";
  if (normalizedLevel === "high") return "success";
  if (normalizedLevel === "very high") return "purple";
  return "neutral";
}

/**
 * Gets the appropriate Tailwind CSS color class for a risk level
 * 
 * Provides Tailwind CSS color classes for risk level text styling with
 * dark mode support. Colors semantically represent risk severity using
 * industry-standard color conventions.
 *
 * @param risk - The risk level string (e.g., "Low Risk", "Critical Risk")
 * @returns Tailwind CSS class string for text color with dark mode support
 * 
 * @example
 * ```typescript
 * getRiskColorClass('Low Risk')      // 'text-green-600 dark:text-green-400'
 * getRiskColorClass('Medium Risk')   // 'text-yellow-600 dark:text-yellow-400'
 * getRiskColorClass('High Risk')     // 'text-orange-600 dark:text-orange-400'
 * getRiskColorClass('Critical Risk') // 'text-red-600 dark:text-red-400'
 * getRiskColorClass('Unknown')       // 'text-gray-600 dark:text-gray-400'
 * 
 * // Usage in component
 * <span className={getRiskColorClass(riskLevel)}>
 *   Risk Level: {riskLevel}
 * </span>
 * ```
 */
export function getRiskColorClass(risk: string): string {
  if (risk.includes("Low")) return "text-green-600 dark:text-green-400";
  if (risk.includes("Medium")) return "text-yellow-600 dark:text-yellow-400";
  if (risk.includes("High")) return "text-orange-600 dark:text-orange-400";
  if (risk.includes("Critical")) return "text-red-600 dark:text-red-400";
  return "text-gray-600 dark:text-gray-400";
}

/**
 * Gets compliance status text based on compliance score
 * 
 * Translates numeric compliance scores into human-readable status messages
 * for executives and stakeholders. Uses industry-standard thresholds for
 * compliance categorization.
 *
 * @param complianceScore - The compliance score percentage (0-100)
 * @returns Human-readable compliance status text
 * 
 * @example
 * ```typescript
 * getComplianceStatusText(95)  // 'Strong compliance position'
 * getComplianceStatusText(80)  // 'Strong compliance position'
 * getComplianceStatusText(65)  // 'Moderate compliance position'
 * getComplianceStatusText(50)  // 'Moderate compliance position'
 * getComplianceStatusText(30)  // 'Compliance gaps detected'
 * getComplianceStatusText(0)   // 'Compliance gaps detected'
 * 
 * // Usage in dashboard
 * const score = calculateComplianceScore();
 * const status = getComplianceStatusText(score);
 * <ComplianceCard score={score} status={status} />
 * ```
 */
export function getComplianceStatusText(complianceScore: number): string {
  if (complianceScore >= 80) return "Strong compliance position";
  if (complianceScore >= 50) return "Moderate compliance position";
  return "Compliance gaps detected";
}
