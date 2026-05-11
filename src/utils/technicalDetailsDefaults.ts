/**
 * Default values and configurations for technical implementation details
 *
 * Provides default implementation configurations across CIA security levels,
 * serving as fallbacks when specific component data is unavailable.
 *
 * ## Business Perspective
 * These defaults ensure consistent technical guidance across all security
 * implementation scenarios, even when custom configurations are not provided.
 * This supports standardized security implementation across the organization. 🔧
 *
 * @packageDocumentation
 */

import type { CIAComponentType, TechnicalImplementationDetails } from "../types/cia-services";
import type { SecurityLevel } from "../types/cia";

/**
 * Default technical implementation steps by security level
 */
const DEFAULT_IMPLEMENTATION_STEPS: Record<SecurityLevel, string[]> = {
  None: [
    "Document the decision to not implement controls",
    "Identify associated risks",
    "Get formal acceptance of risks from stakeholders",
  ],
  Low: [
    "Implement basic access controls",
    "Configure logging for key events",
    "Document security procedures",
  ],
  Moderate: [
    "Implement role-based access control",
    "Enable comprehensive audit logging",
    "Configure automated security scanning",
    "Establish incident response procedures",
  ],
  High: [
    "Implement multi-factor authentication",
    "Configure advanced threat protection",
    "Establish 24/7 security monitoring",
    "Implement data loss prevention controls",
    "Conduct regular penetration testing",
  ],
  "Very High": [
    "Implement zero-trust architecture",
    "Deploy hardware security modules",
    "Configure real-time threat intelligence",
    "Establish red team exercises",
    "Implement advanced encryption at all layers",
    "Deploy AI-driven security monitoring",
  ],
};

/**
 * Default effort values for implementation by security level
 */
const DEFAULT_EFFORT: Record<SecurityLevel, {
  development: string;
  maintenance: string;
  expertise: string;
}> = {
  None: {
    development: "Minimal",
    maintenance: "Minimal",
    expertise: "Basic",
  },
  Low: {
    development: "1-2 weeks",
    maintenance: "Hours per month",
    expertise: "Junior security engineer",
  },
  Moderate: {
    development: "1-3 months",
    maintenance: "Days per month",
    expertise: "Mid-level security engineer",
  },
  High: {
    development: "3-6 months",
    maintenance: "1-2 weeks per month",
    expertise: "Senior security engineer",
  },
  "Very High": {
    development: "6-12 months",
    maintenance: "Continuous",
    expertise: "Security architect / team",
  },
};

/**
 * Get default technical implementation details for a given component and level
 *
 * Returns standardized implementation details when component-specific data
 * is not available. These defaults ensure a consistent security implementation
 * baseline across all CIA components.
 *
 * @param component - CIA component type (availability, integrity, confidentiality)
 * @param level - Security level (None, Low, Moderate, High, Very High)
 * @returns Default TechnicalImplementationDetails for the specified parameters
 *
 * @example
 * ```typescript
 * // Get defaults for availability at High level
 * const defaults = getDefaultTechnicalImplementation('availability', 'High');
 * console.log(defaults.implementationSteps);
 * // ['Implement multi-factor authentication', 'Configure advanced threat protection', ...]
 *
 * // Get defaults for confidentiality at Moderate level
 * const moderateDefaults = getDefaultTechnicalImplementation('confidentiality', 'Moderate');
 * console.log(moderateDefaults.effort.development); // '1-3 months'
 * ```
 */
export function getDefaultTechnicalImplementation(
  component: CIAComponentType,
  level: SecurityLevel
): TechnicalImplementationDetails {
  const steps = DEFAULT_IMPLEMENTATION_STEPS[level] ?? DEFAULT_IMPLEMENTATION_STEPS["None"];
  const effort = DEFAULT_EFFORT[level] ?? DEFAULT_EFFORT["None"];

  return {
    description: `Default ${level} ${component} implementation`,
    implementationSteps: steps,
    effort,
    expertiseLevel: effort.expertise,
    developmentEffort: effort.development,
  };
}

/**
 * Get default description for a CIA component and security level
 *
 * @param component - CIA component type
 * @param level - Security level
 * @returns Human-readable description of the implementation
 *
 * @example
 * ```typescript
 * getDefaultDescription('availability', 'High')
 * // 'High availability security controls with enhanced monitoring'
 * ```
 */
export function getDefaultDescription(
  component: CIAComponentType,
  level: SecurityLevel
): string {
  const levelDescriptions: Record<SecurityLevel, string> = {
    None: "No controls in place",
    Low: "Basic controls with minimal protection",
    Moderate: "Standard controls with moderate protection",
    High: "Enhanced controls with strong protection",
    "Very High": "Maximum controls with comprehensive protection",
  };

  const componentDescriptions: Record<CIAComponentType, string> = {
    availability: "availability and resilience",
    integrity: "data integrity and validation",
    confidentiality: "data confidentiality and access control",
  };

  return `${levelDescriptions[level] ?? "Unknown"} for ${componentDescriptions[component] ?? "unknown component"}`;
}
