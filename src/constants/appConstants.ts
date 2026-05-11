import { SecurityLevel } from "../types/cia";
import { BUSINESS_IMPACT_CATEGORIES, RISK_LEVELS } from "./riskConstants";
import { CIADetails } from "../types/cia-services";
import { getComponentIcon, UI_DISPLAY_LIMITS } from "./uiConstants";

export { BUSINESS_IMPACT_CATEGORIES, RISK_LEVELS, UI_DISPLAY_LIMITS };

/** Type for security level constant keys */
export type SecurityLevelKey =
  | "NONE"
  | "LOW"
  | "MODERATE"
  | "HIGH"
  | "VERY_HIGH";

/** Generic map type indexed by security level keys */
export type SecurityLevelMap<T> = Record<SecurityLevelKey, T>;

/**
 * Maps CIA option values to constants with consistent naming (NONE, LOW, etc.)
 * Modified version to avoid circular dependencies
 */
export const mapOptionsToConstants = <
  T extends keyof CIADetails,
  R = CIADetails[T]
>(
  options: Record<string, CIADetails>,
  key: T,
  transform?: (value: CIADetails[T], level: string) => R
) => {
  if (!options) {
    return {
      NONE: undefined,
      LOW: undefined,
      MODERATE: undefined,
      HIGH: undefined,
      VERY_HIGH: undefined,
    };
  }

  return {
    NONE:
      options.None &&
      (transform ? transform(options.None[key], "None") : options.None[key]),
    LOW:
      options.Low &&
      (transform ? transform(options.Low[key], "Low") : options.Low[key]),
    MODERATE:
      options.Moderate &&
      (transform
        ? transform(options.Moderate[key], "Moderate")
        : options.Moderate[key]),
    HIGH:
      options.High &&
      (transform ? transform(options.High[key], "High") : options.High[key]),
    VERY_HIGH:
      options["Very High"] &&
      (transform
        ? transform(options["Very High"][key], "Very High")
        : options["Very High"][key]),
  };
};

/** Maps constant keys to SecurityLevel display values */
export const SECURITY_LEVELS: Record<SecurityLevelKey, SecurityLevel> = {
  NONE: "None",
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  VERY_HIGH: "Very High",
};

/** CIA component display labels */
export const CIA_LABELS = {
  AVAILABILITY: "Availability",
  INTEGRITY: "Integrity",
  CONFIDENTIALITY: "Confidentiality",
};

/** CIA component tooltip descriptions */
export const CIA_DESCRIPTIONS = {
  CONFIDENTIALITY: "Controls who can access your data and systems",
  INTEGRITY: "Ensures data remains accurate and unaltered",
  AVAILABILITY: "Determines how reliably your systems can be accessed",
};

/** Compliance status display text */
export const COMPLIANCE_STATUS = {
  NON_COMPLIANT: "Non-Compliant",
  BASIC_COMPLIANCE: "Meets basic compliance only",
  STANDARD_COMPLIANCE: "Compliant with standard frameworks",
  FULL_COMPLIANCE: "Compliant with all major frameworks",
};

/** Security recommendations for each level */
export const SECURITY_RECOMMENDATIONS = {
  NONE: "Not recommended for any production system. Implement basic security controls immediately.",
  LOW: "Only appropriate for non-critical systems with public information.",
  MODERATE:
    "Suitable for internal business systems with some regulatory requirements.",
  HIGH: "Appropriate for systems handling sensitive customer data or financial information.",
  VERY_HIGH:
    "Suitable for mission-critical systems handling top secret information.",
  BASIC: "Only appropriate for non-critical systems with public information.",
};

/** Framework descriptions */
export const FRAMEWORK_DESCRIPTIONS = {
  SOC2: "Requires basic security controls across CIA triad",
  ISO27001: "Requires moderate security controls and management system",
  PCI_DSS: "Emphasis on strong confidentiality controls",
  HIPAA: "Requires protection of healthcare information",
  NIST: "High security controls for federal information systems",
};

/** Security level descriptions */
export const SECURITY_DESCRIPTIONS = {
  NONE: "No security controls implemented.",
  LOW: "Basic protection with minimal controls and manual processes.",
  MODERATE:
    "Balanced protection with automated recovery, validation checks, and standard encryption.",
  HIGH: "Robust protection with minimal single points of failure, blockchain validation, and strong encryption.",
  VERY_HIGH:
    "Maximum protection with quantum-safe encryption, multi-site redundancy, and real-time validation.",
};

