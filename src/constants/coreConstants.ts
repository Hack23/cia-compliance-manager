import { SecurityLevel } from "../types/cia"; // Remove unused CIAOptions import

// Widget Icons - For consistent icon use across the application
export const WIDGET_ICONS = {
  SECURITY_LEVEL: "🛡️",
  SECURITY_SUMMARY: "🔐",
  SECURITY_VISUALIZATION: "📊",
  COMPLIANCE_STATUS: "⚖️",
  VALUE_CREATION: "💰",
  COST_ESTIMATION: "💲",
  BUSINESS_IMPACT: "💼",
  TECHNICAL_IMPLEMENTATION: "⚙️",
  AVAILABILITY_IMPACT: "⏱️",
  INTEGRITY_IMPACT: "✓",
  CONFIDENTIALITY_IMPACT: "🔒",
  SECURITY_RESOURCES: "📚",
  CIA_IMPACT_SUMMARY: "🧩",
  TECHNICAL_DETAILS: "⚙️",
};

// CIA Component Icons and Labels
export const CIA_COMPONENT_ICONS = {
  AVAILABILITY: "⏱️",
  INTEGRITY: "✓",
  CONFIDENTIALITY: "🔒",
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
export const SECURITY_LEVELS: Record<string, SecurityLevel> = {
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
  SECURITY_VISUALIZATION: "Security Visualization",
  COMPLIANCE_STATUS: "Compliance Status",
  VALUE_CREATION: "Business Value & ROI",
  COST_ESTIMATION: "Cost Estimation",
  BUSINESS_IMPACT: "Business Impact Analysis",
  TECHNICAL_IMPLEMENTATION: "Technical Implementation",
  SECURITY_PROFILE: "CIA Security Profile",
  SECURITY_RESOURCES: "Security Resources",
  AVAILABILITY_IMPACT: "Availability Impact",
  INTEGRITY_IMPACT: "Integrity Impact",
  CONFIDENTIALITY_IMPACT: "Confidentiality Impact",
  CIA_IMPACT_SUMMARY: "CIA Impact Summary",
  TECHNICAL_DETAILS: "Technical Details",
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
  SOC2: "SOC 2 Type 2",
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

/**
 * CIA component information
 */
export const CIA_COMPONENT_INFO = {
  CONFIDENTIALITY: {
    NAME: "Confidentiality",
    DESCRIPTION: "Protection against unauthorized disclosure of data",
    ICON: "🔒",
    COLOR: "#8e44ad", // Purple
  },
  INTEGRITY: {
    NAME: "Integrity",
    DESCRIPTION: "Protection against unauthorized modification of data",
    ICON: "✓",
    COLOR: "#27ae60", // Green
  },
  AVAILABILITY: {
    NAME: "Availability",
    DESCRIPTION: "Accessibility and uptime of systems and data",
    ICON: "⏱️",
    COLOR: "#2980b9", // Blue
  },
};

/**
 * CIA component colors
 */
export const CIA_COMPONENT_COLORS = {
  CONFIDENTIALITY: {
    PRIMARY: CIA_COMPONENT_INFO.CONFIDENTIALITY.COLOR,
    LIGHT: "#d6b8e8", // Light purple
    DARK: "#6c3483", // Dark purple
  },
  INTEGRITY: {
    PRIMARY: CIA_COMPONENT_INFO.INTEGRITY.COLOR,
    LIGHT: "#a9dfbf", // Light green
    DARK: "#1e8449", // Dark green
  },
  AVAILABILITY: {
    PRIMARY: CIA_COMPONENT_INFO.AVAILABILITY.COLOR,
    LIGHT: "#aed6f1", // Light blue
    DARK: "#1a5276", // Dark blue
  },
};

/**
 * Component level mapping
 */
export const COMPONENT_LEVEL_MAPPING = {
  NONE: 0,
  LOW: 1,
  MODERATE: 2,
  HIGH: 3,
  VERY_HIGH: 4,
};

/**
 * Security level labels for display
 */
export const SECURITY_LEVEL_LABELS = {
  NONE: "None",
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  VERY_HIGH: "Very High",
};

/**
 * Core constants used across the application
 */

/**
 * Application metadata
 */
export const APP_INFO = {
  NAME: "CIA Compliance Manager",
  VERSION: "1.0.0",
  DESCRIPTION:
    "Security assessment and compliance management tool for CIA triad analysis",
  AUTHOR: "Security Team",
};

/**
 * Default language for the application
 */
export const DEFAULT_LANGUAGE = "en-US";

/**
 * Application features configuration
 */
export const FEATURES = {
  DARK_MODE: true,
  MULTI_LANGUAGE: false,
  ANALYTICS: false,
  EXPORT_TO_PDF: false,
  EXPORT_TO_CSV: false,
  PRINT_REPORTS: false,
  LOCAL_STORAGE: true,
};

/**
 * Default settings for the application
 */
export const DEFAULT_SETTINGS = {
  THEME: "light",
  LANGUAGE: DEFAULT_LANGUAGE,
  SHOW_DETAILED_DESCRIPTIONS: true,
  SHOW_TECHNICAL_DETAILS: true,
  SHOW_BUSINESS_IMPACT: true,
  SAVE_STATE_LOCALLY: true,
};

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  SETTINGS: "cia-manager-settings",
  SELECTED_LEVELS: "cia-manager-levels",
  LAST_VISIT: "cia-manager-last-visit",
};

/**
 * Routes configuration
 */
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  SETTINGS: "/settings",
  ASSESSMENT: "/assessment",
  COMPLIANCE: "/compliance",
  TECHNICAL: "/technical",
  BUSINESS: "/business",
};

/**
 * Application events
 */
export const EVENTS = {
  LEVEL_CHANGED: "cia-level-changed",
  SETTINGS_CHANGED: "cia-settings-changed",
  DATA_LOADED: "cia-data-loaded",
  ERROR_OCCURRED: "cia-error-occurred",
};

/**
 * API configuration for external services
 */
export const API_CONFIG = {
  BASE_URL: "/api",
  TIMEOUT: 5000,
  RETRY_ATTEMPTS: 2,
  CACHE_DURATION: 3600, // 1 hour
};

/**
 * Component names used for debugging and logging
 */
export const COMPONENT_NAMES = {
  SECURITY_LEVEL_WIDGET: "SecurityLevelWidget",
  BUSINESS_IMPACT_WIDGET: "BusinessImpactWidget",
  COMPLIANCE_STATUS_WIDGET: "ComplianceStatusWidget",
  COST_ESTIMATION_WIDGET: "CostEstimationWidget",
  VALUE_CREATION_WIDGET: "ValueCreationWidget",
  TECHNICAL_DETAILS_WIDGET: "TechnicalDetailsWidget",
  SECURITY_SUMMARY_WIDGET: "SecuritySummaryWidget",
};

/**
 * Logging levels
 */
export const LOG_LEVELS = {
  DEBUG: "debug",
  INFO: "info",
  WARN: "warn",
  ERROR: "error",
};

/**
 * Default data refresh interval in milliseconds
 */
export const DEFAULT_REFRESH_INTERVAL = 60000; // 1 minute
