// App constants used by both components and tests
// Centralized to avoid duplication and make tests more stable

// Import from the shared risk constants file
import { SecurityLevel } from "../types/cia"; // Import SecurityLevel only
import { BUSINESS_IMPACT_CATEGORIES, RISK_LEVELS } from "./riskConstants";
// Import CIADetails from the correct module
import { CIADetails } from "../types/cia-services";
// Import the UI constants for clean references
import { getComponentIcon } from "./uiConstants";

// Export the risk levels and business impact categories from here as well for consistency
export { BUSINESS_IMPACT_CATEGORIES, RISK_LEVELS };

// SecurityLevelMap type for cleaner lookups
export type SecurityLevelKey =
  | "NONE"
  | "LOW"
  | "MODERATE"
  | "HIGH"
  | "VERY_HIGH";
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

// Update the type of SECURITY_LEVELS to use the imported SecurityLevel
export const SECURITY_LEVELS: Record<SecurityLevelKey, SecurityLevel> = {
  NONE: "None",
  LOW: "Low",
  MODERATE: "Moderate",
  HIGH: "High",
  VERY_HIGH: "Very High",
};

// CIA Component Labels
export const CIA_LABELS = {
  AVAILABILITY: "Availability",
  INTEGRITY: "Integrity",
  CONFIDENTIALITY: "Confidentiality",
};

// CIA tooltip descriptions for better user understanding
export const CIA_DESCRIPTIONS = {
  CONFIDENTIALITY: "Controls who can access your data and systems",
  INTEGRITY: "Ensures data remains accurate and unaltered",
  AVAILABILITY: "Determines how reliably your systems can be accessed",
};

// Compliance Status Text
export const COMPLIANCE_STATUS = {
  NON_COMPLIANT: "Non-Compliant",
  BASIC_COMPLIANCE: "Meets basic compliance only",
  STANDARD_COMPLIANCE: "Compliant with standard frameworks",
  FULL_COMPLIANCE: "Compliant with all major frameworks",
};

// Status Icons
export const UI_ICONS = {
  // Compliance icons
  NON_COMPLIANT: "❌",
  BASIC_COMPLIANCE: "⚠️",
  STANDARD_COMPLIANCE: "✓",
  FULL_COMPLIANCE: "✅",

  // Security level icons
  SECURITY_NONE: "⚠️",
  SECURITY_LOW: "🔓",
  SECURITY_MODERATE: "🔐",
  SECURITY_HIGH: "🛡️",
  SECURITY_VERY_HIGH: "🔒",
};

// Security Summary Titles - derived from security levels
export const SECURITY_SUMMARY_TITLES = {
  NONE: `${SECURITY_LEVELS.NONE} Security`,
  LOW: `${SECURITY_LEVELS.LOW} Security`,
  MODERATE: `${SECURITY_LEVELS.MODERATE} Security`,
  HIGH: `${SECURITY_LEVELS.HIGH} Security`,
  VERY_HIGH: `${SECURITY_LEVELS.VERY_HIGH} Security`,
};

// Security recommendations for each level
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

// Framework descriptions
export const FRAMEWORK_DESCRIPTIONS = {
  SOC2: "Requires basic security controls across CIA triad",
  ISO27001: "Requires moderate security controls and management system",
  PCI_DSS: "Emphasis on strong confidentiality controls",
  HIPAA: "Requires protection of healthcare information",
  NIST: "High security controls for federal information systems",
};

// Security Descriptions - direct hardcoded values to maintain test compatibility
export const SECURITY_DESCRIPTIONS = {
  NONE: "No security controls implemented.",
  LOW: "Basic protection with minimal controls and manual processes.",
  MODERATE:
    "Balanced protection with automated recovery, validation checks, and standard encryption.",
  HIGH: "Robust protection with minimal single points of failure, blockchain validation, and strong encryption.",
  VERY_HIGH:
    "Maximum protection with quantum-safe encryption, multi-site redundancy, and real-time validation.",
};

