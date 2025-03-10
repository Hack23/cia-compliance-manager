import { SecurityLevel } from "../types/cia";

// Widget Icons - For consistent icon use across the application
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

// CIA Component Icons and Labels
export const CIA_COMPONENT_ICONS = {
  AVAILABILITY: "⏱️",
  INTEGRITY: "🔐",
  CONFIDENTIALITY: "🔏",
};

export const CIA_LABELS = {
  AVAILABILITY: "Availability",
  INTEGRITY: "Integrity",
  CONFIDENTIALITY: "Confidentiality",
};

// Security level color scheme
export const SECURITY_LEVEL_COLORS = {
  NONE: "#e74c3c", // Red
  LOW: "#f39c12", // Orange
  MODERATE: "#f1c40f", // Yellow
  HIGH: "#2ecc71", // Green
  VERY_HIGH: "#3498db", // Blue
};

// Security Levels
export const SECURITY_LEVELS = {
  NONE: "None",
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  VERY_HIGH: "Very High",
};

// Widget Titles
export const WIDGET_TITLES = {
  SECURITY_LEVEL: "Security Level Selection",
  SECURITY_SUMMARY: "Security Summary",
  SECURITY_VISUALIZATION: "Security Profile Visualization",
  COMPLIANCE_STATUS: "Compliance Status",
  VALUE_CREATION: "Value Creation",
  COST_ESTIMATION: "Cost Estimation",
  BUSINESS_IMPACT: "Business Impact Analysis",
  TECHNICAL_IMPLEMENTATION: "Technical Implementation",
  SECURITY_PROFILE: "CIA Security Profile",
  SECURITY_RESOURCES: "Security Resources",
  // Add these missing properties:
  AVAILABILITY_IMPACT: "Availability Impact",
  INTEGRITY_IMPACT: "Integrity Impact",
  CONFIDENTIALITY_IMPACT: "Confidentiality Impact",
};

// Implementation details
export const IMPLEMENTATION_COSTS: Record<
  SecurityLevel,
  {
    developmentEffort: string;
    maintenance: string;
    expertise: string;
  }
> = {
  None: {
    developmentEffort: "Minimal",
    maintenance: "None",
    expertise: "Basic",
  },
  Low: {
    developmentEffort: "Days",
    maintenance: "Monthly checks",
    expertise: "Junior",
  },
  Moderate: {
    developmentEffort: "Weeks",
    maintenance: "Weekly checks",
    expertise: "Mid-level",
  },
  High: {
    developmentEffort: "1-2 Months",
    maintenance: "Daily monitoring",
    expertise: "Senior",
  },
  "Very High": {
    developmentEffort: "2-6 Months",
    maintenance: "Continuous monitoring",
    expertise: "Expert",
  },
};

// UI Text constants for labels
export const UI_TEXT = {
  // Common UI labels
  LABELS: {
    BUSINESS_IMPACT: "Business Impact:",
    RECOMMENDATION: "Recommendation:",
    ESTIMATED_COST: "Estimated Implementation Cost",
    CAPEX: "CAPEX:",
    OPEX: "OPEX:",
    COST_ANALYSIS: "Cost Analysis",
    BUSINESS_VALUE: "Business value derived from this security profile:",
    ESTIMATED_ROI: "Estimated ROI:",
    SECURITY_PROFILE: "Security Profile",
    CURRENT_PROFILE: "Current Profile",
  },

  // Budget related text
  BUDGET: {
    IT_BUDGET_CAPEX: "of IT budget as one-time capital expenditure",
    IT_BUDGET_OPEX: "of IT budget as annual operational expenses",
  },

  // Value creation titles
  VALUE_CREATION: {
    NONE_TITLE: "No Value Creation",
    WITH_LEVEL: (level: string) => `${level} Value Creation`,
  },

  // Add WIDGET_TITLES
  WIDGET_TITLES: WIDGET_TITLES, // Reference the already defined WIDGET_TITLES constant
};

// Security level type helpers
export type SecurityLevelKey =
  | "NONE"
  | "LOW"
  | "MODERATE"
  | "HIGH"
  | "VERY_HIGH";
export type SecurityLevelMap<T> = Record<SecurityLevelKey, T>;

// Framework names
export const COMPLIANCE_FRAMEWORKS = {
  SOC2: "SOC 2 Type 1",
  ISO27001: "ISO 27001",
  PCI_DSS: "PCI DSS",
  HIPAA: "HIPAA",
  NIST: "NIST 800-53 High",
};

// Compliance Status Text
export const COMPLIANCE_STATUS = {
  NON_COMPLIANT: "Non-Compliant",
  BASIC_COMPLIANCE: "Meets basic compliance only",
  STANDARD_COMPLIANCE: "Compliant with standard frameworks",
  FULL_COMPLIANCE: "Compliant with all major frameworks",
};

// Add this export if it's defined in this file
export const SECURITY_DESCRIPTIONS = {
  NONE: "No security controls implemented.",
  LOW: "Basic protection with minimal controls and manual processes.",
  MODERATE:
    "Balanced protection with automated recovery, validation checks, and standard encryption.",
  HIGH: "Robust protection with minimal single points of failure, blockchain validation, and strong encryption.",
  VERY_HIGH:
    "Maximum protection with quantum-safe encryption, multi-site redundancy, and real-time validation.",
};