/** Value creation points by security level */
export const VALUE_CREATION_POINTS: Partial<Record<SecurityLevel, string[]>> = {
  None: ["Minimal security baseline"],
  Low: ["Basic security protection"],
  Moderate: ["Demonstrates security diligence"],
  High: ["Enables expansion into regulated markets"],
  "Very High": ["Enables participation in classified"],
};

/** ROI estimates by security level */
export const ROI_ESTIMATES = {
  NONE: "Negative (high risk of losses)",
  LOW: "1-2x for basic security implementation",
  MODERATE: "2-3x with moderate security",
  HIGH: "3-5x with high security",
  VERY_HIGH: "5x+ with very high security",

  NONE_OBJ: {
    returnRate: "0%",
    description: "No security investment means no return",
  },
  LOW_OBJ: {
    returnRate: "120%",
    description: "Basic security measures provide minimal protection",
  },
  MODERATE_OBJ: {
    returnRate: "200%",
    description: "Standard security provides good cost-benefit balance",
  },
  HIGH_OBJ: {
    returnRate: "350%",
    description: "Advanced security provides significant protection",
  },
  VERY_HIGH_OBJ: {
    returnRate: "450%",
    description: "Maximum security provides optimal protection",
  },
};

/** Cost analysis messages */
export const COST_ANALYSIS = {
  SMALL_SOLUTION:
    "Basic security implementation with minimal investment. Suitable for small businesses or non-critical systems.",
  LARGE_SOLUTION:
    "Comprehensive security solution requiring significant investment. Recommended for critical systems or regulated industries.",
};

/** Compliance framework display names */
export const COMPLIANCE_FRAMEWORKS = {
  SOC2: "SOC 2",
  ISO27001: "ISO 27001",
  PCI_DSS: "PCI DSS",
  HIPAA: "HIPAA",
  NIST: "NIST 800-53 High",
};

/** Centralized UI text constants */
export const UI_TEXT = {
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
    AVAILABILITY: "Availability",
    INTEGRITY: "Integrity",
    CONFIDENTIALITY: "Confidentiality",
  },

  WIDGET_TITLES: {
    SECURITY_LEVEL: "Security Profile Configuration",
    SECURITY_SUMMARY: "Security Summary",
    RADAR_CHART: "Security Radar",
    COST_ESTIMATION: "Cost Estimation",
    COMPLIANCE_STATUS: "Compliance Status",
    VALUE_CREATION: "Value Creation",
    IMPACT_ANALYSIS: "Impact Analysis",
    SECURITY_PROFILE: "CIA Security Profile",
    SECURITY_RESOURCES: "Security Resources",
  },

  BUDGET: {
    IT_BUDGET_CAPEX: "of IT budget as one-time capital expenditure",
    IT_BUDGET_OPEX: "of IT budget as annual operational expenses",
  },

  SECURITY_MEASURES: {
    AVAILABILITY: "Availability",
    INTEGRITY: "Integrity",
    CONFIDENTIALITY: "Confidentiality",
  },

  CHART: {
    LABEL_SECURITY_LEVELS: "Security Levels",
    TITLE_SECURITY_PROFILE: "Security Profile",
  },

  VALUE_CREATION: {
    NONE_TITLE: "No Value Creation",
    WITH_LEVEL: (level: string) => `${level} Value Creation`,
  },

  APP_TITLE: "CIA Compliance Manager Dashboard",
};

/** Test matchers for UI element validation */
export const TEST_MATCHERS = {
  COMPLIANCE_FRAMEWORKS_REGEX: new RegExp(
    Object.values(COMPLIANCE_FRAMEWORKS).join("|")
  ),
  UPTIME_PATTERN: /\d+\.?\d*%\s+uptime/i,
  DOWNTIME_PATTERN: /downtime/i,
  SECURITY_NONE_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.NONE),
  SECURITY_LOW_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.LOW),
  SECURITY_MODERATE_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.MODERATE),
  SECURITY_HIGH_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.HIGH),
  SECURITY_VERY_HIGH_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.VERY_HIGH),
};