// Technical descriptions - for more detailed tooltips - using the helper function
export const TECHNICAL_DESCRIPTIONS = {
  // Placeholder that will be populated by the actual components
  AVAILABILITY: {} as Record<SecurityLevelKey, string>,
  INTEGRITY: {} as Record<SecurityLevelKey, string>,
  CONFIDENTIALITY: {} as Record<SecurityLevelKey, string>,
};

// Impact Analysis Descriptions using enhanced helper
export const IMPACT_DESCRIPTIONS = {
  // Placeholder that will be populated by the actual components
  AVAILABILITY: {} as Record<SecurityLevelKey, string>,
  INTEGRITY: {} as Record<SecurityLevelKey, string>,
  CONFIDENTIALITY: {} as Record<SecurityLevelKey, string>,
};

// Business Impact - using the helper
export const BUSINESS_IMPACTS = {
  // Placeholder that will be populated by the actual components
  AVAILABILITY: {} as Record<SecurityLevelKey, string>,
  INTEGRITY: {} as Record<SecurityLevelKey, string>,
  CONFIDENTIALITY: {} as Record<SecurityLevelKey, string>,
};

// Value Creation Points
export const VALUE_CREATION_POINTS: Partial<Record<SecurityLevel, string[]>> = {
  None: ["Minimal security baseline"],
  Low: ["Basic security protection"],
  Moderate: ["Demonstrates security diligence"],
  High: ["Enables expansion into regulated markets"],
  "Very High": ["Enables participation in classified"],
};

// Detailed value creation points by security level
export const DETAILED_VALUE_POINTS = {
  NONE: [
    "No value creation from security perspective",
    "High risk of security incidents with significant business impact",
    "Limited ability to participate in business relationships requiring security",
    "Potential regulatory issues in many industries",
  ],
  LOW: [
    "Minimal upfront costs allow budget allocation elsewhere",
    "Appropriate for public data and low-impact internal systems",
    "Provides basic protection against common threats",
    "Simple implementation with minimal maintenance overhead",
  ],
  MODERATE: [
    "Reduces operational disruptions by 80% compared to Basic level",
    "Prevents common security incidents affecting quarterly performance",
    "Provides competitive advantage over businesses with sub-standard security",
    "Meets requirements for standard business relationships",
  ],
  HIGH: [
    "Provides assurance to high-value customers with stringent requirements",
    "Reduces insurance premiums through demonstrated security",
    "Minimizes breach-related costs (avg. $4.45M per incident)",
    "Supports premium service offerings where security is a differentiator",
  ],
  VERY_HIGH: [
    "Protects irreplaceable intellectual property worth billions",
    "Creates long-term trust with stakeholders including governments",
    "Provides resilience against catastrophic events",
    "Supports premium pricing models based on security guarantees",
  ],
};

