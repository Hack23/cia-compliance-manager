import { CIAComponentType } from "../types/cia-services";

/**
 * UI-related constants for the application
 */

/** Widget icons using emoji characters */
export const WIDGET_ICONS = {
  SECURITY_LEVEL: "🛡️",
  SECURITY_SUMMARY: "📊",
  SECURITY_VISUALIZATION: "📈",
  COMPLIANCE_STATUS: "✅",
  VALUE_CREATION: "💹",
  COST_ESTIMATION: "💰",
  BUSINESS_IMPACT: "🏢",
  TECHNICAL_IMPLEMENTATION: "⚙️",
  AVAILABILITY_IMPACT: "⏱️",
  INTEGRITY_IMPACT: "🔐",
  CONFIDENTIALITY_IMPACT: "🔒",
  SECURITY_RESOURCES: "📚",
};

/**
 * Icons for business impact categories
 */
export const BUSINESS_IMPACT_ICONS = {
  financial: "💰",
  operational: "⚙️",
  reputational: "👥",
  regulatory: "📜",
  strategic: "🎯",
};

/**
 * Icons for CIA components
 */
export const CIA_COMPONENT_ICONS: Record<CIAComponentType, string> = {
  availability: "⏱️",
  integrity: "✓",
  confidentiality: "🔒",
};

/**
 * Icons for security-related concepts
 */
export const SECURITY_ICONS = {
  risk: "⚠️",
  recommendation: "💡",
  compliance: "📋",
  riskLevel: "🔍",
  security: "🔐",
  score: "📊",
  details: "ℹ️",
  implementation: "🛠️",
  value: "💎",
  cost: "💲",
  time: "⏰",
  effort: "📈",
};

/**
 * Get icon for a specific CIA component
 *
 * @param component - The CIA component
 * @returns The appropriate icon
 */
export function getComponentIcon(component: CIAComponentType): string {
  return CIA_COMPONENT_ICONS[component] || "🔵";
}

/**
 * Get icon for a business impact category
 *
 * @param category - The business impact category
 * @returns The appropriate icon
 */
export function getBusinessImpactIcon(category: string): string {
  const normalizedCategory = category.toLowerCase();

  const icons = BUSINESS_IMPACT_ICONS as Record<string, string>;

  return icons[normalizedCategory] || "📊";
}

/**
 * Get icon for a security concept
 *
 * @param concept - The security concept
 * @returns The appropriate icon
 */
export function getSecurityIcon(concept: string): string {
  const normalizedConcept = concept.toLowerCase();

  const icons = SECURITY_ICONS as Record<string, string>;

  return icons[normalizedConcept] || "🔷";
}

/**
 * Color mapping for security levels
 */
export const SECURITY_LEVEL_COLORS = {
  NONE: "#e74c3c",
  LOW: "#f39c12",
  MODERATE: "#3498db",
  HIGH: "#2ecc71",
  VERY_HIGH: "#9b59b6",
};

/**
 * UI display limits for compact layouts
 */
export const UI_DISPLAY_LIMITS = {
  /** Maximum number of metrics to display in preview */
  MAX_PREVIEW_METRICS: 4,
  /** Maximum number of gaps to display in compact view */
  MAX_DISPLAYED_GAPS: 3,
};
