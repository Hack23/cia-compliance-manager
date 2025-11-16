import { StatusType } from "../types/common/StatusTypes";

/**
 * Converts a risk level string to a status badge variant
 *
 * @param level - The risk level string (e.g., "Low Risk", "High Risk")
 * @returns The corresponding StatusType for the badge
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
 * @param risk - The risk level string
 * @returns Tailwind CSS class string for text color
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
 * @param complianceScore - The compliance score (0-100)
 * @returns Human-readable compliance status text
 */
export function getComplianceStatusText(complianceScore: number): string {
  if (complianceScore >= 80) return "Strong compliance position";
  if (complianceScore >= 50) return "Moderate compliance position";
  return "Compliance gaps detected";
}