/** Test data for widget and component testing */
export const TEST_DATA = {
  WIDGET: {
    TITLE: "Test Widget",
    CONTENT: "Widget content",
    CUSTOM_CLASS: "test-class",
  },
  MOCK_DESCRIPTIONS: {
    AVAILABILITY: "Custom availability description",
    INTEGRITY: "Custom integrity description",
    CONFIDENTIALITY: "Custom confidentiality description",
  },
  MOCK_OPTIONS: {
    BASE: {
      description: "None",
      impact: "None",
      technical: "None",
      capex: 0,
      opex: 0,
      bg: "#ffffff",
      text: "#000000",
    },
    LOW: {
      description: "Low",
      impact: "Low",
      technical: "Low",
      capex: 5,
      opex: 5,
      bg: "#ffffff",
      text: "#000000",
    },
  },
};

/** Implementation cost estimates by security level */
export const IMPLEMENTATION_COSTS: {
  [key: string]: {
    developmentEffort: string;
    maintenance: string;
    expertise: string;
  };
} = {
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

/**
 * Widget icons for consistent UI representation
 */
export const WIDGET_ICONS = {
  SECURITY_LEVEL: "\uD83D\uDD10",
  SECURITY_SUMMARY: "\uD83D\uDCCA",
  BUSINESS_IMPACT_ANALYSIS: "\uD83D\uDCC8",
  COMPLIANCE_STATUS: "\uD83D\uDCCB",
  SECURITY_RESOURCES: "\uD83D\uDCDA",
  COST_ESTIMATION: "\uD83D\uDCB0",
  VALUE_CREATION: "\uD83D\uDC8E",
  TECHNICAL_DETAILS: "\u2699\uFE0F",
  SECURITY_VISUALIZATION: "\uD83D\uDCC8",
  AVAILABILITY_IMPACT: getComponentIcon("availability"),
  INTEGRITY_IMPACT: getComponentIcon("integrity"),
  CONFIDENTIALITY_IMPACT: getComponentIcon("confidentiality"),
};

/**
 * Widget titles for consistent naming
 */
export const WIDGET_TITLES = {
  SECURITY_LEVEL: "Security Level Configuration",
  SECURITY_SUMMARY: "Security Summary",
  BUSINESS_IMPACT_ANALYSIS: "Business Impact Analysis",
  COMPLIANCE_STATUS: "Compliance Status",
  SECURITY_RESOURCES: "Security Resources",
  COST_ESTIMATION: "Cost Estimation",
  VALUE_CREATION: "Value Creation",
  TECHNICAL_DETAILS: "Technical Implementation Details",
  SECURITY_VISUALIZATION: "Security Visualization",
  AVAILABILITY_IMPACT: "Availability Impact",
  INTEGRITY_IMPACT: "Integrity Impact",
  CONFIDENTIALITY_IMPACT: "Confidentiality Impact",
};

/**
 * Colors for different security levels
 */
export const SECURITY_LEVEL_COLORS = {
  NONE: "red",
  LOW: "yellow",
  MODERATE: "blue",
  HIGH: "green",
  VERY_HIGH: "purple",
};

/** Default security level */
export const DEFAULT_SECURITY_LEVEL: SecurityLevel = "None";

/**
 * Widget sizes for layout
 */
export const WIDGET_SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
  FULL: "full",
};

/**
 * Widget categories
 */
export const WIDGET_CATEGORIES = {
  SECURITY: "security",
  IMPACT: "impact",
  COMPLIANCE: "compliance",
  COST: "cost",
  TECHNICAL: "technical",
  RESOURCES: "resources",
};

/**
 * Application routes
 */
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  SETTINGS: "/settings",
  REPORTS: "/reports",
};

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  THEME: "cia-theme",
  SECURITY_LEVELS: "cia-security-levels",
  DASHBOARD_LAYOUT: "cia-dashboard-layout",
  USER_PREFERENCES: "cia-user-preferences",
};

/**
 * Refresh intervals (in milliseconds)
 */
export const REFRESH_INTERVALS = {
  FAST: 5000,
  MEDIUM: 30000,
  SLOW: 60000,
};

/**
 * Theme options
 */
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

/**
 * Default transition duration in milliseconds
 */
export const DEFAULT_TRANSITION_DURATION = 300;

/**
 * Chart colors
 */
export const CHART_COLORS = {
  AVAILABILITY: "#2196F3",
  INTEGRITY: "#4CAF50",
  CONFIDENTIALITY: "#9C27B0",
  SECURITY_LEVEL_COLORS: {
    None: "#F44336",
    Low: "#FF9800",
    Moderate: "#FFEB3B",
    High: "#4CAF50",
    "Very High": "#2196F3",
  },
};

/**
 * Maximum column count for grid layout
 */
export const GRID_MAX_COLUMNS = 12;