// ROI Estimates - consistent format across all values
export const ROI_ESTIMATES = {
  NONE: "Negative (high risk of losses)",
  LOW: "1-2x for basic security implementation",
  MODERATE: "2-3x with moderate security",
  HIGH: "3-5x with high security",
  VERY_HIGH: "5x+ with very high security",

  // Also include structured data for component use
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

// Cost Analysis Messages
export const COST_ANALYSIS = {
  SMALL_SOLUTION:
    "Basic security implementation with minimal investment. Suitable for small businesses or non-critical systems.",
  LARGE_SOLUTION:
    "Comprehensive security solution requiring significant investment. Recommended for critical systems or regulated industries.",
};

// Framework names
export const COMPLIANCE_FRAMEWORKS = {
  SOC2: "SOC 2", // Change if needed to match what the component uses
  ISO27001: "ISO 27001",
  PCI_DSS: "PCI DSS",
  HIPAA: "HIPAA",
  NIST: "NIST 800-53 High",
};

// Additional constants for specific UI components (previously in testConstants)
export const DISPLAY_FORMAT = {
  CURRENCY_PREFIX: "$",
  PERCENTAGE_SUFFIX: "%",
  DECIMAL_PLACES: 2,
};

// UI Text constants - centralized text for all UI elements
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
    AVAILABILITY: "Availability",
    INTEGRITY: "Integrity",
    CONFIDENTIALITY: "Confidentiality",
  },

  // Widget titles
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

  // Budget related text
  BUDGET: {
    IT_BUDGET_CAPEX: "of IT budget as one-time capital expenditure",
    IT_BUDGET_OPEX: "of IT budget as annual operational expenses",
  },

  // Security measures
  SECURITY_MEASURES: {
    AVAILABILITY: "Availability",
    INTEGRITY: "Integrity",
    CONFIDENTIALITY: "Confidentiality",
  },

  // Chart labels
  CHART: {
    LABEL_SECURITY_LEVELS: "Security Levels",
    TITLE_SECURITY_PROFILE: "Security Profile",
  },

  // Value creation titles
  VALUE_CREATION: {
    NONE_TITLE: "No Value Creation",
    WITH_LEVEL: (level: string) => `${level} Value Creation`,
  },

  // App title
  APP_TITLE: "CIA Compliance Manager Dashboard",
};

// Test specific matchers for use in testing UI elements
export const TEST_MATCHERS = {
  COMPLIANCE_FRAMEWORKS_REGEX: new RegExp(
    Object.values(COMPLIANCE_FRAMEWORKS).join("|")
  ),
  UPTIME_PATTERN: /\d+\.?\d*%\s+uptime/i,
  DOWNTIME_PATTERN: /downtime/i,
  // Add matchers for security descriptions
  SECURITY_NONE_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.NONE),
  SECURITY_LOW_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.LOW),
  SECURITY_MODERATE_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.MODERATE),
  SECURITY_HIGH_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.HIGH),
  SECURITY_VERY_HIGH_PATTERN: new RegExp(SECURITY_DESCRIPTIONS.VERY_HIGH),
};

// Add for test data:
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

// Add to the constants file
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
  SECURITY_LEVEL: "🔐",
  SECURITY_SUMMARY: "📊",
  BUSINESS_IMPACT_ANALYSIS: "📈",
  COMPLIANCE_STATUS: "📋",
  SECURITY_RESOURCES: "📚",
  COST_ESTIMATION: "💰",
  VALUE_CREATION: "💎",
  TECHNICAL_DETAILS: "⚙️",
  SECURITY_VISUALIZATION: "📈",
  // Use getComponentIcon function from uiConstants to avoid duplication
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

/**
 * Constants used throughout the application
 */

/**
 * Default CIA Details when none are provided
 */
export const DEFAULT_CIA_DETAILS: CIADetails = {
  description: "Not specified",
  technical: "Not specified",
  businessImpact: "Not specified",
  capex: 0,
  opex: 0,
  bg: "#f0f0f0",
  text: "#333333",
  recommendations: [],
};

/**
 * Default security level
 */
export const DEFAULT_SECURITY_LEVEL: SecurityLevel = "None";

/**
 * Widget sizes for layout
 */
export const WIDGET_SIZES = {
  SMALL: "small", // 1/3 width
  MEDIUM: "medium", // 1/2 width
  LARGE: "large", // 2/3 width
  FULL: "full", // Full width
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
  FAST: 5000, // 5 seconds
  MEDIUM: 30000, // 30 seconds
  SLOW: 60000, // 1 minute
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
  AVAILABILITY: "#2196F3", // Blue
  INTEGRITY: "#4CAF50", // Green
  CONFIDENTIALITY: "#9C27B0", // Purple
  SECURITY_LEVEL_COLORS: {
    None: "#F44336", // Red
    Low: "#FF9800", // Orange
    Moderate: "#FFEB3B", // Yellow
    High: "#4CAF50", // Green
    "Very High": "#2196F3", // Blue
  },
};

/**
 * Maximum column count for grid layout
 */
export const GRID_MAX_COLUMNS = 12;
